import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from "framer-motion";

import TabLayout from '#/view/layout/TabLayout';
import {exchangeSchema} from '../../../utility/validation/exchange'

import './exchange.scss'

import chart from '../../../assets/icons/mini-chart.svg'
import caret_down from '../../../assets/icons/caret-down.svg'
import nodata from '../../../assets/icons/nodata.svg'
import { useState } from 'react';
import Price from '../../../components/price/Price';

export default function Exchange(){
    const [errors, setErrors] = useState({});

    return (
        <TabLayout nav={'exchange'}>
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
                            <span className='up active'>Buy</span>
                            <span className='down'>Sell</span>
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
                                        <span className='eye-icon'>BTC</span>
                                    </motion.div>
                                    <div className='info'>
                                        <div className='info_block flex justify-between'>
                                            <span>Available</span>
                                            <span>O.OO USDT</span>
                                        </div>
                                        <div className='info_block flex justify-between'>
                                            <span>Volume</span>
                                            <span>O USDT</span>
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