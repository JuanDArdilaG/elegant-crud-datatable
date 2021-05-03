import { Styles } from "../Shared/Styles";

export class DataTableColumnHeader {
  constructor(
    readonly name: string,
    readonly styles?: DataTableColumnHeaderStyles
  ) {}
}

export type DataTableColumnHeaderStyles = {
  content?: Styles;
  cell?: Styles;
};
