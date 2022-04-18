import React, {useContext, useMemo, useRef, useState} from 'react'
import './index.less'
import Layout from "../../components/layout";
import {calcDays, calcQuota, getQueryString} from "../../utils";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {SFI} from "../../web3/address";
import {formatAmount, fromWei, toFormat} from "../../utils/format";
import {getNonce, getUserByAddress, getUserInfo} from "../../request/twitter";
import {useHistory, useLocation} from "react-router-dom";
import BaseInfo from "../../components/base-info";
import {useActiveWeb3React} from "../../web3";
import {Button, Spin} from "antd";
import BuyModal from "../../components/buy-modal";
import Web3 from "web3";
import {TransferModal} from "../../components/transfer-modal";
import {connect} from 'react-redux'
import {VarContext} from "../../context";
import {TASK_TYPE_LOOKUP} from "../../request";
import BigNumber from "bignumber.js";
import moment from "moment";
import CloseIcon  from '../../assets/images/svg/close.svg'

let timer = null
function My({updateCount}) {
  const buyModalRef = useRef()
  const {accountAirClaimed} = useContext(VarContext)
  const history = useHistory()
  const { account} = useActiveWeb3React()
  const location = useLocation()
  const [userData, setUserData] = useState({})
  const [showByModal, setShowByModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [loadLoading, setLoadLoading] = useState(false)

  const [unlockRemainingTime, setUnlockRemainingTime] = useState('-')

  useMemo(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      const now = moment.now()/1000
      if (userData.unlockEndOf > now){
        const last = userData.unlockEndOf - now
        const d = (last / 86400).toFixed(0)
        const h = ((last % 86400)/3600).toFixed(0)
        // const mm = ((last % 3600)/60).toFixed(0)
        // const s = (last % 60).toFixed(0)
        setUnlockRemainingTime(`${d} Days ${h} Hours`)
      } else {
        setUnlockRemainingTime('-')
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [userData.unlockEndOf])

  const getData = async () => {
    setLoadLoading(true)
    const referrer = getQueryString(location.search, 'referrer')
    const serverInfo = await getUserByAddress(account, referrer)
    const calcNonce = await getNonce(account)
    serverInfo.days = calcDays(serverInfo.userCreatedAt)
    serverInfo.calcNonce = calcNonce
    console.log('serverInfo', serverInfo)
    const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
    const calls = [
      contract.isCmpdOf(account),
      contract.price1(),
      contract.price2(),
      contract.balanceOf(account),
      contract.unlockEndOf(account),
      contract.lockedOf(account),
      contract.unlockedOf(account),
      contract.quotaOf(account),
      contract.gets([Web3.utils.stringToHex('discount')]),
      contract.calcForce({
        id: Web3.utils.padLeft(Web3.utils.numberToHex(serverInfo.twitterId), 64),
        createTime: ~~(new Date(serverInfo.userCreatedAt).getTime() / 1000),
        followers: serverInfo.followersCount,
        tweets: serverInfo.tweetCount
      }),
      contract.calcRebaseProfit(account)
    ]

    multicallClient(calls).then(data => {
      let [isCmpdOf, price1, price2, balanceOf, unlockEndOf, lockedOf, unlockedOf, quotaOf, [discount], force, [profit, ratio, period]] = data
      price1 = fromWei(price1, 18).toFixed(6)
      price2 = fromWei(price2, 18).toFixed(6)
      balanceOf = fromWei(balanceOf, 18).toFixed(2)
      lockedOf = fromWei(lockedOf, 18, 2).toFixed(2)
      unlockedOf = fromWei(unlockedOf, 18).toFixed(2)
      console.log('discount', discount)
      discount = fromWei(discount, 18).toFixed(4)
      profit = fromWei(profit, 18).toFixed(2)
      ratio = fromWei(ratio, 18).toFixed(4)

      const balanceOfValue = new BigNumber(balanceOf).multipliedBy(price2).toFormat(2)
      const priceDiscount = ((price2 - price1)/price2 * 100).toFixed(2) + '%'
      quotaOf = fromWei(quotaOf, 18).toFixed(0)
      setUserData({
        isCmpdOf, price2, balanceOf, unlockEndOf, lockedOf, unlockedOf, quotaOf, discount,
        balanceOfValue,
        priceDiscount,
        Influence: force,
        ...serverInfo,
        calcRebaseProfit: {
          profit,
          ratio,
          period
        }
      })
      console.log(userData)
      setLoadLoading(false)
    })
  }
  const onGetMore = () => {
    setShowByModal(true)
    setTimeout(() => {
      buyModalRef.current.setShowAddQuota(true)
    }, 300)
  }
  useMemo(() => {
    if (account) {
      getData()
    }
    if (accountAirClaimed === 0) {
      history.push('/airdrop')
    }
  }, [account, accountAirClaimed])

  return (
    <Layout>
      <div className="my-page layout-content-page custom-scroll">
        <Spin spinning={loadLoading}>
          <div className="my-page-main">
            <div className="my-page-main-u">
              <BaseInfo userData={userData}/>
            </div>
            <div className="u-info-data-v">
              <div className="u-info-data">
                  <div>Total Balance</div>
                  <div>{toFormat(userData.balanceOf, '-')}(${userData.balanceOfValue})</div>
                  <div><Button onClick={() => setShowByModal(true)}>Contribute</Button></div>

                  <div>Locked Balance</div>
                  <div>{toFormat(userData.lockedOf, '-')}</div>
                  <div></div>

                  <div>Unlocked Balance</div>
                  <div>{toFormat(userData.unlockedOf, '-')}</div>
                  <div><Button onClick={() => setShowTransferModal(true)}>Transfer</Button></div>

                  <div>Vesting Period</div>
                  <div>{unlockRemainingTime}</div>
                  <div><Button onClick={() => setShowByModal(true)}>Speed Up</Button></div>

                  <div>Purchase Quota</div>
                  <div>{toFormat(userData.quotaOf, '-')}</div>
                  <div><Button onClick={onGetMore}>Get more quota</Button></div>
                  {/*calcRebaseProfit*/}

                  <div>Next Rebase Reward</div>
                  <div> {toFormat(userData.calcRebaseProfit && userData.calcRebaseProfit.profit, '-')} SFI</div>
                  <div></div>
                </div>
            </div>
          </div>
        </Spin>
        {
          showByModal && <BuyModal userData={userData} visible={showByModal} ref={buyModalRef} onClose={() => setShowByModal(false)}
                                   onRefreshData={getData}/>
        }

        <TransferModal userData={userData} visible={showTransferModal} onClose={() => setShowTransferModal(false)} onRefreshData={getData}/>
      </div>
    </Layout>
  )
}

export default connect(state => state.reduxWeb3)(My)
