import { useSelector } from 'react-redux'
import './major.scss'
import { useEffect, useState } from 'react'
import { toSignificantFigures } from '../../utility/helper'

export default function Major(){
    const coins = useSelector(state => state.prices.prices)
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        setFeatured(coins.slice(0, 3))
    }, [coins])
    return (
        <div className='major_pairs'>
            <div className='title_block'>
                <h2 className='h2'>Major Crypto pairs</h2>
            </div>
            <div className='pairs'>
                {
                    featured.map((coin, index) => (
                        <div className='pair' key={index}>
                            <span className='rates' style={{ color: coin.color }}>{coin.change}%</span>
                            <p className='quote'>{coin.symbol}/USDT</p>
                            <p className='price'>{ toSignificantFigures(coin.price, 5) }</p>
                        </div>
                    ))
                }
                {/* <div className='pair'>
                    <span className='rates'>-0.29%</span>
                    <p className='quote'>BTC/USDT</p>
                    <p className='price'>16947.53</p>
                </div>
                <div className='pair'>
                    <span className='rates'>-0.29%</span>
                    <p className='quote'>ETH/USDT</p>
                    <p className='price'>18947.53</p>
                </div>
                <div className='pair'>
                    <span className='rates'>-0.29%</span>
                    <p className='quote'>XRP/USDT</p>
                    <p className='price'>0.34131</p>
                </div> */}
            </div>
        </div>
    )
}