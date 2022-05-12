import React, {useMemo, useState} from "react";
import ArrowDown2 from '../../assets/images/svg/arrow-down2.svg'
import Check from '../../assets/images/svg/check.svg'
import {WoofUserModal} from "../woof-user-modal";
import {WoofModal} from "../woof-modal";
import {WooferFeedView} from './style'
import {getWoofData} from "../../request/thegraph";
import WooferFeedItem from "../woofer-feed-item";
import {useSelector} from "react-redux";

const FILTER_LIST = [
  {
    title: 'None',
    id: 0
  },
  {
    title: 'Start Time',
    id: 1
  },
  {
    title: 'Remaining Period',
    id: 2
  },
  {
    title: 'Highest APY',
    id: 3
  },
  {
    title: 'Highest Rewards',
    id: 4
  },
  {
    title: 'Highest Rewoof TVL',
    id: 5
  },
  {
    title: 'Highest Rewoofers',
    id: 6
  }
]

export default function WooferFeed() {
  const [checked, setChecked] = useState(0)

  const [coWoofItem, setCoWoofItem] = useState(null)
  // coWoof
  const [poolList, setPoolList] = useState([])
  const [showWoofUserModal, setShowWoofUserModal] = useState(false)
  const [woofType, setWoofType] = useState(null)

  const {updateWoofList, updateCount} = useSelector(state => state.index)

  const [woofUserModalData, setWoofUserModalData] = useState({
    title: '',
    list: []
  })
  const setShowWoofUserModalFn = (title, list) => {
    if (list.length === 0) {
      return
    }
    setWoofUserModalData({title, list})
    setShowWoofUserModal(true)
  }
  const getData = async () => {
    const poolList_ = await getWoofData()
    setPoolList(poolList_)
    console.log('poolList', poolList)
  }

  const onWoofBtn = (type, woof) => {
    setWoofType(type)
    console.log(woof)
    setCoWoofItem(woof)
  }

  useMemo(() => {
    getData()
  }, [updateWoofList])

  return (
    <>
      <WooferFeedView>
        <div className="woofer-feed-header">
          <div className="woofer-feed-header-l">Woofer Feed</div>
          <div className="filter-switch flex-center">
            Sort <img src={ArrowDown2} alt=""/>
            <div className="filter-switch-list">
              {
                FILTER_LIST.map((item) => (
                  <div key={item.id} onClick={() => setChecked(item.id)}>
                    <div>
                      {checked === item.id && <img src={Check} alt=""/>}
                    </div>
                    <div>
                      {item.title}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="woofer-list">
          {
            poolList.map((item, index) => <WooferFeedItem tweet={item} key={item.tweetId} setShowWoofUserModalFn={setShowWoofUserModalFn} onWoofBtn={onWoofBtn}/>)
          }
        </div>

        <WoofUserModal list={woofUserModalData.list} title={woofUserModalData.title}
                       onClose={() => setShowWoofUserModal(false)}
                       visible={showWoofUserModal}/>
        <WoofModal visible={!!woofType} onClose={() => setWoofType(null)} woofType={woofType} coWoofItem={coWoofItem}/>
      </WooferFeedView>
    </>
  )
}
