import logo from '../../assets/login.png'
import avatar from '../../assets/avatar.png'
import './header.scss'

function Header(){
    return (
        <div className='header'>
            <div className='logo'>
                <img src={logo} />
            </div>
            <div className='avatar'>
                <img src={avatar} />
            </div>
        </div>
    )
}

export default Header