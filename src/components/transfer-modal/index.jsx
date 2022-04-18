import React, {useMemo, useState} from 'react'
import {Modal, Checkbox, Button, Input, message} from 'antd'
import {useWeb3React as useWeb3ReactCore} from '@web3-react/core'
import './index.less'
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {getContract, getWeb3} from "../../web3";
import {SFI} from "../../web3/address";
import {fromWei, numToWei, toFormat} from "../../utils/format";
import CloseIcon from "../../assets/images/svg/close.svg";
import Web3 from "web3";

export function TransferModal({visible, onClose, userData, onRefreshData}) {
  const {chainId, library, account} = useWeb3ReactCore()
  const [tokenValve, setTokenValve] = useState(null)
  const [toAddress, setToAddress] = useState(null)

  const [transferLoading, setTransferLoading] = useState(false)

  const onTransfer = () => {
    if (Number(tokenValve) <= 0){
      message.warn('please enter amount')
      return
    }
    if (!Web3.utils.isAddress(toAddress)) {
      message.warn('no address')
      return;
    }
    setTransferLoading(true)
    const contract = getContract(library, SFI.abi, SFI.address)

    const tokenValve_ = numToWei(Number(tokenValve).toFixed(16), 18)
    contract.methods.transfer(toAddress, tokenValve_).send({
      from: account,
    }).on('transactionHash', hash => {
      setTransferLoading(false)
    })
      .on('receipt', (_, receipt) => {
        onRefreshData()
        onClose()
      })
      .on('error', (err, receipt) => {
        setTransferLoading(false)
      })
  }

  const onMax = () => {
    setTokenValve(userData.unlockedOf)
    console.log(userData.unlockedOf)
  }

  return (
    <React.Fragment>
      <Modal
        title="Transfer"
        visible={visible}
        footer={null}
        onCancel={onClose}
        centered
        wrapClassName="transfer-modal-wrap"
        zIndex={1001}
        destroyOnClose
        closeIcon={<img src={CloseIcon} alt=""/>}
      >
        {

            <div className="transfer-modal-dialog">
              <div className="transfer-view">
                <p className="p-t">To</p>
                <div>
                  <div className="input-eth">
                    <Input type="text" value={toAddress} placeholder="0X000000" style={{ paddingRight: 0}} onInput={e => setToAddress(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className="transfer-view">
                <p className="p-t">Amount</p>
                <div>
                  <div className="input-eth">
                    <Input type="number" value={tokenValve} onInput={e => setTokenValve(e.target.value)} placeholder="1 SFI"
                           onBlur={e => (e.target.value * 1) > userData.unlockedOf && onMax()}/>
                    <div className="input-menu">
                      {/*<span>TWTR</span>*/}
                      <Button size="small" onClick={onMax}>MAX</Button>
                    </div>
                  </div>
                </div>
                <p className="p-b">Available amount： {toFormat(userData.unlockedOf)} SFI</p>
              </div>
              <div className="btn-submit">
                <Button type="primary" onClick={onTransfer} loading={transferLoading}>
                  Transfer
                </Button>
              </div>
            </div>
        }
      </Modal>
    </React.Fragment>
  )
}
