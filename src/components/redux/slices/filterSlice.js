import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    selectedPage: 1,
    searchValue: "",
    sort: {
        name: 'популярности',
        sortProperty: 'raiting',
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSortChoise(state, action) {
            state.sort = action.payload
        },
        setPageNum (state, action) {
            state.selectedPage = action.payload
        },
        setFilters (state, action) {
            state.categoryId = Number(action.payload.categoryId)
            state.selectedPage = Number(action.payload.selectedPage)
            state.sort = action.payload.sort
        }
    }
})

export const selectFilter = state => state.filter

export const selectSort = (state) => state.filter.sort

export const { setCategoryId, setSortChoise, setPageNum, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer