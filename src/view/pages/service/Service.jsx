import { useEffect } from 'react';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TabLayout from '#/view/layout/TabLayout'
import Header from '#/components/header/Header'
import Notification from '#/components/Notification'
import './service.scss'
import service_one from '../../../assets/img/10.jpg'

export default function Service() {
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
        <TabLayout nav={"trade"}>
            <Header />
            <Notification />
            <div className='services px-3'>
                <Slider {...settings}>
                    <div className='service'>
                        <h3 className='h3 '>Unique Way to Trade</h3>
                        <h1 className='h1'>Buy cryptocurrency instantly. Fast, easy and secure.</h1>
                    </div>
                    <div className='service first'>
                        <h3 className='h3 '>Swift WIthdrawal Speed</h3>
                        <h1 className='h1'>Withdraw your funds into your personal wallet of your choice</h1>
                    </div>
                    <div className='service last'>
                        <h3 className='h3 '>Become a Community Member</h3>
                        <h1 className='h1'>A new way to earn swiftly with crypto currencies</h1>
                    </div>
                </Slider>
                <div className='info mt-8'>
                    <h2 className='font-extrabold'>How we work</h2>
                    <p>
                        Buy, store, swap and spend cryptocurrency all in one app. Turn Bitcoin into dollars with the BitPay crypto debit card. Earn cash back automatically.
                        Sign up to buy crypto at great rates. Buy, store, swap and spend your favorite crypto all in one secure app. Buy crypto with a credit card, debit card or Apple Pay. No hidden fees.
                    </p>
                    <img src={service_one} />
                </div>
            </div>
        </TabLayout>
    )
}