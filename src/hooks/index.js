import {useMemo, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {getContract} from "../web3";
import {formatAmount} from "../utils/format";
import ERC20_ABI from '../web3/abi/ERC20.json'
export const useBalance = (
  blockHeight,
  address,
  abi = ERC20_ABI,
  decimals = 18,
  owner = null,
) => {
  const [balance, setBalance] = useState('0')
  const { account, library, active } = useWeb3React()
  useMemo(() => {
    if (active && address && blockHeight !== 0) {
      owner = !owner ? account : owner
      const contract = getContract(library, abi, address)
      contract.methods
        .balanceOf(owner)
        .call()
        .then(balance_ => {
          const resBalance = formatAmount(balance_, decimals)
          setBalance(resBalance)
        }).catch(e=>{})
    }
  }, [account, active, blockHeight, address])
  return balance
}

export const useNow = () => {
  const [now, setNow] = useState(() => ~~(new Date().getTime()/1000))
  useMemo(() => {
    const timeout = setTimeout(()=>{
      setNow(~~(new Date().getTime()/1000))
    }, 1000)
    return () => clearTimeout(timeout)
  }, [now]);
  return now
}
