import React, {PureComponent} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import './index.less'
import moment from "moment";

const renderTooltipContent = val => {
  if (val && val.payload && val.payload.length > 0) {
    const time = moment(new Date(val.payload[0].payload.timestamp * 1000)).format("YYYY/MM/DD HH:mm")
    return <div className="dashboard-chart-item-tooltip">
      <p><strong>{time}</strong></p>
      <p>{`Backing Per Token: ${isNaN(val.payload[0].value) ? 0 : val.payload[0].value}`}</p>
    </div>
  }
  return null
}
export default function BackingPerChart({data}) {
  return (
    <div className="backing-per-chart dashboard-chart-item">
      <div className="dashboard-chart-item-title">
        <h2>Backing Per Token</h2>
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
              <linearGradient id="colorBackingPerChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="3%" stopColor="#90d565" stopOpacity={1}/>
                <stop offset="97%" stopColor="#90d565" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="time"/>
            <YAxis/>
            <Tooltip content={renderTooltipContent}/>
            <Area type="monotone" dataKey="backingPerToken" stroke="#90d565" strokeWidth="2px" fillOpacity={1} fill="url(#colorBackingPerChart)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

