import Routers from '../src/pages/index'
import 'antd/dist/antd.css'
import useUpdate from "./hooks/useUpdate";
import useClaimed from "./hooks/useClaimed";
import useBuyTokenList from "./hooks/useBuyTokenList";
import useBalanceOf from "./hooks/useBalanceOf";
import useEthPrice from "./hooks/useEthPrice";
import useTwitterUserInfo from "./hooks/useTwitterUserInfo";

function App() {
  useUpdate()
  useClaimed()
  useBuyTokenList()
  useBalanceOf()
  useEthPrice()
  useTwitterUserInfo()
  return (
    <Routers />
  )
}

export default App;
