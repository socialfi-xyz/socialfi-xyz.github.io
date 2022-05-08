import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ETH_PRICE, WOOF_PRICE} from "../redux";
import {ChainId, Fetcher, Route, Token, WETH} from "@uniswap/sdk";
import {ClientContract, multicallClient} from "../web3/multicall";
import SwapRouterAbi from '../web3/abi/SwapRouter.json'
import {UNI_SWAP_ROUTER} from "../web3/address";
import {fromWei, numToWei} from "../utils/format";

export default function useEthPrice() {
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
      router.getAmountsOut(numToWei('1', 18), ["0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9", WETH.address, USDC.address]),
      router.getAmountsOut(numToWei('1', 18), [WETH.address, USDC.address])
    ]).then(res => {
      if (res[0] !== null) {
        return {
          woofPrice: fromWei(res[0][res[0].length - 1], USDC.decimals).toString(),
          ethPrice: fromWei(res[1][res[1].length - 1], USDC.decimals).toString()
        }
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
        data: data.ethPrice
      })
      dispatch({
        type: WOOF_PRICE,
        data: data.woofPrice
      })
    })
  }, [updateCount])
}
