import { DataTableSubgroupSeparator } from "./DataTableSubgroupSeparator";
import { GastosGenerales } from "./GastosGenerales";
import { GastosGeneralesDataTable } from "./GastosGeneralesDataTable";

const dataCreator = (data, id) => {
  console.log(data);
  console.log(id);
  return true;
};

const data = [
  new DataTableSubgroupSeparator(
    "24",
    "Cuenta 24: Lo que sea que sea",
    [
      new GastosGenerales("24050", "Descripción de la primera cuenta", 3279990),
      new GastosGenerales(
        "24051",
        "Descripción diferente en la número 2",
        3279990
      ),
    ],
    dataCreator,
    null,
    true
  ),
  new DataTableSubgroupSeparator(
    "25",
    "Cuenta 25: Otra cosa",
    [
      new GastosGenerales("24050", "Descripción de la primera cuenta", 3279990),
      new GastosGenerales(
        "24051",
        "Descripción diferente en la número 2",
        3279990
      ),
    ],
    dataCreator,
    null,
    true
  ),
];
const table = new GastosGeneralesDataTable(data, {});
table.toDiv("gastosGeneralesTable");
