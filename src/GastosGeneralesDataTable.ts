import { CreateOptions, DataTable } from "./DataTable";
import { DataTableColumnType } from "./DataTableColumnDefinition";
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
            newDataLength: 6,
          },
        },
        {
          header: { name: "Descripción" },
          body: {
            classes: ["pl-5", "text-left"],
            newDataLength: 250,
          },
        },
        {
          header: { name: "Monto" },
          body: {
            classes: ["text-right"],
            dataParser: (data) => "$" + data,
            newDataLength: 15,
          },
        },
        {
          header: {
            name: DataTableColumnType.ACTIONS,
            classes: ["border-transparent"],
          },
          body: {
            classes: null,
          },
        },
      ],
      data,
      createOptions
    );
  }
}
