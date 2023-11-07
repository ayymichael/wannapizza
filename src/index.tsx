import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './components/redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}
