import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react'
import {Modal, Checkbox, Button, Input, message, Select} from 'antd'
import {useWeb3React as useWeb3ReactCore} from '@web3-react/core'
import './index.less'
import {ChainId, ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {getContract} from "../../web3";
import {ADDRESS_INFINITY, DAI, SFI, USDT, WETH} from "../../web3/address";
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

const supperByTokenList = [
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
  const {chainId, library, account} = useWeb3ReactCore()
  const [tokenValve, setTokenValve] = useState(null)

  const [buyOut, setBuyOut] = useState('0')
  const [byTokenList, setByTokenList] = useState(supperByTokenList)
  const [buyMoreSign, setBuyMoreSign] = useState(null)

  const [showAddQuota, setShowAddQuota] = useState(false)
  const [byToken, setByToken] = useState(byTokenList[0].symbol)
  const [permitSignData, setPermitSignData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getBuyTokenData = () => (byTokenList.filter(item => item.symbol === byToken))[0]
  const buyTokenData = getBuyTokenData()
  const getByTokenListData = async () => {
    const byTokenList_ = cloneDeep(byTokenList)
    const calls = []
    for (let i = 1; i < byTokenList_.length; i++) {
      const contract = new ClientContract(DAI_ABI, byTokenList_[i].address, ChainId.MAINNET)
      calls.push(contract.balanceOf(account))
      if (!byTokenList_[i].isApprove) {
        calls.push(contract.allowance(account, SFI.address))
      }
    }
    await Promise.all([
      multicallClient.getEthBalance(account, ChainId.MAINNET),
      multicallClient(calls)
    ]).then(res => {
      const res1 = res[1]
      byTokenList_[0].balanceOf = fromWei(res[0], byTokenList_[0].decimal).toFixed(4) * 1
      for (let i = 1, j = 0; i < byTokenList_.length; i++) {
        byTokenList_[i].balanceOf = fromWei(res1[j] || 0, byTokenList_[i].decimal).toFixed(4)
        j = j + 1
        if (!byTokenList_[i].isApprove) {
          byTokenList_[i].isApprove = res1[j] > 0
          j = j + 1
        }
      }
      setByTokenList(byTokenList_)
      console.log(byTokenList_)
    })
  }

  useMemo(() => {
    if (account) {
      getByTokenListData()
    }
  }, [account])
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

    const web3 = new Web3(window.ethereum)
    let nonce = 0
    const tokenContract = new ClientContract(buyTokenData.abi, buyTokenData.address, ChainId.MAINNET)
    nonce = await multicallClient([
      tokenContract.nonces(account)
    ]).then(data => data[0])
    const contract = new ClientContract(SFI.abi, buyTokenData.address, ChainId.MAINNET)
    const calls = [
        contract.PERMIT_TYPEHASH(),
        contract.DOMAIN_SEPARATOR(),
    ]
    const [PERMIT_TYPEHASH, DOMAIN_SEPARATOR] = await multicallClient(calls)
    const deadline = 4070880000

    // Permit(address holder,address spender,uint256 nonce,uint256 expiry,bool allowed)
    let structHash;
      if (buyTokenData.allowed){
        structHash = web3.utils.keccak256(web3.eth.abi.encodeParameters(['bytes32', 'address', 'address', 'uint256', 'uint256', 'bool'], [
          PERMIT_TYPEHASH,
          account,
          SFI.address,
          nonce,
          deadline,
          buyTokenData.allowed]
        ))
      } else {
        structHash = web3.utils.keccak256(
          web3.eth.abi.encodeParameters(['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'], [
            PERMIT_TYPEHASH,
            account,
            SFI.address,
            numToWei(tokenValve, buyTokenData.decimal),
            nonce,
            deadline
          ])
        )
      }
    const digest = web3.utils.soliditySha3(
      {
        type: 'string',
        value: '\x19\x01'
      },
      {
        type: 'bytes32',
        value: DOMAIN_SEPARATOR
      },
      {
        type: 'bytes32',
        value: structHash
      }
    )
    // const signature = web3.eth.si
    console.log(digest)

    const signature = await web3.eth.sign(digest, account);
    console.log(signature)
    const sv = fromRpcSig(signature)
    sv.allowed = buyTokenData.allowed
    sv.deadline = deadline
    sv.s = web3.utils.bytesToHex(sv.s)
    sv.r = web3.utils.bytesToHex(sv.r)
    console.log(sv)
    setPermitSignData(sv)
  }
  const onApprove = () => {
    setLoading(true)
    const contract = getContract(library, ERC20Abi, buyTokenData.address)
    contract.methods.approve(SFI.address, ADDRESS_INFINITY).send({
      from: account
    }).on('receipt', async (_, receipt) => {
      await getByTokenListData()
      setLoading(false)
    })
      .on('error', (err, receipt) => {
        setLoading(false)
      })
  }
  const onBuyMore = async () => {
    const contract = getContract(library, SFI.abi, SFI.address)

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
    const tokenContract = new ClientContract(SFI.abi, SFI.address)
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
      buyMoreParams = [buyMoreSign.referrer, tokenNonce, buyMoreSign.twitters, [buyMoreSign.signatureList[0]]]
    }
    console.log('buyMoreParams', buyMoreParams)
    console.log(PermitSign, buyTokenData.router, buyValue, ...buyMoreParams)
    contract.methods.donate(PermitSign, buyTokenData.router, buyValue, ...buyMoreParams).send({
      from: account,
      value: buyTokenData.symbol === byTokenList[0].symbol ? buyValue : undefined
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
      const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
      const calls = [
        contract.calcOut(account, buyMoreSign ? buyMoreSign.twitters : [], tokenValue_, buyTokenData.router)
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
  }, [byToken])

  const onMax = () => {
    if (byToken === byTokenList[0].symbol) {
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
              <div>
                <div className="token-select flex-center">
                  <span>{byToken}</span>
                  <img src={ArrowDown2} alt=""/>
                  <div className="token-select-menu">
                    {
                      byTokenList.map(item => (
                        <div key={item.symbol} onClick={() => {
                          setByToken(item.symbol)
                        }}>
                          {item.symbol}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="input-eth">
                  <Input type="number" value={tokenValve} onInput={changeTokenValve} placeholder={'0 ' + byToken}/>
                  <div className="input-menu">
                    <span>{byToken}</span>
                    <Button size="small" onClick={onMax}>MAX</Button>
                  </div>
                </div>
              </div>
              <p className="p-b">Currently balance： {buyTokenData.balanceOf} {byToken}</p>
            </div>
            <div className="arrow-d">
              <img src={ArrowDown} alt=""/>
            </div>
            <div className="calc-eth-token">
              {buyOut} SFI
            </div>
            <div className="btn-submit">
              <p className="tip-p">You can accelerate the vesting schedule by bonding</p>
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
                    {buyMoreSign ? 'Bond More' : 'Bond'}
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
