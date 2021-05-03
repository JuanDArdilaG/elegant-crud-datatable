export class DataTableSpecialColumn {
  constructor(
    readonly type: DataTableColumnType,
    readonly classes?: string[]
  ) {}
}

export enum DataTableColumnType {
  ACTIONS,
}
