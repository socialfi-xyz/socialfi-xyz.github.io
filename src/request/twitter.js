import axios from 'axios'
import {requestUrl} from "./index";
import {rsort} from "semver";
import {calcDays, calcQuota} from "../utils";
import {ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import {ADDRESS_0, SFI} from "../web3/address";
import {fromWei} from "../utils/format";
import Web3 from "web3";


function lookup(params) {
  return axios.post(requestUrl + '/task/lookup', {
    ...params
  }).then(ret => {
    // nonce username id
    return ret.data.data.id
  })
}

export function getNonce(account) {
  return axios.post(requestUrl + '/task/get-nonce', {
    address: account
  }).then(ret => {
    return ret.data.data.nonce
  })
}


export function getUser(taskId, nonce) {
  return new Promise((resolve, reject) => {
    function getUser_() {
      axios.post(requestUrl + '/task/get', {
        taskId
      }).then(async ret => {
        const {data: {data}} = ret
        if (data === 'waiting') {
          setTimeout(() => {
            getUser_(taskId)
          }, 1000)
        } else {
          const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
          const calls = [
            contract.price2(),
            contract.isAirClaimed(ADDRESS_0, Web3.utils.padLeft(Web3.utils.numberToHex(data.twitterId), 64))
          ]
          if (data && data.sign && data.sign.twitters.length > 0) {
            calls.push(
              contract.calcAirClaim([data.sign.twitters[0]]),
              contract.calcAirClaim(data.sign.twitters),
              contract.calcQuota(data.sign.twitters),
            )
          }
          const data2 = await multicallClient(calls).then(data_ => {
            let [price2, twitterIdClaimed, airClaim1 = 0, airClaimAll = 0, quota = 0] = data_
            price2 = fromWei(price2, 18).toFixed(6)
            airClaim1 = fromWei(airClaim1, 18).toFixed(0)
            airClaimAll = fromWei(airClaimAll, 18).toFixed(0)
            quota = fromWei(quota, 18).toFixed(0)
            return {
              price2,
              airClaim1,
              airClaimAll,
              quota,
              twitterIdClaimed
            }
          })
          console.log(data2)
          data.price2 = data2.price2
          data.days = calcDays(data.userCreatedAt)
          data.Influence = calcQuota([data])
          data.mentions = Math.min(data.Influence, calcQuota(data.mentions || []))
          data.mentionsProportion = (data2.airClaimAll > 0 ? ((data2.airClaimAll - data2.airClaim1) / data2.airClaim1).toFixed(4) : 0) * 100 + '%'
          data.quotaOf = data2.quota
          data.calcNonce = nonce
          data.twitterIdClaimed = ~~data2.twitterIdClaimed
          if (data.sign) {
            data.sign.effect = fromWei(data.sign.effect, 18).toFixed(1) * 1
            data.availableClaim = `${data.sign.effect}($${((data.sign.effect) * data2.price2).toFixed(2)})`
          }
          console.log(data)
          resolve(data)
        }
      })
        .catch((e) => {
          reject(e && e.response && e.response.status)
        })
    }

    getUser_()
  })
}

export async function getUserInfo({username, account, type, referrer, calcNonce}) {
  const lockupParams = {
    address: account,
    type,
    username
  }
  if (referrer) {
    lockupParams.ref = referrer
  }
  const taskId = await lookup(lockupParams)
  let nonce = calcNonce
  if (!nonce) {
    nonce = await getNonce(account)
  }
  console.log('nonce', nonce)
  return getUser(taskId, nonce)
}

export function getUserByAddress(account, referrer) {
  const params = {
    address: account
  }
  if (referrer) {
    params.ref = referrer
  }
  return axios.post(requestUrl + '/user/get', params).then(ret => {
    return ret.data.data
  })
}
