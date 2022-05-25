import axios from 'axios'
import {fromWei, hexToTweetId, keepDecimals} from "../utils/format";
import {getMStr} from "../utils";
import BigNumber from "bignumber.js";
import {getUserByAddress} from "./twitter";
import {WOOF} from "../web3/address";

export function queryDashboardData() {
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
      hourDatas[i].ethPrice = fromWei(hourDatas[i].ethPrice, 18).toFixed(4) * 1
      hourDatas[i].price = fromWei(hourDatas[i].price, 18).toFixed(4) * 1
      hourDatas[i].totalSupply = fromWei(hourDatas[i].totalSupply, 18).toFixed(2) * 1
      const date = new Date(hourDatas[i].timestamp * 1000)
      hourDatas[i].time = `${getMStr(date.getMonth())} ${date.getDate()}`
      hourDatas[i].marketCap = new BigNumber(hourDatas[i].price).multipliedBy(new BigNumber(hourDatas[i].totalSupply)).toFixed(2) * 1
      hourDatas[i].treasuryValue = fromWei(hourDatas[i].treasury_eth, 18).multipliedBy(hourDatas[i].ethPrice).plus(fromWei(hourDatas[i].treasury_dai)).toFixed(2) * 1
      hourDatas[i].backingPerToken = hourDatas[i].totalSupply <= 0 ? 0 : new BigNumber(hourDatas[i].treasuryValue).div(new BigNumber(hourDatas[i].totalSupply)).toFixed(6) * 1
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
      woofs(first: 100, timestamp: desc) {
        id
        tweetId
        reward
        account
        timestamp
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
    }).then(async data => {
      const woofs = data.data.data.woofs
      const users = []
      for (let i = 0; i < woofs.length; i++) {
        woofs[i].tweetId = hexToTweetId(woofs[i].tweetId)
        users.push(woofs[i].account)
        for (let j = 0; j < woofs[i].cowoofs.length; j++) {
          woofs[i].cowoofs[j].tweetId = hexToTweetId(woofs[i].cowoofs[j].tweetId)
          woofs[i].cowoofs[j].twitterId = hexToTweetId(woofs[i].cowoofs[j].twitterId)
          users.push(woofs[i].cowoofs[j].account)
        }
        for (let j = 0; j < woofs[i].rewoofs.length; j++) {
          woofs[i].rewoofs[j].tweetId = hexToTweetId(woofs[i].rewoofs[j].tweetId)
          woofs[i].rewoofs[j].twitterId = hexToTweetId(woofs[i].rewoofs[j].twitterId)
          users.push(woofs[i].rewoofs[j].account)
        }
      }
      getUserByAddress([...new Set(users)].join(','))
      .then(usersData => {
        const map = {}
        for (let i = 0; i < usersData.length; i++) {
          map[usersData[i].address.toLowerCase()] = usersData[i]
        }
        for (let i = 0; i < woofs.length; i++) {
          const accountTwitterData = map[woofs[i].account.toLowerCase()]
          if (!accountTwitterData) {
            woofs.splice(i--, 1)
            continue
          }
          woofs[i].accountTwitterData = accountTwitterData
          let reward = new BigNumber(0)
          let rewoofAmount = new BigNumber(0)
          for (let j = 0; j < woofs[i].cowoofs.length; j++) {
            if (!map[woofs[i].cowoofs[j].account.toLowerCase()]) {
              woofs[i].cowoofs.splice(j--, 1)
              continue
            }
            woofs[i].cowoofs[j].accountTwitterData = map[woofs[i].cowoofs[j].account.toLowerCase()]
            reward = reward.plus(woofs[i].cowoofs[j].reward)
          }
          for (let j = 0; j < woofs[i].rewoofs.length; j++) {
            if (!map[woofs[i].rewoofs[j].account.toLowerCase()]) {
              woofs[i].rewoofs.splice(j--, 1)
              continue
            }
            woofs[i].rewoofs[j].accountTwitterData = map[woofs[i].rewoofs[j].account.toLowerCase()]
            rewoofAmount = rewoofAmount.plus(woofs[i].rewoofs[j].amount)
          }
          woofs[i].reward = keepDecimals(fromWei(reward, WOOF.decimals))
          woofs[i].rewoofAmount = keepDecimals(fromWei(rewoofAmount, WOOF.decimals))

        }
        console.log('woofs', woofs)
        resolve(woofs)
      })
    }).catch(() => {
      reject([])
    })
  })
}
