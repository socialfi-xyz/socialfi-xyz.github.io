import React, {useMemo, useState} from 'react'
import {Modal, Checkbox, Button, Input, message} from 'antd'
import {useWeb3React as useWeb3ReactCore} from '@web3-react/core'
import './index.less'
import { Steps } from 'antd';
import {Share} from "react-twitter-widgets";

import {getNodeSign, getUserInfo} from "../../request/twitter";
import {getHref} from "../../utils";
import {HASHTAG, TASK_TYPE_QUOTA} from "../../request";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {SFI} from "../../web3/address";
import {fromWei} from "../../utils/format";
import CloseIcon from "../../assets/images/svg/close.svg";
const { Step } = Steps;
export function AddQuotaModal({visible, onClose, userData, getMoreTwitters}) {
  const {account} = useWeb3ReactCore()
  const [current, setCurrent] = useState(0)
  const [shareData, setShareData] = useState("Good project @BTCTN ")
  const [loading, setLoading] = useState(false)
  const calcQuota = async (twitters) => {
    const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
    const calls = [
      contract.calcQuota(twitters)
    ]
    return multicallClient(calls).then(data => fromWei(data[0], 18).toFixed(2))
  }

  const queryQuota = (again) => {
    if (loading){
      return
    }
    setLoading(true)
    const params = {
      username: userData.username,
      account,
      type: TASK_TYPE_QUOTA,
      calcNonce: userData.calcNonce
    }
    getUserInfo(params).then(async data => {
      console.log(data)
      if (!data.sign) {
        message.warn("Not found you @ more users")
        return
      }
      const moreQuota = await calcQuota(data.sign.twitters)
      const signData = await getNodeSign(params)
      signData.moreQuota = moreQuota
      console.log('signData', signData)
      getMoreTwitters(signData)
      setLoading(false)
      onClose()
    }).catch(() => {
      if (!again){
        queryQuota(true)
      } else {
        setLoading(false)
        message.warn("Your tweets were not found")
      }
    })
  }

  const updateCurrent = () => {
    setCurrent(1)
  }

  useMemo(()=>{
    if (visible){
      document.addEventListener('visibilitychange', updateCurrent)
    } else {
      setCurrent(0)
      document.removeEventListener('visibilitychange', updateCurrent)
    }
  }, [visible])
  return (
    <React.Fragment>
      <Modal
        title="Add quota"
        visible={visible}
        footer={null}
        onCancel={onClose}
        centered
        wrapClassName="add-quota-wrap"
        zIndex={1001}
        destroyOnClose
        closeIcon={<img src={CloseIcon} alt=""/>}
      >
        {
            <div className="add-quota-dialog">
              <Steps direction="vertical" size="small" current={current}>
                <Step title="Send a tweet to @ more users" description={
                  <div className="share-btn">
                  <Share className="share" url={getHref(userData.twitterId, userData.calcNonce)}
                         options={{size: "large", hashtags: HASHTAG, text: `${shareData}`}} />
                  </div>} />
                <Step title="Receive quota" description={<Button onClick={()=>queryQuota()} loading={loading} className="btn-primary">Get quota and use</Button>} />
              </Steps>
            </div>
        }
      </Modal>
    </React.Fragment>
  )
}
