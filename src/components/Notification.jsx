import './styles.scss'


import fxemoji_speaker from '../assets/fxemoji_speaker.svg'
import icon_app from '../assets/icon_app.svg'

export default function Notification(){
    return (
        <div className='notification'>
            <img src={fxemoji_speaker} />
            <p> Hi, welcome to FX-Guru. <span>Lets make some money</span></p>
            <img className='app_icon' src={icon_app} />
        </div>
    )
}