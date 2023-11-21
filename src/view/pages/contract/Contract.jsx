import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from "framer-motion";

import TabLayout from '#/view/layout/TabLayout';
import {exchangeSchema} from '#/utility/validation/exchange'
import Price from '#/components/price/Price';

import './contract.scss'

import chart from '#/assets/icons/mini-chart.svg'
import swap from '#/assets/icons/ri_swap-fill.svg'
import nodata from '#/assets/icons/nodata.svg'
import caret_down from '#/assets/icons/caret-down.svg'

export default function Contract(){
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
                        <span className='active'>Contracts</span>
                        <Link to={'/trade'}><span> <img src={swap} /> Options</span></Link>
                    </div>
                    <div className='exchange_title__quote'>
                        <span>BTC/USDT <img src={chart} /></span>
                    </div>
                </div>
                <div className="flex exchange_body">
                    <div className="w-1/2 exchange_body__execute">
                        <div className='title'>
                            <span className='up active'>LONG</span>
                            <span className='down'>SHORT</span>
                        </div>
                        <div className="form">
                            <Formik
                                initialValues={{
                                    name: 'Market', 
                                    time: '300 Sec',
                                    mode: '',
                                    price: 'Market Optimal Price',
                                }}
                                validationSchema={''}
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
                                        <Field type="text" id="name" name="name" />
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
                                        <span className='eye-icon'>{ currency }</span>
                                    </motion.div>
                                    <motion.div 
                                        className={`input_group mb-0 ${errors.name ? 'border border-red-500' : ''}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .1 }}
                                    >
                                        <label>Leverage</label>
                                        <Field as="select" name="time">
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </Field>
                                        <ErrorMessage name="time" component="span" className="error-message text-red-500 font-light" />
                                        {errors.time && (
                                            <span className="error-message text-red-500 font-light">{errors.time[0]}</span>
                                        )}
                                    </motion.div>
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
                                            LONG/BTC
                                        </button>
                                    </motion.div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="w-1/2 exchange_body__price">
                        <div className='title'>
                            <h2 className='up'>16958.3800 <span>USDT</span></h2>
                        </div>
                        <Price data={{ price: 1678, rate: 10 }} />
                    </div>
                </div>
                <div className='w-full history'>
                    <div className='history_tabs'>
                        <span className='active'>Current Entrust</span>
                        <span>Position</span>
                        <span>Closed</span>
                        <span>Revoked</span>
                    </div>
                    <div className='history_body'>
                        <div className='order'>
                            <div className='order_title'>
                                <span className='up'>LONG</span>
                                <span>01-08 15:23:36</span>
                            </div>
                            <div className='order_body grid grid-cols-3'>
                                <div className='information'>
                                    <span className='quote'>BTC/USDT</span>
                                    <span className='price'>16958.3800</span>
                                    <span>Leverage</span>
                                    <span className='price'>1</span>
                                </div>
                                <div className='numbers text-center'>
                                    <span>Amount</span>
                                    <span className='price'>11000.00000</span>
                                    <span>P/L[USDT]</span>
                                    <span className='up price'>21.0000</span>
                                </div>
                                <div className='current text-right'>
                                    <span>Current Price</span>
                                    <span className='up price'>16969.14</span>
                                </div>
                            </div>
                        </div>
                        <div className='order'>
                            <div className='order_title'>
                                <span className='up'>LONG</span>
                                <span>01-08 15:23:36</span>
                            </div>
                            <div className='order_body grid grid-cols-3'>
                                <div className='information'>
                                    <span className='quote'>BTC/USDT</span>
                                    <span className='price'>16958.3800</span>
                                    <span>Leverage</span>
                                    <span className='price'>1</span>
                                </div>
                                <div className='numbers text-center'>
                                    <span>Amount</span>
                                    <span className='price'>11000.00000</span>
                                    <span>P/L[USDT]</span>
                                    <span className='up price'>21.0000</span>
                                </div>
                                <div className='current text-right'>
                                    <span>Current Price</span>
                                    <span className='up price'>16969.14</span>
                                </div>
                            </div>
                        </div>
                        <div className='order'>
                            <div className='order_title'>
                                <span className='up'>LONG</span>
                                <span>01-08 15:23:36</span>
                            </div>
                            <div className='order_body grid grid-cols-3'>
                                <div className='information'>
                                    <span className='quote'>BTC/USDT</span>
                                    <span className='price'>16958.3800</span>
                                    <span>Leverage</span>
                                    <span className='price'>1</span>
                                </div>
                                <div className='numbers text-center'>
                                    <span>Amount</span>
                                    <span className='price'>11000.00000</span>
                                    <span>P/L[USDT]</span>
                                    <span className='up price'>21.0000</span>
                                </div>
                                <div className='current text-right'>
                                    <span>Current Price</span>
                                    <span className='up price'>16969.14</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className='no_data'>
                            <img src={nodata} />
                        </div> */}
                    </div>
                </div>
            </div>
        </TabLayout>
    )
}