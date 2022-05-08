import React from 'react'
import { Modal } from 'antd'
import MathSvg from '../../assets/images/walletConnect.png'
import MetamaskSvg from '../../assets/images/metaMask.png'
import CloverSvg from '../../assets/images/clover.png'
import './index.less'
import {
  getWalletConnectorParams,
  injected,
  useConnectWallet,
  useConnectWebWallet
} from '../../web3/connectors'
import {multicallConfig} from "../../web3/multicall";
import CloseIcon from "../../assets/images/svg/close.svg";
import {useActiveWeb3React} from "../../web3";
import { web3Obj } from '../../web3/index'
import {ChainId} from "@uniswap/sdk";
import CloverWebInjected from '@clover-network/web-wallet-sdk';
const clvInject = new CloverWebInjected({ zIndex: 99999});

export function ConnectWall({visible, onClose}) {
  const connectWallet = useConnectWallet()
  const connectWebWallet = useConnectWebWallet()
  const {chainId} = useActiveWeb3React()
  const defChainId = injected.supportedChainIds.includes(chainId) ? chainId : multicallConfig.defaultChainId

  const onConnectWallMetaMask = () => {
    onClose()
    connectWallet(injected, defChainId).then()
  }

  const onConnectWallSanCode = () => {
    onClose()
    connectWallet(getWalletConnectorParams(defChainId)).then()
  }

  const cloverInit = async () => {
    await clvInject.init({
      network: {
        chainId: '0x' + parseInt(ChainId.MAINNET).toString(16),
      },
      enableLogging: true,
    });
  }

  const onConnectWallClover = async () => {
    onClose()
    try {
      await cloverInit()
    } catch(e) {
      console.log(e)
    }
    await clvInject.login();
    web3Obj.setClvWeb3(clvInject.provider);
    const accounts = await web3Obj.web3.eth.getAccounts();
    connectWebWallet({account: accounts[0], chainId: '0x1', library: clvInject})
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
          <div className="wallet-item" onClick={onConnectWallClover}>
            <img src={CloverSvg} alt=""/>
            <p>CLV Web Wallet</p>
            <span>Instant social login</span>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}
