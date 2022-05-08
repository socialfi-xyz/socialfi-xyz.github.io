import React, {useContext, useMemo, useState} from 'react'
import {Link, NavLink, useLocation} from "react-router-dom";
import cs from 'classnames'
import {ConnectWall} from "../connect-wallet";
import {useActiveWeb3React} from "../../web3";
import {formatAddress} from "../../utils/format";
import HomeIconOn from '../../assets/images/svg/home-icon-on.svg'
import HomeIconOff from '../../assets/images/svg/home-icon-off.svg'
import AirdropIconOn from '../../assets/images/svg/airdrop-icon-on.svg'
import AirdropIconOff from '../../assets/images/svg/airdrop-icon-off.svg'
import MyIconOn from '../../assets/images/svg/my-icon-on.svg'
import MyIconOff from '../../assets/images/svg/my-icon-off.svg'
import LOGO from '../../assets/images/logo.svg'
import MenuIcon from '../../assets/images/svg/menu.svg'
import MoonIcon from '../../assets/images/svg/moon.svg'
import SunIcon from '../../assets/images/svg/sun.svg'
import {useSelector} from "react-redux";
import {useIsDarkMode} from "../../hooks";
import {LayoutView} from "./style";

const defaultRouterList = [
  {
    name: 'Home',
    path: '/home',
    icon: {
      on: HomeIconOn,
      off: HomeIconOff
    }
  },
]
export default function Layout({children}){
  const {accountAirClaimed} = useSelector(state => state.index)
  const location = useLocation()
  const [showConnectWallet, setShowConnectWallet] = useState(false)
  const {account} = useActiveWeb3React()
  const {changeDarkMode, darkMode} = useIsDarkMode()
  const [myRouterList, setMyRouterList] = useState([])
  const routerList = [...defaultRouterList, ...myRouterList]
  useMemo(() => {
    // console.log('accountAirClaimed', accountAirClaimed)
    // if (account) {
      if (accountAirClaimed > 0){
        setMyRouterList([
          {
            name: 'My Profile',
            path: '/my',
            icon: {
              on: MyIconOn,
              off: MyIconOff
            }
          }
        ])
      } else {
        setMyRouterList([
          {
            name: 'Claim Airdrop',
            path: '/airdrop',
            icon: {
              on: AirdropIconOn,
              off: AirdropIconOff
            }
          }
        ])
      }
    // }
  }, [accountAirClaimed, account])
  return (
    <LayoutView>
      <div className="layout-menu">
        <div className="layout-menu-view">
          <NavLink to='/' className="layout-logo">
            <img src={LOGO} alt=""/>
            <span>Woofer</span>
          </NavLink>
          {
            routerList.map((item) => (
              <Link to={item.path} key={item.name} className={cs({
                active: location.pathname && location.pathname.indexOf(item.path) === 0,
                "menu-item": true
              })}>
                <img src={item.icon[location.pathname && location.pathname.indexOf(item.path) === 0  ? 'on' : 'off']} alt=""/>
                {item.name}
              </Link>
            ))
          }
        </div>
      </div>
      <div className="layout-main">
        <div className="header-view">
          <div className="header">
            <div className="header-l">
              <NavLink to='/' className="layout-logo-h5">
                <img src={LOGO} alt=""/>
                <span>Woofer</span>
              </NavLink>
            </div>
            <div className="header-center"></div>
            <div className="header-r flex-center">

              <div className="header-connect-wallet flex-center" onClick={() => setShowConnectWallet(true)}>
                {
                  account ? formatAddress(account) : 'Connect Wallet'
                }
              </div>
              <div className="theme-switch flex-center" onClick={() => changeDarkMode(!darkMode)}>
                <img src={darkMode ? MoonIcon : SunIcon} alt=""/>
              </div>
              {/*<div className="header-lan-btn flex-center">*/}
              {/*  <img src={LanEN} alt=""/>*/}
              {/*</div>*/}
            </div>
          </div>

          <div className="header-router-h5">
            {
              routerList.map((item) => (
                <Link to={item.path} key={item.name} className={cs({
                  active: location.pathname && location.pathname.indexOf(item.path) === 0,
                  "menu-item": true,
                  "flex-center": true
                })}>
                  {item.name}
                </Link>
              ))
            }
          </div>
        </div>
        <div className="layout-content">
          {children}
        </div>
      </div>
      <ConnectWall visible={showConnectWallet} onClose={() => setShowConnectWallet(false)}/>
    </LayoutView>
  )
}
