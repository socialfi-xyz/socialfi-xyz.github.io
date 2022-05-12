import React, { useMemo, useRef, useState} from 'react'
import './index.less'
import Layout from "../../components/layout";
import {WOOF} from "../../web3/address";
import { toFormat} from "../../utils/format";
import {useHistory} from "react-router-dom";
import BaseInfo from "../../components/base-info";
import {Button, Spin} from "antd";
import BuyModal from "../../components/buy-modal";

import {TransferModal} from "../../components/transfer-modal";
import {useSelector} from 'react-redux'

import moment from "moment";

let timer = null
function My() {
  const buyModalRef = useRef()
  const {accountAirClaimed, twitterUserInfo} = useSelector(state => state.index)
  const history = useHistory()
  const [showByModal, setShowByModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)

  const [unlockRemainingTime, setUnlockRemainingTime] = useState('-')

  console.log('twitterUserInfo', twitterUserInfo)

  useMemo(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      const now = moment.now()/1000
      if (twitterUserInfo.unlockEndOf > now){
        const last = twitterUserInfo.unlockEndOf - now
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
  }, [twitterUserInfo.unlockEndOf])

  useMemo(() => {
    if (accountAirClaimed === 0) {
      history.push('/airdrop')
    }
  }, [accountAirClaimed])

  return (
    <Layout>
      <div className="my-page layout-content-page custom-scroll">
        <Spin spinning={!twitterUserInfo.twitterId}>
          <div className="my-page-main">
            <div className="my-page-main-u">
              <BaseInfo userData={twitterUserInfo}/>
            </div>
            <div className="u-info-data-v">
              <div className="u-info-data">
                  <div>Total Balance</div>
                  <div>{toFormat(twitterUserInfo.balanceOf, '-')}(${twitterUserInfo.balanceOfValue})</div>
                  <div><Button onClick={() => setShowByModal(true)}>Contribute</Button></div>

                  <div>Locked Balance</div>
                  <div>{toFormat(twitterUserInfo.lockedOf, '-')}</div>
                  <div></div>

                  <div>Unlocked Balance</div>
                  <div>{toFormat(twitterUserInfo.unlockedOf, '-')}</div>
                  <div><Button onClick={() => setShowTransferModal(true)}>Transfer</Button></div>

                  <div>Vesting Period</div>
                  <div>{unlockRemainingTime}</div>
                  <div>
                    <Button onClick={() => setShowByModal(true)}>Speed Up</Button>
                  </div>


                <div>Total Woof Rewards</div>
                <div>0 {WOOF.symbol}($0)</div>
                <div>
                  <Button onClick={() => {}}>Claim all</Button>
                </div>

                <div>Total Rewoof Rewards</div>
                <div>0 {WOOF.symbol}($0)</div>
                <div>
                  <Button onClick={() => {}}>Claim all</Button>
                </div>

                  <div>Next Rebase Reward</div>
                  <div> {toFormat(twitterUserInfo.calcRebaseProfit && twitterUserInfo.calcRebaseProfit.profit, '-')}(${0}) WOOF</div>
                  <div></div>
                </div>
            </div>
          </div>
        </Spin>
        {
          showByModal && <BuyModal twitterUserInfo={twitterUserInfo} visible={showByModal} ref={buyModalRef} onClose={() => setShowByModal(false)}/>
        }

        <TransferModal twitterUserInfo={twitterUserInfo} visible={showTransferModal} onClose={() => setShowTransferModal(false)}/>
      </div>
    </Layout>
  )
}

export default My
