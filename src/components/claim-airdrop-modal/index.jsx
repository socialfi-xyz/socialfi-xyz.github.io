import React, {useMemo, useState} from 'react'
import {Modal, Checkbox, Button, Input, message} from 'antd'
import {useWeb3React as useWeb3ReactCore} from '@web3-react/core'
import './index.less'
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {getContract, getWeb3} from "../../web3";
import {SFI} from "../../web3/address";
import {fromWei, numToWei, toFormat} from "../../utils/format";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import {useHistory} from 'react-router-dom'
import {connect} from "react-redux";
import {changeUpdateCount} from "../../redux/actions/web3";
import CloseIcon from "../../assets/images/svg/close.svg";
import {getNodeSign} from "../../request/twitter";

function ClaimAirdropModal({visible, onClose, userData, params, changeUpdateCount}) {
  const {chainId, library, account} = useWeb3ReactCore()
  const [checkedBuy, setCheckedBuy] = useState(false)
  const [ethValve, setETHValve] = useState(null)
  const [ethBalance, setETHBalance] = useState(0)
  const [claimLoading, setClaimLoading] = useState(false)
  const [quota, setQuota] = useState('-')
  const history = useHistory()

  const getETHBalance = () => {
    multicallClient.getEthBalance(account, multicallConfig.defaultChainId).then(data => {
      setETHBalance(fromWei(data, 18).toFixed(6) * 1)
    })
  }

  const getData = () => {
    const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
    const calls = [
      contract.gets([Web3.utils.stringToHex('discount')])
    ]
    multicallClient(calls).then(data => {
      setQuota(fromWei(data[0][0], 18)*100 + '%')
    })
  }

  const onClaim = async () => {
    if (claimLoading) {
      return
    }
    let buyValue = '0'
    if (checkedBuy) {
      if (!ethValve){
        return
      }
      buyValue = numToWei(new BigNumber(ethValve).toFixed(18), 18).toString()
    }
    setClaimLoading(true)
    // const callContract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
    // const nonceOf = await multicallClient([callContract.nonceOf(account)]).then(data => data[0])
    const contract = getContract(library, SFI.abi, SFI.address)
    const signData = await getNodeSign(params)
    const tokenContract = new ClientContract(SFI.abi, SFI.address)
    const tokenNonce = await multicallClient([
      tokenContract.nonceOf(account)
    ]).then(data => data[0])
    console.log('signData', signData)
    contract.methods.airClaim(signData.referrer, tokenNonce, signData.twitters, signData.signatureList).send({
      from: account,
      value: buyValue
    }).on('transactionHash', hash => {
    })
    .on('receipt', (_, receipt) => {
      changeUpdateCount()
      message.success("success")
      setClaimLoading(false)
    })
    .on('error', (err, receipt) => {
      setClaimLoading(false)
    })

  }
  const changeETHValue = (e) => {
    if (!checkedBuy) {
      setCheckedBuy(true)
    }
    setETHValve(e.target.value)
  }
  const onMax = () => {
    if (ethBalance > 0.1) {
      if (!checkedBuy) {
        setCheckedBuy(true)
      }
      setETHValve((ethBalance - 0.1).toFixed(6) * 1)
    }
  }
  useMemo(() => {
    if (account) {
      getETHBalance()
      getData()
    }
  }, [account])
  return (
    <React.Fragment>
      <Modal
        title="Claim"
        visible={visible}
        footer={null}
        onCancel={onClose}
        centered
        wrapClassName="claim-airdrop-wrap"
        zIndex={1001}
        destroyOnClose
        closeIcon={<img src={CloseIcon} alt=""/>}
      >
        {
          userData && (
            <div className="claim-airdrop-dialog">
              <div className="claim-data">
                <div>Influence: {toFormat(userData.Influence)}</div>
                <div>Additional influence score: {userData.mentionsAmount}</div>
                <div>Available to claim: {userData.availableClaim}</div>
              </div>
              {
                false && <div className="buy-view">
                  <p className="p-t">Available quota: {userData.quotaOf}</p>
                  <div>
                    <Checkbox onChange={e => setCheckedBuy(e.target.checked)} checked={checkedBuy}><span style={{whiteSpace: 'nowrap'}}>Buy SFI</span></Checkbox>
                    <div className="input-eth">
                      <Input type="number" value={ethValve} onInput={changeETHValue}
                             onBlur={e => (e.target.value * 1 + 0.1) > ethBalance && onMax()} placeholder="1 ETH"/>
                      <div className="input-menu">
                        {/*<span>ETH</span>*/}
                        <Button size="small" onClick={onMax}>MAX</Button>
                      </div>
                    </div>
                  </div>
                  <p className="p-b">Currently balance： {ethBalance} ETH</p>
                </div>
              }
              <div className="btn-submit">
                <Button type="primary" onClick={onClaim} style={{width: '100%'}} loading={claimLoading}>
                  {checkedBuy ? 'Claim & Buy' : 'Claim'}
                </Button>
              </div>
            </div>
          )
        }
      </Modal>
    </React.Fragment>
  )
}

export default connect(
  state => state.reduxWeb3, {
    changeUpdateCount
  }
)(ClaimAirdropModal)
