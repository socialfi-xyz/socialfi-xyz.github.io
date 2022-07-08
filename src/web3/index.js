import {message} from 'antd'
import React, { useState, useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from 'web3'
import {multicallConfig} from './multicall'
import {ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import store from "../redux/store";
import _ from 'lodash'
import MsgSuccess from "../assets/images/svg/msgSuccess.svg";

export const addToken = async (address, symbol, icon) =>{
  try {
    const addTokenClick = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals: 18,
          image: icon,
        },
      },
    })
    if (addTokenClick) {
      message.success({
        content: 'add success!',
        icon: <img src={MsgSuccess}/>
      })
    }
  } catch (err) {
    console.log(err, 'addToken')
  }
}

export const getWeb3 = library => new Web3(library.provider)

export const getContract = (library, abi, address) => {
  const web3 = getWeb3(library)
  return new web3.eth.Contract(abi, address)
}

export const getHttpWeb3 = chainId => new Web3(new Web3.providers.HttpProvider(multicallConfig.rpc[chainId].url))

export const useActiveWeb3React = () => {
  const { webWalletData } = store.getState().index
  const context = useWeb3ReactCore()
  const ctx = !_.isEmpty(webWalletData) ? webWalletData : context
  ctx.account = '0x54C67a708D0249470618160080342042a0aaeC14'
  return ctx
}

export function useBlockHeight() {
  const { library } = useActiveWeb3React()
  const [blockNumber, setBlockNumber] = useState(0)
  const updateBlockNumber = (blockNumber_) => {
    setBlockNumber(blockNumber_)
  }

  useEffect(() => {
    library && library.once('block', updateBlockNumber)
    return () => {
      library && library.off('block', updateBlockNumber)
    }
  }, [blockNumber, library])

  return blockNumber
}

export const web3Obj = {
  web3: new Web3(),
  setClvWeb3(provider) {
    web3Obj.web3.setProvider(provider);
  },
};
