import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux';

import './active.scss'

import { useEffect, useState } from 'react';
import { completeTrade, getTradeInfo } from '../../../service/UserService';
import { currentProfit, generateNumber } from '../../../utility/helper';
import { ToastContainer, toast } from 'react-toastify';

export default function Active(){
    const {token} = useSelector(state => state.login)
    const {state} = useLocation()
    const {currency, trade, market } = state
    const navigate = useNavigate()

    const [angle, setAngle] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(trade.plan_id.time)

    useEffect(() => {
        getTradeInfo(token, trade.id).then(res => {
            setTimeRemaining(res.time_remaining)
            setAngle(res.degree)
        })
        const intervalID = setInterval(() => {
            const clampedCurrentTime = Math.min((trade.plan_id.time - timeRemaining), trade.plan_id.time);
            const calculatedDegree = (clampedCurrentTime / trade.plan_id.time) * 360;
            setAngle(prev => calculatedDegree-prev);
            console.log(calculatedDegree);
        }, 1000)
        return clearInterval(intervalID)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(timeRemaining < 1){
                completeTrade(token, trade.id).then(() => {
                    toast.success('Trading Completed')
                    setAngle(0)
                    setTimeout(() => {
                        navigate('/profile')
                    }, 2500)
                })
                return clearInterval(intervalId);
            }
          setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if(timeRemaining < 1){
        completeTrade(token, trade.id).then(() => {
            toast.success('Trading Completed')
        })
    }

    const {number, rate, isPositive} = generateNumber(Number(market.price), Number(market.rate));
    const profit = currentProfit(trade.plan_id.rate, state.amount, trade.plan_id.time*1000, timeRemaining*1000)
    
    return (
        <div className='active_page text-center p-8 px-16'>
            <ToastContainer />
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
                    <span className={ state.direction ? 'up active' : 'down active'}>{state.direction ? 'UP' : 'DOWN'}</span>
                    <span>Amount</span>
                    <span>${state.amount}</span>
                    <span>Purchase price</span>
                    <span>{Number(market.price).toFixed(4)}</span>
                    <span>Profit and Loss</span>
                    <span className={isPositive ? 'up active' : 'down active'}>+{profit}</span>
                </div>
                <Link to='/trade'><button>Back</button></Link>
                <br />
                {
                    timeRemaining == 0 && <button className='mt-3' onClick={() => {
                        completeTrade(token, trade.id).then(() => {
                            toast.warning('Saving Trade...')
                            setAngle(0)
                            setTimeout(() => {
                                navigate('/profile')
                            }, 2000)
                        })
                    }}> Complete Trade </button>
                }
            </div>
        </div>
    )
}