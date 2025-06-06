import './market.scss'

import btc from '../../assets/icons/btc.svg'
import btc_chart from '../../assets/icons/btc_chart.svg'
import arrow_up from '../../assets/icons/arrow-up.svg'
import litecoin from '../../assets/icons/litecoin.svg'
import sol from '../../assets/icons/sol.svg'
import xrp from '../../assets/icons/xrp.svg'
import { useEffect, useLayoutEffect, useState } from 'react'
import { getCoinList } from '../../service/coinService'
import { toSignificantFigures } from '../../utility/helper'
import { useDispatch, useSelector } from 'react-redux'
import { prices } from '../../store/prices'
import { Link } from 'react-router-dom'

export default function Market(){
    const coins = useSelector(state => state.prices.prices)
    const dispatch = useDispatch();


    useLayoutEffect(() => {
        const coinPrices = () => {
            dispatch(prices.actions.getCoinList()).then((result) => {
                dispatch(prices.mutations.pricesSuccess(result.payload.coins))
            })
            console.log(coins);

        }
        if(coins.length === 0){
            coinPrices()
        }
    })

    return (
        <div className='market'>
            <div className='market_title'>
                <h2 className='h2'>Market Quotation</h2>
            </div>
            <div className='market_table'>
                <table>
                    <thead>
                        <tr>
                            <th>Pairs</th>
                            <th style={{ textAlign: 'center' }}>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coins.map((coin, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Link to={'/trade'}>
                                            <div className='table__pairs'>
                                                <img src={coin.iconUrl} />
                                                <span>{coin.name}<span>{coin.symbol}</span></span>
                                                <img className='table_charts' src={btc_chart} />
                                            </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={'/trade'}>
                                            <span className='table__price up'>{ toSignificantFigures(coin.price, 5) }</span>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={'/trade'}>
                                            <span className='table__change' style={{ color: coin.color }}>{coin.change}%</span>
                                            <img className='table__change__img' src={arrow_up} />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                        {/* <tr>
                            <td>
                                <div className='table__pairs'>
                                    <img src={btc} />
                                    <span>Bitcoin<span>BTC</span></span>
                                    <img className='table_charts' src={btc_chart} />
                                </div>
                            </td>
                            <td>
                                <span className='table__price up'>16947.53</span>
                            </td>
                            <td>
                                <span className='table__change up'>+0.29%</span>
                                <img className='table__change__img' src={arrow_up} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='table__pairs'>
                                    <img src={litecoin} />
                                    <span>Litecoin<br /><span>LTC</span></span>
                                    <img className='table_charts' src={btc_chart} />
                                </div>
                            </td>
                            <td>
                                <span className='table__price down'>16947.53</span>
                            </td>
                            <td>
                                <span className='table__change down'>+0.29%</span>
                                <img className='table__change__img' src={arrow_up} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='table__pairs'>
                                    <img src={sol} />
                                    <span>Solan<span>SOL</span></span>
                                    <img className='table_charts' src={btc_chart} />
                                </div>
                            </td>
                            <td>
                                <span className='table__price up'>16947.53</span>
                            </td>
                            <td>
                                <span className='table__change up'>+0.29%</span>
                                <img className='table__change__img' src={arrow_up} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='table__pairs'>
                                    <img src={xrp} />
                                    <span>Ripple<span>XRP</span></span>
                                    <img className='table_charts' src={btc_chart} />
                                </div>
                            </td>
                            <td>
                                <span className='table__price up'>16947.53</span>
                            </td>
                            <td>
                                <span className='table__change up'>+0.29%</span>
                                <img className='table__change__img' src={arrow_up} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='table__pairs'>
                                    <img src={btc} />
                                    <span>Tether<span>USDT</span></span>
                                    <img className='table_charts' src={btc_chart} />
                                </div>
                            </td>
                            <td>
                                <span className='table__price up'>16947.53</span>
                            </td>
                            <td>
                                <span className='table__change up'>+0.29%</span>
                                <img className='table__change__img' src={arrow_up} />
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}