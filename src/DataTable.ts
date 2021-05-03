import { DataForTable, DataForTableTypes } from "./DataForTable";
import { DataTableColumnDefinition } from "./DataTableColumn/DataTableColumnDefinition";
import {
  DataTableColumnType,
  DataTableSpecialColumn,
} from "./DataTableColumn/DataTableSpecialColumn";
import { DataTableSubgroupSeparator } from "./DataTableSubgroupSeparator";

export class DataTable<DataType extends DataForTable> {
  private _subgroups: DataTableSubgroupSeparator<DataType>[];
  private _rowsIds: string[];
  private _createInputIds: string[];
  private _divContainerId: string;
  private _bgColorClass: string;

  constructor(
    private _columns: DataTableColumnDefinition[],
    private _data: (DataTableSubgroupSeparator<DataType> | DataType)[],
    private _createOptions: CreateOptions,
    private _dataTableStyles?: DataTableStyles
  ) {
    this._subgroups = [];

    this._rowsIds = [];
    this._createInputIds = [];
    this._divContainerId = "";
    this._bgColorClass = "bg-white";
  }

  toDiv(divIdName: string) {
    let div = document.getElementById(divIdName);
    this._divContainerId = divIdName;
    div.innerHTML = this.buildTable();
    this.activeActions();
    this.activateCreatorRow();
    this._subgroups.forEach((subg) => subg.activateCreationRow());
  }

  public refreshTable(currentPage: string) {
    $(`#${this._divContainerId}`).load(
      `${currentPage} #${this._divContainerId}`
    );
  }

  private buildTable(): string {
    const styles = this._dataTableStyles ? this._dataTableStyles.table : [];
    const bgColorClass = styles.find((styleClass) =>
      styleClass.includes("bg-")
    );

    if (bgColorClass) {
      this._bgColorClass = bgColorClass;
    }
    const header = this.buildHead();
    const body = this.buildBody();

    return `<table class="table-auto w-full box-border border-separate ${
      this._dataTableStyles && this._dataTableStyles.table.join(" ")
    }">${header}${body}</table>`;
  }

  private buildHead(): string {
    let base = `<thead><tr>`;
    this._columns.forEach((column) => {
      const cellClasses = column.header.styles?.cell || [];
      const contentClasses = column.header.styles?.content || [];

      base += `<th class="${cellClasses.join(
        " "
      )}"><div class="table-header ${contentClasses.join(" ")}">`;
      if (column instanceof DataTableSpecialColumn) {
        switch (column.type) {
          case DataTableColumnType.ACTIONS:
            base += `</div></th>`;
            base += `<th></th>`;
        }
      } else {
        base += `${column.header.name}</div></th>`;
      }
    });
    return `${base}</tr></thead>`;
  }

  private buildBody(): string {
    let base = `<tbody>`;
    this._data.forEach((data, index) => {
      let row = "";
      if (data instanceof DataTableSubgroupSeparator) {
        this._subgroups.push(data);
        row += data.getRows(
          this._columns.length,
          (dataValue) => {
            return this.newRow(dataValue);
          },
          () => {},
          (id: string) => {
            return this.buildCreatorRow(id);
          }
        );
      } else {
        const objectData = data.toObject();
        row = this.newRow(objectData);
      }
      base += `${row}`;
    });
    if (this._createOptions.fnCreate) {
      base += this.buildCreatorRow("");
    }
    return `${base}</tbody>`;
  }

  private newRow(rowData: Record<string, DataForTableTypes>): string {
    if (!this.isValidData(rowData)) {
      return "";
    }
    const rowId = String(this._rowsIds.length);
    this._rowsIds.push(rowId);
    let row = `<tr>`;
    const dataColumnsNames = Object.keys(rowData);
    dataColumnsNames.forEach((columnName, index) => {
      let data = rowData[columnName];
      const dataTableColumn = this._columns[index];
      const cellClasses = dataTableColumn.body.styles.cell || [];
      const contentClasses = dataTableColumn.body.styles.content || [];
      data = dataTableColumn.body.dataParser
        ? dataTableColumn.body.dataParser(data)
        : data;
      row += `<td class="cell ${cellClasses.join(
        " "
      )}"><p class="cell-input ${contentClasses.join(
        " "
      )}" name="${columnName}-${rowId}">${data}</p></td>`;
    });

    row += this.buildSpecialCells(rowId);

    return row;
  }

