import React, {useMemo, useState} from "react";
import ArrowDown2 from '../../assets/images/svg/arrow-down2.svg'
import ArrowDown2Dark from '../../assets/images/svg/arrow-down2_d.svg'
import Check from '../../assets/images/svg/check.svg'
import {WoofUserModal} from "../woof-user-modal";
import {WoofModal} from "../woof-modal";
import {WooferFeedView} from './style'
import {getWoofData} from "../../request/thegraph";
import WooferFeedItem from "../woofer-feed-item";
import {useSelector} from "react-redux";
import {cloneDeep} from "lodash";
import {useActiveWeb3React} from "../../web3";
import {useIsDarkMode} from "../../hooks";

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

export default function WooferFeed({type = 'all'}) {
  const {darkMode} = useIsDarkMode()
  const [filterId, setFilterId] = useState(0)
  const {account} = useActiveWeb3React()
  const [coWoofItem, setCoWoofItem] = useState(null)
  // coWoof
  const [poolList, setPoolList] = useState([])
  const [filterPoolList, setFilterPoolList] = useState([])
  const [showWoofUserModal, setShowWoofUserModal] = useState(false)
  const [woofType, setWoofType] = useState(null)
  const [itemsData, setItemsData] = useState({})
  console.log('itemsData', itemsData)
  const {updateWoofList, updateCount} = useSelector(state => state.index)
  console.log('poolList', poolList)
  const [woofUserModalData, setWoofUserModalData] = useState({
    title: '',
    list: []
  })
  const reportItemsData = (item) => {
    const itemsData_ = cloneDeep(itemsData)
    itemsData_[item.tweetId] = item
    setItemsData(itemsData_)
  }
  const setShowWoofUserModalFn = (title, list) => {
    if (list.length === 0) {
      return
    }
    setWoofUserModalData({title, list})
    setShowWoofUserModal(true)
  }
  const getData = async () => {
    const poolList_ = await getWoofData()
    console.log('poolList_', poolList_)
    if (type === 'account') {
      for (let i = 0; i < poolList_.length; i++) {
        const inCoWoof = poolList_[i].cowoofs.find(item => item.account.toLowerCase() === account.toLowerCase())
        const inReWoof = poolList_[i].rewoofs.find(item => item.account.toLowerCase() === account.toLowerCase())
        if (!(poolList_[i].account.toLowerCase() === account.toLowerCase() || inCoWoof || inReWoof)){
          poolList_.splice(i--, 1)
        }
      }
      setPoolList(poolList_)
      onFilter(filterId, poolList_)
    } else {

      setPoolList(poolList_)
      onFilter(filterId, poolList_)
    }
  }

  const onWoofBtn = (type, woof) => {
    setWoofType(type)
    console.log(woof)
    setCoWoofItem(woof)
  }

  const onFilter = (id, poolList_ = poolList) => {
    let filterList_ = cloneDeep(poolList_)
    switch (id) {
      case 1:
        filterList_ = filterList_.sort((a, b) => a.timestamp - b.timestamp)
        break
      case 2:
        filterList_ = filterList_.sort((a, b) => (itemsData[a.tweetId]?.woofEndTime || 0) - (itemsData[b.tweetId]?.woofEndTime || 0))
        break
      case 3:
        filterList_ = filterList_.sort((a, b) => (itemsData[a.tweetId]?.APY || 0) - (itemsData[b.tweetId]?.APY || 0))
        break
      case 4:
        filterList_ = filterList_.sort((a, b) => a.reward - b.reward)
        break
      case 5:
        filterList_ = filterList_.sort((a, b) => a.rewoofAmount - b.rewoofAmount)
        break
      case 6:
        filterList_ = filterList_.sort((a, b) => a.rewoofs.length - b.rewoofs.length)
        break
    }
    setFilterId(id)
    setFilterPoolList(filterList_)
  }

  useMemo(() => {
    if ((type === 'account' && account) || type === 'all') {
      getData()
    }
  }, [updateWoofList, account])

  return (
    <>
      <WooferFeedView>
        <div className="woofer-feed-header">
          <div className="woofer-feed-header-l">Woofer Feed</div>
          <div className="filter-switch flex-center">
            Sort <img src={darkMode ? ArrowDown2Dark : ArrowDown2} alt=""/>
            <div className="filter-switch-list">
              {
                FILTER_LIST.map((item) => (
                  <div key={item.id} onClick={() => onFilter(item.id)}>
                    <div>
                      {filterId === item.id && <img src={Check} alt=""/>}
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
            filterPoolList.map((item, index) => <WooferFeedItem tweet={item} key={item.tweetId} setShowWoofUserModalFn={setShowWoofUserModalFn} onWoofBtn={onWoofBtn} reportItemsData={reportItemsData}/>)
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
