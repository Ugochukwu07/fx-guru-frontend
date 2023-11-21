import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from "framer-motion";

import TabLayout from '#/view/layout/TabLayout';
import {exchangeSchema} from '../../../utility/validation/exchange'

import './trade.scss'

import chart from '../../../assets/icons/mini-chart.svg'
import swap from '../../../assets/icons/ri_swap-fill.svg'
import nodata from '../../../assets/icons/nodata.svg'
import { useEffect, useState } from 'react';
import Price from '../../../components/price/Price';
import { Link } from 'react-router-dom';

export default function Trade(){
    const [errors, setErrors] = useState({});
    const [currency, setCurrency] = useState('');
    
    const options = [
        {
            id: 1,
            name: '300 Sec',
            value: 300
        },
        {
            id: 2,
            name: '600 Sec',
            value: 600
        },
        {
            id: 3,
            name: '900 Sec',
            value: 900
        },
    ]

    const wallets = {
        USDT: [
            {
                id: 1,
                address: '4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'TRC20'
            },
            {
                id: 2,
                address: 'ERC4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'ERC20'
            }
        ],
        BTC: [
            {
                id: 1,
                address: '4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'TRC20'
            },
            {
                id: 2,
                address: 'ERC4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'ERC20'
            }
        ],
        ETH: [
            {
                id: 1,
                address: '4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'TRC20'
            },
            {
                id: 2,
                address: 'ERC4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'ERC20'
            }
        ],
        XRP: [
            {
                id: 1,
                address: '4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'TRC20'
            },
            {
                id: 2,
                address: 'ERC4M7Nx3tdfp2c9YuwWBYaUoPg',
                network: 'ERC20'
            }
        ],
    }
    const currencies = wallets ? Object.keys(wallets) : [];

    useEffect(() => {
        if (currencies.length > 0) {
            setCurrency(currencies[0]);
        }
    }, [currencies]);

    const handleModeChange = event => setCurrency(event.target.value)

    const currencies_list = currencies.map((key) => (
      <option key={key}>{key}</option>
    ));

    return (
        <TabLayout nav={'trade'}>
            <div className='exchange trade'>
                <div className='exchange_title'>
                    <div className='box'>
                        <span className='active'>Options</span>
                        <Link to={'/contracts'}><span> <img src={swap} /> Contracts</span></Link>
                    </div>
                    <div className='exchange_title__quote'>
                        <span>BTC/USDT <img src={chart} /></span>
                    </div>
                </div>
                <div className="flex exchange_body">
                    <div className="w-1/2 exchange_body__execute">
                        <div className='title'>
                            <span className='up active'>Buy</span>
                            <span className='down'>Sell</span>
                        </div>
                        <div className="form">
                            <Formik
                                initialValues={{
                                    time: '300 Sec',
                                    mode: '',
                                    price: '',
                                }}
                                validationSchema={exchangeSchema}
                                onSubmit={console.log('Submitted')}
                            >
                                <Form>
                                    <motion.div 
                                        className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .1 }}
                                    >
                                        <label>Transaction mode</label>
                                        <Field 
                                            as="select" 
                                            name="mode"
                                            onChange={handleModeChange}
                                        >
                                            {currencies_list}
                                        </Field>
                                        <ErrorMessage name="name" component="span" className="error-message text-red-500 font-light" />
                                        {errors.name && (
                                            <span className="error-message text-red-500 font-light">{errors.name[0]}</span>
                                        )}
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
                                        <span className='eye-icon'>{ currency }</span>
                                    </motion.div>
                                    <motion.div 
                                        className={`input_group mb-0 ${errors.name ? 'border border-red-500' : ''}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .1 }}
                                    >
                                        <label>Open time</label>
                                        <Field as="select" name="time">
                                            {
                                                options.map((item, key) => {
                                                    return (<option key={key} value={item.id}>{item.name}</option>)
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="time" component="span" className="error-message text-red-500 font-light" />
                                        {errors.time && (
                                            <span className="error-message text-red-500 font-light">{errors.time[0]}</span>
                                        )}
                                    </motion.div>
                                    <span className='text-xs mb-16'>Profit rate 20.00%</span>
                                    <br /><br />
                                    <div className='info'>
                                        <div className='info_block flex justify-between'>
                                            <span>Available</span>
                                            <span>O.OO {currency}</span>
                                        </div>
                                        <div className='info_block flex justify-between'>
                                            <span>Volume</span>
                                            <span>O {currency}</span>
                                        </div>
                                    </div>
                                    <motion.div className='btn-group'
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .5 }}
                                    >
                                        <button className='btn btn-up bg-green-700 text-white btn-buy' type="submit" >
                                            BUY/BTC
                                        </button>
                                    </motion.div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="w-1/2 exchange_body__price">
                        <div className='title'>
                            <h2 className='up'>0.00 <span>USDT</span></h2>
                        </div>
                        <Price data={{ price: 1678, rate: 10 }} />
                    </div>
                </div>
                <div className='w-full history'>
                    <div className='history_tabs'>
                        <span className='active'>Current Entrust</span>
                        <span>History Entrust</span>
                    </div>
                    <div className='history_body px-0'>
                        <Link to='/active'>
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
                        </Link>
                    </div>
                </div>
            </div>
        </TabLayout>
    )
}