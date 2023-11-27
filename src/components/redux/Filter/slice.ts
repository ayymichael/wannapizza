import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { FilterSliceState, SortType, sortPropertyEnum } from "./types"

const initialState: FilterSliceState = {
  categoryId: 0,
  selectedPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: sortPropertyEnum.RAITING ,
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortChoise(state, action: PayloadAction<SortType>) {
      state.sort = action.payload
    },
    setPageNum(state, action: PayloadAction<number>) {
      state.selectedPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId)
        state.selectedPage = Number(action.payload.selectedPage)
        state.sort = action.payload.sort
      } else {
        state.categoryId = 0
        state.selectedPage = 1
        state.sort = {
          name: 'популярности',
          sortProperty: sortPropertyEnum.RAITING ,
        }
      }
    },
  },
})

export const {
  setCategoryId,
  setSortChoise,
  setPageNum,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer