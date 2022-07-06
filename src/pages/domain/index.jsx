import React, {useMemo} from 'react'
import LOGO from '../../assets/images/logo.svg'
import BannerImg from '../../assets/images/domain/banner-img.svg'
import BannerImgMask from '../../assets/images/domain/banner-img-mask.png'
import TwitterDark from '../../assets/images/links/twitter_dark.svg'
import TwitterLight from '../../assets/images/links/twitter_light.svg'
import DiscordDark from '../../assets/images/links/discord_dark.svg'
import DiscordLight from '../../assets/images/links/discord_light.svg'
import GithubDark from '../../assets/images/links/github_dark.svg'
import GithubLight from '../../assets/images/links/github_light.svg'
import GitbookDark from '../../assets/images/links/gitbook_dark.svg'
import GitbookLight from '../../assets/images/links/gitbook_light.svg'
import {NavLink} from "react-router-dom";
import {DomainPage} from "./style";
import {useIsDarkMode} from "../../hooks";
import FooterDarkBg from '../../assets/images/domain/footer-bg_dark.svg'
import FooterLightBg from '../../assets/images/domain/footer-bg_light.svg'
import WhatWoofer1 from '../../assets/images/domain/what-woofer-icon1.svg'
import WhatWoofer2 from '../../assets/images/domain/what-woofer-icon2.svg'
import WhatWoofer from '../../assets/images/domain/what-woofer.svg'
import WhatWooferD from '../../assets/images/domain/what-woofer_d.svg'
import HowWoofer from '../../assets/images/domain/how-woofer.svg'
import HowWooferD from '../../assets/images/domain/how-woofer_d.svg'

import HowWoofer1 from '../../assets/images/domain/how-woofer-icon1.svg'
import HowWoofer2 from '../../assets/images/domain/how-woofer-icon2.svg'
import HowWoofer3 from '../../assets/images/domain/how-woofer-icon3.svg'
import HowWoofer1D from '../../assets/images/domain/how-woofer-icon1_d.svg'
import HowWoofer2D from '../../assets/images/domain/how-woofer-icon2_d.svg'
import HowWoofer3D from '../../assets/images/domain/how-woofer-icon3_d.svg'
import ArrowDown from '../../assets/images/domain/arrow-d.svg'
const links = [
  {
    name: 'Twitter',
    icon: {
      dark: TwitterDark,
      light: TwitterLight
    },
    link: 'https://twitter.com/WooferLabs'
  },
  // {
  //   name: 'Medium',
  //   icon: Medium,
  //   link: ''
  // },
  {
    name: 'Discord',
    icon: {
      dark: DiscordDark,
      light: DiscordLight
    },
    link: 'https://discord.gg/jE8WbqCmTq'
  },
  // {
  //   name: 'Telegram',
  //   icon: Telegram,
  //   link: ''
  // },
  {
    name: 'Gitbook',
    icon: {
      dark: GitbookDark,
      light: GitbookLight
    },
    link: 'https://socialfixyz.gitbook.io/socialfi/'
  },
  {
    name: 'Github',
    icon: {
      dark: GithubDark,
      light: GithubLight
    },
    link: 'https://github.com/socialfi-xyz/socialfi-xyz.github.io'
  },



]

export default function Domain() {
  const {darkMode, changeDarkMode} = useIsDarkMode()
  return (
    <DomainPage darkMode={darkMode}>
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
          <h2>The <span>SocialFi Token.</span></h2>
          <p>Woofer is a token created to support and reward the everyday contributors on Twitter and progress educational and insightful content</p>
          <div className="domain-banner-btn">
            <NavLink className="domain-page-enter-app flex-center" to="/home">Enter App</NavLink>
            <NavLink className="domain-page-enter-app flex-center claim-airdrop-btn" to="/airdrop">Claim Airdrop</NavLink>
          </div>
        </div>
        <div className="domain-banner-img">
          <div>
            <img className="domain-banner-img-bg" src={BannerImgMask} alt=""/>
            <img src={BannerImg} alt="" className="domain-banner-img-c"/>
          </div>
        </div>
      </div>
      <div className="domain-footer-img">
        <img src={darkMode ? FooterDarkBg : FooterLightBg} alt=""/>
      </div>
      <div className="what-woofer">
        <div className="box-show-lt"></div>
        <h1 className="what-woofer-title">
          What is the mission of Woofer?
        </h1>
        <div className="what-woofer-card-b">
          <div className="what-woofer-card-m">
            <div className="what-woofer-card">
              <div className="what-woofer-card-icon">
                <img src={WhatWoofer1} alt=""/>
              </div>
              <div className="what-woofer-card-desc">
                The mission of Woofer is to curate a community that supports educational content on blockchain and is eventually able to use the token to support promising projects. Beyond CT, however, there are many non-blockchain native accounts on Twitter that continue to educate, support others, and allow users to feel socially connected. Woofer aims to reward these contributors as well and encourage them to participate in the blockchain space.
              </div>
              <img src={WhatWoofer2} className="what-woofer-icon-rb" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div className="how-woofer-main">
        <div className="how-woofer-r-b"/>
        <div className="how-woofer">
          <h1 className="how-woofer-title">How to use Woofer</h1>
          <div className="how-woofer-box">
            <div className="how-woofer-box-item">
              <img src={darkMode ? HowWoofer1D : HowWoofer1} alt="" className="item-icon"/>
              <h1>Woof</h1>
              <p>Tweet through Woofer</p>
              <img src={ArrowDown} alt="" className="arrow-down"/>
              <p>Create reward pool</p>
              <img src={ArrowDown} alt="" className="arrow-down"/>
              <p>Receive rewards</p>
            </div>
            <div className="how-woofer-box-item">
              <img src={darkMode ? HowWoofer2D : HowWoofer2} alt="" className="item-icon"/>
              <h1>Cowoof</h1>
              <p>Share someone else’s tweet through Woofer</p>
              <img src={ArrowDown} alt="" className="arrow-down"/>
              <p>Create reward pool</p>
              <img src={ArrowDown} alt="" className="arrow-down"/>
              <p>Receive rewards</p>
            </div>
            <div className="how-woofer-box-item">
              <img src={darkMode ? HowWoofer3D : HowWoofer3} alt="" className="item-icon"/>
              <h1>Rewoof</h1>
              <p>Support someone’s tweet through Woofer</p>
              <img src={ArrowDown} alt="" className="arrow-down"/>
              <p>Contribute tokens</p>
              <img src={ArrowDown} alt="" className="arrow-down"/>
              <p>Receive rewards</p>
            </div>
          </div>
        </div>
      </div>
      <div className="domain-footer flex-center">
        <div className="links">
          {
            links.map((item, index) => (
              <a href={item.link} target="_blank" key={index}>
                <img src={darkMode ? item.icon.dark : item.icon.light} alt={item.name}/>
              </a>
            ))
          }
        </div>
        <p> Woofer 2022. All rights reserved.</p>
      </div>
    </DomainPage>
  )
}
