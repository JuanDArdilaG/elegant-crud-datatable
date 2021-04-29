import { ColumnType, CreateOptions, DataTable } from "./DataTable";
import { DataTableSubgroupSeparator } from "./DataTableSubgroupSeparator";
import { GastosGenerales } from "./GastosGenerales";

export class GastosGeneralesDataTable extends DataTable<GastosGenerales> {
  constructor(
    data: (GastosGenerales | DataTableSubgroupSeparator<GastosGenerales>)[],
    createOptions: CreateOptions
  ) {
    super(
      [
        {
          header: { name: "Cuenta" },
          body: {
            classes: ["font-normal"],
          },
        },
        {
          header: { name: "Descripción" },
          body: {
            classes: ["pl-5", "text-left"],
          },
        },
        {
          header: { name: "Monto", type: "number" },
          body: {
            classes: ["text-right"],
            dataParser: (data) => "$" + data,
          },
        },
        {
          header: { name: ColumnType.ACTIONS, classes: ["border-transparent"] },
          body: {
            classes: null,
          },
        },
      ],
      data,
      { table: ["bg-green-400"] },
      createOptions
    );
  }
}
