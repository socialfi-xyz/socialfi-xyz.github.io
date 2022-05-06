import React, {useState} from "react";
import './index.less'
import ArrowDown2 from '../../assets/images/svg/arrow-down2.svg'
import Check from '../../assets/images/svg/check.svg'
import {useActiveWeb3React} from "../../web3";
import Avatars from '../avatars'
import {Button, Modal} from "antd";
import {WoofUserModal} from "../woof-user-modal";
import CloseIcon from "../../assets/images/svg/close.svg";
import ReplyIcon from "../../assets/images/svg/reply.svg";
import RetweetIcon from "../../assets/images/svg/retweet.svg";
import LikeIcon from "../../assets/images/svg/like.svg";
import ReWoof from "../re-woof";
import {WoofModal} from "../woof-modal";
import moment from "moment";

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
  const [checked, setChecked] = useState(0)
  const {account} = useActiveWeb3React()
  const [woofer, setWoofer] = useState([
    {
      avatar: 'https://avatars.githubusercontent.com/u/7843281?s=40&v=4',
      name: "xx xxx",
      username: 'xxx_xx'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/13673257?s=40&v=4',
      name: "aa xxx",
      username: 'xxx_aa'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/7504237?s=40&v=4',
      name: "xx xxx",
      username: 'xxx_xx'
    }
  ])
  const [poolList, setPoolList] = useState([
    {
      avatar: 'https://avatars.githubusercontent.com/u/13673257?s=40&v=4',
      name: "aa xxx",
      username: 'xxx_aa',
      time: 1651747098,
      content: 'Good Project https://t.co/nbF6g6R3t1 #swithpokemon @xxx',
      tweet_id: '495719809695621121'
    }
  ])
  const [showWoofUserModal, setShowWoofUserModal] = useState(false)
  const [showWoofModal, setShowWoofModal] = useState(false)
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
  return (
    <>
      <div className="woofer-feed">
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
                  <div className="woofer-item-tweet">
                    <div className="woofer-item-tweet-avatar">
                      <img src={item.avatar} alt=""/>
                    </div>
                    <div className="woofer-item-tweet-c">
                      <div className="woofer-item-tweet-c-head">
                        <strong>{item.name}</strong>
                        <span>@{item.username} · {moment(new Date(item.time * 1000)).format('MMM Do LT')}</span>
                      </div>
                      <div className="woofer-item-tweet-content custom-scroll">
                        {item.content}
                      </div>
                      <div className="woofer-item-actions">
                        <a target="_blank" href={`https://twitter.com/intent/tweet?in_reply_to=${item.tweet_id}`}><img src={ReplyIcon} alt=""/>123</a>
                        <a target="_blank" href={`https://twitter.com/intent/like?tweet_id=${item.tweet_id}`}><img src={RetweetIcon} alt=""/>123</a>
                        <a target="_blank" href={`https://twitter.com/intent/like?tweet_id=${item.tweet_id}`}><img src={LikeIcon} alt=""/>123</a>
                        <a target="_blank"></a>
                      </div>
                    </div>
                  </div>
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
                    <div className="flex-center" onClick={() => setShowWoofUserModalFn('Woofer', [woofer[0]])}>
                      <Avatars list={[woofer[0]]}/>
                      <span>Woofer</span>
                    </div>
                    <div className="flex-center" onClick={() => setShowWoofUserModalFn('Co-woof', woofer)}>
                      <Avatars list={woofer}/>
                      <span><span>8</span> Co-woof</span>
                    </div>
                    <div className="flex-center" onClick={() => setShowWoofUserModalFn('Rewoof', woofer)}>
                      <Avatars list={woofer}/>
                      <span><span>100</span> Rewoof</span>
                    </div>
                  </div>
                  <div className="actions-btn flex-center">
                    <Button type="primary" ghost onClick={() => setWoofType('Co-woof')}>Co-woof</Button>
                    <Button type="primary" ghost onClick={() => setWoofType('Rewoof')}>Rewoof</Button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <WoofUserModal list={woofUserModalData.list} title={woofUserModalData.title}
                       onClose={() => setShowWoofUserModal(false)}
                       visible={showWoofUserModal}/>
        <WoofModal visible={!!woofType} onClose={() => setWoofType(null)} woofType={woofType}/>
      </div>
    </>
  )
}
