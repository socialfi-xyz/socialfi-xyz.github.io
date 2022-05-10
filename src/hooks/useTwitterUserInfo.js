import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNonce, getUserByAddress} from "../request/twitter";
import {calcDays} from "../utils";
import {ClientContract, multicallClient, multicallConfig} from "../web3/multicall";
import {WOOF} from "../web3/address";
import Web3 from "web3";
import {fromWei} from "../utils/format";
import BigNumber from "bignumber.js";
import {useActiveWeb3React} from "../web3";
import {TWITTER_USER_INFO} from "../redux";

export default function useTwitterUserInfo(){
  const {account} = useActiveWeb3React()
  const dispatch = useDispatch()
  const {accountAirClaimed, twitterUserInfoRely} = useSelector(state => state.index)
  const getData = async () => {
    const serverInfos = await getUserByAddress(account)
    const serverInfo = serverInfos[0]
    const calcNonce = await getNonce(account)
    serverInfo.days = calcDays(serverInfo.userCreatedAt)
    serverInfo.calcNonce = calcNonce
    console.log('serverInfo', serverInfo)
    const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
    const calls = [
      contract.isCmpdOf(account),
      contract.price1(),
      contract.price2(),
      contract.balanceOf(account),
      contract.unlockEndOf(account),
      contract.lockedOf(account),
      contract.unlockedOf(account),
      contract.gets([Web3.utils.stringToHex('discount')]),
      contract.calcForce({
        id: Web3.utils.padLeft(Web3.utils.numberToHex(serverInfo.twitterId), 64),
        createTime: ~~(new Date(serverInfo.userCreatedAt).getTime() / 1000),
        followers: serverInfo.followersCount,
        tweets: serverInfo.tweetCount
      }),
      contract.calcRebaseProfit(account)
    ]

    multicallClient(calls).then(data => {
      let [isCmpdOf, price1, price2, balanceOf, unlockEndOf, lockedOf, unlockedOf, [discount], force, [profit, ratio, period]] = data
      price1 = fromWei(price1, 18).toFixed(6)
      price2 = fromWei(price2, 18).toFixed(6)
      balanceOf = fromWei(balanceOf, 18).toFixed(2)
      lockedOf = fromWei(lockedOf, 18, 2).toFixed(2)
      unlockedOf = fromWei(unlockedOf, 18).toFixed(2)
      discount = fromWei(discount, 18).toFixed(4)
      profit = fromWei(profit, 18).toFixed(2)
      ratio = fromWei(ratio, 18).toFixed(4)

      const balanceOfValue = new BigNumber(balanceOf).multipliedBy(price2).toFormat(2)
      const priceDiscount = (price2 > 0 ? ((price2 - price1)/price2 * 100).toFixed(2) : 0) + '%'
      const twitterUserInfo_ = {
        isCmpdOf, price2, balanceOf, unlockEndOf, lockedOf, unlockedOf, discount,
        balanceOfValue,
        priceDiscount,
        Influence: force,
        ...serverInfo,
        calcRebaseProfit: {
          profit,
          ratio,
          period
        }
      }
      console.log(twitterUserInfo_)
      dispatch({
        type: TWITTER_USER_INFO,
        data: twitterUserInfo_
      })
    })
  }
  useMemo(() => {
    if (accountAirClaimed === 1 && account && twitterUserInfoRely !== 0) {
      getData()
    }
  }, [account, accountAirClaimed, twitterUserInfoRely])
}
