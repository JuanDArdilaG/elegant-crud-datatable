<<<<<<< HEAD
import {DataTableSubgroupSeparator} from "./DataTableSubgroupSeparator.js";
export class DataTable {
  constructor(_columns, _data, _dataTableStyles, _createOptions) {
    this._columns = _columns;
    this._data = _data;
    this._dataTableStyles = _dataTableStyles;
    this._createOptions = _createOptions;
    this._rowsIds = [];
    this._createInputIds = [];
    this._divContainerId = "";
    this._bgColorClass = "bg-white";
  }
  toDiv(divIdName) {
    let div = document.getElementById(divIdName);
    this._divContainerId = divIdName;
    div.innerHTML = this.buildTable();
    this.activeActions();
    if (this._createOptions) {
      this.activateCreatorRow(this._createOptions);
    }
  }
  refreshTable(currentPage) {
    $(`#${this._divContainerId}`).load(`${currentPage} #${this._divContainerId}`);
  }
  buildTable() {
    const styles = this._dataTableStyles ? this._dataTableStyles.table : [];
    const bgColorClass = styles.find((styleClass) => styleClass.includes("bg-"));
    if (bgColorClass) {
      this._bgColorClass = bgColorClass;
    }
    const header = this.buildHead();
    const body = this.buildBody();
    return `<table class="table-auto w-full box-border border-separate pl-5 ${this._dataTableStyles && this._dataTableStyles.table.join(" ")}">${header}${body}</table>`;
=======
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
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
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
<<<<<<< HEAD
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
  newRow(rowData) {
    if (!this.isValidData(rowData)) {
      return "";
    }
    const rowId = String(this._rowsIds.length);
    this._rowsIds.push(rowId);
=======
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
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
    let row = `<tr>`;
    const dataColumnsNames = Object.keys(rowData);
    dataColumnsNames.forEach((columnName, index) => {
      let data = rowData[columnName];
<<<<<<< HEAD
      const dataTableColumn = this._columns[index];
      const classes = dataTableColumn?.body.classes || [];
      data = dataTableColumn.body.dataParser ? dataTableColumn.body.dataParser(data) : data;
=======
      const classes = this._columns[index]?.body.classes || [];
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
      row += `<td class="cell ${classes.join(" ")}">${data}</td>`;
    });
    row += this.buildSpecialCells(rowId);
    return row;
  }
<<<<<<< HEAD
  buildCreatorRow(createOptions) {
    let row = `<tr><form action="" novalidate id="create-row">`;
    this._columns.forEach((column, index) => {
      if (typeof column.header.name === "string") {
        const inputId = `cell-input-${index}`;
        this._createInputIds.push(inputId);
        const classes = column?.body.classes || [];
        row += `<td class="cell box-border"><input type="${column.header.type ? column.header.type : "text"}" placeholder="${column.header.name}" id="${inputId}" name="${inputId}" class='cell-input ${this._bgColorClass} ${classes.join(" ")}'/></td>`;
      }
    });
    row += `<td class="text-center text-xl" colspan="${this.getSpecialColumns().length + 1}"><button id="create-button" type="submit"><i class="bi bi-check2 w-full mx-auto"></i></button></td>`;
    row += "</form></tr>";
    return row;
  }
  createNewRow(createOptions, data) {
    return createOptions ? createOptions.fnCreate(data) : false;
  }
  setInput(inputId) {
    $("#cell-input-" + inputId).on("keyup", function(e) {
      if (e.which == 13 || e.keyCode == 13) {
        $("#create-row").trigger("submit");
      }
    });
  }
  activateCreatorRow(createOptions) {
    $("#create-row").on("submit", (e) => {
      e.preventDefault();
      const inputs = this._createInputIds.map((inputId) => $(`#${inputId}`).val().toString());
      const created = this.createNewRow(createOptions, inputs);
      console.log(created);
    });
    this._columns.forEach((value, index) => {
      this.setInput(String(index));
    });
  }
  getSpecialColumns() {
    return this._columns.filter((column) => typeof column.header.name !== "string");
  }
  buildSpecialCells(rowId) {
    const specialColumns = this.getSpecialColumns();
=======
  buildSpecialCells(rowId) {
    const specialColumns = this._columns.filter((column) => typeof column.header.name !== "string");
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
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
<<<<<<< HEAD
  isValidData(data) {
    return this._columns.find((column) => {
      const columnName = column.header.name;
      if (typeof columnName === "string") {
        return !data[columnName];
      }
      return false;
=======
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
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
    }) ? false : true;
  }
  buildActionsCell(rowId) {
    const actionsCell = `
<<<<<<< HEAD
    <td class="cell text-center pl-2 pr-1 z-10">
      <div id="settings-${rowId}" class="settings z-10">
        <label id="settings-icon-${rowId}" class="settings-icon z-10" for="settings-hidden-toggle-${rowId}">
=======
    <td class="cell text-center pl-2 pr-1">
      <div id="settings-${rowId}" class="settings">
        <label id="settings-icon-${rowId}" class="settings-icon" for="settings-hidden-toggle-${rowId}">
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
        ></i>
      </div>
    </td>
    `;
    return actionsCell;
  }
  activeActions() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
        } else {
          settingsIconItem.toggleClass("bi-x-circle");
          settingsIconItem.toggleClass("bi-gear");
        }
        settingsActions.toggleClass("opacity-100");
<<<<<<< HEAD
        settingsActions.toggleClass("invisible");
=======
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
      });
    });
  }
}
export var ColumnType;
(function(ColumnType2) {
  ColumnType2[ColumnType2["ACTIONS"] = 0] = "ACTIONS";
})(ColumnType || (ColumnType = {}));
