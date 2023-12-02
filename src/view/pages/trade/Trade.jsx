import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TabLayout from '#/view/layout/TabLayout';
import LoadingSpinner from "../../layout/Loading";
import Price from '../../../components/price/Price';

import './trade.scss'
import { getOptionsBalance, getTradeHistory, startTrade } from '../../../service/UserService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import chart from '../../../assets/icons/mini-chart.svg'
import swap from '../../../assets/icons/ri_swap-fill.svg'
import nodata from '../../../assets/icons/nodata.svg'

export default function Trade(){
    const state = useSelector(state => state)
    const {token} = state.login
    const prices = [...state.prices.prices]

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [currency, setCurrency] = useState([]);
    // const [rate, setRate] = useState([]);
    const [market, setMarket] = useState({
        price: prices.find(item => item.symbol === 'BTC').price, 
        rate: prices.find(item => item.symbol === 'BTC').change
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        balance: 0,
        currencies: [],
        plans: [],
    });
    const [tradeMode, setTradeMode] = useState(true);
    const [historyMode, setHistoryMode] = useState(true);
    const [percent, setPercent] = useState(0);
    const [amount, setAmount] = useState([0,0]);
    const [form, setForm] = useState({
        action: true,
        amount: 0,
        time: 0,
        rate: 0
    })
    const [tradeHistory, setTradeHistory] = useState({
        completed: [],
        pending: []
    })

    useEffect(() => {
        document.title = 'Trade | BitPay'
        getOptionsBalance(token).then(data => {
            setData(prev => {
                return {
                    ...prev, 
                    balance: data.balance,
                    currencies: data.currencies,
                    plans: data.plans
                }
            })
            return data
        }).then(data => {
            const {symbol} = data.currencies[0]
            setCurrency(symbol)
            const { rate } = data.plans[0]
            setPercent(rate)

            return {currency}
        })

        getTradeHistory(token).then(data => {
            setTradeHistory(data)
        });

        const coin = state.prices.prices.find(item => item.symbol === 'BTC')
        if(coin){
            setMarket({price: coin.price,  rate: coin.change })
        }
    }, [])
            

    const handleModeChange = (e) => {
        const {symbol, id} = data.currencies.find(item => item.id == e.target.value)
        setCurrency(symbol)
        setForm((prev) => {
            return {
                ...prev,
                mode: id
            }
        })
    }

    const handleRateChange = (e) => {
        const id = Number(e.target.value);
        const { rate, max, min } = data.plans.find(item => item.id === id)
        setPercent(rate)
        setAmount([max, min])
        // setRate(e.target.value)
        setForm((prev) => {
            return {
                ...prev,
                rate: id
            }
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        if(form.amount < amount[1] || form.amount > amount[0]){
            toast.error('Amount must be between ' + amount[1] + ' and ' + amount[0]);
            setErrors({price: ['Amount must be between ' + amount[1] + ' and ' + amount[0]]});
            setLoading(false)
            return;
        }
        startTrade(token, {...form, price: market.price}).then(response => {
            setLoading(false)
            if(response.success){
                toast.success(response.message);
                setErrors({});
            }else{
                toast.error(response.message);
                (response.status == 401) && setErrors(response.errors);
            }
            return response
        }).then(response => {
            if(response.success){
                setTimeout(() => {
                    navigate('/active', {
                        state: {
                            direction: form.action,
                            amount: form.amount,
                            time: form.time,
                            currency: currency,
                            trade: response.data,
                            market: market
                        }
                    });
                }, 2500);
            }
        }).catch(err => {
            setLoading(false)
            toast.error(err?.response?.data.message)
        })
    }

    const intervalId = setInterval((time) => (time > 0 ? time - 1 : 0), 1000);

    return (
        <TabLayout nav={'trade'}>
        <ToastContainer />
            <div className='exchange trade'>
                <div className='exchange_title'>
                    <div className='box'>
                        <span className='active'>Contracts</span>
                        <Link to={'/contracts'}><span> <img src={swap} /> Options</span></Link>
                    </div>
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
                                {
                                    loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <>
                                            <motion.div 
                                                className={`input_group ${errors.mode ? 'border border-red-500' : ''} text-black`}
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
                                                {errors.mode && (
                                                    <span className="error-message text-red-500 font-light">{errors.mode[0]}</span>
                                                )}
                                            </motion.div>

                                            <motion.div 
                                                className={`input_group ${errors.amount ? 'border border-red-500' : ''}`}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: .1 }}
                                            >
                                                <label>Amount</label>
                                                <input
                                                    type="number" 
                                                    id="price" 
                                                    step={0.000001}
                                                    name="price" 
                                                    placeholder="0.001"
                                                    min={amount[1]}
                                                    max={amount[0]}
                                                    required
                                                    onChange={(e) => {
                                                        setForm(prev => {
                                                            return {
                                                                ...prev,
                                                                amount: e.target.valueAsNumber
                                                            }
                                                        })
                                                    }}
                                                />
                                                {errors.amount && (
                                                    <span className="error-message text-red-500 font-light">{errors.amount[0]}</span>
                                                )}
                                                <span className='eye-icon'>{ currency }</span>
                                            </motion.div>
                                            <motion.div 
                                                className={`input_group mb-0 ${errors.time ? 'border border-red-500' : ''}`}
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: .1 }}
                                            >
                                                <label>Open time</label>
                                                <select
                                                    name="time"
                                                    onChange={handleRateChange}
                                                    required
                                                >
                                                    <option></option>
                                                    {
                                                        data.plans.map((value, index) => (
                                                            <option value={value.id} key={index}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.time && (
                                                    <span className="error-message text-red-500 font-light">{errors.time[0]}</span>
                                                )}
                                            </motion.div>
                                            <span className='text-xs mb-16'>Profit rate {percent}%</span>
                                            <br /><br />
                                            <div className='info'>
                                                <div className='info_block flex justify-between'>
                                                    <span>Available</span>
                                                    <span>{data.balance} {currency}</span>
                                                </div>
                                                <div className='info_block flex justify-between'>
                                                    <span>Volume</span>
                                                    <span>0 {currency}</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                <motion.div className='btn-group'
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: .5 }}
                                >
                                    <button type='button' className={`btn ${tradeMode ? 'btn-up' : 'btn-down'} text-white btn-buy`} onClick={handleSubmit} >
                                        {tradeMode ? `BTC UP` : `DOWN BTC`}
                                    </button>
                                </motion.div>
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
                        <span onClick={() => setHistoryMode(true)} className={historyMode && 'active'}>Current Entrust</span>
                        <span onClick={() => setHistoryMode(false)} className={`${!historyMode && 'active'}`}>History Entrust</span>
                    </div>
                    <div className='history_body px-0'>
                    {
                        (tradeHistory.completed.length < 1 && tradeHistory.pending.length < 1) && (<div className='no_data text-center'>
                            <img className="mx-auto" src={nodata} />
                        </div>)
                    }
                        <div>
                            {
                                !historyMode && tradeHistory.completed.map((item, index) => {
                                    return (
                                        <div onClick={
                                            (item) => {
                                                const data = {
                                                        direction: item.direction,
                                                        amount: item.amount,
                                                        time: item.time_remaining,
                                                        currency: currency,
                                                        trade: item
                                                    }
                                                navigate('/active', {
                                                    state: {data}
                                                })
                                            }
                                        } key={index} className='order my-8'>
                                            <div className='order_title'>
                                                <span className='up'>{ item.direction ? 'LONG' : 'SHORT'}</span>
                                                <span>{item.created_at}</span>
                                            </div>
                                            <div className='order_body grid grid-cols-3'>
                                                <div className='information'>
                                                    <span className='quote'>{ item.crypto.symbol }/USDT</span>
                                                    <span className='price'>{ item.price }</span>
                                                    <span>C2c. timer</span>
                                                    <span className='price'>{ item.plan_id.name }</span>
                                                </div>
                                                <div className='numbers text-center'>
                                                    <span>Amount</span>
                                                    <span className='price'>{ item.amount}</span>
                                                    <span>P/L[USDT]</span>
                                                    <span className='up price'>0.0000</span>
                                                </div>
                                                <div className='current text-right'>
                                                    <span>Current Price</span>
                                                    <span className='up price'>16969.14</span>
                                                    <span>Count down</span>
                                                    <span className='price'>{ clearInterval(() => intervalId(item.time_remaining)) }</span>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                            {
                                historyMode && tradeHistory.pending.map((item, index) => {
                                    return (
                                        <div onClick={
                                                (item) => {
                                                    const data = {
                                                        direction: item.direction,
                                                        amount: item.amount,
                                                        time: item.time_remaining,
                                                        currency: currency,
                                                        trade: item
                                                    }
                                                navigate('/active', {
                                                    state: {data}
                                                })
                                                }
                                            } key={index} className='order my-8'>
                                            <div className='order_title'>
                                                <span className='up'>{ item.direction ? 'LONG' : 'SHORT'}</span>
                                                <span>{item.created_at}</span>
                                            </div>
                                            <div className='order_body grid grid-cols-3'>
                                                <div className='information'>
                                                    <span className='quote'>{ item.crypto.symbol }/USDT</span>
                                                    <span className='price'>{ item.price }</span>
                                                    <span>C2c. timer</span>
                                                    <span className='price'>{ item.plan_id.name }</span>
                                                </div>
                                                <div className='numbers text-center'>
                                                    <span>Amount</span>
                                                    <span className='price'>{ item.amount}</span>
                                                    <span>P/L[USDT]</span>
                                                    <span className='up price'>0.0000</span>
                                                </div>
                                                <div className='current text-right'>
                                                    <span>Current Price</span>
                                                    <span className='up price'>16969.14</span>
                                                    <span>Count down</span>
                                                    <span className='price'>{ clearInterval(() => intervalId(item.time_remaining)) }</span>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <Link to='/active'>
                            <div className='order'>
                                <div className='order_title'>
                                    <span className='up'>LONG</span>
                                    <span>01-08 15:23:36</span>
                                </div>
                                <div className='order_body grid grid-cols-3'>
                                    <div className='information'>
                                        <span className='quote'>BTC/USDT</span>
                                        <span className='price'>16958.3800</span>
                                        <span>C2c. timer</span>
                                        <span className='price'>300 Sec</span>
                                    </div>
                                    <div className='numbers text-center'>
                                        <span>Amount</span>
                                        <span className='price'>11000.00000</span>
                                        <span>P/L[USDT]</span>
                                        <span className='up price'>0.0000</span>
                                    </div>
                                    <div className='current text-right'>
                                        <span>Current Price</span>
                                        <span className='up price'>16969.14</span>
                                        <span>Count down</span>
                                        <span className='price'>287.0</span>
                                    </div>
                                </div>
                            </div>
                        </Link> */}
                    </div>
                </div>
            </div>
        </TabLayout>
    )
}