export enum sortPropertyEnum {
  RAITING = 'raiting',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortType = {
  name: string;
  sortProperty: sortPropertyEnum;
}

export interface FilterSliceState {
  categoryId: number;
  selectedPage: number;
  searchValue: string;
  sort: SortType;
}