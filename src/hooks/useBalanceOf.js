import {useMemo} from "react";
import {useActiveWeb3React} from "../web3";
import {ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import {ADDRESS_0, WOOF} from "../web3/address";
import {useDispatch, useSelector} from "react-redux";
import {WOOF_BALANCE_OF} from "../redux";
import {fromWei} from "../utils/format";


export default function useBalanceOf() {
  const {account} = useActiveWeb3React()
  const {updateCount} = useSelector(state => state.index)
  const dispatch = useDispatch()

  useMemo(() => {
    if (account) {
      const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
      multicallClient([contract.balanceOf(account)]).then(data => {
        dispatch({
          type: WOOF_BALANCE_OF,
          data: fromWei(data[0], WOOF.decimals)
        })
      })
    }
  }, [account, updateCount])
}
