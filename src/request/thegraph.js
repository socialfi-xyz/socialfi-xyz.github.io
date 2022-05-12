import axios from 'axios'
import {fromWei} from "../utils/format";
import {getMStr} from "../utils";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import {getUserByAddress} from "./twitter";
import {WOOF} from "../web3/address";

export function queryDashboardData(){
  return axios({
    method: 'post',
    url: 'https://api.thegraph.com/subgraphs/name/yuanxxxxxx/s1',
    data: {
      query: `
      {
        hourDatas(first:192, orderBy: timestamp, orderDirection: desc){
          id
          price
          ethPrice
          timestamp
          totalSupply
          index
          apy
          claimFactor
          treasury_eth
          treasury_dai
        }
      }`,
    },
  }).then(data => {
    const hourDatas = data.data.data.hourDatas.reverse()
    console.log(hourDatas)
    for (let i = 0; i < hourDatas.length; i++) {
      hourDatas[i].apy = fromWei(hourDatas[i].apy, 18).toFixed(4)
      hourDatas[i].index = fromWei(hourDatas[i].index, 18).toFixed(4)
      hourDatas[i].ethPrice = fromWei(hourDatas[i].ethPrice, 18).toFixed(4)*1
      hourDatas[i].price = fromWei(hourDatas[i].price, 18).toFixed(4)*1
      hourDatas[i].totalSupply = fromWei(hourDatas[i].totalSupply, 18).toFixed(2)*1
      const date = new Date(hourDatas[i].timestamp*1000)
      hourDatas[i].time = `${getMStr(date.getMonth())} ${date.getDate()}`
      hourDatas[i].marketCap = new BigNumber(hourDatas[i].price).multipliedBy(new BigNumber(hourDatas[i].totalSupply)).toFixed(2) * 1
      hourDatas[i].treasuryValue = fromWei(hourDatas[i].treasury_eth, 18).multipliedBy(hourDatas[i].ethPrice).plus(fromWei(hourDatas[i].treasury_dai)).toFixed(2) * 1
      hourDatas[i].backingPerToken = hourDatas[i].totalSupply <= 0 ? 0 : new BigNumber(hourDatas[i].treasuryValue).div(new BigNumber(hourDatas[i].totalSupply)).toFixed(6)*1
    }
    return hourDatas
  })
}

export function getWoofData() {

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/yuanxxxxxx/woof',
      data: {
        query: `
      {
      woofs(first: 100) {
        id
        tweetId
        reward
        account
        cowoofs {
          id
          account
          tweetId
          twitterId
          reward
        }
        rewoofs{
          id
          account
          tweetId
          twitterId
          amount
        }
      }
    }`,
      },
    }).then(data => {
      const woofs = data.data.data.woofs
      const users = []
      for (let i = 0; i < woofs.length; i++) {
        woofs[i].tweetId = Web3.utils.hexToNumberString(woofs[i].tweetId)
        users.push(woofs[i].account)
        for (let j = 0; j < woofs[i].cowoofs.length; j++) {
          woofs[i].cowoofs[j].tweetId = Web3.utils.hexToNumberString(woofs[i].cowoofs[j].tweetId)
          woofs[i].cowoofs[j].twitterId = Web3.utils.hexToNumberString(woofs[i].cowoofs[j].twitterId)
          users.push(woofs[i].cowoofs[j].account)
        }
        for (let j = 0; j < woofs[i].rewoofs.length; j++) {
          woofs[i].rewoofs[j].tweetId = Web3.utils.hexToNumberString(woofs[i].rewoofs[j].tweetId)
          woofs[i].rewoofs[j].twitterId = Web3.utils.hexToNumberString(woofs[i].rewoofs[j].twitterId)
          users.push(woofs[i].rewoofs[j].account)
        }
      }
      getUserByAddress([...new Set(users)].join(',')).then(usersData => {
        const map = {}
        for (let i = 0; i < usersData.length; i++) {
          map[usersData[i].address] = usersData[i]
        }
        for (let i = 0; i < woofs.length; i++) {
          woofs[i].accountTwitterData = map[woofs[i].account]
          let reward = new BigNumber(0)
          for (let j = 0; j < woofs[i].cowoofs.length; j++) {
            woofs[i].cowoofs[j].accountTwitterData = map[woofs[i].cowoofs[j].account]
            reward = reward.plus(woofs[i].cowoofs[j].reward)
          }
          for (let j = 0; j < woofs[i].rewoofs.length; j++) {
            woofs[i].rewoofs[j].accountTwitterData = map[woofs[i].rewoofs[j].account]
          }
          woofs[i].reward = fromWei(reward, WOOF.decimals)
        }
        console.log('woofs', woofs)
        resolve(woofs)
      })
    }).catch(() => {
      reject([])
    })
  })
}
