import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import App from './App.jsx'
import store from './store/store.js';

import "./assets/fonts/fonts.scss"
import "./index.css"

//set favicon
import favicon from './assets/img/favicon.ico';

const link = document.querySelector("link[rel~='icon']");
if (!link) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = favicon;
  document.head.appendChild(link);
}else{
  link.href = favicon;
}

//dont allow web clawers to index this page
const meta = document.createElement('meta');
meta.name = "robots";
meta.content = "noindex";
document.head.appendChild(meta);

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
