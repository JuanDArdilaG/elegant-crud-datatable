import { DataForTable, DataForTableTypes } from "./DataForTable";
import { RandomElementFromArray } from "./utils/RandomElementFromArray";

export class DataTableSubgroupSeparator<DataType extends DataForTable> {
  private separatorColor: SeparatorColor;
  private _createInputIds: string[];

  constructor(
    private _id: string,
    private _title: string,
    private _data: DataType[],
    private _fnCreate: (
      inputsData: (string | number)[],
      subgroupId?: string
    ) => boolean,
    color?: string,
    private _canAdd?: boolean
  ) {
    const colorsNames = Object.keys(separatorsColors);
    if (!color || !colorsNames.includes(color)) {
      color = RandomElementFromArray(colorsNames);
    }
    this.separatorColor = separatorsColors[color];
    this._createInputIds = [];
  }

  public get createInputIds() {
    return this._createInputIds;
  }

  public get id() {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get data(): DataType[] {
    return this._data;
  }

  public getRows(
    columnsCount: number,
    rowCreator: (rowData: Record<string, DataForTableTypes>) => string,
    cancelCreation: () => void,
    newRowCreator?: (id: string) => string
  ) {
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

  private newCreationRow(newRowCreator: (id: string) => string): string {
    if (!newRowCreator) {
      return "";
    }
    return newRowCreator(`${this._id}`);
  }

  private buildSeparator(columnsCount: number): string {
    return `<tr>
    <td colspan="${columnsCount}" class="subgroup-description ${
      this.separatorColor.bg
    } ${this.separatorColor.border}">
      ${this._title}
      ${
        this._canAdd &&
        `<button id="subgroup-${this._id}-btn-create" class="relative float-right mr-4 transition transition-opacity duration-200" ><i class="bi bi-plus-square"></i></button>`
      }
    </td>
  </tr>`;
  }

  public activateCreationRow() {
    const rowElement = $(`#subgroup-${this._id}-create-row`);
    const btnCreateRowElement = $(`#subgroup-${this._id}-btn-create`);
    const btnCancelRowElement = $(
      `#subgroup-${this._id}-create-row-btn-cancel`
    );
    const btnAcceptRowElement = $(
      `#subgroup-${this._id}-create-row-btn-accept`
    );

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
