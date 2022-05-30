import React, {useMemo, useState} from 'react'
import {WooferFeedItemView} from "./style";
import {Tweet} from "react-twitter-widgets";
import Avatars from "../avatars";
import {CButton} from "../../theme/styleComponent";
import {useCountDown, useIsDarkMode} from "../../hooks";
import {getContract, useActiveWeb3React} from "../../web3";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {WOOF} from "../../web3/address";
import {useSelector} from "react-redux";
import {fromWei, keepDecimals, toFormat, tweetIdToHex} from "../../utils/format";
import LoadingIcon from '../../assets/images/svg/loading.svg'
import VirtualList from 'rc-virtual-list';
import {Avatar, List} from 'antd';
import Web3 from "web3";
import {GetRewardsModal} from "../get-rewards-modal";

function CountDown({endTime}) {
  const {day, hours, minutes} = useCountDown(endTime)
  if (day === 0 && hours === 0 && minutes === 0) {
    return 'End'
  }
  if (!endTime || endTime <= 0) {
    return <>{`- d - h - min`}</>
  }
  return <>{`${day} d ${hours} h ${minutes} min`}</>
}

function WoofTwitterList ({list}) {
  return (
    <div className="woof-twitter-list">
      <List>
        <VirtualList
          data={list}
          height={200}
          itemHeight={54}
          itemKey="twitterId"
        >
          {it => (
            <List.Item key={it.email}>
              <List.Item.Meta
                avatar={<Avatar src={it.accountTwitterData.avatar} style={{marginRight: '2px'}}/>}
                title={<span>{it.accountTwitterData.name}</span>}
                description={'@' + it.accountTwitterData.username}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  )
}

export default function WooferFeedItem({tweet, onWoofBtn, reportItemsData}) {
  const {account} = useActiveWeb3React()
  const {updateCount, woofPrice, accountAirClaimed} = useSelector(state => state.index)
  const [tweetLoading, setTweetLoading] = useState(true)
  const [showRewardsModal, setShowRewardsModal] = useState(false)
  const {darkMode} = useIsDarkMode()
  const [accountData, setAccountData] = useState({
    cowoofAmt: '0',
    yieldPerToken: '0',
    yield_: '0',
    yieldPaid: '0',
    rewoofAmt: '0',
    rewardPerToken: '0',
    reward: '0',
    rewardPaid: '0',
    roi: '0',
    earned: '0'
  })
  const [contractStateData, setContractStateData] = useState({
    APY: '0',
    woofEndTime: '0',
  })

  const getContractStaticData = async () => {
    const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
    const tweetId = tweetIdToHex(tweet.tweetId)
    const calls = [
      contract.woofEndTime(tweetId)
    ]
    const woofEndTime = await multicallClient(calls).then(res => {
      if (!res){
        return null
      }
      return res[0]
    })
    const web3 = new Web3(window.ethereum)
    const contract2 = new web3.eth.Contract(WOOF.abi, WOOF.address)
    const APY = await contract2.methods.APY(tweetId).call().catch(e => {})
    setContractStateData({
      woofEndTime: woofEndTime,
      APY: fromWei(APY||'0', 18).toString()
    })
    reportItemsData({
      tweetId: tweet.tweetId,
      woofEndTime: woofEndTime,
      APY: fromWei(APY||'0', 18).toString()
    })
  }


  const getAccountData = () => {
    const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
    const tweetId = tweetIdToHex(tweet.tweetId)
    const calls = [
      contract.woofDog(tweetId, account),
      contract.earned(tweetId, account),
      // contract.roi(tweetId, account),
    ]
    multicallClient(calls).then(res => {
      if (res[0] === null) {
        return
      }
      const [cowoofAmt, yieldPerToken, yield_, yieldPaid, rewoofAmt, rewardPerToken, reward, rewardPaid] = res[0]
      setAccountData({
        cowoofAmt: keepDecimals(fromWei(cowoofAmt, 10)),
        yieldPerToken: keepDecimals(fromWei(yieldPerToken, 10)),
        yield_: keepDecimals(fromWei(yield_, 10)),
        yieldPaid: keepDecimals(fromWei(yieldPaid, 10)),
        rewoofAmt: keepDecimals(fromWei(rewoofAmt, 10)),
        rewardPerToken: keepDecimals(fromWei(rewardPerToken, 10)),
        reward: keepDecimals(fromWei(reward, 10)),
        rewardPaid: keepDecimals(fromWei(rewardPaid, 10)),
        earned: keepDecimals(fromWei(res[1], 10)),
        // roi: keepDecimals(fromWei(res[2], 10)),
      })
    })
  }

  const calcWoofVal = (amount) => {
    return toFormat(keepDecimals(amount * woofPrice))
  }

  useMemo(() => {
    getContractStaticData()
  }, [updateCount])
  useMemo(() => {
    if (account && accountAirClaimed === 1) {
      getAccountData()
    }
  }, [updateCount, account, accountAirClaimed])

  useMemo(() => {
    setTweetLoading(true)
  }, [darkMode])
  const now = ~~(new Date().getTime()/1000)
  return (
    <WooferFeedItemView>
      <div className="woofer-item">
        <div className="woofer-item-cv">
          <div className="woofer-item-cs">
            <div>
              {
                tweetLoading && <div className="tweet-loading">
                  <img src={LoadingIcon} alt=""/>
                </div>
              }
              <Tweet tweetId={tweet.tweetId} options={{
                backgroundColor: '#ccc',
                theme: darkMode ? 'dark' : 'light',
                hideThread: false,
              }}
                     renderError={_err => {
                       return <div className="tweet-loading tweet-load-error">Could not load tweet!</div>
                     }}
                     onLoad={() => {
                       setTweetLoading(false)
                     }}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="woofer-item-info">
            <div className="woofer-item-info-data">
              <div className="woofer-item-info-data-i">
                <span>Remaining Period</span>
                <span><CountDown endTime={contractStateData.woofEndTime}/></span>
              </div>
              <div className="woofer-item-info-data-i">
                <span>7-day Return</span>
                <span>{(contractStateData.APY * 100).toFixed(2) * 1}%</span>
              </div>
              <div className="woofer-item-info-data-i">
                <span>Rewards</span>
                <span> {toFormat(keepDecimals(tweet.reward))} WOOF (${calcWoofVal(tweet.reward)})</span>
              </div>
              <div className="woofer-item-info-data-i">
                <span>Rewoof TVL</span>
                <span>{toFormat(keepDecimals(tweet.rewoofAmount))} WOOF (${calcWoofVal(tweet.rewoofAmount)})</span>
              </div>
              <div className="woofer-item-info-data-i">
                <span>Rewoofers</span>
                <span>{tweet.rewoofs.length}</span>
              </div>
              {
                account && <>
                {
                  (accountData.rewoofAmt > 0 || accountData.cowoofAmt > 0 || accountData.yield_ > 0 || accountData.reward > 0) && <h2 className="woofer-item-info-h2">Your Stats</h2>
                }
                  {
                    accountData.rewoofAmt > 0 && (<div className="woofer-item-info-data-i">
                      <span>Rewoof Amount</span>
                      <span>{toFormat(accountData.rewoofAmt)} WOOF (${calcWoofVal(accountData.rewoofAmt)})</span>
                    </div>)
                  }
                  {
                    accountData.cowoofAmt > 0 && (
                      <div className="woofer-item-info-data-i">
                        <span>Co-woof Amount</span>
                        <span>{toFormat(accountData.cowoofAmt)} WOOF (${calcWoofVal(accountData.cowoofAmt)})</span>
                      </div>
                    )
                  }
                  {
                    accountData.reward > 0 && (
                      <div className="woofer-item-info-data-i">
                        <span>Rewoof Rewards</span>
                        <span>{toFormat(accountData.reward)} WOOF (${calcWoofVal(accountData.reward)})</span>
                      </div>)
                  }
                  {
                    accountData.yield_ > 0 && (
                      <div className="woofer-item-info-data-i">
                        <span>Co-woof Rewards</span>
                        <span>{toFormat(accountData.yield_)} WOOF (${calcWoofVal(accountData.yield_)})</span>
                      </div>)
                  }
                </>
              }
            </div>
            <div className="woofer-item-partake">
              <div className="flex-center">
                <Avatars list={tweet.cowoofs}/>
                <span><span>{tweet.cowoofs.length}</span> Co-woofers</span>
                <WoofTwitterList list={tweet.cowoofs}/>
              </div>
              <div className="flex-center">
                <Avatars list={tweet.rewoofs}/>
                <span><span>{tweet.rewoofs.length}</span> Rewoofers</span>
                <WoofTwitterList list={tweet.rewoofs}/>
              </div>
            </div>
            {
              (account && accountAirClaimed === 1) && (
                <div className="actions-btn flex-center">
                  {
                    contractStateData.woofEndTime > now && (
                      <>
                        <CButton type="primary" ghost onClick={() => onWoofBtn('Co-woof', tweet)}>Co-woof</CButton>
                        <CButton type="primary" ghost onClick={() => onWoofBtn('Rewoof', tweet)}>Rewoof</CButton>
                      </>
                    )
                  }
                  {
                    (accountData.reward > 0 || accountData.yield_ > 0) &&
                    <CButton type="primary" ghost onClick={() => setShowRewardsModal(true)}>Receive
                      rewards</CButton>
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
      <GetRewardsModal visible={showRewardsModal} accountData={accountData} onClose={() => setShowRewardsModal(false)} tweet={tweet}/>
    </WooferFeedItemView>
  )
}

