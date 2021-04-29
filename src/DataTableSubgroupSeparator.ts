import { DataForTable, DataForTableTypes } from "./DataForTable";
import { RandomElementFromArray } from "./utils/RandomElementFromArray";

export class DataTableSubgroupSeparator<DataType extends DataForTable> {
  private separatorColor: SeparatorColor;
  constructor(
    private _title: string,
    private _data: DataType[],
    color?: string
  ) {
    const colorsNames = Object.keys(separatorsColors);
    if (!color || !colorsNames.includes(color)) {
      color = RandomElementFromArray(colorsNames);
    }
    this.separatorColor = separatorsColors[color];
  }

  public get title(): string {
    return this._title;
  }

  public get data(): DataType[] {
    return this._data;
  }

  public getRows(
    columnsCount: number,
    rowCreator: (rowData: Record<string, DataForTableTypes>) => string
  ) {
    let rows = this.buildSeparator(columnsCount);
    this._data.forEach((value) => {
      const valueData = value.toObject();
      rows += rowCreator(valueData);
    });
    return rows;
  }

  private buildSeparator(columnsCount: number): string {
    return `<tr>
    <td colspan="${columnsCount}" class="subgroup-description ${this.separatorColor.bg} ${this.separatorColor.border}">
      ${this._title}
    </td>
  </tr>`;
  }
}

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
