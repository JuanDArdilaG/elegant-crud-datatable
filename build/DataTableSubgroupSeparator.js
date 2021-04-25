import {DataForTable} from "./DataForTable.js";
import {RandomElementFromArray} from "./utils/RandomElementFromArray.js";
export class DataTableSubgroupSeparator extends DataForTable {
  constructor(title, color) {
    super();
    this.title = title;
    const colorsNames = Object.keys(separatorsColors);
    if (!color || !colorsNames.includes(color)) {
      color = RandomElementFromArray(colorsNames);
    }
    this.separatorColor = separatorsColors[color];
  }
  toObject() {
    return {
      title: this.title,
      type: "separator",
      bg: this.separatorColor.bg,
      border: this.separatorColor.border
    };
  }
}
export const separatorsColors = {
  red: {bg: "bg-red-100", border: "border-red-800"},
  blue: {bg: "bg-blue-100", border: "border-blue-800"},
  green: {bg: "bg-green-100", border: "border-green-800"},
  yellow: {bg: "bg-yellow-100", border: "border-yellow-800"},
  gray: {bg: "bg-gray-100", border: "border-gray-800"}
};
