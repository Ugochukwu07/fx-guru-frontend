import { Route, Routes } from 'react-router-dom'
import Home from './view/pages/home/Home'

import './App.scss'
import Assets from './view/pages/assets/Assets'
import Deposit from './view/pages/deposit/Deposit'
import Withdraw from './view/pages/withdraw/Withdraw'
import Register from './view/auth/register/Register'
import Login from './view/auth/login/Login'
import Forget from './view/auth/forget/Forget'
import Transfer from './view/pages/transfer/Transfer'
import Protected from './routes/ProtectedRoute'
import Exchange from './view/pages/exchange/Exchange'
import Trade from './view/pages/trade/Trade'
import Contract from './view/pages/contract/Contract'
import Active from './view/pages/active/Active'
import Contact from './view/pages/contact/Contact'
import Service from './view/pages/service/Service'

function App() {

  return (
    <Routes>
      <Route path="/" exact element={ <Home /> } />
      <Route path="/assets" exact element={ <Protected> <Assets /> </Protected> } />
      <Route path="/deposit" exact element={ <Protected> <Deposit /> </Protected> } />
      <Route path="/withdraw" exact element={ <Protected> <Withdraw /> </Protected> } />
      <Route path="/transfer" exact element={ <Protected> <Transfer /> </Protected> } />
      <Route path="/exchange" exact element={ <Protected> <Exchange /> </Protected> } />
      <Route path="/trade" exact element={ <Protected> <Trade /> </Protected> } />
      <Route path="/contracts" exact element={ <Protected> <Contract /> </Protected> } />
      <Route path="/active" exact element={ <Protected> <Active /> </Protected> } />


      <Route path="/contact" exact element={ <Contact /> } />
      <Route path="/services" exact element={ <Service /> } />

      <Route path="/register" exact element={ <Register /> } />
      <Route path="/login" exact element={ <Login /> } />
      <Route path="/forget" exact element={ <Forget /> } />
    </Routes>
  )
}

export default App
