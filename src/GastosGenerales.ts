import { DataForTable } from "./DataForTable.js";

export class GastosGenerales extends DataForTable {
  constructor(
    readonly cuenta: string,
    readonly descripcion: string,
    readonly monto: number
  ) {
    super();
  }

  toObject(): GastosGeneralesType {
    return {
      Cuenta: this.cuenta,
      Descripción: this.descripcion,
      Monto: this.monto,
    };
  }
}

export type GastosGeneralesType = {
  Cuenta: string;
  Descripción: string;
  Monto: number;
};
