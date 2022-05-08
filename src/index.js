import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import store from './redux/store'
import {Web3ReactProvider} from '@web3-react/core'
// import 'moment/locale/zh-cn'
import './assets/css/index.less'
import Intl from './locales/intl'
import {getLibrary} from './web3/getLibrary'
import ThemeProvider from "./theme";

ReactDom.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Intl>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </Intl>
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root')
)
