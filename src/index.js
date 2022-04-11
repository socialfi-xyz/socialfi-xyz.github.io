import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import store from './redux/store'
import {Web3ReactProvider} from '@web3-react/core'
import '../src/assets/css/index.less'
import 'moment/locale/zh-cn'
import Intl from './locales/intl'
import {getLibrary} from './web3/getLibrary'
import Context from './context'

ReactDom.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Context>
        <Intl>
          <App/>
        </Intl>
      </Context>
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root')
)
