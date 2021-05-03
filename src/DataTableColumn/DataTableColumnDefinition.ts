import { DataTableColumnBody } from "./DataTableColumnBody";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export class DataTableColumnDefinition {
  constructor(
    readonly header: DataTableColumnHeader,
    readonly body?: DataTableColumnBody
  ) {}
}