  private buildCreatorRow(id: string) {
    let row = `<tr id="subgroup-${id}-create-row" class="creation-row hidden transition transition-all duration-500">`;
    this._columns.forEach((column, index) => {
      if (typeof column.header.name === "string") {
        const inputId = `subgroup-${id}-cell-input-${index}`;
        if (id) {
          const subgroup = this._subgroups.find((subg) => subg.id === id);
          if (subgroup) {
            subgroup.createInputIds.push(inputId);
          }
        } else {
          this._createInputIds.push(inputId);
        }
        const contentClasses = column.body.styles.content || [];
        const cellClasses = column.body.styles.cell || [];
        row += `<td class="cell ${cellClasses.join(" ")} max-w-full"><p max="${
          column.body.newDataLength || 25
        }" contenteditable="true" id="${inputId}" name="${inputId}" class='${
          this._bgColorClass
        } cell-input ${contentClasses.join(" ")}' role="textbox"></p></td>`;
      }
    });
    row += `<td class="cell text-center text-xl" colspan="${
      this.getSpecialColumns().length + 1
    }"><button id="subgroup-${id}-create-row-btn-accept"><i class="bi bi-check text-green-700"></i><button id='subgroup-${id}-create-row-btn-cancel'><i class="bi bi-x text-red-700"></i></button></td>`;
    row += "</tr>";
    return row;
  }

  private setInput(inputId: string) {
    $("#cell-input-" + inputId).on("keyup", function (e) {
      if (e.which == 13 || e.keyCode == 13) {
        $("#create-row").trigger("submit");
      }
    });
  }

  private activateCreatorRow() {
    this._columns.forEach((value, index) => {
      this.setInput(String(index));
    });
    let textfields = document.getElementsByClassName("cell-input");
    for (let i = 0; i < textfields.length; i++) {
      textfields[i].addEventListener(
        "keypress",
        function (e) {
          if (this.innerHTML.length >= this.getAttribute("max")) {
            e.preventDefault();
            return false;
          }
        },
        false
      );
    }
  }

  private getSpecialColumns() {
    return this._columns.filter(
      (column) => typeof column.header.name !== "string"
    );
  }

  private buildSpecialCells(rowId: string): string {
    const specialColumns = this.getSpecialColumns();

    let cell: string = "";
    specialColumns.forEach((column) => {
      if (column instanceof DataTableSpecialColumn) {
        switch (column.type) {
          case DataTableColumnType.ACTIONS:
            cell += this.buildActionsCell(rowId);
        }
      }
    });

    return cell;
  }

  private isValidData(data: Record<string, DataForTableTypes>): boolean {
    return this._columns.find((column) => {
      const columnName = column.header.name;
      if (typeof columnName === "string") {
        const value = data[columnName];
        return !value && value !== "" && value !== 0;
      }
      return false;
    })
      ? false
      : true;
  }

  private buildActionsCell(rowId: string): string {
    const actionsCell = `
    <td class="cell text-center pl-2 pr-1 z-10">
      <div id="settings-${rowId}" class="settings z-10">
        <label id="settings-icon-${rowId}" class="settings-icon z-10" for="settings-hidden-toggle-${rowId}">
          <i class="transition-all duration-200 bi bi-gear"></i
        ></label>
        <input
          type="checkbox"
          class="absolute settings-toggle"
          style="left: -1000vw"
          name="settings-hidden-toggle-${rowId}"
          id="settings-hidden-toggle-${rowId}"
        />
      </div>
    </td>
    <td class="relative right-3 z-0">
      <div
      id="settings-actions-${rowId}"
        class="settings-actions opacity-0 invisible transition-all duration-500 ml-3 flex flex-col"
      >
        <i
          class="bi bi-pencil transition-colors duration-300 hover:text-yellow-600"
        ></i>
        <i
          class="bi bi-trash transition-colors duration-300 hover:text-red-700"
        ></i>
      </div>
    </td>
    `;

    return actionsCell;
  }

  private activeActions() {
    this._rowsIds.forEach((id) => {
      const settingsIcon = $(`#settings-icon-${id}`);
      const settingsIconItem = $(`#settings-icon-${id} i`);
      const settingsActions = $(`#settings-actions-${id}`);

      settingsIcon.on("click", () => {
        if (settingsIconItem.hasClass("bi-gear")) {
          settingsIconItem.addClass("opacity-0");
          setTimeout(() => {
            settingsIconItem.addClass("bi-x-circle");
            settingsIconItem.removeClass("bi-gear");
            settingsIconItem.removeClass("opacity-0");
          }, 250);
        } else {
          settingsIconItem.toggleClass("bi-x-circle");
          settingsIconItem.toggleClass("bi-gear");
        }
        settingsActions.toggleClass("opacity-100");
        settingsActions.toggleClass("invisible");
      });
    });
  }
}

export type DataTableStyles = {
  table: string[];
};

export type CreateOptions = {
  fnCreate?: (inputsData: (string | number)[], subgroupId?: string) => boolean;
};
