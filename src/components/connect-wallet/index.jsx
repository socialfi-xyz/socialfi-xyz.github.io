import React from 'react'
import { Modal } from 'antd'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import MathSvg from '../../assets/images/walletConnect.png'
import MetamaskSvg from '../../assets/images/metaMask.png'
import './index.less'
import {getWalletConnectorParams, injected, useConnectWallet} from '../../web3/connectors'
import {multicallConfig} from "../../web3/multicall";
import CloseIcon from "../../assets/images/svg/close.svg";

export function ConnectWall({visible, onClose}) {
  const connectWallet = useConnectWallet()
  const {chainId} = useWeb3ReactCore()
  const defChainId = injected.supportedChainIds.includes(chainId) ? chainId : multicallConfig.defaultChainId

  const onConnectWallMetaMask = () => {
    onClose()
    connectWallet(injected, defChainId).then()
  }

  const onConnectWallSanCode = () => {
    onClose()
    connectWallet(getWalletConnectorParams(defChainId)).then()
  }
  return (
    <React.Fragment>
      <Modal
        visible={visible}
        footer={null}
        closable={false}
        onCancel={onClose}
        centered
        wrapClassName="connect-wallet-dialog-wrap"
        zIndex={1001}
        destroyOnClose
        closeIcon={<img src={CloseIcon} alt=""/>}
      >
        <div className="connect-wallet-dialog">
          <div className="wallet-item" onClick={onConnectWallMetaMask}>
            <img src={MetamaskSvg} alt=""/>
            <p>MetaMask</p>
          </div>
          <div className="wallet-item" onClick={onConnectWallSanCode}>
            <img src={MathSvg} alt=""/>
            <p>Math Wallet</p>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}
