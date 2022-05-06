import React, {useMemo} from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.svg'
import BannerImg from '../../assets/images/domain/banner-img.svg'
import BannerImgMask from '../../assets/images/domain/banner-img-mask.png'
import Twitter from '../../assets/images/links/twitter.svg'
import Medium from '../../assets/images/links/medium.svg'
import Discord from '../../assets/images/links/discord.svg'
import Telegram from '../../assets/images/links/telegram.svg'
import Github from '../../assets/images/links/github.svg'
import Gitbook from '../../assets/images/links/gitbook.svg'
import {NavLink} from "react-router-dom";
import {getQueryString} from "../../utils";
import Web3 from "web3";

const links = [
  {
    name: 'Twitter',
    icon: Twitter,
    link: 'https://twitter.com/WooferLabs'
  },
  // {
  //   name: 'Medium',
  //   icon: Medium,
  //   link: ''
  // },
  {
    name: 'Discord',
    icon: Discord,
    link: 'https://discord.gg/jE8WbqCmTq'
  },
  // {
  //   name: 'Telegram',
  //   icon: Telegram,
  //   link: ''
  // },
  {
    name: 'Gitbook',
    icon: Gitbook,
    link: 'https://socialfixyz.gitbook.io/socialfi/'
  },
  {
    name: 'Github',
    icon: Github,
    link: 'https://github.com/socialfi-xyz/socialfi-xyz.github.io'
  },



]

export default function Domain() {
  useMemo(()=>{
    const referrer = getQueryString('referrer')
    console.log('referrer', referrer)
    if (referrer){
      sessionStorage.setItem('referrer', referrer)
    }
  }, [])
  return (
    <div className="domain-page">
      <div className="domain-header">
        <div className="domain-header-c">
          <div className="domain-logo">
            <img src={LOGO} alt=""/>
            Woofer
          </div>
        </div>
      </div>
      <div className="domain-banner">
        <div className="domain-banner-title">
          <h2>The <span>Woofer Token.</span></h2>
          <p>Woofer is a token created to support and reward the everyday contributors on Twitter and progress educational and insightful content</p>
          <div className="domain-banner-btn">
            <NavLink className="domain-page-enter-app flex-center" to="/home">Enter App</NavLink>
            <NavLink className="domain-page-enter-app flex-center claim-airdrop-btn" to="/airdrop">Claim Airdrop</NavLink>
          </div>
        </div>
        <div className="domain-banner-img">
          <div>
            <img className="domain-banner-img-bg" src={BannerImgMask} alt=""/>
            <img src={BannerImg} alt=""/>
          </div>
        </div>
      </div>
      <div className="domain-footer-img">
      </div>
      <div className="domain-footer flex-center">
        <div className="links">
          {
            links.map((item, index) => (
              <a href={item.link} target="_blank" key={index}>
                <img src={item.icon} alt={item.name}/>
              </a>
            ))
          }
        </div>
        <p> Woofer 2022. All rights reserved.</p>
      </div>
    </div>
  )
}
