import './links.scss'


import history from "../../../assets/icons/history.svg"
import logout from "../../../assets/icons/logout.svg"
import { Link } from 'react-router-dom'

export default function Links(){
    const linksArray = [
        // {
        //     img: transfer_alt,
        //     text: "Exchange Account",
        //     link: "/exchange"
        // },
        // {
        //     img: contract,
        //     text: "Contract Account",
        //     link: "/contract"
        // },
        // {
        //     img: option,
        //     text: "Option Account",
        //     link: "/option"
        // },
        {
            img: history,
            text: "Transaction History",
            link: "/transactions"
        },
        {
            img: logout,
            text: "Logout",
            link: "/logout",
            handleClick: function (){
                localStorage.removeItem('token')
                localStorage.clear()
                window.location.href = '/'
            }
        },
    ];
    const myLinks = linksArray.map((item, index) => {
        return <Link to={item.link} key={index}>
                <div key={index} onClick={item.handleClick}>
                    <li>
                        <img src={item.img} />
                        <span>{item.text}</span>
                    </li>        
                </div>
            </Link>
    });

    return (
        <div className="profile_links mt-0 mb-0">
            <ul>{myLinks}</ul>
        </div>
    )
}