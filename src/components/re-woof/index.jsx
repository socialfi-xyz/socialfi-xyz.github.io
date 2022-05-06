import React, {useMemo, useState} from "react";
import './index.less'
import {Button, Input} from "antd";
import ArrowDown2 from "../../assets/images/svg/arrow-down2.svg";
import ArrowDown3 from "../../assets/images/svg/arrow-down3.svg";
import cs from "classnames";
import {useSelector} from "react-redux";
import {formatAmount, fromWei, numToWei, toFormat} from "../../utils/format";
import {ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {WOOF} from "../../web3/address";

function SInput({tokenValve, buyTokenData, selectToken, superBuyTokenList, setSelectToken, setTokenValve, onMax, woofType, outWoof}) {

  return (
    <>
      <div className="s-view">
        {
          (tokenValve < buyTokenData.woofMin) && (woofType === 'woof' || woofType === 'Co-woof') &&
          <p className="input-error-t">Minimum required to woof: {buyTokenData.woofMin} {buyTokenData.symbol} {buyTokenData.woofMinOut}
            WOOF</p>
        }
        <div className="st-input">
          <div className="token-select flex-center">
            <span>{selectToken}</span>
            <img src={ArrowDown2} alt=""/>
            <div className="token-select-menu">
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
          <div className="input-eth">
            <Input type="number" value={tokenValve} onInput={e => setTokenValve(e.target.value)}
                   placeholder={'0 ' + selectToken}/>
            <div className="input-menu">
              <span>{selectToken}</span>
              <Button size="small" onClick={onMax}>MAX</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="input-ad">
        <p>{tokenValve > 0 && <>{tokenValve}{selectToken} = {toFormat(outWoof)} WOOF</>}</p>
        <p>Currently balance： {buyTokenData.balanceOf} {selectToken}</p>
      </div>
    </>
  )
}


//woofType = Woof Rewoof Co-woof
export default function ReWoof({woofType = 'Woof'}) {

  const [tweetLink, setTweetLink] = useState('')
  const {superBuyTokenList, woofBalanceOf, ethPrice, woofPrice} = useSelector(state => state.index)
  const [selectToken, setSelectToken] = useState(superBuyTokenList[0].symbol)
  const [permitSignData, setPermitSignData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tokenValve, setTokenValve] = useState(null)
  const [woofValve, setWoofValue] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const buyTokenData = useMemo(() => (superBuyTokenList.filter(item => item.symbol === selectToken))[0],
    [superBuyTokenList, selectToken])
  const [outWoof, setOutWoof] = useState('0')
  const onMax = () => {
    if (selectToken === superBuyTokenList[0].symbol) {
      setTokenValve(buyTokenData.balanceOf - 0.1)
    } else {
      setTokenValve(buyTokenData.balanceOf)
    }
  }
  const calcOut = () => {
    const tokenValue_ = numToWei(Number(tokenValve||0).toFixed(buyTokenData.decimal), buyTokenData.decimal)
    if (tokenValue_ > 0) {
      const contract = new ClientContract(WOOF.abi, WOOF.address, multicallConfig.defaultChainId)
      const calls = [
        contract.calcOut(tokenValue_, buyTokenData.router)
      ]
      multicallClient(calls).then(data => {
        if (data[0] === undefined){
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
  }, [selectToken, tokenValve])
  return (
    <div className="re-woof-view">
      {
        woofType !== 'Rewoof' && <>
          <Input
            type="text"
            className="pro-input"
            value={tweetLink}
            placeholder="Tweet link"
            style={{paddingRight: 0}}
            onInput={e => setTweetLink(e.target.value)}
            readOnly={woofType === 'Co-woof'}
          />
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
                  <div className="st-input">
                    <div className="input-eth">
                      <Input type="number" value={woofValve} onInput={e => setWoofValue(e.target.value)}
                             placeholder="WOOF"/>
                      <div className="input-menu">
                        <Button size="small" onClick={() => setWoofValue(woofBalanceOf)}>MAX</Button>
                      </div>
                    </div>
                  </div>
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
                {
                  outWoof < woofValve * 0.1 && <p className="input-error-t">Minimum 10% of Rewoofer TVL required</p>
                }
                <div className="st-input">
                  <div className="input-eth">
                    <Input type="number" value={woofValve} onInput={e => setWoofValue(e.target.value)}
                           placeholder="WOOF"/>
                    <div className="input-menu">
                      <Button size="small" onClick={() => setWoofValue(woofBalanceOf)}>MAX</Button>
                    </div>
                  </div>
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

      <div className="step-btn-box">
        <div className="flex-center">
          <div className="step-radius">1</div>
          <Button type="primary">Tweet</Button>
        </div>
        <div className="flex-center">
          <div className="step-radius disabled">2</div>
          <Button type="primary" disabled>Woof</Button>
          <img src={ArrowDown3} className={cs({
            "arrow-down-3": true,
            'top-v': showMore
          })} alt="" onClick={() => setShowMore(!showMore)}/>
        </div>
      </div>
    </div>
  )
}
