import React, {useMemo, useState} from 'react'
import {WooferFeedItemView} from "./style";
import {Tweet} from "react-twitter-widgets";
import Avatars from "../avatars";
import {CButton} from "../../theme/styleComponent";
import {useIsDarkMode} from "../../hooks";
import {useActiveWeb3React} from "../../web3";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {WOOF} from "../../web3/address";
import {useSelector} from "react-redux";
import {numToHex, stringToHex} from "../../utils/format";


export default function WooferFeedItem({tweet, setShowWoofUserModalFn, onWoofBtn}) {
  const {account} = useActiveWeb3React()
  const {updateCount} = useSelector(state => state.index)

  const [tweetLoading, setTweetLoading] = useState(true)
  const {darkMode} = useIsDarkMode()

  const getContractStaticData = () => {
    const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
    const tweetId = stringToHex(tweet.tweetId, 32)
    const calls = [
      // contract.APY(tweetId)
      contract.woofEndTime(tweetId)
    ]
    multicallClient(calls).then(res => {

    })
  }

  const getAccountData = () => {
    const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
    const tweetId = stringToHex(tweet.tweetId, 32)
    const calls = [
      contract.woofDog(tweetId, account),
      // contract.roi(tweetId, account)
    ]
    multicallClient(calls).then(res => {
      if (res[0] === null) {
        return
      }
      const [cowoofAmt, yieldPerToken, yield_, yieldPaid, rewoofAmt, rewardPerToken, reward, rewardPaid] = res[0]
      // console.log('resxxx', res)
    })
  }
  useMemo(() => {
    getContractStaticData()
  }, [updateCount])
  useMemo(() => {
    if (account){
      getAccountData()
    }
  }, [updateCount, account])

  useMemo(() => {
    setTweetLoading(true)
  }, [darkMode])
  return (
    <WooferFeedItemView>
      <div className="woofer-item">
        <div className="woofer-item-cs">
          <div>
            {
              tweetLoading && <div className="tweet-loading">loading...</div>
            }
            <Tweet tweetId={tweet.tweetId} options={{
              backgroundColor: '#ccc',
              theme: darkMode ? 'dark' : 'light',
              hideThread: false,
            }}
                   renderError={_err => "Could not load tweet! ...Your custom component here"}
                   onLoad={() => {
                     setTweetLoading(false)
                   }}
            />
          </div>
        </div>
        <div>
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
              <div className="flex-center" onClick={() => setShowWoofUserModalFn('Woofer', [tweet])}>
                <Avatars list={[tweet]}/>
                <span>Woofer</span>
              </div>
              <div className="flex-center" onClick={() => setShowWoofUserModalFn('Co-woof', tweet.cowoofs)}>
                <Avatars list={tweet.cowoofs}/>
                <span><span>{tweet.cowoofs.length}</span> Co-woof</span>
              </div>
              <div className="flex-center" onClick={() => setShowWoofUserModalFn('Rewoof', tweet.rewoofs)}>
                <Avatars list={tweet.rewoofs}/>
                <span><span>{tweet.rewoofs.length}</span> Rewoof</span>
              </div>
            </div>
            <div className="actions-btn flex-center">
              <CButton type="primary" ghost onClick={() => onWoofBtn('Co-woof', tweet)}>Co-woof</CButton>
              <CButton type="primary" ghost onClick={() => onWoofBtn('Rewoof', tweet)}>Rewoof</CButton>
            </div>
          </div>
        </div>
      </div>
    </WooferFeedItemView>
  )
}

