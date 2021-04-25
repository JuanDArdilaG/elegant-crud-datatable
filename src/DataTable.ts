import { DataForTable, DataForTableTypes } from "./DataForTable";
import {
  DataTableSubgroupSeparator,
  DataTableSubgroupSeparatorType,
} from "./DataTableSubgroupSeparator";

export class DataTable<DataType extends DataForTable> {
  constructor(
    private _columns: DataTableColumn[],
    private _data: (DataTableSubgroupSeparator | DataType)[]
  ) {}

  toDiv(divIdName: string) {
    let div = document.getElementById(divIdName);
    div.innerHTML = this.buildTable();
    this.activeActions();
  }

  private buildTable(): string {
    if (!this.isValidData()) {
      return "";
    }
    const header = this.buildHead();
    const body = this.buildBody();
    return `<table class="table-auto w-full box-border border-separate">${header}${body}</table>`;
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
      const objectData = data.toObject();
      let row;
      if (objectData.type === "separator" && objectData.title) {
        row = this.newSubGroupSeparator(
          objectData as DataTableSubgroupSeparatorType
        );
      } else {
        row = this.newRow(String(index), objectData);
      }
      base += `${row}`;
    });
    return `${base}</tbody>`;
  }

  private newSubGroupSeparator(data: DataTableSubgroupSeparatorType) {
    return `<tr>
      <td colspan="${this._columns.length}" class="subgroup-description ${data.bg} ${data.border}">
        ${data.title}
      </td>
    </tr>`;
  }

  private newRow(
    rowId: string,
    rowData: Record<string, DataForTableTypes>
  ): string {
    let row = `<tr>`;
    const dataColumnsNames = Object.keys(rowData);
    dataColumnsNames.forEach((columnName, index) => {
      let data = rowData[columnName];
      const classes = this._columns[index]?.body.classes || [];
      row += `<td class="cell ${classes.join(" ")}">${data}</td>`;
    });

    row += this.buildSpecialCells(rowId);

    return row;
  }

  private buildSpecialCells(rowId: string): string {
    const specialColumns = this._columns.filter(
      (column) => typeof column.header.name !== "string"
    );

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

  private isValidData(): boolean {
    return this._data.find((data) => {
      const objectData = data.toObject();
      if (objectData.type === "separator" && objectData.title) {
        return false;
      }
      return this._columns.find((column) => {
        const columnName = column.header.name;
        if (typeof columnName === "string") {
          return !objectData[columnName];
        }
        return false;
      });
    })
      ? false
      : true;
  }

  private buildActionsCell(rowId: string): string {
    const actionsCell = `
    <td class="cell text-center pl-2 pr-1">
      <div id="settings-${rowId}" class="settings">
        <label id="settings-icon-${rowId}" class="settings-icon" for="settings-hidden-toggle-${rowId}">
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
    <td class="relative right-5">
      <div
      id="settings-actions-${rowId}"
        class="settings-actions opacity-0 transition-all duration-500 ml-3 flex flex-col"
      >
        <i
          class="bi bi-pencil transition-colors duration-300 hover:text-yellow-500"
        ></i>
        <i
          class="bi bi-trash transition-colors duration-300 hover:text-red-600"
        ></i>
      </div>
    </td>
    `;

    return actionsCell;
  }

  private activeActions() {
    this._data.forEach((data, index) => {
      const objectData = data.toObject();
      if (objectData.type === "separator" && objectData.title) {
        return;
      }
      const settingsIcon = $(`#settings-icon-${index}`);
      const settingsIconItem = $(`#settings-icon-${index} i`);
      const settingsActions = $(`#settings-actions-${index}`);

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
      });
    });
  }
}

export type DataTableColumn = {
  header: {
    name: string | ColumnType;
    classes?: string[];
  };
  body: {
    classes?: string[];
  };
};

export enum ColumnType {
  ACTIONS,
}
