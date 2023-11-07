import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectFilter, selectSearchValue, setCategoryId, setFilters, setPageNum } from '../components/redux/slices/filterSlice'
import { fetchPizzas, selectPizza } from '../components/redux/slices/pizzasSlice'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { choises } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../Pagination'

function Home() {
    const { categoryId, selectedPage, sort, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizza)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const navigate = useNavigate()

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setPageNum(num))
    }

    const getPizzas = async () => {
        dispatch(fetchPizzas({ searchValue, categoryId, selectedPage, sortType }))
    }

    
    // Парсинг параметров при первом рендере
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = choises.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, []);
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
    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue)) {
            return true
        }
        return false
    }).map((obj) => (<PizzaBlock {...obj} key={obj.id} />))

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
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