import {ColumnType, DataTable} from "./DataTable.js";
export class GastosGeneralesDataTable extends DataTable {
<<<<<<< HEAD
  constructor(data, createOptions) {
=======
  constructor(data) {
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
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
<<<<<<< HEAD
        header: {name: "Monto", type: "number"},
        body: {
          classes: ["text-right"],
          dataParser: (data2) => "$" + data2
=======
        header: {name: "Monto"},
        body: {
          classes: ["text-right"]
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
        }
      },
      {
        header: {name: ColumnType.ACTIONS, classes: ["border-transparent"]},
        body: {
          classes: null
        }
      }
<<<<<<< HEAD
    ], data, {table: ["bg-green-400"]}, createOptions);
=======
    ], data);
>>>>>>> 5eb1f369519f8a41762e2f4cd0f18a6669b3e38b
  }
}
