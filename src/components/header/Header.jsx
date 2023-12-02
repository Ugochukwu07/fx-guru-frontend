import logo from '../../assets/login.png'
import avatar from '../../assets/avatar.png'
import './header.scss'
import { Link } from 'react-router-dom'

function Header(){
    return (
        <div className='header'>
            <div className='logo'>
                <img src={logo} />
            </div>
                <div className='avatar'>
            <Link to={'/'}>
                    <img src={avatar} />
            </Link>
                </div>
        </div>
    )
}

export default Header