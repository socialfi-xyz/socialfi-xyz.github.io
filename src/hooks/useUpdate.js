import {useMemo} from "react";
import {useActiveWeb3React} from "../web3";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_COUNT} from "../redux";

let timer = null

export default function useUpdate(){
  const {chainId, account} = useActiveWeb3React()
  const {updateCount} = useSelector(state => state.index)
  const dispatch = useDispatch()
  useMemo(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: UPDATE_COUNT
      })
    }, 6000)
    return () => clearTimeout(timer)
  }, [updateCount, chainId, account])
}
