import React, {useState} from 'react'
import {Modal} from 'antd'
import {getContract, useActiveWeb3React} from "../../web3";
import CloseIcon from "../../assets/images/svg/close.svg";
import {useDispatch, useSelector} from "react-redux";
import {GetRewardsModalView} from "./style";
import {keepDecimals, toFormat, tweetIdToHex} from "../../utils/format";
import {CButton} from "../../theme/styleComponent";
import {WOOF} from "../../web3/address";
import {UPDATE_COUNT} from "../../redux";

export function GetRewardsModal({visible, onClose, accountData, tweet}) {
  const {chainId, library, account} = useActiveWeb3React()
  const {woofPrice} = useSelector(state => state.index)
  const [cLoading, setCLoading] = useState(false)
  const [rLoading, setRLoading] = useState(false)
  const dispatch = useDispatch()
  const calcWoofVal = (amount) => {
    return toFormat(keepDecimals(amount * woofPrice))
  }
  const getCowoofRewards = () => {
    setCLoading(true)
    const contract = getContract(library, WOOF.abi, WOOF.address)
    contract.methods.getYield(
      tweetIdToHex(tweet.tweetId),
    ).send({
      from: account,
    })
      .on('receipt', (_) => {
        dispatch({type: UPDATE_COUNT})
        setCLoading(false)
      })
      .on('error', () => {
        setCLoading(false)
      })
  }
  const getRewoofRewards = () => {
    setRLoading(true)
    const contract = getContract(library, WOOF.abi, WOOF.address)
    contract.methods.getReward(
      tweetIdToHex(tweet.tweetId)
    ).send({
      from: account,
    })
      .on('receipt', (_) => {
        dispatch({type: UPDATE_COUNT})
        setRLoading(false)
      })
      .on('error', () => {
        setRLoading(false)
      })
  }
  return (
    <Modal
      title="Receive rewards"
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      wrapClassName="transfer-modal-wrap"
      zIndex={1001}
      destroyOnClose
      closeIcon={<img src={CloseIcon} alt=""/>}
    >
      <GetRewardsModalView>
        <div className="rewards-item">
          <p>Cowoof Rewards</p>
          <div>
            <span>{toFormat(accountData.yield_)} WOOF</span>
            <span>(${calcWoofVal(accountData.yield_)})</span>
          </div>
          {
            accountData.yield_ > 0 && <CButton type="primary" loading={cLoading} onClick={getCowoofRewards}>Claim</CButton>
          }
        </div>
        <div className="rewards-item">
          <p>Rewoof Rewards</p>
          <div>
            <span>{toFormat(accountData.reward)} WOOF</span>
            <span>(${calcWoofVal(accountData.reward)})</span>
          </div>
          {
            accountData.reward >0 && <CButton type="primary" loading={rLoading} onClick={getRewoofRewards}>Claim</CButton>
          }
        </div>
      </GetRewardsModalView>
    </Modal>
  )
}
