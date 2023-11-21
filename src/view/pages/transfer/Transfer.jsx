import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import TabLayout from '#/view/layout/TabLayout'

import './transfer.scss'

import back from '#/assets/icons/back.svg'
import down_caret from "#/assets/icons/down_caret.svg"
import fe_arrow_left from '#/assets/icons/fe_arrow-left.svg'

import {wallets, accounts} from '#/data/currency'

export default function Transfer(){
    const navigate = useNavigate();
    const [currencyPopup, setCurrencyPopup] = useState(false)
    const [fromPopup, setFromPopup] = useState(false)
    const [toPopup, setToPopup] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [form, setForm] = useState({
        currency: {
            id: selectedWallet?.id,
            name: selectedWallet?.name
        },
        from: "",
        amount: 0,
    });
    const [data, setData] = useState({});
    const [isZoomed, setZoomed] = useState(false);
    
    const toggleZoom = () => {
        setZoomed(!isZoomed);
    };

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

    const handleWalletSelect = () => {
        
    }

    const handleAddressSelect = (wallet) => {
        console.log(wallet)
        setSelectedWallet(wallet);
        setCurrencyPopup(!currencyPopup)
      };

    const handleCurrencySelect = (e) => {
        // const {id} = e.target
        console.log(e.target);

        // setForm(prev => ({
        //     ...prev,
        //     'currency': {
        //         id: id,
        //         name: e.target.attribute()
        //     }
        // }))
    }

    const currencies_list = Object.keys(wallets).map((currency) => (
      <li data-id={wallets} onClick={() => handleAddressSelect(wallets)} key={currency}>{currency}</li>
    ));

    const my_accounts = Object.keys(accounts);

    const accounts_list = my_accounts.map((key) => (
      <li onClick={() => setForm({ ...form, from: key.charAt(0).toUpperCase() + key.slice(1)})} key={key}>{key.charAt(0).toUpperCase() + key.slice(1)} Account</li>
    ));
    
    const toggleFromPopUp = () => {
        setFromPopup(!fromPopup)
    }
    const toggleToPopUp = () => {
        setToPopup(!popup)
    }

    return (
        <TabLayout nav={"exchange"}>
            <div className='deposit transfer'>
                <div className='deposit_header flex'>
                    <div className='deposit_header__nav'>
                        <img onClick={goBack} src={back} />
                    </div>
                    <div className='deposit_header__title'>
                        <span>Transfer</span>
                    </div>
                </div>

                <div className="transfer_form">
                    
                    <motion.div 
                        className='input_group'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .1 }}
                    >
                        <label>From</label>
                        <input readOnly type='text' onClick={toggleFromPopUp} name='currency' value={form.from} />
                        <span className='eye-icon' onClick={toggleFromPopUp}><img src={down_caret} /></span>
                    </motion.div>
                    <motion.div 
                        className='input_group'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .1 }}
                    >
                        <label>To</label>
                        <input readOnly type='text' onClick={toggleFromPopUp} name='currency' value={form.from} />
                        <span className='eye-icon' onClick={toggleFromPopUp}><img src={down_caret} /></span>
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
                    </motion.div>
                    <span className="forget float-left my-1">Fee: 0 USDT</span>
                    <br />
                    <motion.div className='btn-group mt-3'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .4 }}
                    >
                        <span className='top_text'>Arrived amount: <span>0.11</span></span>
                        <button>Transfer</button>
                    </motion.div>
                </div>
                {
                    fromPopup && 
                    <motion.div 
                        className="currency"
                        initial={{  scale: 1  }}
                        animate={{ scale: 1.1, translateX: '-50%' }}
                        onClick={toggleZoom}
                    >
                        <div className='currency_header flex'>
                            <div className='currency_header__nav'>
                                <img onClick={toggleFromPopUp} src={fe_arrow_left} />
                            </div>
                            <div className='currency_header__title'>
                                <span>Select Account</span>
                            </div>
                        </div>
                        <div className='currency_list'>
                            <ul>
                                {accounts_list}
                            </ul>
                        </div>
                    </motion.div>
                }
            </div>
        </TabLayout>
    )
}