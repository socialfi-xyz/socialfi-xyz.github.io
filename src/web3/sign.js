import Web3 from "web3";
import {ChainId, ClientContract, multicallClient} from "./multicall";
import {WOOF} from "./address";
import {numToWei} from "../utils/format";
import {fromRpcSig} from "ethereumjs-util";
export const permitSign = async (tokenValve, account, buyTokenData) => {
  const web3 = new Web3(window.ethereum)
  let nonce = 0
  const tokenContract = new ClientContract(buyTokenData.abi, buyTokenData.address, ChainId.defaultChainId)
  nonce = await multicallClient([
    tokenContract.nonces(account)
  ]).then(data => data[0])
  // const contract = new ClientContract(WOOF.abi, buyTokenData.address, ChainId.defaultChainId)
  const calls = [
    tokenContract.PERMIT_TYPEHASH(),
    tokenContract.DOMAIN_SEPARATOR(),
  ]
  multicallClient(calls).then(res => {
    console.log('xxx', res)
  })
  console.log('buyTokenData', buyTokenData)
  const [PERMIT_TYPEHASH, DOMAIN_SEPARATOR] = await multicallClient(calls)
  const deadline = 4070880000
  console.log('PERMIT_TYPEHASH, DOMAIN_SEPARATOR', PERMIT_TYPEHASH, DOMAIN_SEPARATOR)

  // Permit(address holder,address spender,uint256 nonce,uint256 expiry,bool allowed)
  let structHash;
  if (buyTokenData.allowed){
    structHash = web3.utils.keccak256(web3.eth.abi.encodeParameters(['bytes32', 'address', 'address', 'uint256', 'uint256', 'bool'], [
      PERMIT_TYPEHASH,
      account,
      WOOF.address,
      nonce,
      deadline,
      buyTokenData.allowed]
    ))
  } else {
    structHash = web3.utils.keccak256(
      web3.eth.abi.encodeParameters(['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'], [
        PERMIT_TYPEHASH,
        account,
        WOOF.address,
        numToWei(tokenValve, buyTokenData.decimal),
        nonce,
        deadline
      ])
    )
  }
  const digest = web3.utils.soliditySha3(
    {
      type: 'string',
      value: '\x19\x01'
    },
    {
      type: 'bytes32',
      value: DOMAIN_SEPARATOR
    },
    {
      type: 'bytes32',
      value: structHash
    }
  )
  const signature = await web3.eth.sign(digest, account);
  const sv = fromRpcSig(signature)
  sv.allowed = buyTokenData.allowed
  sv.deadline = deadline
  sv.s = web3.utils.bytesToHex(sv.s)
  sv.r = web3.utils.bytesToHex(sv.r)
  console.log('sv',sv)
  return sv
}
