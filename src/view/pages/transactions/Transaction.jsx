import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

import { getTransactionHistory } from "../../../service/UserService";

import TabLayout from '#/view/layout/TabLayout';

import './transactions.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import back from '#/assets/icons/back.svg'
import nodata from '../../../assets/icons/nodata.svg'
import { useNavigate } from "react-router-dom";

export default function Transaction(){
        const state = useSelector(state => state)
        const {token} = state.login
        
        const [historyMode, setHistoryMode] = useState(true);
        const [tradeHistory, setTradeHistory] = useState({
            deposits: [],
            withdrawals: []
        })
    
        useEffect(() => {
            document.title = 'Transaction History | BitPay'
            getTransactionHistory(token).then(data => {
                setTradeHistory(prev => {
                    return {
                        ...prev, 
                        deposits: data.deposits,
                        withdrawals: data.withdrawals || []
                    }
                })
                return data
            })
        }, [])

        const navigate = useNavigate();

        const goBack = () => {
            navigate(-1); // Go back in the navigation history
        };
        
        return (
            <TabLayout nav={'trade'}>
            <ToastContainer />
                <div className='exchange trade transaction'>
                    <div className='deposit_header flex'>
                        <div className='deposit_header__nav'>
                            <img onClick={goBack} src={back} />
                        </div>
                        <div className='deposit_header__title'>
                            <span>Transactions<br /> History</span>
                        </div>
                    </div>
                    <div className='w-full history'>
                        <div className='history_tabs'>
                            <span onClick={() => setHistoryMode(true)} className={historyMode && 'active'}>Deposits</span>
                            <span onClick={() => setHistoryMode(false)} className={`${!historyMode && 'active'}`}>Withdrawals</span>
                        </div>
                        <div className='history_body px-0'>
                        {
                            (tradeHistory.deposits.length < 1 && tradeHistory.withdrawals.length < 1) && (<div className='no_data text-center'>
                                <img className="mx-auto" src={nodata} />
                            </div>)
                        }
                            <div className="transaction">
                                {
                                    historyMode && tradeHistory.deposits.map((item, index) => {
                                        return (
                                            <div key={index} className='order my-8'>
                                                <div className='order_title'>
                                                    <span className='up'>DEPOSIT</span>
                                                    <span>{item.created_at}</span>
                                                </div>
                                                <div className='order_body grid grid-cols-3'>
                                                    <div className='information'>
                                                        <span className='quote'>{ item.currency.symbol }</span>
                                                        <span className='price'>{ item.amount }</span>
                                                        <span>{item.currency.network}</span>
                                                        <span className='price'>{ item.type }</span>
                                                    </div>
                                                    <div className='numbers text-center'>
                                                        <span>Amount</span>
                                                        <span className='price'>{ item.amount}</span>
                                                        <span>P/L[{item.currency.symbol}]</span>
                                                        <span className='up price'>0.0000</span>
                                                    </div>
                                                    <div className='current text-right'>
                                                        <span>Current Status</span>
                                                        <span className='up price'>{item.status ? 'Success' : 'Failure'}</span>
                                                        <span>Type</span>
                                                        <span className='price'>{ item.type }</span>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                                {
                                    !historyMode && tradeHistory.withdrawals.map((item, index) => {
                                        return (
                                            <div key={index} className='order my-8'>
                                                <div className='order_title'>
                                                    <span className='up'>WITHDRAWAL</span>
                                                    <span>{item.created_at}</span>
                                                </div>
                                                <div className='order_body grid grid-cols-3'>
                                                    <div className='information'>
                                                        <span className='quote'>{ item.currency.symbol }</span>
                                                        <span className='price'>{ item.amount }</span>
                                                        <span>{item.currency.network}</span>
                                                        <span className='price'>{ item.type }</span>
                                                    </div>
                                                    <div className='numbers text-center'>
                                                        <span>Amount</span>
                                                        <span className='price'>{ item.amount}</span>
                                                        <span>P/L[{item.currency.symbol}]</span>
                                                        <span className='up price'>0.0000</span>
                                                    </div>
                                                    <div className='current text-right'>
                                                        <span>Current Status</span>
                                                        <span className='up price'>{item.status ? 'Success' : 'Failure'}</span>
                                                        <span>Type</span>
                                                        <span className='price'>{ item.type }</span>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </TabLayout>
    )
}