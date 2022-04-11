import Routers from '../src/pages/index'
import 'antd/dist/antd.less'
import { ContextProvider } from './reducer'
function App() {
  return (
    <ContextProvider>
      <Routers />
    </ContextProvider>
  )
}

export default App;
