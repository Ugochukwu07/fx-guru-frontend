import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import App from './App.jsx'
import store from './store/store.js';

import "./assets/fonts/fonts.scss"
import "./index.css"

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
