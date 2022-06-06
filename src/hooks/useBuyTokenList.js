import {SUPER_BUY_TOKEN_LIST} from "../redux";
import {ChainId, ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import DAI_ABI from "../web3/abi/DAI.json";
import {DEF_SUPPER_BY_TOKEN_LIST, WOOF} from "../web3/address";
import {fromWei, keepDecimals, numToWei, stringToHex} from "../utils/format";
import {useMemo} from "react";
import {useActiveWeb3React} from "../web3";
import {cloneDeep} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import BigNumber from "bignumber.js";

export default function useBuyTokenList() {
  const {account} = useActiveWeb3React()
  const {updateCount} = useSelector(state => state.index)
  const dispatch = useDispatch()

  const getData = async () => {
    const defSuperTokenList = cloneDeep(DEF_SUPPER_BY_TOKEN_LIST)
    const calls = []
    const callsCalcIn = []
    const woofContract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)

    const minCowoof = await multicallClient([woofContract.gets([stringToHex('minCowoof', 32)])]).then(res => res[0] !== null ? res[0][0] : numToWei('100000', WOOF.decimals))


    for (let i = 0; i < defSuperTokenList.length; i++) {
      callsCalcIn.push(woofContract.calcIn(minCowoof, defSuperTokenList[i].router))
      if (i >= 1) {
        const contract = new ClientContract(DAI_ABI, defSuperTokenList[i].address, ChainId.defaultChainId)
        calls.push(contract.balanceOf(account))
        if (!defSuperTokenList[i].isApprove) {
          calls.push(contract.allowance(account, WOOF.address))
        }
      }
    }

    Promise.all([
      multicallClient.getEthBalance(account, ChainId.defaultChainId),
      multicallClient(calls),
      multicallClient(callsCalcIn),
    ]).then(res => {
      const res1 = res[1]
      const res2 = res[2]
      defSuperTokenList[0].balanceOf = keepDecimals(fromWei(res[0], defSuperTokenList[0].decimal))
      for (let i = 0, j = 0; i < defSuperTokenList.length; i++) {
        // defSuperTokenList[i].woofMinOut = fromWei(res2[i] || 0, defSuperTokenList[i].decimal).toFixed(4)
        defSuperTokenList[i].woofMinOut = fromWei(minCowoof, WOOF.decimals)
        defSuperTokenList[i].woofMin = fromWei(res2[i] || 0, defSuperTokenList[i].decimal).toFixed(6,0)
        if (i >= 1) {
          defSuperTokenList[i].balanceOf = keepDecimals(fromWei(res1[j] || 0, defSuperTokenList[i].decimal))
          j = j + 1
          if (!defSuperTokenList[i].isApprove) {
            defSuperTokenList[i].isApprove = res1[j] > 0
            j = j + 1
          }
        }
      }
      console.log('defSuperTokenList', defSuperTokenList)
      dispatch({
        type: SUPER_BUY_TOKEN_LIST,
        data: defSuperTokenList
      })
    })
  }
  useMemo(() => {
    if (account) {
      getData()
    }
  }, [updateCount, account])
}
