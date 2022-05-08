import React, {useMemo, useState} from "react";
import ArrowDown2 from '../../assets/images/svg/arrow-down2.svg'
import Check from '../../assets/images/svg/check.svg'
import {useActiveWeb3React} from "../../web3";
import Avatars from '../avatars'
import {Button, Modal} from "antd";
import {WoofUserModal} from "../woof-user-modal";
import CloseIcon from "../../assets/images/svg/close.svg";
import ReplyDarkIcon from "../../assets/images/svg/reply_dark.svg";
import ReplyLightIcon from "../../assets/images/svg/reply_light.svg";
import RetweetDarkIcon from "../../assets/images/svg/retweet_dark.svg";
import RetweetLightIcon from "../../assets/images/svg/retweet_light.svg";
import LikeLightIcon from "../../assets/images/svg/like_light.svg";
import LikeDarkIcon from "../../assets/images/svg/like_dark.svg";
import ReWoof from "../re-woof";
import {WoofModal} from "../woof-modal";
import moment from "moment";
import {WooferFeedView} from './style'
import {useIsDarkMode} from "../../hooks";
import {CButton} from "../../theme/styleComponent";
import {useSelector} from "react-redux";
import Tweets from "../tweets";
import {getWoofData} from "../../request/thegraph";
import Web3 from "web3";
import {fromTwitterId} from "../../utils/format";

const FILTER_LIST = [
  {
    title: 'None',
    id: 0
  },
  {
    title: 'Start Time',
    id: 1
  },
  {
    title: 'Remaining Period',
    id: 2
  },
  {
    title: 'Highest APY',
    id: 3
  },
  {
    title: 'Highest Rewards',
    id: 4
  },
  {
    title: 'Highest Rewoof TVL',
    id: 5
  },
  {
    title: 'Highest Rewoofers',
    id: 6
  }
]

