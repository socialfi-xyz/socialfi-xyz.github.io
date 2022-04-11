import React, {createContext, useMemo, useState} from 'react'
import {connect} from 'react-redux'
import {ClientContract, multicallClient, multicallConfig} from "./web3/multicall";
import {useActiveWeb3React} from "./web3";
import {ADDRESS_0, SFI} from "./web3/address";

export const VarContext = createContext()
let timer = null
let claimedTimer = null
function Context(props) {
  const {chainId, account} = useActiveWeb3React()
  const [blockHeight, setBlockHeight] = useState(0)
  const [accountAirClaimed, setAccountAirClaimed] = useState(-1) // -1 loading,0 false, 1 true

  useMemo(() => {
    clearTimeout(claimedTimer)
    if (account) {
      const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
      multicallClient([contract.isAirClaimed(account, ADDRESS_0)]).then(data => {
        setAccountAirClaimed(~~data[0])
      })
    } else {
      claimedTimer = setTimeout(()=>{
        setAccountAirClaimed(0)
      }, 1000)
    }
  }, [account, props.updateCount])

  const getBlockHeight = callback => {
    multicallClient.getBlockInfo().then(info => {
      setBlockHeight(info.number)
      callback && callback()
      return info.number
    })
  }

  const timeoutGetBlockHeight = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      getBlockHeight(timeoutGetBlockHeight)
    }, 8000)
  }
  useMemo(() => {
    document.addEventListener('visibilitychange', () => {
      const isActive_ = document.visibilityState === 'visible'
      if (isActive_) {
        getBlockHeight()
        timeoutGetBlockHeight()
      } else {
        clearTimeout(timer)
      }
    })
  }, [])

  useMemo(() => {
    if (props.updateCount === 0) {
      timeoutGetBlockHeight()
    }
    getBlockHeight()
    return () => {
      clearTimeout(timer)
    }
  }, [props.updateCount, chainId])

  return (
    <VarContext.Provider value={{
      blockHeight,
      accountAirClaimed
    }}>
      {props.children}
    </VarContext.Provider>
  )
}

export default connect(state => state.reduxWeb3)(Context)
