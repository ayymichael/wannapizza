import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setCategoryId,
  setFilters,
  setPageNum,
} from '../components/redux/Filter/slice'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { choises } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../Pagination'
import { useAppDispatch } from '../components/redux/store'
import { selectFilter } from '../components/redux/Filter/selectors'
import { selectPizza } from '../components/redux/Pizza/selectors'
import { fetchPizzas } from '../components/redux/Pizza/asyncActions'
import { SearchParams } from '../components/redux/Pizza/types'

const Home: React.FC = () => {
  const { categoryId, selectedPage, sort, searchValue } =
    useSelector(selectFilter)
  const { items, status } = useSelector(selectPizza)
  const sortType = sort.sortProperty
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const navigate = useNavigate()

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (num: number) => {
    dispatch(setPageNum(num))
  }

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        searchValue,
        categoryId,
        selectedPage: String(selectedPage),
        sortType,
      })
    )
  }

  // Парсинг параметров при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchParams
      const sort = choises.find((obj) => obj.sortProperty === params.sortType)
      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryId: params.categoryId,
          selectedPage: Number(params.selectedPage),
          sort: sort || choises[0],
        })
      )
      isSearch.current = true
    }
  }, [])
  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
    isSearch.current = false
  }, [categoryId, sortType, selectedPage, searchValue])

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        selectedPage,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, selectedPage])

  const skeleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />)
  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue)) {
        return true
      }
      return false
    })
    .map((obj: any) => <PizzaBlock {...obj} key={obj.id} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading' ? skeleton : pizzas}
      </div>
      <Pagination onChangePage={onChangePage} />
    </div>
  )
}

export default Home
