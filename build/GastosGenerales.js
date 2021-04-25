import {DataForTable} from "./DataForTable.js";
export class GastosGenerales extends DataForTable {
  constructor(cuenta, descripcion, monto) {
    super();
    this.cuenta = cuenta;
    this.descripcion = descripcion;
    this.monto = monto;
  }
  toObject() {
    return {
      Cuenta: this.cuenta,
      Descripción: this.descripcion,
      Monto: this.monto
    };
  }
}
