import { ColumnType, DataTable } from "./DataTable";
import { DataTableSubgroupSeparator } from "./DataTableSubgroupSeparator";
import { GastosGenerales } from "./GastosGenerales";

export class GastosGeneralesDataTable extends DataTable<GastosGenerales> {
  constructor(data: (GastosGenerales | DataTableSubgroupSeparator)[]) {
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
          header: { name: "Monto" },
          body: {
            classes: ["text-right"],
          },
        },
        {
          header: { name: ColumnType.ACTIONS, classes: ["border-transparent"] },
          body: {
            classes: null,
          },
        },
      ],
      data
    );
  }
}
