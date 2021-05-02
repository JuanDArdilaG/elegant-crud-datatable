import {RandomElementFromArray} from "./utils/RandomElementFromArray.js";
export class DataTableSubgroupSeparator {
  constructor(_id, _title, _data, _fnCreate, color, _canAdd) {
    this._id = _id;
    this._title = _title;
    this._data = _data;
    this._fnCreate = _fnCreate;
    this._canAdd = _canAdd;
    const colorsNames = Object.keys(separatorsColors);
    if (!color || !colorsNames.includes(color)) {
      color = RandomElementFromArray(colorsNames);
    }
    this.separatorColor = separatorsColors[color];
    this._createInputIds = [];
  }
  get createInputIds() {
    return this._createInputIds;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get data() {
    return this._data;
  }
  getRows(columnsCount, rowCreator, cancelCreation, newRowCreator) {
    let rows = this.buildSeparator(columnsCount);
    this._data.forEach((value) => {
      const valueData = value.toObject();
      rows += rowCreator(valueData);
    });
    if (this._canAdd) {
      rows += this.newCreationRow(newRowCreator);
    }
    return rows;
  }
  newCreationRow(newRowCreator) {
    if (!newRowCreator) {
      return "";
    }
    return newRowCreator(`${this._id}`);
  }
  buildSeparator(columnsCount) {
    return `<tr>
    <td colspan="${columnsCount}" class="subgroup-description ${this.separatorColor.bg} ${this.separatorColor.border}">
      ${this._title}
      ${this._canAdd && `<button id="subgroup-${this._id}-btn-create" class="relative float-right mr-4 transition transition-opacity duration-200" ><i class="bi bi-plus-square"></i></button>`}
    </td>
  </tr>`;
  }
  activateCreationRow() {
    const rowElement = $(`#subgroup-${this._id}-create-row`);
    const btnCreateRowElement = $(`#subgroup-${this._id}-btn-create`);
    const btnCancelRowElement = $(`#subgroup-${this._id}-create-row-btn-cancel`);
    const btnAcceptRowElement = $(`#subgroup-${this._id}-create-row-btn-accept`);
    btnAcceptRowElement.on("click", () => {
      const inputs = this.createInputIds.map((inputId) => {
        return $(`#${inputId}`).html();
      });
      if (this._fnCreate) {
        this._fnCreate(inputs, this._id);
      }
    });
    btnCreateRowElement.on("click", () => {
      rowElement.toggleClass("show-creation-row");
      rowElement.toggleClass("hidden");
      btnCreateRowElement.addClass("opacity-0");
      btnCreateRowElement.addClass("cursor-default");
      btnCreateRowElement.prop("disabled", true);
    });
    btnCancelRowElement.on("click", () => {
      rowElement.toggleClass("hidden");
      rowElement.toggleClass("show-creation-row");
      btnCreateRowElement.removeClass("opacity-0");
      btnCreateRowElement.removeClass("cursor-default");
      btnCreateRowElement.prop("disabled", false);
    });
  }
}
export const separatorsColors = {
  red: {bg: "bg-red-100", border: "border-red-800"},
  blue: {bg: "bg-blue-100", border: "border-blue-800"},
  green: {bg: "bg-green-100", border: "border-green-800"},
  yellow: {bg: "bg-yellow-100", border: "border-yellow-800"},
  gray: {bg: "bg-gray-100", border: "border-gray-800"}
};
