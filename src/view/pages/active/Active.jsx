import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux';

import './active.scss'

import eth from '../../../assets/icons/ETH.svg'
import { useEffect, useState } from 'react';
import { completeTrade } from '../../../service/UserService';
import { currentProfit, generateNumber } from '../../../utility/helper';

export default function Active(){
    const {token} = useSelector(state => state.login)
    const {state} = useLocation()
    const {currency, trade } = state
    const navigate = useNavigate()

    const [angle, setAngle] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(trade.plan_id.time)

    useEffect(() => {
        const intervalID = setInterval(() => {
            setAngle(prev => (prev + 1) % 360);
        }, 1000)
        return clearInterval(intervalID)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(timeRemaining < 1){
                return clearInterval(intervalId);
            }
          setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if(timeRemaining < 1){
        completeTrade(token, trade.id).then(res => {
            console.log(res)
            setAngle(0)
            navigate('/asset')
        })
    }
    console.log(angle, timeRemaining);

    const {number, rate, isPositive} = generateNumber(16960.6700, 0.1);
    const profit = currentProfit(trade.plan_id.rate, number, trade.plan_id.time, timeRemaining)
    
    return (
        <div className='active_page text-center p-8 px-16'>
            <div className='active_page_title'>
                <span>
                    {/* <img src={eth} /> */}
                    {currency} / USDT 
                </span>
            </div>
            <div className='active_page_body'>
                <div className='wrapper relative'>
                    <div className='iconn absolute'>
                        <div className='circle_timer' style={{ transform: `rotate(${angle}deg)`, animationDuration: `${timeRemaining == 0 ? 0 :trade.plan_id.time}s` }}>
                        </div>
                    </div>
                    <div className='circle-info'>
                        <span className='time'>{timeRemaining}</span>
                        <span>Current Price</span>
                        <span className={isPositive ? 'up active' : 'down active'}>{number}</span>
                    </div>
                </div>
                <div className='grid info text-left grid-cols-2'>
                    <span>Direction</span>
                    <span className={ state.direction ? 'up' : 'down'}>{state.direction ? 'UP' : 'DOWN'}</span>
                    <span>Amount</span>
                    <span>{state.amount}</span>
                    <span>Purchase price</span>
                    <span>16960.0201</span>
                    <span>Profit and Loss</span>
                    <span className={isPositive ? 'up active' : 'down active'}>+{profit}</span>
                </div>
                <Link to='/trade'><button>Back</button></Link>
            </div>
        </div>
    )
}