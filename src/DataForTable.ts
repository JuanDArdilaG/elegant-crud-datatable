export abstract class DataForTable {
  abstract toObject(): Record<string, DataForTableTypes>;
}

export type DataForTableTypes = string | number | PriceType;

export type PriceType = number;
