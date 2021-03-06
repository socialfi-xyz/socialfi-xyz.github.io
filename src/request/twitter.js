import axios from 'axios'
import {requestUrl, signNodes, VALID_SIGNATURE} from "./index";
import {rsort} from "semver";
import {calcDays, calcQuota} from "../utils";
import {ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import {ADDRESS_0, WOOF} from "../web3/address";
import {fromWei, tweetIdToHex} from "../utils/format";
import Web3 from "web3";


function lookup(params) {
  console.log('xxxxx', params)
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


export function getUser(taskId, nonce, signNode) {
  return new Promise((resolve, reject) => {
    function getUser_() {
      axios.post((signNode || requestUrl) + '/task/get', {
        taskId
      }).then(async ret => {
        const {data: {data}} = ret
        if (data === 'waiting') {
          setTimeout(() => {
            getUser_(taskId)
          }, 1000)
        } else {
          const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
          const calls = [
            contract.price2(),
            contract.isAirClaimed(ADDRESS_0, tweetIdToHex(data.twitterId))
          ]
          if (data && data.sign && data.sign.twitters.length > 0) {
            calls.push(
              contract.calcAirClaim([data.sign.twitters[0]]),
              contract.calcAirClaim(data.sign.twitters),
              // contract.calcQuota(data.sign.twitters),
            )
          }
          const data2 = await multicallClient(calls).then(data_ => {
            let [price2, twitterIdClaimed, airClaim1 = 0, airClaimAll = 0, quota = 0] = data_
            price2 = fromWei(price2, 18).toFixed(6)
            airClaim1 = fromWei(airClaim1, 18).toFixed(0)
            airClaimAll = fromWei(airClaimAll, 18).toFixed(0)
            // quota = fromWei(quota, 18).toFixed(0)
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
          // data.Influence = calcQuota([data])
          // data.mentions = Math.min(data.Influence, calcQuota(data.mentions || []))
          data.mentionsProportion = (data2.airClaimAll > 0 ? ((data2.airClaimAll - data2.airClaim1) / data2.airClaim1).toFixed(4) : 0) * 100 + '%'
          data.mentionsAmount = data2.airClaimAll - data2.airClaim1
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
          console.log('eeeeeee', e)
          reject(e && e.response && e.response.status)
        })
    }

    getUser_()
  })
}
async function getTask ({username, account, type, referrer, calcNonce}){
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
  return {
    taskId,
    nonce
  }
}

export async function getUserInfo({username, account, type, referrer, calcNonce}) {
  const {taskId, nonce} = await getTask({username, account, type, referrer, calcNonce})
  console.log('taskId, nonce', taskId, nonce)
  return getUser(taskId, nonce)
}

export function getNodeSign({username, account, type, referrer, calcNonce}){
  return new Promise(async (resolve, reject)=>{
    const {taskId, nonce} = await getTask({username, account, type, referrer, calcNonce})
    const signList = []
    for (let i = 0; i < signNodes.length; i++) {
      getUser(taskId, nonce, signNodes[i]).then(data => {
        if (Array.isArray(data)) {
          data = data[0]
        }
        signList.push(data.sign)
        if (signList.length === VALID_SIGNATURE) {
          let signData = {
            ...signList[0],
            signatureList: []
          }
          console.log(signList)
          for (let j = 0; j < signList.length; j++) {
            signData.signatureList.push(signList[j].signature)
          }
          resolve(signData)
        }
      })
    }
  })

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


export function getTweet(tweetIds){
  return axios.post(requestUrl + '/tweet/get', {
    tweetIds
  }).then(ret => {
    return ret.data.data
  })
}
