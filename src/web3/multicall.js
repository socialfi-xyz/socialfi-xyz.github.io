import {ChainId, config, multicallClient, Contract as ClientContract} from "@chainstarter/multicall-client.js";
ChainId.rinkeby = 4
const multicallConfig = config({
  defaultChainId: ChainId.rinkeby,
  allowFailure: false,
  rpc:{
    [ChainId.rinkeby]: {
      url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696'
    }
  }
})

export {
  ChainId,
  multicallClient,
  ClientContract,
  multicallConfig
}
