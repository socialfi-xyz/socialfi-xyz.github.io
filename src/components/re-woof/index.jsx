import React, {useMemo, useState} from "react";
import {Button, Input} from "antd";
import ArrowDown2 from "../../assets/images/svg/arrow-down2.svg";
import ArrowDown2Dark from '../../assets/images/svg/arrow-down2_d.svg'
import ArrowDown3 from "../../assets/images/svg/arrow-down3.svg";
import cs from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {fromWei, numToHex, numToWei, toFormat, tweetIdToHex} from "../../utils/format";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {ADDRESS_INFINITY, WOOF} from "../../web3/address";
import {ReWoofView} from "./style";
import {STInput, CInput, CButton} from "../../theme/styleComponent";
import {tweetIntent} from "../../utils/tweet";
import {getHref} from "../../utils";
import {HASHTAG, TASK_TYPE_RE_WOOF} from "../../request";
import {getContract, useActiveWeb3React} from "../../web3";
import Web3 from "web3";
import {permitSign} from "../../web3/sign";
import ERC20Abi from "../../web3/abi/ERC20.json";
import {UPDATE_COUNT, UPDATE_WOOF_LIST} from "../../redux";
import {message} from 'antd'
import {getNodeSign, getNonce, getUserInfo} from "../../request/twitter";
import {useIsDarkMode} from "../../hooks";
import BigNumber from "bignumber.js";
import MsgSuccess from '../../assets/images/svg/msgSuccess.svg'
import SuccessIcon from '../../assets/images/svg/success.svg'
import ArrowRIcon from '../../assets/images/svg/arrow-r.svg'
import ArrowLIcon from '../../assets/images/svg/arrow-l.svg'

function SInput({
                  tokenValve,
                  buyTokenData,
                  selectToken,
                  superBuyTokenList,
                  setSelectToken,
                  setTokenValve,
                  onMax,
                  woofType,
                  outWoof
                }) {

  const {darkMode} = useIsDarkMode()
  return (
    <>
      <div className="s-view">
        {
          (tokenValve < buyTokenData.woofMin) && (woofType === 'Woof' || woofType === 'Co-woof') &&
          <p className="input-error-t">Minimum required to
            woof: {toFormat(buyTokenData.woofMin)} {buyTokenData.symbol} ({toFormat(buyTokenData.woofMinOut)} ${WOOF.symbol})</p>
        }
        <STInput>
          <div className="select-view flex-center">
            <span>{selectToken}</span>
            <img src={darkMode ? ArrowDown2Dark : ArrowDown2} alt=""/>
            <div className="select-view-menu">
              {
                superBuyTokenList.map(item => (
                  <div key={item.symbol} onClick={() => {
                    setSelectToken(item.symbol)
                  }}>
                    {item.symbol}
                  </div>
                ))
              }
            </div>
          </div>
          <div className="st-input-box">
            <CInput type="number" value={tokenValve} onInput={e => setTokenValve(e.target.value)}
                    placeholder={'0 ' + selectToken}/>
            <div className="st-input-menu">
              <CButton size="small" onClick={onMax}>MAX</CButton>
            </div>
          </div>
        </STInput>
      </div>
      <div className="input-ad">
        <p>{tokenValve > 0 && <>{tokenValve}{selectToken} = {toFormat(outWoof)} WOOF</>}</p>
        <p>Currently balance： {buyTokenData.balanceOf} {selectToken}</p>
      </div>
    </>
  )
}


