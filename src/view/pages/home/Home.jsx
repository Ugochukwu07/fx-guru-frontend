import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import TabLayout from '#/view/layout/TabLayout'

import Header from '#/components/header/Header'
import Notification from '#/components/Notification'
import Major from '#/components/pairs/Major'
import Market from '#/components/pairs/Market'

import './home.scss'

import deposit from '#/assets/icons/deposit.svg'
import support from '#/assets/icons/support.svg'
import help from '#/assets/icons/help.svg'
import savings from '#/assets/icons/savings.svg'
import start_trading from '#/assets/start_trading.png'
import { useContext, useEffect } from "react"
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Home(){
    useEffect(() => {
        document.title = 'Home | BitPay'
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true
      };

    return (
        <TabLayout nav={"home"}>
            <motion.div
                className='home'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <Header />
                <Notification />
                <Slider {...settings}>
                    <div className='start_trading' style={{ backgroundImage: `url(${start_trading})` }}>
                        {/* <img src={start_trading} /> */}
                        <h3 className='h3 '>Become a GURU</h3>
                        <h1 className='h1'>Trusted and Secure bitcoin and crypto exchange</h1>
                        <Link to={'/trade'} className='btn btn-main'>Start Trading</Link>
                    </div>
                    <div className='start_trading first' style={{ backgroundImage: `url(${start_trading})` }}>
                        <h3 className='h3 '>Join the Amazing Crypto</h3>
                        <h1 className='h1'>A new way to earn swiftly with crypto currencies</h1>
                        <Link to={'/trade'} className='btn btn-main'>Start Now</Link>
                    </div>
                    <div className='start_trading last' style={{ backgroundImage: `url(${start_trading})` }}>
                        <h3 className='h3 '>Become a Community Member</h3>
                        <h1 className='h1'>A new way to earn swiftly with crypto currencies</h1>
                        <Link to={'/trade'} className='btn btn-main'>Start Now</Link>
                    </div>
                </Slider>
                <Major />
                <div className='actions'>
                    <div className='action'>
                        <Link to={'/deposit'}>
                            <img src={deposit} />
                            <span>Deposit</span>
                        </Link>
                    </div>
                    <div className='action'>
                        <Link to={'/assets'}>
                            <img src={savings} />
                            <span>Savings</span>
                        </Link>
                    </div>
                    <div className='action'>
                        <img src={support} />
                        <span>Service</span>
                    </div>
                    <div className='action'>
                        <img src={help} />
                        <span>Help</span>
                    </div>
                </div>
                <Market />
            </motion.div>
        </TabLayout>
    )
}

export default Home