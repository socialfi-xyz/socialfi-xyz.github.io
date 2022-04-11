import React, {PureComponent} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import './index.less'
import moment from "moment";
import {formatAmount} from "../../../utils/format";
import {toPercent} from "../../../utils";

const renderTooltipContent = val => {
  if (val && val.payload && val.payload.length > 0) {
    const time = moment(new Date(val.payload[0].payload.timestamp * 1000)).format("YYYY/MM/DD HH:mm")
    return <div className="dashboard-chart-item-tooltip">
      <p><strong>{time}</strong></p>
      <p>{`Market Capitalization: $${formatAmount(val.payload[0].value, 0, 0)}`}</p>
    </div>
  }
  return null
}
export default function MarketCapChart({data}) {
  return (
    <div className="market-cap-chart dashboard-chart-item">
      <div className="dashboard-chart-item-title">
        <h2>Market Capitalization</h2>
      </div>
      <div className="dashboard-chart-item-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorMarketCap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="3%" stopColor="#689bff" stopOpacity={1}/>
                <stop offset="97%" stopColor="#689bff" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="time"/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Area type="monotone" dataKey="marketCap" stroke="#689bff" strokeWidth="2px" fillOpacity={1} fill="url(#colorMarketCap)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

