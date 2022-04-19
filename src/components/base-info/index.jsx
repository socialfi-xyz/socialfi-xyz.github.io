import React from 'react'
import './index.less'
import {
  Area, Bar,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart, Scatter,
  XAxis,
  YAxis
} from 'recharts'
import {Tooltip} from "antd";
import {toFormat} from "../../utils/format";

export default function BaseInfo({userData, atClaim}){
  console.log('userData', userData)
  const data = [
    {
      subject: 'DAYS ON TWITTER',
      val: userData.days,
    },
    {
      subject: 'TWEETS',
      val: userData.sign && userData.sign && userData.sign.twitters && userData.sign.twitters.length || 0
    },
    {
      subject: 'FOLLOWERS',
      val: userData.followersCount||0
    },
    {
      subject: 'INFLUENCE',
      val: userData.Influence || 0
    }
  ]
  console.log('userDataxxxx', userData)
  return (
    <div className="user-base-info-view">
      <div className="twitter-base-data">
        <div className="twitter-avatar">
          <img src={userData.avatar} alt=""/>
          <div>
            <p>{userData.name}</p>
            <p>@{userData.username}</p>
          </div>
        </div>
        <div className="base-data-txt">
          <div>Days on Twitter</div>
          <div>{toFormat(userData.days)}</div>
          <div>Followers</div>
          <div>{toFormat(userData.followersCount)}</div>
          <div>Tweets</div>
          <div>{(userData.sign && userData.sign.twitters && userData.sign.twitters.length) || 0}</div>
          <div>Influence</div>
          <div>{toFormat(userData.Influence)}</div>
          {
            atClaim && (
              <>
                <div>Available to claim</div>
                <div>{userData.availableClaim || 0}</div>
              </>
            )
          }
        </div>
      </div>
      <div className="chart flex-center">
        <RadarChart outerRadius={90} width={342} height={254} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" color="#ffffff" stroke="#BBBDBF"/>
          <PolarRadiusAxis angle={30} domain={[0, 150]}/>
          <Radar dataKey="val" stroke="#7935FF" fill="#7935FF"  fillOpacity="0.8"/>
          <Tooltip />
        </RadarChart>
      </div>
    </div>
  )
}
