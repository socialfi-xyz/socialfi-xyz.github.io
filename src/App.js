import Routers from '../src/pages/index'
import 'antd/dist/antd.css'
import useUpdate from "./hooks/useUpdate";
import useClaimed from "./hooks/useClaimed";
import useBuyTokenList from "./hooks/useBuyTokenList";
import useBalanceOf from "./hooks/useBalanceOf";
import {useEthPrice, useWOOFPrice} from "./hooks/usePrice";
import useTwitterUserInfo from "./hooks/useTwitterUserInfo";

function App() {
  useUpdate()
  useClaimed()
  useBuyTokenList()
  useBalanceOf()
  useEthPrice()
  useWOOFPrice()
  useTwitterUserInfo()
  return (
    <Routers />
  )
}

export default App;
