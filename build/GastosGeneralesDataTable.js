import {ColumnType, DataTable} from "./DataTable.js";
export class GastosGeneralesDataTable extends DataTable {
  constructor(data, createOptions) {
    super([
      {
        header: {name: "Cuenta"},
        body: {
          classes: ["font-normal"]
        }
      },
      {
        header: {name: "Descripción"},
        body: {
          classes: ["pl-5", "text-left"]
        }
      },
      {
        header: {name: "Monto", type: "number"},
        body: {
          classes: ["text-right"],
          dataParser: (data2) => "$" + data2
        }
      },
      {
        header: {name: ColumnType.ACTIONS, classes: ["border-transparent"]},
        body: {
          classes: null
        }
      }
    ], data, createOptions);
  }
}
