import WOOFAbi from './abi/WOOF.json'
import DAI_ABI from "./abi/DAI.json";

export const WOOF = {
  address: '0xa9cafb5fc7fbfbeac0e4fc54edbadceb0cff4cf3',
  abi: WOOFAbi,
  decimals: 18,
  symbol: 'WOOF'
}

export const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
export const DAI = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
export const USDT = '0xF0d0F0Bc954123FE38172CC87b7BE923bf6e89EB'

export const ADDRESS_0 = '0x0000000000000000000000000000000000000000'
export const ADDRESS_INFINITY = '0xffffffffffffffffffffffffffffffffffffffff'
export const UNI_SWAP_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

export const DEF_SUPPER_BY_TOKEN_LIST = [
  {
    symbol: 'ETH',
    decimal: 18,
    address: WETH,
    isApprove: true,
    isPermitSign: true,
    router: [WETH, DAI],
    woofMin: 0,
    woofMinOut: 0
  },
  {
    symbol: 'DAI',
    decimal: 18,
    address: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
    isApprove: true,
    isPermitSign: false,
    router: ['0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735', WETH, DAI],
    allowed: true,
    abi: DAI_ABI,
    woofMin: 0,
    woofMinOut: 0
  },
  {
    symbol: 'USDT',
    decimal: 6,
    address: USDT,
    isApprove: false,
    isPermitSign: true,
    router: [USDT, WETH, DAI],
    woofMin: 0,
    woofMinOut: 0
  }
]
