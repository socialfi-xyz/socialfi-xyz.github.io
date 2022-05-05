import {LANGUAGE, SHOW_CONNECT_WALLET, SHOW_SWITCH_WALLET, WEB_WALLET_DATA} from '../actions/index'

const language = window.localStorage.getItem('p_language') || 'en'

const initState = {
  language: language,
  showSwitchWallet: false,
  showConnectWallet: false,
  webWalletData: {}
}

// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LANGUAGE:
      window.localStorage.setItem('p_language', action.params.language)
      return {
        ...state,
        language: action.params.language,
      }
    case SHOW_SWITCH_WALLET:
      return {
        ...state,
        showSwitchWallet: action.params.showSwitchWallet,
      }
    case SHOW_CONNECT_WALLET:
      return {
        ...state,
        showConnectWallet: action.params.showConnectWallet,
      }
    case WEB_WALLET_DATA:
      return {
        ...state,
        webWalletData: action.params.webWalletData,
      }
    default:
      return state
  }
}
