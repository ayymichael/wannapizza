import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItemById } from '../redux/Cart/selectors'
import { CartItem } from '../redux/Cart/types'
import { addItem } from '../redux/Cart/slice'

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const typeNames = ['Тонкое', 'Традиционное']
  const sizeNames = ['26 см', '30 см', '40 см']
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)
  const dispatch = useDispatch()
  const selectedSize =
    sizes.length === 3 ? sizes[activeSize] : sizes[activeSize]
  const activeTypeName =
    types.length === 1 ? typeNames[types[0]] : typeNames[activeType]

  const cartItem = useSelector(selectCartItemById(id))

  const count = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: activeTypeName,
      size: selectedSize,
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => setActiveType(index)}
                key={index}
                className={activeType === index ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
            {/* <li className="active">тонкое</li>
                    <li>традиционное</li> */}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                key={index}
                className={activeSize === index ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          {/*>onClick={() => { setCount(count + 1) }}*/}
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}
