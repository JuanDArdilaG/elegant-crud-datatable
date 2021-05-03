import { CreateOptions, DataTable } from "./DataTable";
import { DataTableColumnDefinition } from "./DataTableColumn/DataTableColumnDefinition";
import { DataTableSubgroupSeparator } from "./DataTableSubgroupSeparator";
import { GastosGenerales } from "./GastosGenerales";
export class GastosGeneralesDataTable extends DataTable<GastosGenerales> {
  constructor(
    columnDefinitions: DataTableColumnDefinition[],
    data: (GastosGenerales | DataTableSubgroupSeparator<GastosGenerales>)[],
    createOptions: CreateOptions
  ) {
    super(columnDefinitions, data, createOptions);
  }
}
