export class DataTable {
  constructor(_columns, _data) {
    this._columns = _columns;
    this._data = _data;
  }
  toDiv(divIdName) {
    let div = document.getElementById(divIdName);
    div.innerHTML = this.buildTable();
    this.activeActions();
  }
  buildTable() {
    if (!this.isValidData()) {
      return "";
    }
    const header = this.buildHead();
    const body = this.buildBody();
    return `<table class="table-auto w-full box-border border-separate">${header}${body}</table>`;
  }
  buildHead() {
    let base = `<thead><tr>`;
    this._columns.forEach((column) => {
      base += `<th><div class="table-header ${column.header.classes ? column.header.classes.join(" ") : ""}">`;
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
  buildBody() {
    let base = `<tbody>`;
    this._data.forEach((data, index) => {
      const objectData = data.toObject();
      let row;
      if (objectData.type === "separator" && objectData.title) {
        row = this.newSubGroupSeparator(objectData);
      } else {
        row = this.newRow(String(index), objectData);
      }
      base += `${row}`;
    });
    return `${base}</tbody>`;
  }
  newSubGroupSeparator(data) {
    return `<tr>
      <td colspan="${this._columns.length}" class="subgroup-description ${data.bg} ${data.border}">
        ${data.title}
      </td>
    </tr>`;
  }
  newRow(rowId, rowData) {
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
  buildSpecialCells(rowId) {
    const specialColumns = this._columns.filter((column) => typeof column.header.name !== "string");
    let cell = "";
    specialColumns.forEach((column) => {
      const columnType = column.header.name;
      switch (columnType) {
        case ColumnType.ACTIONS:
          cell += this.buildActionsCell(rowId);
      }
    });
    return cell;
  }
  isValidData() {
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
    }) ? false : true;
  }
  buildActionsCell(rowId) {
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
  activeActions() {
    this._data.forEach((data, index) => {
      const objectData = data.toObject();
      if (objectData.type === "separator" && objectData.title) {
        return;
      }
      const settingsIcon = $(`#settings-icon-${index}`);
      const settingsIconItem = $(`#settings-icon-${index} i`);
      const settingsActions = $(`#settings-actions-${index}`);
      settingsIcon.on("click", () => {
        if (settingsIconItem.hasClass("bi-x-circle")) {
          settingsIconItem.addClass("opacity-0");
          setTimeout(() => {
            settingsIconItem.removeClass("bi-x-circle");
            settingsIconItem.addClass("bi-gear");
            settingsIconItem.removeClass("opacity-0");
          }, 200);
        } else {
          settingsIconItem.toggleClass("bi-x-circle");
          settingsIconItem.toggleClass("bi-gear");
        }
        settingsActions.toggleClass("opacity-100");
      });
    });
  }
}
export var ColumnType;
(function(ColumnType2) {
  ColumnType2[ColumnType2["ACTIONS"] = 0] = "ACTIONS";
})(ColumnType || (ColumnType = {}));
