import React, {useContext, useEffect, useMemo, useState} from 'react'
import './index.less'
import Layout from "../../components/layout";

import {ChainId, ClientContract, multicallClient, multicallConfig} from "../../web3/multicall";
import {ADDRESS_0, SFI} from "../../web3/address";
import {formatAmount, fromWei, numToWei} from "../../utils/format";
import {cloneDeep} from "lodash";
import {VarContext} from "../../context";
import BigNumber from "bignumber.js";
import StatisticsIcon from '../../assets/images/dashboard/statistics-icon.svg'
import {queryDashboardData} from "../../request/thegraph";
import ApyChart from "../../components/charts/apy-chart";
import IndexChart from "../../components/charts/index-chart";
import MarketCapChart from "../../components/charts/market-cap-chart";
import TreasuryValueChart from "../../components/charts/treasury-value-chart";
import BackingPerChart from "../../components/charts/backing-per-chart";

function RenderMap({data}) {
  const list = []
  for (const dataKey in data) {
    list.push(
      <div key={dataKey} className="dao-statistics">
          <h1>{data[dataKey].name}</h1>
          <h2>{data[dataKey].value}</h2>
      </div>
    )
  }
  return list
}

export default function Dashboard() {
  const { blockHeight } = useContext(VarContext)
  const [data, setData] = useState({
      MarketCap: {
        name: 'Market Capitalization',
        value: '-',
        icon: StatisticsIcon
      },
      TreasuryValue: {
        name: 'Treasury Value',
        value: '-',
        icon: StatisticsIcon
      },
      TotalSupply: {
        name: 'Total Supply',
        value: '-',
        icon: StatisticsIcon
      },
      SFIPrice: {
        name: 'SFI Price',
        value: '-',
        icon: StatisticsIcon
      },
      BackingPerSFI: {
        name: 'Backing Per SFI',
        value: '-',
        icon: StatisticsIcon
      },
      RebaseAPY: {
        name: 'Rebase APY',
        value: '-',
        icon: StatisticsIcon
      },
      Index: {
        name: 'Index',
        value: '-',
        icon: StatisticsIcon
      },
      ClaimCoefficient: {
        name: 'Claim Coefficient',
        value: '-',
        icon: StatisticsIcon
      },
      ROI: {
        name: 'ROI (5-Day Rate)',
        value: '-',
        icon: StatisticsIcon
      },
      NextRewardYield: {
        name: 'Next Reward Yield',
        value: '-',
        icon: StatisticsIcon
      }
    }
  )
  const [graphData, setGraphData] = useState([])
  const getData = () => {
    const contract = new ClientContract(SFI.abi, SFI.address, multicallConfig.defaultChainId)
    const calls = [
      contract.calcRebaseProfit(ADDRESS_0),
      contract.price1(),
      contract.price2(),
    ]
    Promise.all([
      multicallClient(calls),
      queryDashboardData()
      // multicallClient.getEthBalance(SFI.address, multicallConfig.defaultChainId),
      ])
    .then(res => {
      const [[profit, ratio, period], price1, price2] = res[0]
      const graphData = res[1]
      const graphLastData = graphData[graphData.length - 1]
      const data_ = cloneDeep(data)
      // const ratio5Day = (Math.pow(1 + fromWei(ratio, 18).toNumber(), 5) - 1) * 100
      const price1_ = fromWei(price1).toString()
      const price2_ = fromWei(price2).toString()
      const ratio5Day = ((price2_ - price1_)/price1_ * 100)
      data_.MarketCap.value = `$${new BigNumber(graphLastData.marketCap).toFormat(0)}`
      data_.TreasuryValue.value = `$${new BigNumber(graphLastData.treasuryValue).toFormat(0)}`
      data_.TotalSupply.value = `${new BigNumber(graphLastData.totalSupply).toFormat(0)}`
      data_.SFIPrice.value = `$${graphLastData.price}`
      data_.BackingPerSFI.value = `${new BigNumber(graphLastData.backingPerToken).toFixed(2)*1}`
      data_.Index.value = `${graphLastData.index*1}`
      data_.ClaimCoefficient.value = `${fromWei(graphLastData.claimFactor, 18).toFixed(2)*1}`
      data_.RebaseAPY.value = `${(graphLastData.apy * 100).toFixed(0) * 1}%`
      data_.ROI.value = `${ratio5Day.toFixed(2)}%`
      data_.NextRewardYield.value = `${fromWei(profit, 18).toFixed(2)}`
      setGraphData(graphData)
      setData(data_)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <div className="dashboard layout-content-page custom-scroll">
        <div className="dashboard-box">
          <div className="dashboard-data custom-scroll">
            <RenderMap data={data}/>
          </div>
          <div className="dashboard-charts">
            <div><ApyChart data={graphData}/></div>
            <div><IndexChart data={graphData}/></div>
            <div><MarketCapChart data={graphData}/></div>
            <div><TreasuryValueChart data={graphData}/></div>
            <div><BackingPerChart data={graphData}/></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
