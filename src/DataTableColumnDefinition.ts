import { DataForTableTypes } from "./DataForTable";

export class DataTableColumnDefinition {
  constructor(
    readonly header: DataTableColumnHeader,
    readonly body: DataTableColumnBody
  ) {}
}

export type DataTableColumnHeader = {
  name: string | DataTableColumnType;
  classes?: string[];
};

export type DataTableColumnBody = {
  classes?: string[];
  dataParser?: (columnData: DataForTableTypes) => DataForTableTypes;
  newDataLength?: number;
};

export enum DataTableColumnType {
  ACTIONS,
}
