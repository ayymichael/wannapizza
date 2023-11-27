import React from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

type PizzaType = {
    title: string, 
    price: number, 
    imageUrl: string, 
};

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<PizzaType>()
    const { id } = useParams()
    const navigate = useNavigate()


    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://65157415dc3282a6a3ce6df9.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при загрузке пиццы')
                navigate('/')
            }
        }
    })

    if (!pizza) {
        return <>Загрузка...</>
    }


    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt='pizza'/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} Руб.</h4>
        </div>
    )
}

export default FullPizza;
