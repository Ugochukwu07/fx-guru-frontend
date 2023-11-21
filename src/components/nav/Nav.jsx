import "./nav.scss";

import home from "#/assets/icons/home.svg";
import homealt from "#/assets/icons/home-alt.svg";
import assets from "#/assets/icons/assets.svg";
import assetsalt from "#/assets/icons/assets-alt.svg";
import trade from "#/assets/icons/trade.svg";
import tradealt from "#/assets/icons/trade-alt.svg";
// import settings from "#/assets/icons/settings.svg";
// import settingsalt from "#/assets/icons/settings-alt.svg";
import exchange from "../../assets/icons/ri_exchange-fill.svg";
import exchangealt from "../../assets/icons/ri_exchange.svg";
import { Link } from "react-router-dom";

export default function Nav(probs) {
  const navs = [
    {
      id: 1,
      to: "/",
      text: "Home",
      img: home,
      img2: homealt,
    },
    {
      id: 2,
      to: "/trade",
      text: "Trade",
      img: trade,
      img2: tradealt,
    },
    {
      id: 3,
      to: "/assets",
      text: "Assets",
      img: assets,
      img2: assetsalt,
    },
    {
      id: 4,
      to: "/exchange",
      text: "Exchange",
      img: exchangealt,
      img2: exchange,
    }
  ];

  const nav_links = navs.map((item) => {
    return (
        <div key={item.id} className="nav__item">
            <Link to={item.to}>
                {
                    item.text === "Home" ? (
                        <img src={probs.home ? item.img : item.img2} alt={item.text} />
                    ) : item.text === "Trade" ? (
                        <img src={probs.trade ? item.img : item.img2} alt={item.text} />
                    ) : item.text === "Exchange" ? (
                        <img src={probs.exchange ? item.img : item.img2} alt={item.text} />
                    ) : item.text === "Assets" ? (
                        <img
                        className="assets_img"
                        src={probs.assets ? item.img : item.img2}
                        alt={item.text}
                        />
                    ) : 'h'
                }
                <span>{item.text}</span>
            </Link>
        </div>
    );
  });

  return (
    <div className="nav flex">
      {nav_links}
    </div>
  );
}
