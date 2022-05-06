import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react'
import {Modal, Checkbox, Button, Input, message, Select} from 'antd'
import './index.less'
import {ChainId, ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {getContract, useActiveWeb3React} from "../../web3";
import {ADDRESS_INFINITY, DAI, WOOF, USDT, WETH} from "../../web3/address";
import {formatAmount, fromWei, numToWei, toFormat} from "../../utils/format";
import {AddQuotaModal} from "../add-quota-modal";
import Web3 from "web3";
import ERC20Abi from '../../web3/abi/ERC20.json'
import {cloneDeep} from "lodash";
import {fromRpcSig} from 'ethereumjs-util'
import DAI_ABI from '../../web3/abi/DAI.json'
import CloseIcon from "../../assets/images/svg/close.svg";
import ArrowDown from '../../assets/images/svg/arrow-down.svg'
import ArrowDown2 from '../../assets/images/svg/arrow-down2.svg'
import {permitSign} from "../../web3/sign";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_COUNT} from "../../redux";

const supperbuyTokenList = [
  {
    symbol: 'ETH',
    decimal: 18,
    isApprove: true,
    isPermitSign: true,
    router: [WETH, DAI]
  },
  {
    symbol: 'DAI',
    decimal: 18,
    address: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
    isApprove: true,
    isPermitSign: false,
    router: ['0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735', WETH, DAI],
    allowed: true,
    abi: DAI_ABI
  },
  {
    symbol: 'USDT',
    decimal: 18,
    address: USDT,
    isApprove: false,
    isPermitSign: true,
    router: [USDT, WETH, DAI]
  }
]

function BuyModal({visible, onClose, userData, onRefreshData}, ref) {
  const {chainId, library, account} = useActiveWeb3React()
  const [tokenValve, setTokenValve] = useState(null)

  const [buyOut, setBuyOut] = useState('0')
  const [buyMoreSign, setBuyMoreSign] = useState(null)
  const {superBuyTokenList} = useSelector(state => state.index)
  const dispatch = useDispatch()

  const [showAddQuota, setShowAddQuota] = useState(false)
  const [buyToken, setBuyToken] = useState(superBuyTokenList[0].symbol)
  const [permitSignData, setPermitSignData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getBuyTokenData = () => (superBuyTokenList.filter(item => item.symbol === buyToken))[0]
  const buyTokenData = getBuyTokenData()

  useImperativeHandle(ref, () => ({
    setShowAddQuota
  }))
  const refreshData = () => {
    setBuyMoreSign(null)
    onRefreshData()
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
    } else {
      tokenNonce = await multicallClient([
        tokenContract.nonceOf(account)
      ]).then(data => data[0])
    }
    let buyMoreParams = [Web3.utils.padLeft(Web3.utils.numberToHex(0), 64), tokenNonce, [], []]
    if (buyMoreSign) {
      buyMoreParams = [buyMoreSign.referrer, tokenNonce, buyMoreSign.twitters, buyMoreSign.signatureList]
    }
    console.log('buyMoreParams', buyMoreParams)
    console.log(PermitSign, buyTokenData.router, buyValue, ...buyMoreParams)
    contract.methods.donate(PermitSign, buyTokenData.router, buyValue, ...buyMoreParams).send({
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

  const changeTokenValve = (e) => {
    setTokenValve(e.target.value)
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
  const getMoreTwitters = (sign) => {
    setBuyMoreSign(sign)
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
      setTokenValve(buyTokenData.balanceOf - 0.1)
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
          <div className="buy-modal-dialog">
            <div className="claim-data">
              <div>
                <div>{userData.price2}</div>
                <div>Price</div>
              </div>
              <div>
                <div>{userData.priceDiscount}</div>
                <div>Current Discount</div>
              </div>
            </div>
            <div className="buy-view">
              <p className="p-t">
                Available quota: {toFormat(userData.quotaOf)}
                {buyMoreSign && ` + (${toFormat(buyMoreSign.moreQuota)})`}
                <span onClick={() => setShowAddQuota(true)} style={{marginRight: '10px'}}>Add quota</span>
              </p>
              <div className="st-input">
                <div className="token-select flex-center">
                  <span>{buyToken}</span>
                  <img src={ArrowDown2} alt=""/>
                  <div className="token-select-menu">
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
                <div className="input-eth">
                  <Input type="number" value={tokenValve} onInput={changeTokenValve} placeholder={'0 ' + buyToken}/>
                  <div className="input-menu">
                    <span>{buyToken}</span>
                    <Button size="small" onClick={onMax}>MAX</Button>
                  </div>
                </div>
              </div>
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
          </div>
        }
      </Modal>
      <AddQuotaModal visible={showAddQuota} onClose={() => setShowAddQuota(false)} userData={userData}
                     getMoreTwitters={getMoreTwitters}/>
    </React.Fragment>
  )
}

export default forwardRef(BuyModal)
