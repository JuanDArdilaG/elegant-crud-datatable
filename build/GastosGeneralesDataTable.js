import {DataTable} from "./DataTable.js";
import {DataTableColumnType} from "./DataTableColumnDefinition.js";
export class GastosGeneralesDataTable extends DataTable {
  constructor(data, createOptions) {
    super([
      {
        header: {name: "Cuenta"},
        body: {
          classes: ["font-normal"],
          newDataLength: 6
        }
      },
      {
        header: {name: "Descripción"},
        body: {
          classes: ["pl-5", "text-left"],
          newDataLength: 250
        }
      },
      {
        header: {name: "Monto"},
        body: {
          classes: ["text-right"],
          dataParser: (data2) => "$" + data2,
          newDataLength: 15
        }
      },
      {
        header: {
          name: DataTableColumnType.ACTIONS,
          classes: ["border-transparent"]
        },
        body: {
          classes: null
        }
      }
    ], data, createOptions);
  }
}