export default function WooferFeed() {
  const {darkMode} = useIsDarkMode()
  const [checked, setChecked] = useState(0)
  const {account} = useActiveWeb3React()

  const [coWoofItem, setCoWoofItem] = useState(null)
  // coWoof
  const [poolList, setPoolList] = useState([])
  const [showWoofUserModal, setShowWoofUserModal] = useState(false)
  const [woofType, setWoofType] = useState(null)

  const [woofUserModalData, setWoofUserModalData] = useState({
    title: '',
    list: []
  })
  const setShowWoofUserModalFn = (title, list) => {
    if (list.length === 0) {
      return
    }
    setWoofUserModalData({title, list})
    setShowWoofUserModal(true)
  }
  const getData = async () => {
    const poolList_ = await getWoofData()
    setPoolList(poolList_)
    console.log('poolList', poolList)
  }

  const onWoofBtn = (type, woof) => {
    setWoofType(type)
    console.log(woof)
    setCoWoofItem(woof)
  }

  useMemo(() => {
    getData()
  }, [])

  return (
    <>
      <WooferFeedView>
        <div className="woofer-feed-header">
          <div className="woofer-feed-header-l">Woofer Feed</div>
          <div className="filter-switch flex-center">
            Sort <img src={ArrowDown2} alt=""/>
            <div className="filter-switch-list">
              {
                FILTER_LIST.map((item) => (
                  <div key={item.id} onClick={() => setChecked(item.id)}>
                    <div>
                      {checked === item.id && <img src={Check} alt=""/>}
                    </div>
                    <div>
                      {item.title}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="woofer-list">
          {
            poolList.map((item) => (
              <div className="woofer-item" key={item.tweet_id}>
                <div className="woofer-item-cs">
                  <Tweets id={item.tweetId}/>
                  {/*<div className="woofer-item-tweet">*/}
                  {/*<div className="woofer-item-tweet-avatar">*/}
                  {/*  <img src={item.avatar} alt=""/>*/}
                  {/*</div>*/}
                  {/*<div className="woofer-item-tweet-c">*/}
                  {/*  <div className="woofer-item-tweet-c-head">*/}
                  {/*    <strong>{item.name}</strong>*/}
                  {/*    <span>@{item.username} · {moment(new Date(item.time * 1000)).format('MMM Do LT')}</span>*/}
                  {/*  </div>*/}
                  {/*  <div className="woofer-item-tweet-content custom-scroll">*/}
                  {/*    {item.content}*/}
                  {/*  </div>*/}
                  {/*  <div className="woofer-item-actions">*/}
                  {/*    <a target="_blank" href={`https://twitter.com/intent/tweet?in_reply_to=${item.tweet_id}`}><img src={darkMode ? ReplyDarkIcon : ReplyLightIcon} alt=""/>123</a>*/}
                  {/*    <a target="_blank" href={`https://twitter.com/intent/like?tweet_id=${item.tweet_id}`}><img src={darkMode ? RetweetDarkIcon : RetweetLightIcon} alt=""/>123</a>*/}
                  {/*    <a target="_blank" href={`https://twitter.com/intent/like?tweet_id=${item.tweet_id}`}><img src={darkMode ? LikeDarkIcon : LikeLightIcon} alt=""/>123</a>*/}
                  {/*    <a target="_blank"></a>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                </div>
                <div className="woofer-item-info">
                  <div className="woofer-item-info-data">
                    <div className="woofer-item-info-data-i">
                      <span>Remaining Period</span>
                      <span>48 hours 45 minutes</span>
                    </div>
                    <div className="woofer-item-info-data-i">
                      <span>7-day Return</span>
                      <span>150%</span>
                    </div>
                    <div className="woofer-item-info-data-i">
                      <span>Rewards</span>
                      <span>100,000 WOOF ($1000)</span>
                    </div>
                    <div className="woofer-item-info-data-i">
                      <span>Rewoof TVL</span>
                      <span>100,000 WOOF ($1000)</span>
                    </div>
                    <div className="woofer-item-info-data-i">
                      <span>Rewoofers</span>
                      <span>100</span>
                    </div>
                    {
                      account && <>
                        <div className="woofer-item-info-data-i">
                          <span>Your Rewoof Amount</span>
                          <span>1,000,000 WOOF ($1000)</span>
                        </div>
                        <div className="woofer-item-info-data-i">
                          <span>Your Woof Amount</span>
                          <span>70,000 WOOF ($700)</span>
                        </div>
                        <div className="woofer-item-info-data-i">
                          <span>Your Woof Rewards</span>
                          <span>70,000 WOOF ($700)</span>
                        </div>
                        <div className="woofer-item-info-data-i">
                          <span>Your Rewoof Rewards</span>
                          <span>70,000 WOOF ($700)</span>
                        </div>
                      </>
                    }
                    {
                      account && <>
                        <div className="woofer-item-info-data-i">
                          <span>Your Co-woof Amount</span>
                          <span>70,000 WOOF ($700)</span>
                        </div>
                        <div className="woofer-item-info-data-i">
                          <span>Your Co-woof Rewards</span>
                          <span>70,000 WOOF ($700)</span>
                        </div>
                      </>
                    }
                  </div>
                  <div className="woofer-item-partake">
                    <div className="flex-center" onClick={() => setShowWoofUserModalFn('Woofer', [item])}>
                      <Avatars list={[item]}/>
                      <span>Woofer</span>
                    </div>
                    <div className="flex-center" onClick={() => setShowWoofUserModalFn('Co-woof', item.cowoofs)}>
                      <Avatars list={item.cowoofs}/>
                      <span><span>{item.cowoofs.length}</span> Co-woof</span>
                    </div>
                    <div className="flex-center" onClick={() => setShowWoofUserModalFn('Rewoof', item.rewoofs)}>
                      <Avatars list={item.rewoofs}/>
                      <span><span>{item.rewoofs.length}</span> Rewoof</span>
                    </div>
                  </div>
                  <div className="actions-btn flex-center">
                    <CButton type="primary" ghost onClick={() => onWoofBtn('Co-woof', item)}>Co-woof</CButton>
                    <CButton type="primary" ghost onClick={() => onWoofBtn('Rewoof', item)}>Rewoof</CButton>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <WoofUserModal list={woofUserModalData.list} title={woofUserModalData.title}
                       onClose={() => setShowWoofUserModal(false)}
                       visible={showWoofUserModal}/>
        <WoofModal visible={!!woofType} onClose={() => setWoofType(null)} woofType={woofType} coWoofItem={coWoofItem}/>
      </WooferFeedView>
    </>
  )
}
