export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type SearchParams = {
  searchValue: string
  categoryId: number
  selectedPage: string
  sortType: string
}

export type Pizza = {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  rating: number
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
