import React, {useMemo, useState} from "react";
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
import LoadingIcon from "../../assets/images/svg/loading.svg";
import EmptyIcon from "../../assets/images/svg/empty.svg";
import ArrowSortIcon from "../../assets/images/svg/arrow-down-sort.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const FILTER_ACTION_ALL = [
  {
    title: 'None',
    id: 0
  },
  // {
  //   title: 'Start Time',
  //   id: 1,
  //   sort: 'asc',//desc
  // },
  {
    title: 'Remaining Period',
    id: 2,
    sort: 'desc',
  },
  {
    title: '7-day Return',
    id: 3,
    sort: 'desc',
  },
  {
    title: 'Rewards',
    id: 4,
    sort: 'asc',//desc
  },
  {
    title: 'Rewoof TVL',
    id: 5,
    sort: 'desc',
  },
  {
    title: 'Rewoofers',
    id: 6,
    sort: 'desc',
  }
]
const pageSize = 5
export default function WooferFeed({type = 'all', setUserWoofFeed, children}) {
  const [filterId, setFilterId] = useState(0)
  const {account} = useActiveWeb3React()
  const [coWoofItem, setCoWoofItem] = useState(null)

  const [poolList, setPoolList] = useState([])
  const [filterPoolList, setFilterPoolList] = useState([])
  const [showWoofUserModal, setShowWoofUserModal] = useState(false)
  const [woofType, setWoofType] = useState(null)
  const [itemsData, setItemsData] = useState({})
  const [loadLoading, setLoadLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [showPoolList, setShowPoolList] = useState([])

  const {updateWoofList} = useSelector(state => state.index)

  const [filterActions, setFilterActions] = useState(FILTER_ACTION_ALL)

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
    setLoadLoading(true)
    const poolList_ = await getWoofData()
    if (type === 'account') {
      for (let i = 0; i < poolList_.length; i++) {
        const inCoWoof = poolList_[i].cowoofs.find(item => item.account.toLowerCase() === account.toLowerCase())
        const inReWoof = poolList_[i].rewoofs.find(item => item.account.toLowerCase() === account.toLowerCase())
        if (!(poolList_[i].account.toLowerCase() === account.toLowerCase() || inCoWoof || inReWoof)){
          poolList_.splice(i--, 1)
        }
      }
      setPoolList(poolList_)
      setUserWoofFeed && setUserWoofFeed(poolList_)
      onFilter(filterId,'desc', poolList_)
    } else {
      setPoolList(poolList_)
      onFilter(filterId,'desc', poolList_)
    }
    setLoadLoading(false)
  }

  const onWoofBtn = (type, woof) => {
    setWoofType(type)
    setCoWoofItem(woof)
  }

  const subT = (a, b, bol) => {
    return bol ? a-b : b-a
  }

  const onFilter = (id, sort, poolList_ = poolList) => {
    let filterList_ = cloneDeep(poolList_)
    let filterActions_ = cloneDeep(filterActions)
    for (let i = 0; i < filterActions_.length; i++) {
      if (filterActions_[i].id === id){
        filterActions_[i].sort = sort
        break
      }
    }
    switch (id) {
      case 0:
        filterList_ = filterList_.sort((a, b) => b.timestamp - a.timestamp)
        break
      case 2:
        filterList_ = filterList_.sort((a, b) => subT((itemsData[b.tweetId]?.woofEndTime || 0), (itemsData[a.tweetId]?.woofEndTime || 0), sort === 'desc'))
        break
      case 3:
        filterList_ = filterList_.sort((a, b) => subT((itemsData[b.tweetId]?.APY || 0), (itemsData[a.tweetId]?.APY || 0), sort === 'desc'))
        break
      case 4:
        filterList_ = filterList_.sort((a, b) => subT(a.reward , b.reward, sort === 'desc'))
        break
      case 5:
        filterList_ = filterList_.sort((a, b) => subT(a.rewoofAmount , b.rewoofAmount, sort === 'desc'))
        break
      case 6:
        filterList_ = filterList_.sort((a, b) => subT(a.rewoofs.length , b.rewoofs.length, sort === 'desc'))
        break
    }
    setFilterActions(filterActions_)
    setFilterId(id)
    setFilterPoolList(filterList_)
    setPageNum(1)
  }

  useMemo(() => {
    if ((type === 'account' && account) || type === 'all') {
      getData()
    }
  }, [updateWoofList, account])

  const loadData = () => {
    const moreShowPoolList_ = filterPoolList.slice(0, pageNum * pageSize)
    setTimeout(() => {
      setShowPoolList(moreShowPoolList_)
    }, 1000)
  }
  useMemo(() =>{
    loadData()
  }, [pageNum, filterPoolList])
  return (
    <WooferFeedView>
      {children}
      <div className="woofer-feed-infinite-scroll">
        <InfiniteScroll
          dataLength={showPoolList.length}
          next={() => {
            setPageNum(pageNum + 1)
          }}
          hasMore={!(showPoolList.length >= filterPoolList.length) || loadLoading}
          loader={
            <div className="woof-loading">
              <div className="icon-loading">
                <img src={LoadingIcon} alt=""/>
              </div>
              <span>loading...</span>
            </div>
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            filterPoolList.length === 0 && !loadLoading ? (
              <div className="woof-empty">
                <img src={EmptyIcon} alt=""/>
                <p>No Content</p>
              </div>
            ) : <div/>
          }
        >
          <div className="woofer-feed-header">
            <div className="woofer-feed-header-l">Woofer Feed</div>
            <div className="filter-switch flex-center">
              Sort <img src={ArrowDown2Dark} alt=""/>
              <div className="filter-switch-list">
                {
                  filterActions.map((item) => (
                    <div key={item.id} onClick={() => onFilter(item.id, filterId === item.id ? item.sort === 'desc' ? 'asc' : 'desc' : item.sort)}>
                      <div>
                        {filterId === item.id && <img src={Check} alt="" className="sort-check"/>}
                      </div>
                      <div className="sort-check-item">
                        <span>{item.title}</span>
                        {
                          item.id === filterId && item.id !== 0 && <>
                            <img src={ArrowSortIcon} className={item.sort === 'desc' ? 'sort-check-on' : 'sort-check-off'} alt=""/>
                            <img src={ArrowSortIcon} className={item.sort === 'asc' ? 'sort-check-on' : 'sort-check-off'} alt=""/>
                          </>
                        }
                      </div>

                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="woofer-list">
            {
              showPoolList.map((item) => <WooferFeedItem tweet={item} key={item.tweetId} setShowWoofUserModalFn={setShowWoofUserModalFn} onWoofBtn={onWoofBtn} reportItemsData={reportItemsData}/>)
            }
          </div>
        </InfiniteScroll>
      </div>
      <WoofUserModal list={woofUserModalData.list} title={woofUserModalData.title}
                     onClose={() => setShowWoofUserModal(false)}
                     visible={showWoofUserModal}/>
      <WoofModal visible={!!woofType} onClose={() => setWoofType(null)} woofType={woofType} coWoofItem={coWoofItem}/>
    </WooferFeedView>
  )
}
