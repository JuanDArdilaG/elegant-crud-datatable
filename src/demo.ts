import { DataTableColumnBody } from "./DataTableColumn/DataTableColumnBody";
import { DataTableColumnDefinition } from "./DataTableColumn/DataTableColumnDefinition";
import { DataTableColumnHeader } from "./DataTableColumn/DataTableColumnHeader";
import { GastosGenerales } from "./GastosGenerales";
import { GastosGeneralesDataTable } from "./GastosGeneralesDataTable";

const columnDefinitions = [
  new DataTableColumnDefinition(
    new DataTableColumnHeader("Cuenta", { content: ["text-red-100"] }),
    new DataTableColumnBody(undefined, { content: ["font-normal"] }, 6)
  ),

  new DataTableColumnDefinition(
    new DataTableColumnHeader("Descripción"),
    new DataTableColumnBody(
      undefined,
      { cell: ["text-left", "pl-6", "mt-2"] },
      250
    )
  ),
  new DataTableColumnDefinition(
    new DataTableColumnHeader("Monto"),
    new DataTableColumnBody((data) => "$" + data, { cell: ["text-right"] }, 250)
  ),
];

const data = [
  new GastosGenerales("24050", "Descripción de la primera cuenta", 3279990),
  new GastosGenerales("24051", "Descripción diferente en la número 2", 3279990),
  new GastosGenerales("24050", "Descripción de la primera cuenta", 3279990),
  new GastosGenerales("24051", "Descripción diferente en la número 2", 3279990),
];
const table = new GastosGeneralesDataTable(columnDefinitions, data, {});
table.toDiv("gastosGeneralesTable");
