import React, {useContext, useMemo, useState} from 'react'
import './index.less'
import Layout from "../../components/layout";
import {Button, Input, message, Steps} from 'antd';
import {useActiveWeb3React} from "../../web3";
import {ConnectWall} from "../../components/connect-wallet";
import { SyncOutlined } from "@ant-design/icons";
import {Share} from 'react-twitter-widgets'
import {getUserInfo} from "../../request/twitter";
import { getHref, getQueryString} from "../../utils";
import {useHistory, useLocation} from "react-router-dom";
import {HASHTAG, TASK_TYPE_CLAIM, TASK_TYPE_LOOKUP} from "../../request/index";
import ClaimAirdropModal from "../../components/claim-airdrop-modal";
import BaseInfo from "../../components/base-info";
import {ERROR_MSG} from "../../request";
import {VarContext} from "../../context";
import cs from "classnames";
import SuccessIcon from '../../assets/images/svg/success.svg'

const { Step } = Steps;

export default function Airdrop(){
  const {account} = useActiveWeb3React()
  const history = useHistory()
  const {accountAirClaimed} = useContext(VarContext)
  const [step, setStep] = useState(0)
  const [showConnectWallet, setShowConnectWallet] = useState(false)
  const [showAirdropClaim, setShowAirdropClaim] = useState(false)
  const [userName, setUserName] = useState('')
  const [analyzeLoading, setAnalyzeLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [shareData, setShareData] = useState('#SocialFi Airdrop')

  const location = useLocation()
  const onAnalyze = (type, again) => {
    if (!userName || analyzeLoading){
      return
    }
    setAnalyzeLoading(true)
    const referrer = getQueryString(location.search, 'referrer')
    const params = {
      username: userName,
      account,
      type,
      referrer
    }
    return getUserInfo(params).then(data => {
      setAnalyzeLoading(false)
      if (data.twitterIdClaimed === 2) {
        message.error("The current user has already bound another address", 6)
      } else {
        setUserData(data)
        setStep(2)
      }
      return true
    }).catch(async (errorCode) => {
      if (!again){
        return await onAnalyze(type, true)
      } else {
        setAnalyzeLoading(false)
        console.log('errorCode', errorCode, ERROR_MSG[errorCode])
        if (errorCode === 701){
          message.error('Your tweets were not found')
        } else {
          message.error(ERROR_MSG[errorCode])
        }
        return false
      }
    })
  }

  const clickClaim = async () => {
    const ok = await onAnalyze(TASK_TYPE_CLAIM)
    if (ok){
      setShowAirdropClaim(true)
    }
  }

  useMemo(() => {
    setStep(account ? 1 : 0)
  }, [account])
  useMemo(() => {
    if (accountAirClaimed === 1) {
      history.push('/my')
    }
  }, [accountAirClaimed])

  // useMemo(() => {
  //   const onAnalyze_ = () =>{
  //     const visible = document.visibilityState === 'visible'
  //     if (step === 2 && visible && !analyzeLoading){
  //       onAnalyze(TASK_TYPE_CLAIM)
  //     }
  //   }
  //   document.addEventListener('visibilitychange', onAnalyze_)
  //   return () => {
  //     document.removeEventListener('visibilitychange', onAnalyze_)
  //   }
  // }, [step, analyzeLoading])


  return (
    <Layout>
      <div className="airdrop-page layout-content-page custom-scroll">
        <div className="airdrop-page-view">
          <div className="airdrop-steps">
            <div className={
              cs({
                'airdrop-step': true,
                'success': step > 0,
                'ing': step === 0
              })
            }>
              <div>
                <span>1</span>
                <img src={SuccessIcon} alt=""/>
              </div>
              <p>Connect Wallet</p>
            </div>
            <div className={
              cs({
                'airdrop-step-line': true,
                'success': step > 0,
              })
            }>
              <span/>
            </div>
            <div className={
              cs({
                'airdrop-step': true,
                'success': step > 1,
                'ing': step === 1
              })
            }>
              <div>
                <span>2</span>
                <img src={SuccessIcon} alt=""/>
              </div>
              <p>Analyze User Influence</p>
            </div>
            <div className={
              cs({
                'airdrop-step-line': true,
                'success': step > 1,
              })
            }>
              <span/>
            </div>
            <div className={
              cs({
                'airdrop-step': true,
                'success': step > 2,
                'ing': step === 2
              })
            }>
              <div>3</div>
              <p>Claim Airdrop</p>
            </div>
          </div>
          <div className="airdrop-main">
            {
              step === 0 && (
                <div className="content-wallet">
                  <Button type="primary" className="btn-primary" size="large" onClick={() => setShowConnectWallet(true)}>
                    Connect Wallet
                  </Button>
                </div>
              )
            }
            {
              step === 1 && (
                <div className="analyze-view">
                  <div className="analyze-twitter-input">
                    <Input placeholder="Twitter Username or Link (e.g. https://twitter.com/elonmusk" value={userName} onInput={(e) => setUserName(e.target.value)}/>
                    <Button type="primary" className="btn-primary" onClick={()=>onAnalyze(TASK_TYPE_LOOKUP)}>Analyze</Button>
                  </div>
                  <div className="loading-view">
                    {
                      analyzeLoading && (
                        <div className="loading">
                          <p><SyncOutlined spin /> analyzing...</p>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
            {
              step === 2 && (
                <div className="analyze-twitter-data">
                  <BaseInfo userData={userData} atClaim={true}/>
                  <Input.TextArea rows={4} value={shareData} onInput={e => setShareData(e.target.value)} placeholder="A great project"/>
                  <div className="share-claim">
                    <div className="tip-info">Tweeting @ other users will double your influence</div>
                    <div className="btn-group">
                    <span className="share-btn">
                    <Share url={getHref(userData.twitterId, userData.calcNonce)}
                           options={{size: "large", hashtags: HASHTAG, text: `${shareData}`}}/>
                    </span>
                      <Button onClick={clickClaim} className="btn-primary" loading={analyzeLoading}>Claim</Button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <ConnectWall visible={showConnectWallet} onClose={() => setShowConnectWallet(false)}/>
        <ClaimAirdropModal visible={showAirdropClaim} onClose={() => setShowAirdropClaim(false)} userData={userData}/>
      </div>
    </Layout>
  )
}