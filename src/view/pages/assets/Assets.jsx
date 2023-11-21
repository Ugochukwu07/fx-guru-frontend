import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { profile } from "../../../service/UserService";
import TabLayout from "#/view/layout/TabLayout";
import LoadingSpinner from "../../layout/Loading";
import Links from "#/components/profile/links/Links";

import "./assets.scss";

import deposit from "#/assets/icons/deposit.svg";
import transfer from "#/assets/icons/transfer.svg";
import avatar from "#/assets/avatar.png";
import notification from "#/assets/icons/notification.svg";
import arrow_up from "#/assets/icons/arrow-up.svg";


export default function Assets() {
    const { token } = useSelector((state) => state.login);
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await profile(token);
                setUser(data);
            } catch (error) { console.error('Error fetching data:', error);
            } finally { setLoading(false);}
        };
        fetchData();
    }, [token])

    return (
        <TabLayout nav="assets">
        {loading ? (
                <LoadingSpinner />
            ) : (
            <motion.div 
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} 
                className="assets"
            >
                <div className="profile">
                <div className="profile__id">
                    <div className="info">
                    <img src={avatar} />
                    <div>
                        <span>{ user.email }</span>
                        <span className="id">ID: { user.user_id }</span>
                    </div>
                    </div>
                    <img className="profile__notification" src={notification} />
                </div>
                <div className="profile__info">
                    <h3>Total Assets</h3>
                    <h1>{ user.balance }</h1>
                    <span>
                        <img src={arrow_up} />
                        105 (%0.8)
                    </span>
                </div>
                </div>
                <div className="actions">
                <div className="action">
                    <Link to={"/deposit"}>
                    <img src={deposit} />
                    <span>Deposit</span>
                    </Link>
                </div>
                <div className="action">
                    <Link to={"/withdraw"}>
                    <img src={deposit} />
                    <span>Withdraw</span>
                    </Link>
                </div>
                <div className="action">
                    <Link to={"/transfer"}>
                    <img src={transfer} />
                    <span>Transfer</span>
                    </Link>
                </div>
                </div>
                <Links />
            </motion.div>
            )
        }
            </TabLayout>
    );
}
