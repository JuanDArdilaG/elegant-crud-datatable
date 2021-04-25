import {ColumnType, DataTable} from "./DataTable.js";
export class GastosGeneralesDataTable extends DataTable {
  constructor(data) {
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
        header: {name: "Monto"},
        body: {
          classes: ["text-right"]
        }
      },
      {
        header: {name: ColumnType.ACTIONS, classes: ["border-transparent"]},
        body: {
          classes: null
        }
      }
    ], data);
  }
}
