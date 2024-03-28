type Item = {
    length: number;
    quantity: number;
  };

export interface PartItemType extends Item {
  id: number;
  name: string;
};


export type DemandItem = Item
export type StockItem = Item


export type InputChange = {
  id: number;
  field: keyof PartItemType;
  value: string | number;
};

export type CuttingPattern = {
  stockLength: number;
  cutLengths: number[];
  amountOfDemandItem: StockItem[];
  wasteAmount: number;
};
