import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react'
import {Modal, Button, Input, message, Select} from 'antd'
import './index.less'
import { ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {getContract, useActiveWeb3React} from "../../web3";
import {ADDRESS_INFINITY, WOOF} from "../../web3/address";
import {formatAmount, numToWei} from "../../utils/format";

import Web3 from "web3";
import ERC20Abi from '../../web3/abi/ERC20.json'
import CloseIcon from "../../assets/images/svg/close.svg";
import ArrowDown from '../../assets/images/svg/arrow-down.svg'
import ArrowDown2 from '../../assets/images/svg/arrow-down2.svg'
import ArrowDown2Dark from '../../assets/images/svg/arrow-down2_d.svg'
import {permitSign} from "../../web3/sign";
import {useDispatch, useSelector} from "react-redux";
import {TWITTER_USER_INFO_RELY, UPDATE_COUNT} from "../../redux";
import {CButton, CInput, STInput} from "../../theme/styleComponent";
import {useIsDarkMode} from "../../hooks";
import {BuyModalView} from "./style";


function BuyModal({visible, onClose}, ref) {
  const { library, account} = useActiveWeb3React()
  const [tokenValve, setTokenValve] = useState(null)
  const {darkMode} = useIsDarkMode()

  const {twitterUserInfo} = useSelector(state => state.index)
  const [buyOut, setBuyOut] = useState('0')
  const [buyMoreSign, setBuyMoreSign] = useState(null)
  const {superBuyTokenList} = useSelector(state => state.index)
  const dispatch = useDispatch()

  const [buyToken, setBuyToken] = useState(superBuyTokenList[0].symbol)
  const [permitSignData, setPermitSignData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getBuyTokenData = () => (superBuyTokenList.filter(item => item.symbol === buyToken))[0]
  const buyTokenData = getBuyTokenData()

  const refreshData = () => {
    setBuyMoreSign(null)
    dispatch({
      type: TWITTER_USER_INFO_RELY
    })
    onClose()
  }

  const onPermitSign = async () => {
    if (!tokenValve || tokenValve <= 0){
      return
    }
    const sv = await permitSign(tokenValve, account, buyTokenData)
    setPermitSignData(sv)
  }
  const onApprove = () => {
    setLoading(true)
    const contract = getContract(library, ERC20Abi, buyTokenData.address)
    contract.methods.approve(WOOF.address, ADDRESS_INFINITY).send({
      from: account
    }).on('receipt', async (_, receipt) => {
      dispatch({
        type: UPDATE_COUNT
      })
      setLoading(false)
    })
      .on('error', (err, receipt) => {
        setLoading(false)
      })
  }
  const onBuyMore = async () => {
    const contract = getContract(library, WOOF.abi, WOOF.address)

    let buyValue = numToWei(Number(tokenValve).toFixed(buyTokenData.decimal), buyTokenData.decimal).toString()
    if (buyValue <=0 ){
      return
    }
    setLoading(true)
    let PermitSign = {
      deadline: 0,
      allowed: buyTokenData.allowed,
      v: 0,
      r: Web3.utils.padLeft(Web3.utils.numberToHex(0), 64),
      s: Web3.utils.padLeft(Web3.utils.numberToHex(0), 64)
    }
    const tokenContract = new ClientContract(WOOF.abi, WOOF.address)
    let tokenNonce = 0
    if (!buyTokenData.isPermitSign){
      tokenNonce = await multicallClient([
        tokenContract.nonces(account)
      ]).then(data => data[0])
      PermitSign = permitSignData
      console.log('tokenNonce', tokenNonce)
    }
    console.log('params', PermitSign, buyTokenData.router, buyValue)
    contract.methods.buy(PermitSign, buyTokenData.router, buyValue).send({
      from: account,
      value: buyTokenData.symbol === superBuyTokenList[0].symbol ? buyValue : undefined
    })
      .on('transactionHash', hash => {
      })
      .on('receipt', (_, receipt) => {
        message.success("buy success")
        refreshData()
        setLoading(false)
      })
      .on('error', (err, receipt) => {
        setLoading(false)
      })
  }

  const calcOut = () => {
    // console.log(tokenValve, buyMoreSign)
    const tokenValue_ = numToWei(Number(tokenValve||0).toFixed(buyTokenData.decimal), buyTokenData.decimal)
    if (tokenValue_ > 0) {
      const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
      const calls = [
        contract.calcOut(tokenValue_, buyTokenData.router)
      ]
      multicallClient(calls).then(data => {
        setBuyOut(formatAmount(data[0], 18, 2))
      })
    } else {
      setBuyOut('0')
    }
  }

  useMemo(() => {
    if (account) {
      calcOut()
    }
    setPermitSignData(null)
  }, [tokenValve, account])
  useMemo(() => {
    setTokenValve(null)
    setPermitSignData(null)
  }, [buyToken])

  const onMax = () => {
    if (buyToken === superBuyTokenList[0].symbol) {
      setTokenValve(Math.max(buyTokenData.balanceOf - 0.1, 0))
    } else {
      setTokenValve(buyTokenData.balanceOf)
    }
  }
  return (
    <React.Fragment>
      <Modal
        title="buy"
        visible={visible}
        footer={null}
        onCancel={onClose}
        centered
        wrapClassName="buy-modal-wrap"
        zIndex={1001}
        destroyOnClose
        closeIcon={<img src={CloseIcon} alt=""/>}
      >
        {/*<Button type="primary" onClick={onPermitSign_}>onPermitSign_</Button>*/}
        {
          <BuyModalView>
            <div className="claim-data">
              <div>
                <div>{twitterUserInfo.price2}</div>
                <div>Price</div>
              </div>
              <div>
                <div>{twitterUserInfo.priceDiscount}</div>
                <div>Current Discount</div>
              </div>
            </div>
            <div className="buy-view">
              {/*<p className="p-t">*/}
              {/*  Available quota: {toFormat(twitterUserInfo.quotaOf)}*/}
              {/*  {buyMoreSign && ` + (${toFormat(buyMoreSign.moreQuota)})`}*/}
              {/*  <span onClick={() => setShowAddQuota(true)} style={{marginRight: '10px'}}>Add quota</span>*/}
              {/*</p>*/}

              <STInput>
                <div className="select-view flex-center">
                  <span>{buyToken}</span>
                  <img src={darkMode ? ArrowDown2Dark : ArrowDown2} alt=""/>
                  <div className="select-view-menu">
                    {
                      superBuyTokenList.map(item => (
                        <div key={item.symbol} onClick={() => {
                          setBuyToken(item.symbol)
                        }}>
                          {item.symbol}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="st-input-box">
                  <CInput type="number" value={tokenValve} onInput={e => setTokenValve(e.target.value)}
                          placeholder={'0 ' + buyToken}/>
                  <div className="st-input-menu">
                    <span>{buyToken}</span>
                    <CButton size="small" onClick={onMax}>MAX</CButton>
                  </div>
                </div>
              </STInput>

              <p className="p-b">Currently balance： {buyTokenData.balanceOf} {buyToken}</p>
            </div>
            <div className="arrow-d">
              <img src={ArrowDown} alt=""/>
            </div>
            <div className="calc-eth-token">
              {buyOut} WOOF
            </div>
            <div className="btn-submit">
              <p className="tip-p">You can accelerate the vesting period by contributing</p>
              {
                !buyTokenData.isApprove && (
                  <Button type="primary" onClick={onApprove} loading={loading} style={{width: '100%'}}>Approve</Button>
                )
              }
              {
                !buyTokenData.isPermitSign && !permitSignData && (
                  <Button type="primary" onClick={onPermitSign} loading={loading}
                          style={{width: '100%'}}>PermitSign</Button>
                )
              }
              {
                ((!buyTokenData.isPermitSign && permitSignData) || buyTokenData.isPermitSign) && buyTokenData.isApprove && (
                  <Button type="primary" onClick={onBuyMore} loading={loading} style={{width: '100%'}}>
                    {buyMoreSign ? 'Contribute More' : 'Contribute'}
                  </Button>
                )
              }
            </div>
          </BuyModalView>
        }
      </Modal>
    </React.Fragment>
  )
}

export default forwardRef(BuyModal)
