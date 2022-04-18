import axios from 'axios'
import {fromWei} from "../utils/format";
import {getMStr} from "../utils";
import BigNumber from "bignumber.js";

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
