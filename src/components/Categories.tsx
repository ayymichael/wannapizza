import React from 'react'

type CategoriesProps = {
  value: number
  onClickCategory: (index: number) => void
}

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
})
