import {RandomElementFromArray} from "./utils/RandomElementFromArray.js";
export class DataTableSubgroupSeparator {
  constructor(_title, _data, color) {
    this._title = _title;
    this._data = _data;
    const colorsNames = Object.keys(separatorsColors);
    if (!color || !colorsNames.includes(color)) {
      color = RandomElementFromArray(colorsNames);
    }
    this.separatorColor = separatorsColors[color];
  }
  get title() {
    return this._title;
  }
  get data() {
    return this._data;
  }
  getRows(columnsCount, rowCreator) {
    let rows = this.buildSeparator(columnsCount);
    this._data.forEach((value) => {
      const valueData = value.toObject();
      rows += rowCreator(valueData);
    });
    return rows;
  }
  buildSeparator(columnsCount) {
    return `<tr>
    <td colspan="${columnsCount}" class="subgroup-description ${this.separatorColor.bg} ${this.separatorColor.border}">
      ${this._title}
    </td>
  </tr>`;
  }
}
export const separatorsColors = {
  red: {bg: "bg-red-100", border: "border-red-800"},
  blue: {bg: "bg-blue-100", border: "border-blue-800"},
  green: {bg: "bg-green-100", border: "border-green-800"},
  yellow: {bg: "bg-yellow-100", border: "border-yellow-800"},
  gray: {bg: "bg-gray-100", border: "border-gray-800"}
};
