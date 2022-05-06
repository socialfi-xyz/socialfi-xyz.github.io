import {DEF_SUPPER_BY_TOKEN_LIST} from "../web3/address";

export const LANGUAGE = 'LANGUAGE'
export const SHOW_CONNECT_WALLET = 'SHOW_CONNECT_WALLET'
export const DARK_MODE = 'DARK_MODE'
export const UPDATE_COUNT = 'UPDATE_COUNT'
export const BLOCK_HEIGHT = 'BLOCK_HEIGHT'
export const ACCOUNT_AIR_CLAIMED = 'ACCOUNT_AIR_CLAIMED'
export const SUPER_BUY_TOKEN_LIST = 'SUPER_BUY_TOKEN_LIST'
export const WOOF_BALANCE_OF = 'WOOF_BALANCE_OF'
export const ETH_PRICE = 'ETH_PRICE'
export const WOOF_PRICE = 'WOOF_PRICE'
export const WEB_WALLET_DATA = 'WEB_WALLET_DATA'

const language = window.localStorage.getItem('p_language') || 'en'
const darkMode = localStorage.getItem('isDarkMode') === '1'
const initState = {
  language,
  showConnectWallet: false,
  darkMode,
  webWalletData: {},
  updateCount: 0,
  blockHeight: 0,
  accountAirClaimed: 0,
  superBuyTokenList: DEF_SUPPER_BY_TOKEN_LIST,
  woofBalanceOf: 0,
  ethPrice: 0,
  woofPrice: 0
}
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LANGUAGE:
      window.localStorage.setItem('p_language', action.params.language)
      return {
        ...state,
        language: action.data,
      }
    case SHOW_CONNECT_WALLET:
      return {
        ...state,
        showConnectWallet: action.data,
      }
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.data
      }
    case UPDATE_COUNT:
      return {
        ...state,
        updateCount: state.updateCount + 1,
      }
    case BLOCK_HEIGHT:
      return {
        ...state,
        blockHeight: action.data,
      }
    case ACCOUNT_AIR_CLAIMED:
      return {
        ...state,
        accountAirClaimed: action.data
      }
    case SUPER_BUY_TOKEN_LIST:
      return {
        ...state,
        superBuyTokenList: action.data
      }
    case ETH_PRICE:
      return {
        ...state,
        ethPrice: action.data
      }
    case WOOF_PRICE:
      return {
        ...state,
        woofPrice: action.data
      }
    case WEB_WALLET_DATA:
      return {
        ...state,
        webWalletData: action.data
      }

    default:
      return state
  }
}
