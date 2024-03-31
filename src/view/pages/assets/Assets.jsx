import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { profile } from "../../../service/UserService";
import TabLayout from "#/view/layout/TabLayout";
import LoadingSpinner from "../../layout/Loading";
import Links from "#/components/profile/links/Links";
import CopyToClipboardButton from "#/components/utility/copy/CopyToClipBoard";

import "./assets.scss";

import contract from "#/assets/icons/contract.svg";
import option from "#/assets/icons/option.svg";
import transfer_alt from "#/assets/icons/transfer-alt.svg";
import deposit from "#/assets/icons/deposit.svg";
import transfer from "#/assets/icons/transfer.svg";
import avatar from "#/assets/avatar.png";
import notification from "#/assets/icons/notification.svg";
import arrow_up from "#/assets/icons/arrow-up.svg";
import { useAuthRedirect } from "../../../hook/useAuthRedirect";

export default function Assets() {
  const { token } = useSelector((state) => state.login);
  useAuthRedirect(token);

  const [user, setUser] = useState({
    email: "info@bitpay.com",
    user_id: 12345,
    ref: {
      code: 'test'
    }
  });
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState({
    balance: 0,
    text: "Total Assets",
  });
  const [profileData, setProfileData] = useState({
    fiat: {
      balance: 0,
      currency: "USD",
      text: "Fiat Balance",
    },
    options: {
      balance: 0,
      currency: "USD",
      text: "Options Balance",
    },
    contracts: {
      balance: 0,
      currency: "USD",
      text: "Contracts Balance",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await profile(token);
        setUser(data);
        setProfileType({
          balance: data.balances.total,
          text: "Total Assets",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleSetProfileType = (type) => {
    if (type === "contracts") {
      setProfileType({
        balance: user.balances.contracts,
        text: "Contract Balance",
      });
    } else if (type === "fiat") {
      setProfileType({
        balance: user.balances.fiat,
        text: "Fiat Balance",
      });
    } else if (type === "options") {
      setProfileType({
        balance: user.balances.options,
        text: "Options Balance",
      });
    } else {
      setProfileType({
        balance: user.balances.total,
        text: "Total Balance",
      });
    }
  };

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
                  <span>{user.email}</span>
                  <span className="id">ID: {user.user_id}</span>
                </div>
              </div>
              <img className="profile__notification" src={notification} />
            </div>
            <div className="profile__info">
              <h3>{profileType.text ?? "Total"}</h3>
              <h1>${profileType.balance ?? 0}</h1>
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
          <div className="ref_box">
            <CopyToClipboardButton textToCopy={user.ref.code} />
          </div>
          <div className="profile_links mb-0" style={{ marginBottom: "0px" }}>
            <ul>
              <li>
                <div
                  className="flex"
                  onClick={() => handleSetProfileType("fiat")}
                >
                  <img src={transfer_alt} />
                  <span>Fiat Account</span>
                </div>
              </li>
              <li>
                <div
                  className="flex"
                  onClick={() => handleSetProfileType("contracts")}
                >
                  <img src={contract} />
                  <span>Contract Account</span>
                </div>
              </li>
              <li>
                <div
                  className="flex"
                  onClick={() => handleSetProfileType("options")}
                >
                  <img src={option} />
                  <span>Option Account</span>
                </div>
              </li>
            </ul>
          </div>
          <Links />
        </motion.div>
      )}
    </TabLayout>
  );
}
