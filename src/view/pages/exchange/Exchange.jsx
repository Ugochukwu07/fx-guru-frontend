import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from "framer-motion";

import TabLayout from '#/view/layout/TabLayout';
import {exchangeSchema} from '../../../utility/validation/exchange'

import './exchange.scss'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import chart from '../../../assets/icons/mini-chart.svg'
import caret_down from '../../../assets/icons/caret-down.svg'
import nodata from '../../../assets/icons/nodata.svg'
import Price from '../../../components/price/Price';
import { getOptionsBalance } from '../../../service/UserService';
import { useSelector } from 'react-redux';

export default function Exchange(){
    const state = useSelector(state => state)
    const {token} = state.login
    const prices = [...state.prices.prices]

    const [errors, setErrors] = useState({});
    const [tradeMode, setTradeMode] = useState(true);
    const [data, setData] = useState({
        balance: 0,
        currencies: [],
        plans: [],
    });
    const [currency, setCurrency] = useState([]);
    // const [rate, setRate] = useState([]);
    const [market, setMarket] = useState({
        price: prices.find(item => item.symbol === 'BTC').price, 
        rate: prices.find(item => item.symbol === 'BTC').change
    });
    const [percent, setPercent] = useState(0);
    const [available, setAvailable] = useState(0)
    const [form, setForm] = useState({
        action: true,
        amount: 0,
        time: 0,
        rate: 0
    })

    useEffect(() => {
        document.title = 'Exchange | BitPay'
        getOptionsBalance(token).then(data => {
            setData(prev => {
                return {
                    ...prev, 
                    balance: data.balance,
                    currencies: data.currencies,
                    plans: data.plans
                }
            })
            console.log(data);
            return data
        }).then(data => {
            const {symbol} = data.currencies[0]
            setCurrency(symbol)
            const { rate } = data.plans[0]
            setPercent(rate)

            return {currency}
        })

        const coin = state.prices.prices.find(item => item.symbol === 'BTC')
        if(coin){
            setMarket({price: coin.price,  rate: coin.change })
        }
    }, [])

    const handleModeChange = (e) => {
        const {symbol, balance} = data.currencies.find(item => item.id == e.target.value)
        setCurrency(symbol)
        setAvailable(balance)
    }

    const handleSubmit = () => {
        toast.info('Exchange is currently undergoing upgrades, Please try again later. Thank You.')
    }

    return (
        <TabLayout nav={'exchange'}>
        <ToastContainer />
            <div className='exchange'>
                <div className='exchange_title'>
                    <h1>Exchange</h1>
                    <div className='exchange_title__quote'>
                        <span>BTC/USDT <img src={chart} /></span>
                    </div>
                </div>
                <div className="flex exchange_body">
                    <div className="w-1/2 exchange_body__execute">
                    <div className='title'>
                            <span onClick={() => {
                                setTradeMode(true)
                                setForm(prev => {
                                    return {
                                        ...prev,
                                        action: tradeMode
                                    }
                                })
                            }} className={`up ${tradeMode && 'active'}`}>UP</span>
                            <span onClick={() => {
                                setTradeMode(false)
                                setForm(prev => {
                                    return {
                                        ...prev,
                                        action: tradeMode
                                    }
                                })
                            }} className={`down ${!tradeMode && 'active'}`}>DOWN</span>
                        </div>
                        <div className="form">
                            <Formik
                                initialValues={{
                                name: '',
                                email: '',
                                username: '',
                                password: '',
                                password_confirmation: '',
                                }}
                                validationSchema={exchangeSchema}
                            >
                                <Form>
                                    <motion.div 
                                        className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .1 }}
                                    >
                                        <label>Transaction mode</label>
                                        <select
                                            name="mode"
                                            onChange={handleModeChange}
                                            required
                                            // value={currency}
                                        >
                                            <option></option>
                                            {
                                                data.currencies.map((value, index) => (
                                                    <option value={value.id} key={index}>
                                                        {value.symbol}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <ErrorMessage name="name" component="span" className="error-message text-red-500 font-light" />
                                        {errors.name && (
                                            <span className="error-message text-red-500 font-light">{errors.name[0]}</span>
                                        )}
                                        <span className='eye-icon'><img src={caret_down} /></span>
                                    </motion.div>
                                    <motion.div 
                                        className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .1 }}
                                    >
                                        <label>Price</label>
                                        <Field type="text" id="price" name="price" />
                                        <ErrorMessage name="price" component="span" className="error-message text-red-500 font-light" />
                                        {errors.price && (
                                            <span className="error-message text-red-500 font-light">{errors.price[0]}</span>
                                        )}
                                        <span className='eye-icon'>USDT</span>
                                    </motion.div>
                                    <motion.div 
                                        className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .1 }}
                                    >
                                        <label>Number</label>
                                        <Field type="number" id="number" name="number" />
                                        <ErrorMessage name="number" component="span" className="error-message text-red-500 font-light" />
                                        {errors.number && (
                                            <span className="error-message text-red-500 font-light">{errors.number[0]}</span>
                                        )}
                                        <span className='eye-icon'>{currency}</span>
                                    </motion.div>
                                    <div className='info'>
                                        <div className='info_block flex justify-between'>
                                            <span>Available</span>
                                            <span>{available} {currency}</span>
                                        </div>
                                        <div className='info_block flex justify-between'>
                                            <span>Volume</span>
                                            <span>{((form.amount/available)*100).toFixed(3)}% {currency}</span>
                                        </div>
                                    </div>
                                    <motion.div className='btn-group'
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .5 }}
                                    >
                                    <button type='button' className={`btn ${tradeMode ? 'btn-up' : 'btn-down'} text-white btn-buy`} onClick={handleSubmit} >
                                        {tradeMode ? `BTC UP` : `DOWN BTC`}
                                    </button>
                                    </motion.div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="w-1/2 exchange_body__price">
                        <div className='title'>
                            <h2 className='up'>{data.balance} <span>USDT</span></h2>
                        </div>
                        <Price data={{ price: market.price, rate: market.rate }} />
                    </div>
                </div>
                <div className='w-full history'>
                    <div className='history_tabs'>
                        <span className='active'>Current Entrust</span>
                        <span>History Entrust</span>
                    </div>
                    <div className='history_body flex justify-center'>
                        <div className='no_data'>
                            <img src={nodata} />
                        </div>
                    </div>
                </div>
            </div>
        </TabLayout>
    )
}