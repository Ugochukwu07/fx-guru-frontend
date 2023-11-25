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
            <Link to={'/'}>
                <div className='avatar'>
                    <img src={avatar} />
                </div>
            </Link>
        </div>
    )
}

export default Header