import React, {useContext, useMemo, useState} from 'react'
import {Link, NavLink, useLocation} from "react-router-dom";
import cs from 'classnames'
import './index.less'
import {ConnectWall} from "../connect-wallet";
import {useActiveWeb3React} from "../../web3";
import {formatAddress} from "../../utils/format";
import {VarContext} from "../../context";
import DashboardIconOn from '../../assets/images/svg/dashboard-icon-on.svg'
import DashboardIconOff from '../../assets/images/svg/dashboard-icon-off.svg'
import AirdropIconOn from '../../assets/images/svg/airdrop-icon-on.svg'
import AirdropIconOff from '../../assets/images/svg/airdrop-icon-off.svg'
import MyIconOn from '../../assets/images/svg/my-icon-on.svg'
import MyIconOff from '../../assets/images/svg/my-icon-off.svg'
import LOGO from '../../assets/images/logo.png'
import MenuIcon from '../../assets/images/svg/menu.svg'

const defaultRouterList = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: {
      on: DashboardIconOn,
      off: DashboardIconOff
    }
  },
]
export default function Layout({children}){
  const {accountAirClaimed} = useContext(VarContext)
  const location = useLocation()
  const [showConnectWallet, setShowConnectWallet] = useState(false)
  const {account} = useActiveWeb3React()
  const [myRouterList, setMyRouterList] = useState([])
  const routerList = [...defaultRouterList, ...myRouterList]
  useMemo(() => {
    // console.log('accountAirClaimed', accountAirClaimed)
    // if (account) {
      if (accountAirClaimed > 0){
        setMyRouterList([
          {
            name: 'My',
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
    <div className="layout-view">
      <div className="layout-menu">
        <div className="layout-menu-view">
          <NavLink to='/' className="layout-logo">
            <img src={LOGO} alt=""/>
            <span>SocialFi</span>
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
                <span>SocialFi</span>
              </NavLink>
            </div>
            <div className="header-center"></div>
            <div className="header-r flex-center">

              <div className="header-connect-wallet flex-center" onClick={() => setShowConnectWallet(true)}>
                {
                  account ? formatAddress(account) : 'Connect Wallet'
                }
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
    </div>
  )
}
