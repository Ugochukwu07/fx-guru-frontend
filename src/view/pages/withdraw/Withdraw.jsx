import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import LoadingSpinner from "../../layout/Loading";

import TabLayout from '#/view/layout/TabLayout';

import './withdraw.scss'
import { ToastContainer, toast } from 'react-toastify';

import back from '#/assets/icons/back.svg'
import fe_arrow_up from '#/assets/icons/fe_arrow-up.svg'
import fe_arrow_left from '#/assets/icons/fe_arrow-left.svg'
import { getCurrencies, withdraw } from '../../../service/UserService';
import { useSelector } from 'react-redux';


export default function Withdraw(){
    const { token } = useSelector((state) => state.login);
    const navigate = useNavigate();

    const [wallets, setWallets] = useState(null)
    const [currenciesList, setCurrenciesList] = useState([])
    const [currentWallet, setCurrentWallet] = useState([]);
    const [currentNetwork, setCurrentNetwork] = useState(0);
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState(false)
    const [form, setForm] = useState({
        extractable: 0,
        address: "",
        amount: 0,
    });
    const [errors, setErrors] = useState({});

    let networks = ''
    useEffect(() => {
        const fetchData = async () => {
            try {
                getCurrencies(token).then(data => {

                // const user = await profile(token);
                    setWallets(data);
                    setCurrenciesList(setupWallet(data))
                    setCurrentWallet(data[Object.keys(data)[0]])
                }).then(() => {
                    
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally{
                setForm(prev => {
                    return {
                        ...prev,
                        extractable: currentWallet[currentNetwork]?.balances.fiat ?? 0,
                    }
                })
            }
        };
        fetchData();
    }, [])

    networks = currentWallet.map((item, key) => (<span 
        key={key} 
        className={currentNetwork == key ? 'active' : ''}
        onClick={() => {
            setCurrentNetwork(key)
            setForm(prev => {
                return {
                    ...prev,
                    extractable: currentWallet[currentNetwork]?.balances.fiat ?? 0,
                }
            })
        }}
    >{item.network}</span>))
  
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

    
    const setupWallet = (walletsData) => {
        const currencies = Object.keys(walletsData);
        return currencies.map((key) => (
            <li 
                onClick={
                    () => {
                        setCurrentWallet(walletsData[key]);
                        setPopup(false)
                        setForm(prev => {
                            return {
                                ...prev,
                                extractable: walletsData[key][currentNetwork]?.balances.fiat ?? 0,
                            }
                        })
                    } 
                }
                key={key}
            >
                {key}
            </li>
        ));
    };

    const [isZoomed, setZoomed] = useState(false);

    const toggleZoom = () => {
      setZoomed(!isZoomed);
    };

    const handleWithdrawal = () => {
        setLoading(true)
        try{
            withdraw(token, {
                amount: form.amount,
                address: form.address,
                currency_id:  currentWallet[currentNetwork].id
            }).then(response => {
                if(response.success){
                    toast.success(response.message);
                    setErrors({});
                    setLoading(false)
                    setForm({
                        // extractable: 0,
                        address: "",
                        amount: 0,
                    })
                }else{
                    setLoading(false)
                    setErrors(response.errors);
                }
            })
            
        } catch(err){
            setLoading(false)
            toast.error(err.message)
            console.error('Error fetching data:', err)
        }
    }

    return (
        <TabLayout nav="assets">
        <ToastContainer />
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
                        <p onClick={togglePopUp}><img src={fe_arrow_up} /> {currentWallet[currentNetwork]?.symbol}</p>
                    </div>
                    <div className='deposit_wallet__address'>
                        <div className='deposit_wallet__address_addresses'>
                            {networks}
                        </div>
                    </div>
                </div>
                <div className="withdraw_form h-full">
        {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <motion.div 
                        className='input_group'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .1 }}
                    >
                        <label>Extractable Quantity</label>
                        <input readOnly placeholder="0.0000000" type='text' onChange={handleChange} name='extractable' value={form.extractable} />
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
                        {currentWallet[currentNetwork]?.symbol}
                        </span>
                        {errors.address && (
                            <motion.span initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                                className="error-message text-red-500 font-light"
                            >{errors.address[0]}</motion.span>
                        )}
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
                            USD
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
                        <span>Arrived amount: 0 USDT</span>
                        <button type='button' onClick={handleWithdrawal}>Withdraw</button>
                    </motion.div>
                    </>
            )}
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
                        {currenciesList}
                    </ul>
                </div>
            </motion.div>
            }
        </TabLayout>
    );
}