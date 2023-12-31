import { useEffect, useState } from "react";
import {generateNumbers} from "../../utility/helper";

export default function Price({ data }){
    const [price, setPrice] = useState({
        price: Number(data.price), 
        rate: Number(data.rate)
    })
    

    useEffect(() => {
        const interval = setInterval(() => {
            setPrice((prev) => {
                return {
                    ...prev,
                    price: prev.price + 0.000001
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [price.price]);


    const {above, below} = generateNumbers(price.price, price.rate)

    const up_prices = above.map((number, key) => {
        return (
            <div key={key} className='grid gap-3 grid-cols-2 figure-m up'>
                <div className='overlay up' style={{ width: Math.floor(Math.random()*100) + '%' }}></div>
                <span>{number.number}</span>
                <span>{ number.rate }</span>
            </div>
        )
    })

    const down_prices = below.map((number, key) => {
        return (
            <div key={key} className='grid gap-3 grid-cols-2 figure-m down'>
                <div className='overlay down' style={{ width: Math.floor(Math.random()*100) + '%' }}></div>
                <span>{number.number}</span>
                <span>{ number.rate }</span>
            </div>
        )
    })

    return (
        <>
            <div className='low_price'>
                <div className='flex flex-col'>
                    <div className='grid gap-3 grid-cols-2 figure-m'>
                        <span>Unit</span>
                        <span>number</span>
                    </div>
                    {down_prices}
                </div>
            </div>
            <div>
                <div className='flex flex-col'>
                    {up_prices}
                </div>
            </div>
        </>
    )
}