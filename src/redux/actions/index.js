
export const LANGUAGE = 'language/LANGUAGE'
export const SHOW_SWITCH_WALLET = 'SHOW_SWITCH_WALLET'
export const SHOW_CONNECT_WALLET = 'SHOW_CONNECT_WALLET'
export const WEB_WALLET_DATA = 'WEB_WALLET_DATA'

export function changeLanguage(params) {
  return { type: LANGUAGE, params}
}

export function changeShowSwitchWallet(params) {
  return { type: SHOW_SWITCH_WALLET, params}
}

export function changeShowConnectWall(params) {
  return { type: SHOW_CONNECT_WALLET, params}
}

export function changeWebWalletData(params) {
  return { type: WEB_WALLET_DATA, params}
}

