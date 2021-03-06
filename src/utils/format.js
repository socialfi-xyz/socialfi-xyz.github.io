import BigNumber from 'bignumber.js'
import Web3 from "web3";

BigNumber.config({ EXPONENTIAL_AT: [-20, 40] })

export const formatAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-3)
}


export const formatLastZero = (numStr) => {
  if (numStr == '0') {
    return numStr
  }
  return String(numStr).replace(/[0]*$/, '').replace(/[.]*$/, '')
}

export const formatAmount = (value, decimals = 18, fixed = 6) => {
  return fromWei(value, decimals).toFormat(fixed)
}

export const numToWei = (value, decimals = 18) => {
  return new BigNumber(
    toWei(value, decimals).toNumber().toFixed(decimals)
  ).toString()
}

export const fromWei = (value, decimals = 18) => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals))
}

const toWei = (value, decimals) => {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals))
}

export const weiPlus = (value1, value2) => {
  return new BigNumber(
    new BigNumber(value1 ? value1 : 0)
      .plus(new BigNumber(value2 ? value2 : 0))
      .toFixed(6)
  )
    .toNumber()
    .toString()
}

export const weiDiv = (value1, value2) => {
  if (value1 == 0 || value2 == 0) {
    return 0
  }
  console.log('weiDiv', value1, value2)
  return new BigNumber(
    new BigNumber(value1).dividedBy(new BigNumber(value2)).toFixed(6)
  )
    .multipliedBy(100)
    .toString()
}

export const toFormat = (value, r = '0') => {
  if (value === undefined){
    return r
  }
  return new BigNumber(value).toFormat()
}

export const numToHex = (num, characterAmount = 32) => {
  return Web3.utils.padLeft(Web3.utils.numberToHex(num), characterAmount * 2)
}
export const stringToHex = (str, characterAmount = 32) => {
  return Web3.utils.padRight(Web3.utils.stringToHex(str), characterAmount * 2)
}

export const tweetIdToHex = (tweetId) => {
  return numToHex(tweetId, 32)
}
export const hexToTweetId = (hex) => {
  return Web3.utils.hexToNumberString(hex)
}

export const fromTwitterId = (id) => Web3.utils.hexToNumberString(id)

export const keepDecimals = (num) => {
  if (num > 10000) {
    return Number(num).toFixed(0) * 1
  } else if (num < 10){
    return Number(num).toFixed(4) * 1
  } else {
    return Number(num).toFixed(2) * 1
  }
}

