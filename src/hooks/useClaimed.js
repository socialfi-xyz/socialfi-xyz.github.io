import {useMemo} from "react";
import {useActiveWeb3React} from "../web3";
import {ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import {ADDRESS_0, WOOF} from "../web3/address";
import {useDispatch, useSelector} from "react-redux";
import {ACCOUNT_AIR_CLAIMED} from "../redux";

export default function useClaimed() {
  const {account} = useActiveWeb3React()
  const {updateCount} = useSelector(state => state.index)
  const dispatch = useDispatch()

  useMemo(() => {
    if (account) {
      const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
      multicallClient([contract.isAirClaimed(account, ADDRESS_0)]).then(data => {
        dispatch({
          type: ACCOUNT_AIR_CLAIMED,
          data: ~~data[0]
        })
      })
    }
  }, [account, updateCount])
}
