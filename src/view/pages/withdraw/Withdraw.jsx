import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

import TabLayout from '#/view/layout/TabLayout';

import './withdraw.scss'


import back from '#/assets/icons/back.svg'
import fe_arrow_up from '#/assets/icons/fe_arrow-up.svg'
import fe_arrow_left from '#/assets/icons/fe_arrow-left.svg'


export default function Withdraw(){
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false)
    const [form, setForm] = useState({
        extractable: "",
        address: "",
        amount: 0,
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
        ...prevForm,
        [name]: value
        }));
    };
    
    const togglePopUp = () => {
        setPopup(!popup)
    }

    const goBack = () => {
        navigate(-1); // Go back in the navigation history
    };

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
    const currencies = Object.keys(wallets);

    const currencies_list = currencies.map((key) => (
      <li key={key}>{key}</li>
    ));

    const [isZoomed, setZoomed] = useState(false);

    const toggleZoom = () => {
      setZoomed(!isZoomed);
    };

    return (
        <TabLayout nav="assets">
            <div className='deposit withdraw'>
                <div className='deposit_header flex'>
                    <div className='deposit_header__nav'>
                        <img onClick={goBack} src={back} />
                    </div>
                    <div className='deposit_header__title'>
                        <span>Withdrawal</span>
                    </div>
                </div>
                <div className='deposit_wallet'>
                    <div className='deposit_wallet__currency'>
                        <label>
                            Select Currency
                        </label>
                        <p onClick={togglePopUp}><img src={fe_arrow_up} /> USDT</p>
                    </div>
                    <div className='deposit_wallet__address'>
                        <div className='deposit_wallet__address_addresses'>
                            <span className='active'>TRC20</span>
                            <span>ERC20</span>
                            <span>BEP20</span>
                        </div>
                    </div>
                </div>
                <div className="withdraw_form">
                    <motion.div 
                        className='input_group'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .1 }}
                    >
                        <label>Extractable Quantity</label>
                        <input placeholder="0.0000000" type='text' onChange={handleChange} name='extractable' value={form.extractable} />
                    </motion.div>
                    <motion.div 
                        className='input_group mb-0'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .2 }}
                    >
                        <label>Withdrawal Address</label>
                        <input type='text' onChange={handleChange} name='address' value={form.address} />
                        <span className="eye-icon">
                            USDT
                        </span>
                    </motion.div>
                    <span className="forget float-left text-left my-1">The coin pick up address should not contain spaces</span>
                    <br />
                    <br />
                    <motion.div 
                        className='input_group mb-0'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <label>Amount of coin drawn</label>
                        <input type='text' onChange={handleChange} name='amount' value={form.amount} />
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
                        <span>Arrived amount: 0 USDT</span>
                        <button>Withdraw</button>
                    </motion.div>
                </div>
            </div>
            {popup && 
            <motion.div 
                className="currency"
                initial={{  scale: 1  }}
                animate={{ scale: 1.1, translateX: '-50%' }}
                onClick={toggleZoom}
            >
                <div className='currency_header flex'>
                    <div className='currency_header__nav'>
                        <img onClick={togglePopUp} src={fe_arrow_left} />
                    </div>
                    <div className='currency_header__title'>
                        <span>Select Currency</span>
                    </div>
                </div>
                <div className='currency_list'>
                    <ul>
                        {currencies_list}
                    </ul>
                </div>
            </motion.div>
            }
        </TabLayout>
    );
}