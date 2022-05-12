import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ETH_PRICE, WOOF_BALANCE_OF, WOOF_PRICE} from "../redux";
import {ChainId, Fetcher, Route, Token, WETH} from "@uniswap/sdk";
import {ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import SwapRouterAbi from '../web3/abi/SwapRouter.json'
import {UNI_SWAP_ROUTER, WOOF} from "../web3/address";
import {fromWei, numToWei} from "../utils/format";

export const useEthPrice = () => {
  const {updateCount} = useSelector(state => state.index)
  const dispatch = useDispatch()

  const USDC = {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6
  }
  const WETH = {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18
  }


  async function getPrice() {
    const router = new ClientContract(SwapRouterAbi, UNI_SWAP_ROUTER, ChainId.MAINNET)
    return multicallClient([
      router.getAmountsOut(numToWei('1', 18), [WETH.address, USDC.address])
    ]).then(res => {
      if (res[0] !== null) {
        return fromWei(res[0][res[0].length - 1], USDC.decimals).toString()
      }
    })
  }

  useMemo(() => {
    getPrice().then(data => {
      if (data===undefined){
        return
      }
      dispatch({
        type: ETH_PRICE,
        data: data
      })
    })
  }, [updateCount])
}

export const useWOOFPrice = () => {
  const {updateCount} = useSelector(state => state.index)
  const dispatch = useDispatch()

  useMemo(() => {
    const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
    multicallClient([contract.price()]).then(data => {
      dispatch({
        type: WOOF_PRICE,
        data: fromWei(data[0], WOOF.decimals).toFixed(4)
      })
    })
  }, [updateCount])
}