//woofType = Woof Rewoof Co-woof
export default function ReWoof({woofType = 'Woof', coWoofItem, onClose}) {

  const [tweetLink, setTweetLink] = useState(coWoofItem ? `https://twitter.com/${coWoofItem.accountTwitterData.username}/status/${coWoofItem.tweetId}` : '')
  const {superBuyTokenList, twitterUserInfo} = useSelector(state => state.index)
  const {account, library} = useActiveWeb3React()
  const dispatch = useDispatch()

  const [selectToken, setSelectToken] = useState(superBuyTokenList[0].symbol)
  const [permitSignData, setPermitSignData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tokenValve, setTokenValve] = useState('')
  const [woofValve, setWoofValue] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const buyTokenData = useMemo(() => (superBuyTokenList.filter(item => item.symbol === selectToken))[0],
    [superBuyTokenList, selectToken])
  const [outWoof, setOutWoof] = useState('0')
  const [calcNonce, setCalcNonce] = useState('')
  const [onTweetLoading, setOnTweetLoading] = useState(false)
  const [onReTweetLoading, setOnReTweetLoading] = useState(false)
  const [woofTweetType, setWoofTweetType] = useState(0)//0 tweet, 1 retweet (woofType===Woof)

  const [step, setStep] = useState(1)

  const onMax = () => {
    if (selectToken === superBuyTokenList[0].symbol) {
      setTokenValve(Math.max(new BigNumber(buyTokenData.balanceOf - 0.1).toFixed(4, 1), 0))
    } else {
      setTokenValve(buyTokenData.balanceOf)
    }
  }
  const calcOut = () => {
    const tokenValue_ = numToWei(Number(tokenValve || 0).toFixed(buyTokenData.decimal), buyTokenData.decimal)
    if (tokenValue_ > 0) {
      const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
      const calls = [
        contract.calcOut(tokenValue_, buyTokenData.router)
      ]
      multicallClient(calls).then(data => {
        if (data[0] === undefined) {
          return
        }
        setOutWoof(fromWei(data[0], WOOF.decimals).toFixed(2))
      })
    } else {
      setOutWoof('0')
    }
  }


  useMemo(() => {
    calcOut()
    setPermitSignData(null)
  }, [selectToken, tokenValve])

  useMemo(() => {
    setTokenValve(null)
    setPermitSignData(null)
  }, [selectToken])

  const onTweet = async (type) => {
    if (account) {
      if (type === 'tweet') {
        setOnTweetLoading(true)
        setWoofTweetType(0)
      } else if (type === 'retweet') {
        setOnReTweetLoading(true)
        setWoofTweetType(1)
      }
      const calcNonce_ = await getNonce(account)
      setCalcNonce(calcNonce_)
      if (type === 'tweet') {
        setOnTweetLoading(false)
      } else if (type === 'retweet') {
        setOnReTweetLoading(false)
      }
      window.open(tweetIntent({
        text: getHref(twitterUserInfo.username, calcNonce_),
        url: tweetLink,
        hashtags: HASHTAG
      }), '_blank', `width=1000,height=500,menubar=no,toolbar=no,status=no,scrollbars=yes,left=${window.screenLeft + 200}px,top=${window.screenTop + 200}px`)
      setStep(2)
    }
  }

  const onPermitSign = async () => {
    if (!tokenValve || tokenValve <= 0) {
      return
    }
    const sv = await permitSign(tokenValve, account, buyTokenData)
    setPermitSignData(sv)
  }
  const onApprove = () => {
    setLoading(true)
    const contract = getContract(library, ERC20Abi, buyTokenData.address)
    contract.methods.approve(WOOF.address, ADDRESS_INFINITY).send({
      from: account
    }).on('receipt', async (_, receipt) => {
      dispatch({
        type: UPDATE_COUNT
      })
      setLoading(false)
    })
      .on('error', (err, receipt) => {
        setLoading(false)
      })
  }

  const onReWoof = async () => {
    if (!account) {
      return
    }
    if ((!tokenValve || tokenValve < buyTokenData.woofMin) && (woofType === 'Woof' || woofType === 'Co-woof')) {
      message.warning(`Minimum required to woof: ${toFormat(buyTokenData.woofMin)} ${buyTokenData.symbol} (${toFormat(buyTokenData.woofMinOut)} ${WOOF.symbol})`)
      return
    }
    setLoading(true)
    let PermitSign = {
      deadline: 0,
      allowed: buyTokenData.allowed,
      v: 0,
      r: Web3.utils.padLeft(Web3.utils.numberToHex(0), 64),
      s: Web3.utils.padLeft(Web3.utils.numberToHex(0), 64)
    }
    const tokenContract = new ClientContract(WOOF.abi, WOOF.address)
    let tokenNonce = 0
    if (!buyTokenData.isPermitSign) {
      tokenNonce = await multicallClient([
        tokenContract.nonces(account)
      ]).then(data => data[0]).catch(() => {
      })
      PermitSign = permitSignData
      console.log('tokenNonce', tokenNonce)
    }
    const params = {
      username: twitterUserInfo.username,
      account,
      type: TASK_TYPE_RE_WOOF,
      calcNonce: calcNonce
    }
    console.log('calcNonce', calcNonce)
    console.log('params', params)
    setLoading(true)
    const queryData = await getUserInfo(params).catch(() => {
      message.warning('tweet not found')
      setLoading(false)
    })
    if (!queryData) {
      return
    }
    console.log('queryData', queryData)
    const contract = getContract(library, WOOF.abi, WOOF.address)
    const value = numToWei(tokenValve, buyTokenData.decimal).toString()
    const amount = numToWei(woofValve || '0', WOOF.decimals)
    const tweetId_ = queryData.tweet.referencedTweets.length > 0 ? queryData.tweet.referencedTweets[0].tweet.id : queryData.tweet.tweetId
    const twitterId_ = queryData.tweet.referencedTweets.length > 0 ? queryData.tweet.referencedTweets[0].tweet.author_id : queryData.tweet.twitterId
    console.log('params__', tweetIdToHex(twitterUserInfo.twitterId),
      tweetIdToHex(twitterId_),
      tweetIdToHex(tweetId_),
      amount,
      value,
      PermitSign,
      buyTokenData.router,
    )

    console.log('params__', params)
    const signData = await getNodeSign(params).catch(() => {
      setLoading(false)
    })
    console.log('signData.signatureList', signData.signatureList)

    console.log('contract params', tweetIdToHex(twitterUserInfo.twitterId),
      tweetIdToHex(twitterId_),
      tweetIdToHex(tweetId_),
      amount,
      value,
      PermitSign,
      buyTokenData.router,
      signData.signatureList)

    if (woofType === 'Co-woof' || woofType === 'Woof') {
      contract.methods.cowoof(
        tweetIdToHex(twitterUserInfo.twitterId),
        tweetIdToHex(twitterId_),
        tweetIdToHex(tweetId_),
        amount,
        value,
        PermitSign,
        buyTokenData.router,
        signData.signatureList
      ).send({
        from: account,
        value: buyTokenData.symbol === superBuyTokenList[0].symbol ? value : undefined
      })
        .on('receipt', (_, receipt) => {
          setLoading(false)
          dispatch({
            type: UPDATE_WOOF_LIST
          })
          if (woofType === 'Co-woof') {
            message.success({
              content: 'Co-woofed!',
              icon: <img src={MsgSuccess}/>
            })
            onClose && onClose()
          } else if (woofType === 'Woof') {
            message.success({
              content: 'Woofed!',
              icon: <img src={MsgSuccess}/>
            })
            setWoofTweetType(1)
            setTweetLink('')
          }
        })
        .on('error', (err, receipt) => {
          setLoading(false)
        })
    } else if (woofType === 'Rewoof') {
      contract.methods.rewoof(
        tweetIdToHex(twitterUserInfo.twitterId),
        tweetIdToHex(tweetId_),
        amount,
        value,
        PermitSign,
        buyTokenData.router,
        signData.signatureList
      ).send({
        from: account,
        value: buyTokenData.symbol === superBuyTokenList[0].symbol ? value : undefined
      }).on('transactionHash', hash => {

      })
        .on('receipt', (_, receipt) => {
          setLoading(false)
          dispatch({
            type: UPDATE_WOOF_LIST
          })
          message.success({
            content: 'Completed!',
            icon: <img src={MsgSuccess}/>
          })
          onClose && onClose()
        })
        .on('error', (err, receipt) => {
          setLoading(false)
        })
    }

    // bytes32 id, bytes32 twitterId, bytes32 tweetId, uint amount, uint value, PermitSign calldata ps, address[] calldata path, Signature[] calldata signatures
  }
  useMemo(() => {
    setWoofValue(twitterUserInfo.unlockedOf)
    onMax()
  }, [twitterUserInfo])
  const onPaste = () => {
    const TEXT = navigator.clipboard.readText();
    TEXT.then(text => {
      const S = text.split('/')
      if (text.indexOf('https://twitter.com/') === 0 && S[4] === 'status' && !isNaN(S[5])) {
        setTweetLink(text)
      } else {
        message.warning('Please copy the tweet address first')
      }
    }).catch(err => {
      message.warning('Failed to read clipboard contents')
    });
  }

  return (
    <ReWoofView>
      <div className="re-woof-panel">
        <div className="steps-v">
          {
            step === 2 && <img src={ArrowLIcon} className='arrow-l' alt="" onClick={() => setStep(1)}/>
          }
          <div className="steps">
            <div className={"step active " + (step !== 1 ? ' n-border' : '')}>
              <div>{step >= 1 ? <img src={SuccessIcon} alt=""/> : '1'}</div>
              <p>Tweet</p>
              <img src={ArrowRIcon} className='arrow-r' alt=""/>
            </div>
            <div className={'step' + (step >= 2 ? ' active' : '')}>
              <div>2</div>
              <p>{woofType}</p>
            </div>
          </div>
        </div>
        <div className="panel-v">
          {
            step === 1 && (
              <div className="re-tweet-view" style={{'gridTemplateColumns': woofType === 'Woof' ? '1fr 1fr' : '1fr', maxWidth: woofType === 'Woof' ? '800px' : '400px'}}>
                {
                  <div className="re-tweet-view-item" style={{display: woofType === 'Woof' ? 'flex' : 'none'}}>
                    <p>Woof</p>
                    <CButton type="primary" onClick={() => onTweet('tweet')} loading={onTweetLoading}>Tweet</CButton>
                  </div>
                }
                <div className="re-tweet-view-item">
                  <p>Co-woof</p>
                  <div className="tweet-link-input">
                    <STInput>
                      <div className="st-input-box">
                        <CInput
                          type="text"
                          className="pro-input"
                          value={tweetLink}
                          placeholder="Tweet link"
                          style={{paddingRight: 0}}
                          onInput={e => setTweetLink(e.target.value)}
                          readOnly={woofType === 'Co-woof'}
                        />
                        {
                          woofType === 'Woof' && <div className="st-input-menu">
                            <CButton size="small" onClick={onPaste} id="paste">Paste</CButton>
                          </div>
                        }
                      </div>
                    </STInput>
                  </div>
                  <CButton type="primary" disabled={!tweetLink} onClick={() => onTweet('retweet')}
                           loading={onReTweetLoading}>Tweet</CButton>
                </div>
              </div>)
          }
          {
            step === 2 && (
              <div className="woof-view">
                {
                  ((woofType === 'Woof' && woofTweetType === 1) || woofType !== 'Woof') && <STInput>
                    <div className="st-input-box">
                      <CInput
                        type="text"
                        className="pro-input"
                        value={tweetLink}
                        placeholder="Tweet link"
                        style={{paddingRight: 0}}
                        onInput={e => setTweetLink(e.target.value)}
                        readOnly
                      />
                    </div>
                  </STInput>
                }
                {
                  woofType !== 'Rewoof' && <>
                    <SInput
                      onMax={onMax}
                      buyTokenData={buyTokenData}
                      selectToken={selectToken}
                      setSelectToken={setSelectToken}
                      setTokenValve={setTokenValve}
                      tokenValve={tokenValve}
                      superBuyTokenList={superBuyTokenList}
                      woofType={woofType}
                      outWoof={outWoof}
                    />
                    {
                      showMore && <>
                        <div className="h-view">
                          <div className="s-view">
                            <STInput>
                              <div className="st-input-box">
                                <CInput type="number" value={woofValve} onInput={e => setWoofValue(e.target.value)}
                                        placeholder="WOOF"/>
                                <div className="st-input-menu">
                                  <CButton size="small"
                                           onClick={() => setWoofValue(twitterUserInfo.unlockedOf)}>MAX</CButton>
                                </div>
                              </div>
                            </STInput>
                          </div>
                        </div>
                      </>
                    }
                  </>
                }
                {
                  woofType === 'Rewoof' && showMore && (
                    <>
                      <div>
                        <div className="s-view">
                          <div className="s-view">
                            {
                              (!outWoof || outWoof < woofValve * 0.1) &&
                              <p className="input-error-t">Minimum 10% of Rewoofer TVL required</p>
                            }
                            <STInput>
                              <div className="st-input-box">
                                <CInput type="number" value={woofValve} onInput={e => setWoofValue(e.target.value)}
                                        placeholder="WOOF"/>
                                <div className="st-input-menu">
                                  <CButton size="small"
                                           onClick={() => setWoofValue(twitterUserInfo.unlockedOf)}>MAX</CButton>
                                </div>
                              </div>
                            </STInput>
                          </div>
                        </div>
                      </div>
                      <SInput
                        onMax={onMax}
                        buyTokenData={buyTokenData}
                        selectToken={selectToken}
                        setSelectToken={setSelectToken}
                        setTokenValve={setTokenValve}
                        tokenValve={tokenValve}
                        superBuyTokenList={superBuyTokenList}
                        woofType={woofType}
                        outWoof={outWoof}
                      />
                    </>
                  )
                }
                <div className="woof-btn">
                  {
                    !buyTokenData.isApprove ? (
                      <CButton type="primary" onClick={onApprove} loading={loading}
                               style={{width: '100%'}}>Approve</CButton>
                    ) : !buyTokenData.isPermitSign && !permitSignData ? (
                      <CButton type="primary" onClick={onPermitSign} loading={loading}>PermitSign</CButton>
                    ) : <CButton type="primary" onClick={onReWoof} disabled={(tokenValve < buyTokenData.woofMin)}
                                 loading={loading}>
                      {woofType}
                    </CButton>
                  }
                  <img src={ArrowDown3} className={cs({
                    "arrow-down-3": true,
                    'top-v': showMore
                  })} alt="" onClick={() => setShowMore(!showMore)}/>
                </div>

              </div>
            )
          }
        </div>
      </div>
    </ReWoofView>
  )
}
