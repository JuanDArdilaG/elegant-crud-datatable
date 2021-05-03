import { DataForTableTypes } from "../DataForTable";
import { Styles } from "../Shared/Styles";

export class DataTableColumnBody {
  constructor(
    private _dataParser: DataTableDataParser,
    readonly styles?: DataTableColumnBodyStyles,
    readonly newDataLength?: number
  ) {}

  public set dataParser(fnDataParser: DataTableDataParser) {
    this._dataParser = fnDataParser;
  }

  public get dataParser(): DataTableDataParser {
    return this._dataParser;
  }
}

export type DataTableColumnBodyStyles = {
  cell?: Styles;
  content?: Styles;
};

export type DataTableDataParser = (
  columnData: DataForTableTypes
) => DataForTableTypes | undefined;
