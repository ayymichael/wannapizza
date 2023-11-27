import { createAsyncThunk } from "@reduxjs/toolkit"
import { Pizza, SearchParams } from "./types"
import axios from "axios"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { searchValue, categoryId, selectedPage, sortType } = params
    const { data } = await axios.get<Pizza[]>(
      `https://65157415dc3282a6a3ce6df9.mockapi.io/items?${
        searchValue ? `search=${searchValue}` : ''
      }&page=${selectedPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType}`
    )
    return data
  }
)
