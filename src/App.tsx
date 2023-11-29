import loadable from '@loadable/component'
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'

import { Header } from './components'
import Home from './pages/Home'

const Cart = loadable(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'))
const FullPizza = loadable(() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza'))
const NotFound = loadable(() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'))

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
