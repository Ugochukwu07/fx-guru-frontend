import { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode.react';
import clipboardCopy from 'clipboard-copy';
import { motion } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrencies, saveProve } from '../../../service/UserService'

import TabLayout from '#/view/layout/TabLayout'
import LoadingSpinner from "../../layout/Loading";

import './deposit.scss'

import back from '#/assets/icons/back.svg'
import fe_arrow_up from '#/assets/icons/fe_arrow-up.svg'
import fe_arrow_left from '#/assets/icons/fe_arrow-left.svg'


const handleCopyClick = (e) => {
      clipboardCopy(e.target.id)
        .then(() => {
            notify();
    })
    .catch((error) => {
        console.error('Failed to copy text: ', error);
    });
}

const notify = () => {
    toast.success('📋 Copied Wallet Address', {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom
    });
  };

function Deposit(){
    const { token } = useSelector((state) => state.login);

    const [wallets, setWallets] = useState(null)
    const [currenciesList, setCurrenciesList] = useState([])
    const [currentWallet, setCurrentWallet] = useState([]);
    const [currentNetwork, setCurrentNetwork] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isZoomed, setZoomed] = useState(false);
    const [popup, setPopup] = useState(false)
    const [form, setForm] = useState({
      address: "",
      amount: "",
      hash: ""
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    let networks = ''

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCurrencies(token);
                // if(!data.success){
                //     toast.error(data.message)
                //     return
                // }

                console.log(data);
                
                if(data.length == 0){
                    toast.error('No currencies found')
                    navigate(-1)
                }

                setWallets(data)
                setCurrenciesList(setupWallet(data))
                setCurrentWallet(data[Object.keys(data)[0]])
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    networks = currentWallet.map((item, key) => (<span 
        key={key} 
        className={currentNetwork == key ? 'active' : ''}
        onClick={() => setCurrentNetwork(key)}
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
                    } 
                }
                key={key}
            >
                {key}
            </li>
        ));
    };

    const handleSavePaymentProof = async () => {
        setLoading(true)
        // setForm((prevForm) => ({
        //     ...prevForm,
        //     currency_id: currentWallet[currentNetwork].id
        // }));
        // console.log(currentWallet[currentNetwork].id);
        try{
            setErrors({});
            saveProve(token, {...form, currency_id: currentWallet[currentNetwork].id}).then(response => {
                if(response.success){
                    toast.success(response.message);
                    setErrors({});
                    setLoading(false)
                }else{
                    setLoading(false)
                    setErrors(response.errors);
                    if(response.errors.currency_id != undefined){
                        toast.error(response.errors.currency_id[0]);
                    }
                }
            })
            
        } catch(err){
            setLoading(false)
            toast.error(err.message)
            console.error('Error fetching data:', err)
        }
    }
    

    const toggleZoom = () => {
      setZoomed(!isZoomed);
    };

    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation once
    });
    
    useEffect(() => {
        if (inView) {
            // Apply the animation when the element is in view
        }
    }, [inView]);

    return (
        <TabLayout nav={"assets"}>
        <ToastContainer />
        {loading ? (
                <LoadingSpinner />
            ) : (
            <motion.div 
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} 
                className='deposit'
            >
                <div className='deposit_header flex'>
                    <div className='deposit_header__nav'>
                        <div  onClick={goBack}>
                        <img src={back} />
                        </div>
                    </div>
                    <div className='deposit_header__title'>
                        <span>Deposits</span>
                    </div>
                </div>
                <div className='deposit_wallet'>
                    <div className='deposit_wallet__currency'>
                        <label>
                            Select Currency
                        </label>
                        <p onClick={togglePopUp}><img src={fe_arrow_up} /> {currentWallet[currentNetwork].symbol}</p>
                    </div>
                    <div className='deposit_wallet__address'>
                        <div className='deposit_wallet__address_addresses'>
                        {networks}
                            {/* <span className='active'>TRC20</span>
                            <span>ERC20</span> */}
                        </div>
                        <QRCode value={currentWallet[currentNetwork].address} />
                        <span className='address'>{currentWallet[currentNetwork].address}</span>
                        <span id={currentWallet[currentNetwork].address} onClick={handleCopyClick} className='copy'>
                            Copy
                        </span>
                    </div>
                </div>

                <div className='deposit_form'>
                    <motion.div className='input_group'
                        ref={ref}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <label>Deposit Address</label>
                        <input type='text' required placeholder={currentWallet[currentNetwork].address} onChange={handleChange} name='address' value={form.address} />
                        {errors.address && (
                            <motion.span initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                                className="error-message text-red-500 font-light"
                            >{errors.address[0]}</motion.span>
                        )}
                    </motion.div>
                    <motion.div className='input_group'
                        ref={ref}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <label>Amount</label>
                        <input type='number' required placeholder={ '1 ' + currentWallet[currentNetwork].symbol} onChange={handleChange} name='amount' value={form.amount} />
                        {errors.amount && (
                            <motion.span initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                                className="error-message text-red-500 font-light"
                            >{errors.amount[0]}</motion.span>
                        )}
                    </motion.div>
                    <motion.div className='input_group'
                        ref={ref}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <label>Transfer Hash</label>
                        <input type='text' onChange={handleChange} name='hash' value={form.hash} />
                    </motion.div>

                    <motion.div className='btn-group'
                        ref={ref}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                        onClick={handleSavePaymentProof}
                    >
                        <button>Submit</button>
                    </motion.div>
                </div>

            </motion.div>
            )
        }
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
    )
}

export default Deposit;