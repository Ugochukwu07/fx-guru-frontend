import './active.scss'

import eth from '../../../assets/icons/ETH.svg'
import { Link } from 'react-router-dom'

export default function Active(){
    return (
        <div className='active_page text-center p-8 px-16'>
            <div className='active_page_title'>
                <span>
                    <img src={eth} />
                    ETH / USDT 
                </span>
            </div>
            <div className='active_page_body'>
                <div className='circle_timer'>
                    <span className='time'>297</span>
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