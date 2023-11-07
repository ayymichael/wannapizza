import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async(params) => {
        const {searchValue, categoryId, selectedPage, sortType} = params
        const { data } = await axios.get(
            `https://65157415dc3282a6a3ce6df9.mockapi.io/items?${searchValue ? `search=${searchValue}` : ''}&page=${selectedPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ''}&sortBy=${sortType}`)
        return data
    }
)

// export enum Status {
//     LOADING: 'loading',
//     SUCCESS: 'completed',
//     ERROR: 'error',
// }

const initialState = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = []
            state.status = 'loading'
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = []
            state.status = 'error'
        },
    },
})

export const selectPizza = state => state.pizzas

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer