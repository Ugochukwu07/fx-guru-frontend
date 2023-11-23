import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux';

import './active.scss'

import eth from '../../../assets/icons/ETH.svg'
import { useEffect, useState } from 'react';

export default function Active(){
    const {token} = useSelector(state => state.login)
    const {state} = useLocation()
    const {currency, trade } = state

    const [angle, setAngle] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(trade.plan_id.time)

    //trade.plan_id.time is the total time, total time equals 360deg, so 1deg = trade.plan_id.time / 360

    useEffect(() => {
        const intervalID = setInterval(() => {
            setAngle(prev => (prev + 1) % 360);
            setTimeRemaining(prev => prev-trade.plan_id.time)
        }, 1000)
        
        return clearInterval(intervalID)
    }, [])


    console.log(state);

    return (
        <div className='active_page text-center p-8 px-16'>
            <div className='active_page_title'>
                <span>
                    {/* <img src={eth} /> */}
                    {currency} / USDT 
                </span>
            </div>
            <div className='active_page_body'>
                <div className='circle_timer' style={{ transform: `rotate(${angle}deg)`, animationDuration: `${trade.plan_id.time}s` }}>
                </div>
                <div className=''>
                    <span className='time'>{timeRemaining}</span>
                    <span>Current Price</span>
                    <span className='up'>16960.6700</span>
                </div>

                <div className='grid info text-left grid-cols-2'>
                    <span>Direction</span>
                    <span className='up'>Up</span>
                    <span>Amount</span>
                    <span>169</span>
                    <span>Purchase price</span>
                    <span>16960.0204</span>
                    <span>Profit and Loss</span>
                    <span className='up'>+200.0000</span>
                </div>
                <Link to='/trade'><button>Back</button></Link>
            </div>
        </div>
    )
}