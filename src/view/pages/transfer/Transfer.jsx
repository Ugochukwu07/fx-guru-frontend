import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import TabLayout from '#/view/layout/TabLayout'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

import './transfer.scss'

import back from '#/assets/icons/back.svg'

import {accounts} from '#/data/currency'
import LoadingSpinner from '#/view/layout/Loading'
import { saveTransfer } from '#/service/UserService'
import { getOptionsBalance } from '../../../service/UserService'

export default function Transfer(){
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.login);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [form, setForm] = useState({
        currency: 0,
        from_account: 0,
        to_account: 1,
        amount: 0,
    });

    useEffect(() => {
        document.title = 'Transfer | BitPay'
        getOptionsBalance(token).then(data => {
            setCurrencies(data.currencies)
            return data
        })
    }, [])

    const goBack = () => {
        navigate(-1);
    };
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const submitTransfer = () => {
        try{
            setErrors({});
            setLoading(true)
            console.log(form);
            saveTransfer(token, form).then(response => {
                if(response.success){
                    setLoading(false)
                    toast.success(response.message);
                    setErrors({});
                    setForm((prevForm) => ({
                        ...prevForm,
                        from_account: "",
                        to_account: "",
                        amount: 0,
                        currency: ""
                    }));
                }else{
                    setLoading(false)
                    toast.error(response.message);
                    (response.status == 401) && setErrors(response.errors);
                }
                return response.success
            }).then(success => {
                if(success){
                    setTimeout(() => {
                        navigate('/assets')
                    }, 2400)
                }
            })
        } catch(err){
            toast.error(err.message)
            console.error('Error fetching data:', err)
        }
    }

    const my_accounts = Object.keys(accounts);

    return (
        <TabLayout nav={"exchange"}>
        <ToastContainer />
            <div className='deposit transfer'>
                <div className='deposit_header flex'>
                    <div className='deposit_header__nav'>
                        <img onClick={goBack} src={back} />
                    </div>
                    <div className='deposit_header__title'>
                        <span>Transfer</span>
                    </div>
                </div>
                {
                    loading ? (
                    <LoadingSpinner />
                    ) : (
                        <div className="transfer_form">
                            
                            <motion.div 
                                className='input_group'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .1 }}
                            >
                                <label>Currency</label>
                                <select onChange={handleChange} name='currency'>
                                    <option>Select Currency</option>
                                {
                                    currencies.map((value, index) => (
                                        <option selected={form.currency == value.id} value={value.id} key={index}>
                                            {value.symbol}
                                        </option>
                                    ))
                                }
                                </select>
                                {errors.currency && (
                                    <motion.span initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .3 }}
                                        className="error-message text-red-500 font-light"
                                    >{errors.currency[0]}</motion.span>
                                )}
                                {/* <input readOnly type='text' onClick={toggleFromPopUp} name='currency' value={form.from} />
                                <span className='eye-icon' onClick={toggleFromPopUp}><img src={down_caret} /></span> */}
                            </motion.div>
                            
                            <motion.div 
                                className='input_group'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .1 }}
                            >
                                <label>From</label>
                                <select onChange={handleChange} name='from_account'>
                                    <option>From</option>
                                    { my_accounts.map((item, index) => (
                                        <option selected={form.from_account == index} value={index} key={index}>
                                            {item.charAt(0).toUpperCase() + item.slice(1)} Account
                                        </option>
                                    ))}
                                </select>
                                {errors.from_account && (
                                    <motion.span initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .3 }}
                                        className="error-message text-red-500 font-light"
                                    >{errors.from_account[0]}</motion.span>
                                )}
                                {/* <input readOnly type='text' onClick={toggleFromPopUp} name='currency' value={form.from} />
                                <span className='eye-icon' onClick={toggleFromPopUp}><img src={down_caret} /></span> */}
                            </motion.div>
                            <motion.div 
                                className='input_group'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .1 }}
                            >
                                <label>To</label>
                                <select onChange={handleChange} name='to_account'>
                                    <option>To</option>
                                    { my_accounts.map((item, index) => (
                                        <option selected={form.to_account == index} value={index} key={index}>
                                            {item.charAt(0).toUpperCase() + item.slice(1)} Account
                                        </option>)
                                    )}
                                </select>
                                {errors.to_account && (
                                    <motion.span initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .3 }}
                                        className="error-message text-red-500 font-light"
                                    >{errors.to_account[0]}</motion.span>
                                )}
                                {/* <input readOnly type='text' onClick={toggleFromPopUp} name='currency' value={form.from} />
                                <span className='eye-icon' onClick={toggleFromPopUp}><img src={down_caret} /></span> */}
                            </motion.div>
                            <motion.div 
                                className='input_group mb-0'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                            >
                                <label>Transfer amount</label>
                                <input type='number' onChange={handleChange} name='amount' value={form.amount} />
                                <span className="eye-icon">
                                    USDT
                                </span>
                                {errors.amount && (
                                    <motion.span initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: .3 }}
                                        className="error-message text-red-500 font-light"
                                    >{errors.amount[0]}</motion.span>
                                )}
                            </motion.div>
                            <span className="forget float-left my-1">Fee: 0 USDT</span>
                            <br />
                            <motion.div className='btn-group mt-3'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .4 }}
                            >
                                <span className='top_text'>Arrived amount: <span>{ form.amount}</span></span>
                                <button onClick={submitTransfer}>Transfer</button>
                            </motion.div>
                        </div>
                    )
                }
            </div>
        </TabLayout>
    )
}