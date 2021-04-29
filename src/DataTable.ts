import { DataForTable, DataForTableTypes } from "./DataForTable";
import { DataTableSubgroupSeparator } from "./DataTableSubgroupSeparator";

export class DataTable<DataType extends DataForTable> {
  private _rowsIds: string[];
  private _createInputIds: string[];
  private _divContainerId: string;
  private _bgColorClass: string;

  constructor(
    private _columns: DataTableColumn[],
    private _data: (DataTableSubgroupSeparator<DataType> | DataType)[],
    private _dataTableStyles?: DataTableStyles,
    private _createOptions?: CreateOptions
  ) {
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
    if (this._createOptions) {
      this.activateCreatorRow(this._createOptions);
    }
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

    return `<table class="table-auto w-full box-border border-separate pl-5 ${
      this._dataTableStyles && this._dataTableStyles.table.join(" ")
    }">${header}${body}</table>`;
  }

  private buildHead(): string {
    let base = `<thead><tr>`;
    this._columns.forEach((column) => {
      base += `<th><div class="table-header ${
        column.header.classes ? column.header.classes.join(" ") : ""
      }">`;
      const headerName = column.header.name;
      if (typeof headerName != "string") {
        switch (headerName) {
          case ColumnType.ACTIONS:
            base += `</div></th>`;
            base += `<th></th>`;
        }
      } else {
        base += `${headerName}</div></th>`;
      }
    });
    return `${base}</tr></thead>`;
  }

  private buildBody(): string {
    let base = `<tbody>`;
    this._data.forEach((data, index) => {
      let row = "";
      if (data instanceof DataTableSubgroupSeparator) {
        row += data.getRows(this._columns.length, (dataValue) => {
          return this.newRow(dataValue);
        });
      } else {
        const objectData = data.toObject();
        row = this.newRow(objectData);
      }
      base += `${row}`;
    });
    if (this._createOptions) {
      base += this.buildCreatorRow(this._createOptions);
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
      const classes = dataTableColumn?.body.classes || [];
      data = dataTableColumn.body.dataParser
        ? dataTableColumn.body.dataParser(data)
        : data;
      row += `<td class="cell ${classes.join(" ")}">${data}</td>`;
    });

    row += this.buildSpecialCells(rowId);

    return row;
  }

  private buildCreatorRow(createOptions: CreateOptions) {
    let row = `<tr><form action="" novalidate id="create-row">`;
    this._columns.forEach((column, index) => {
      if (typeof column.header.name === "string") {
        const inputId = `cell-input-${index}`;
        this._createInputIds.push(inputId);
        const classes = column?.body.classes || [];
        row += `<td class="cell box-border"><input type="${
          column.header.type ? column.header.type : "text"
        }" placeholder="${
          column.header.name
        }" id="${inputId}" name="${inputId}" class='cell-input ${
          this._bgColorClass
        } ${classes.join(" ")}'/></td>`;
      }
    });
    row += `<td class="text-center text-xl" colspan="${
      this.getSpecialColumns().length + 1
    }"><button id="create-button" type="submit"><i class="bi bi-check2 w-full mx-auto"></i></button></td>`;
    row += "</form></tr>";
    return row;
  }

  private createNewRow(
    createOptions: CreateOptions,
    data: (string | number)[]
  ) {
    return createOptions ? createOptions.fnCreate(data) : false;
  }

  private setInput(inputId: string) {
    $("#cell-input-" + inputId).on("keyup", function (e) {
      if (e.which == 13 || e.keyCode == 13) {
        $("#create-row").trigger("submit");
      }
    });
  }

  private activateCreatorRow(createOptions: CreateOptions) {
    $("#create-row").on("submit", (e) => {
      e.preventDefault();
      const inputs = this._createInputIds.map((inputId) =>
        $(`#${inputId}`).val().toString()
      );
      const created = this.createNewRow(createOptions, inputs);
      console.log(created);
    });
    this._columns.forEach((value, index) => {
      this.setInput(String(index));
    });
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
      const columnType = column.header.name;
      switch (columnType) {
        case ColumnType.ACTIONS:
          cell += this.buildActionsCell(rowId);
      }
    });

    return cell;
  }

  private isValidData(data: Record<string, DataForTableTypes>): boolean {
    return this._columns.find((column) => {
      const columnName = column.header.name;
      if (typeof columnName === "string") {
        return !data[columnName];
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

export type DataTableColumn = {
  header: {
    name: string | ColumnType;
    type?: "number" | "string";
    classes?: string[];
  };
  body: {
    classes?: string[];
    dataParser?: (columnData: DataForTableTypes) => DataForTableTypes;
  };
};

export enum ColumnType {
  ACTIONS,
}

export type CreateOptions = {
  fnCreate: (inputsData: (string | number)[]) => boolean;
};
