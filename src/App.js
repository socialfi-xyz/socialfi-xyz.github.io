import Routers from '../src/pages/index'
import 'antd/dist/antd.css'
import useUpdate from "./hooks/useUpdate";
import useClaimed from "./hooks/useClaimed";
import useBuyTokenList from "./hooks/useBuyTokenList";
import {useEthPrice, useWOOFPrice} from "./hooks/usePrice";
import useTwitterUserInfo from "./hooks/useTwitterUserInfo";

function App() {
  useUpdate()
  useClaimed()
  useBuyTokenList()
  useEthPrice()
  useWOOFPrice()
  useTwitterUserInfo()
  return (
    <Routers />
  )
}

export default App;
