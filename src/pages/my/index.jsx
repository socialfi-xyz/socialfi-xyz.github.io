import React, {useMemo, useState} from 'react'
import './style'
import Layout from "../../components/layout";
import {WOOF} from "../../web3/address";
import {fromWei, keepDecimals, toFormat, tweetIdToHex} from "../../utils/format";
import {useHistory} from "react-router-dom";
import BaseInfo from "../../components/base-info";
import {Button, message, Spin} from "antd";
import BuyModal from "../../components/buy-modal";

import {TransferModal} from "../../components/transfer-modal";
import {useSelector} from 'react-redux'

import moment from "moment";
import WooferFeed from "../../components/woofer-feed";
import {MyPage} from "./style";
import {getContract, useActiveWeb3React} from "../../web3";
import MsgSuccess from "../../assets/images/svg/msgSuccess.svg";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import BigNumber from "bignumber.js";

let timer = null

function My() {
  const {account, library} = useActiveWeb3React()
  const {accountAirClaimed, twitterUserInfo, woofPrice} = useSelector(state => state.index)
  const history = useHistory()
  const [showByModal, setShowByModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [userWoofFeed, setUserWoofFeed] = useState([])
  const [reWoofRewards, setReWoofRewards] = useState(0)
  const [coWoofRewards, setCoWoofRewards] = useState(0)
  const [reWoofIds, setReWoofIds] = useState([])
  const [coWoofIds, setCoWoofIds] = useState([])
  const [rLoading, setRLoading] = useState(false)
  const [cLoading, setCLoading] = useState(false)


  const [unlockRemainingTime, setUnlockRemainingTime] = useState('-')

  const calcWoofVal = (amount) => {
    if (!amount){
      return 0
    }
    return toFormat(keepDecimals(amount * woofPrice))
  }

  const getRewards = () => {
    setRLoading(true)
    const contract = getContract(library, WOOF.abi, WOOF.address)
    contract.methods.getRewards(reWoofRewards).send({
      from: account
    }).on('receipt', () => {
      setRLoading(false)
      message.success({
        content: 'claim success!',
        icon: <img src={MsgSuccess}/>
      })
    }).on('error', () => {
      setRLoading(false)

    })
  }
  const getYields = () => {
    setCLoading(true)
    const contract = getContract(library, WOOF.abi, WOOF.address)
    contract.methods.getYields(coWoofIds).send({
      from: account
    }).on('receipt', () => {
      setCLoading(false)
      message.success({
        content: 'claim success!',
        icon: <img src={MsgSuccess}/>
      })
    }).on('error', () => {
      setCLoading(false)
    })
  }

  useMemo(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      const now = moment.now() / 1000
      if (twitterUserInfo.unlockEndOf > now) {
        const last = twitterUserInfo.unlockEndOf - now
        const d = (last / 86400).toFixed(0)
        const h = ((last % 86400) / 3600).toFixed(0)
        // const mm = ((last % 3600)/60).toFixed(0)
        // const s = (last % 60).toFixed(0)
        setUnlockRemainingTime(`${d} Days ${h} Hours`)
      } else {
        setUnlockRemainingTime('-')
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [twitterUserInfo.unlockEndOf])

  useMemo(() => {
    if (accountAirClaimed === 0) {
      history.push('/airdrop')
    }
  }, [accountAirClaimed])

  useMemo(() => {
    if (userWoofFeed.length > 0) {
      const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
      const calls = []
      for (let i = 0; i < userWoofFeed.length; i++) {
        const tweetId = tweetIdToHex(userWoofFeed[i].tweetId)
        calls.push(contract.woofDog(tweetId, account))
      }
      multicallClient(calls).then(res => {
        let rewards = new BigNumber(0)
        let yields = new BigNumber(0)
        const rewardsIds_ = []
        const coWoofIds_ = []
        for (let i = 0; i < res.length; i++) {
          const [cowoofAmt, yieldPerToken, yield_, yieldPaid, rewoofAmt, rewardPerToken, reward, rewardPaid] = res[i]
          if (reward > 0) {
            rewards = rewards.plus(reward)
            rewardsIds_.push(tweetIdToHex(userWoofFeed[i].tweetId))
          }
          if (yield_ > 0) {
            yields = yields.plus(yield_)
            coWoofIds_.push(tweetIdToHex(userWoofFeed[i].tweetId))
          }
        }
        setReWoofRewards(fromWei(yields.toString(), WOOF.decimals))
        setCoWoofRewards(fromWei(rewards.toString(), WOOF.decimals))
        setReWoofIds(rewardsIds_)
        setCoWoofIds(coWoofIds_)
      })
    }


  }, [userWoofFeed])

  return (
    <Layout>
      <MyPage id="scrollableDiv">
        <WooferFeed type="account" setUserWoofFeed={setUserWoofFeed}>
          <Spin spinning={!twitterUserInfo.twitterId}>
            <div className="my-page-main">
              <div className="my-page-main-u">
                <BaseInfo userData={twitterUserInfo}/>
              </div>
              <div className="u-info-data-v">
                <div className="u-info-data">
                  <div className="u-info-data-item">

                    <div>Total Balance</div>
                    <div>{toFormat(twitterUserInfo.balanceOf, '-')} {WOOF.symbol} (${twitterUserInfo.balanceOfValue})</div>
                    {/*<div><Button onClick={() => setShowByModal(true)}>Contribute</Button></div>*/}
                  </div>
                  <div className="u-info-data-item">
                    <div>Locked Balance</div>
                    <div>{toFormat(twitterUserInfo.lockedOf, '-')} {WOOF.symbol} (${calcWoofVal(twitterUserInfo.lockedOf)})</div>
                    <div></div>
                  </div>
                  <div className="u-info-data-item">
                    <div>Unlocked Balance</div>
                    <div>{toFormat(twitterUserInfo.unlockedOf, '-')} {WOOF.symbol} (${calcWoofVal(twitterUserInfo.unlockedOf)})</div>
                    <div><Button onClick={() => setShowTransferModal(true)}>Transfer</Button></div>
                  </div>
                  <div className="u-info-data-item">
                    <div>Vesting Period</div>
                    <div>{unlockRemainingTime}</div>
                  </div>
                  <div className="u-info-data-item">

                    <div>Total Cowoof Rewards</div>
                    <div>{toFormat(coWoofRewards)} {WOOF.symbol} (${calcWoofVal(coWoofRewards)})</div>
                    <div>
                      {
                        coWoofIds.length > 0 && <Button onClick={getYields} loading={cLoading}>Claim all</Button>
                      }
                    </div>
                  </div>
                  <div className="u-info-data-item">
                    <div>Total Rewoof Rewards</div>
                    <div>{toFormat(reWoofRewards)} {WOOF.symbol} (${calcWoofVal(reWoofRewards)})</div>
                    <div>
                      {
                        reWoofIds.length > 0 && <Button onClick={getRewards} loading={rLoading}>Claim all</Button>
                      }
                    </div>
                  </div>
                  <div className="u-info-data-item">
                    <div>Next Rebase Reward</div>
                    <div> {toFormat(twitterUserInfo?.calcRebaseProfit?.profit, '-')} {WOOF.symbol} (${calcWoofVal(twitterUserInfo?.calcRebaseProfit?.profit)})
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
        </WooferFeed>
        {
          showByModal && <BuyModal twitterUserInfo={twitterUserInfo} visible={showByModal}
                                   onClose={() => setShowByModal(false)}/>
        }
        <TransferModal twitterUserInfo={twitterUserInfo} visible={showTransferModal}
                       onClose={() => setShowTransferModal(false)}/>
      </MyPage>
    </Layout>
  )
}

export default My
