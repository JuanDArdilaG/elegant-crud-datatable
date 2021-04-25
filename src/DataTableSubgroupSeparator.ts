import { DataForTable } from "./DataForTable";
import { RandomElementFromArray } from "./utils/RandomElementFromArray";

export class DataTableSubgroupSeparator extends DataForTable {
  private separatorColor: SeparatorColor;
  constructor(private title: string, color?: string) {
    super();
    const colorsNames = Object.keys(separatorsColors);
    if (!color || !colorsNames.includes(color)) {
      color = RandomElementFromArray(colorsNames);
    }
    this.separatorColor = separatorsColors[color];
  }
  toObject(): DataTableSubgroupSeparatorType {
    return {
      title: this.title,
      type: "separator",
      bg: this.separatorColor.bg,
      border: this.separatorColor.border,
    };
  }
}

export type DataTableSubgroupSeparatorType = {
  title: string;
  type: "separator";
  bg: string;
  border: string;
};

export const separatorsColors: Record<string, SeparatorColor> = {
  red: { bg: "bg-red-100", border: "border-red-800" },
  blue: { bg: "bg-blue-100", border: "border-blue-800" },
  green: { bg: "bg-green-100", border: "border-green-800" },
  yellow: { bg: "bg-yellow-100", border: "border-yellow-800" },
  gray: { bg: "bg-gray-100", border: "border-gray-800" },
};

export type SeparatorColor = {
  bg: string;
  border: string;
};
