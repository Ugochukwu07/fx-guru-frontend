import './major.scss'

export default function Major(){
    return (
        <div className='major_pairs'>
            <div className='title_block'>
                <h2 className='h2'>Major Crypto pairs</h2>
            </div>
            <div className='pairs'>
                <div className='pair'>
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
                </div>
            </div>
        </div>
    )
}