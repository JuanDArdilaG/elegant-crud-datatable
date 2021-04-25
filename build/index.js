import {DataTableSubgroupSeparator} from "./DataTableSubgroupSeparator.js";
import {GastosGenerales} from "./GastosGenerales.js";
import {GastosGeneralesDataTable} from "./GastosGeneralesDataTable.js";
const data = [
  new DataTableSubgroupSeparator("Cuenta 24: Lo que sea que sea"),
  new GastosGenerales("24050", "Descripción de la primera cuenta", 3279990),
  new GastosGenerales("24051", "Descripción diferente en la número 2", 3279990)
];
const table = new GastosGeneralesDataTable(data);
table.toDiv("gastosGeneralesTable");
