import React, {useMemo} from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.png'
import BannerImg from '../../assets/images/home/banner-img.svg'
import BannerImgMask from '../../assets/images/home/banner-img-mask.png'
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
    link: 'https://twitter.com/SocialFiLabs'
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

export default function Home() {
  useMemo(()=>{
    const referrer = getQueryString('referrer')
    console.log('referrer', referrer)
    if (referrer){
      sessionStorage.setItem('referrer', referrer)
    }
  }, [])
  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-header-c">
          <div className="home-logo">
            <img src={LOGO} alt=""/>
            SocialFi
          </div>
        </div>
      </div>
      <div className="home-banner">
        <div className="home-banner-title">
          <h2>The <span>SocialFi Token.</span></h2>
          <p>SocialFi is a token created to support and reward the everyday contributors on Twitter and progress educational and insightful content</p>
          <div className="home-banner-btn">
            <NavLink className="home-page-enter-app flex-center" to="/dashboard">Enter App</NavLink>
            <NavLink className="home-page-enter-app flex-center claim-airdrop-btn" to="/airdrop">Claim Airdrop</NavLink>
          </div>
        </div>
        <div className="home-banner-img">
          <div>
            <img className="home-banner-img-bg" src={BannerImgMask} alt=""/>
            <img src={BannerImg} alt=""/>
          </div>
        </div>
      </div>
      <div className="home-footer-img">
      </div>
      <div className="home-footer flex-center">
        <div className="links">
          {
            links.map((item, index) => (
              <a href={item.link} target="_blank" key={index}>
                <img src={item.icon} alt={item.name}/>
              </a>
            ))
          }
        </div>
        <p> SocialFi 2022. All rights reserved.</p>
      </div>
    </div>
  )
}
