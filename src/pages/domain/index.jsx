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
import {getQueryString} from "../../utils";
import {DomainPage} from "./style";
import {useIsDarkMode} from "../../hooks";

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
