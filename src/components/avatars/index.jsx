import React from "react";
import './index.less'

export default function Avatars({list, max = 3}) {
  if (!list || list.length === 0) {
    return null
  }
  const List = []
  const max_ = Math.min(list.length, max)
  for (let i = 0; i < max_; i++) {
    List.push(<img key={i} src={list[i].accountTwitterData.avatar} alt="" style={{
      zIndex: max_ - i+'',
      marginLeft: -5*i + 'px'
    }}/>)
  }
  return (
    <div className="avatars-view">
      {List}
    </div>
  )
}
