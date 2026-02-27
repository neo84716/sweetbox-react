import React from "react"
import AdminNav from "../../components/AdminNav"
import CircleProgress from "../../components/CircleProgress"
import { Icon } from "@iconify/react";
import PayStatusBadge, {PAYSTATUS} from "../../components/PayStatusBadge";
import ShippedDate from "../../components/ShipDate";
import ShippingStatus from "../../components/ShipStatus";
import { useState, useEffect, useRef } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";

function SubscribeDetail() {
  const { id } = useParams();
  console.log("subscription id:", id);
  // 未歸檔資料，必須管理狀態，才能修改
  // 原本的假資料
  // const [orderData, setOrderData] = useState([
  //   {
  //     orderID: 'SS12G2H23605',
  //     period: 4,
  //     price: '$675',
  //     payDate: '2026-04-05',
  //     payStatus: 2,
  //     shipStatus: 3,
  //     shipDate: '-',
  //     operate: '歸檔',
  //     isEditable: false,
  //     isArchived: false
  //   },
  //   {
  //     orderID: 'SS12G2H23604',
  //     period: 3,
  //     price: '$675',
  //     payDate: '2026-03-05',
  //     payStatus: 1,
  //     shipStatus: 2,
  //     shipDate: '2026-03-05',
  //     operate: '歸檔',
  //     isEditable: true,
  //     isArchived: false
  //   },
  //   {
  //     orderID: 'SS12G2H23603',
  //     period: 3,
  //     price: '$675',
  //     payDate: '2026-03-05',
  //     payStatus: 1,
  //     shipStatus: 1,
  //     shipDate: '-',
  //     operate: '歸檔',
  //     isEditable: true,
  //     isArchived: false
  //   }
  // ])
  const [orderData, setOrderData] = useState([])
  const [archievedData, setArchievedData] = useState([]);
  // 抓取資料
  useEffect(() => {
    api.get("/subscription_orders")
      .then(res => {

        const formattedData = res.data.map((item, index) => ({
          orderID: item.order_no,
          period: index + 1,
          price: `$${item.amount}`,
          payDate: item.payment_date || "-",
          payStatus: item.payment_status,
          shipStatus: item.shipping_status,
          shipDate: item.shipping_date || "-",
          operate: "歸檔",
          // isEditable: !item.is_archived,
          isArchived: item.is_archived
        }))
        const unarchived = formattedData.filter(item => item.isArchived === false)
        const archived = formattedData.filter(item => item.isArchived === true)
        setOrderData(unarchived)
        setArchievedData(archived)

      })
      .catch(err => console.log(err))
  }, [])

  // 已歸檔的假資料
  // const archievedData = [
  //   {
  //     orderID: 'SS12G2H23604',
  //     period: 4,
  //     price: '$675',
  //     payDate: '2026-04-05',
  //     payStatus: 1,
  //     shipStatus: 2,
  //     shipDate: '2026-04-05',
  //     operate: '歸檔',
  //     isEditable: false,
  //     isArchived: true
  //   },
  //   {
  //     orderID: 'SS12G2H23603',
  //     period: 3,
  //     price: '$675',
  //     payDate: '2026-03-05',
  //     payStatus: 1,
  //     shipStatus: 2,
  //     shipDate: '2026-03-05',
  //     operate: '歸檔',
  //     isEditable: false,
  //     isArchived: true
  //   }
  // ]

  
  /*
  // 管理訂閱編號是否置頂
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    // 監視目前頁面往下滾了多少 px
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    // 事件監聽: 只要滾動，就執行 handleScroll
    window.addEventListener("scroll", handleScroll);
    // 清除事件監聽
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  */
  const [isSticky, setIsSticky] = useState(false);
  const [mode, setMode] = useState("normal"); 
  // normal | sticky-visible | hidden

  const lastScrollY = useRef(0);
  // 手機版，管理滾動，對置頂列跟按鈕列的效果
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
      const currentY = window.scrollY;

      // 在最頂端
      if (currentY === 0) {
        setMode("normal");
      }
      // 往上滾動
      else if (currentY < lastScrollY.current) {
        setMode("sticky-visible");
      }
      // 往下滾動
      else {
        setMode("hidden");
      }

      lastScrollY.current = currentY;
    }
    // 事件監聽: 只要滾動，就執行 handleScroll
    window.addEventListener("scroll", handleScroll);
    // 清除事件監聽
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  // const [hoverId, setHoverId] = useState(null)
  // const [openOrderId, setOpenOrderId] = useState(null)
  // const [openDateOrderId, setOpenDateOrderId] = useState(null)
  // const [payStatus, setPayStatus] = useState(PayStatusOptions.DEFAULT)
  // const ChevronDownIcon = () => (
  //   <svg
  //     width="16"
  //     height="16"
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M6 9L12 15L18 9"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     />
  //   </svg>
  // )

  // 管理所有訂單開啟或關閉的狀態
  // const [openDatePicker, setOpenDatePicker] = useState({})

  // 定義點了按鈕會開關 datepicker 的機制
  // const toggleDatePicker = (orderID) => {
  //   console.log('切換前', orderID, openDatePicker[orderID]);
  //   setOpenDatePicker({...openDatePicker, [orderID]: !openDatePicker[orderID]})
  //   console.log('切換後', orderID, openDatePicker[orderID]);
  // }
  // 定義將選好的日期回寫的動作

  // 出貨狀態按鈕管理
  const [openId, setOpenId] = useState(null) //管理哪個訂單的出貨狀態按鈕被打開
  // 修改資料的出貨狀態
  const handleShipStatusChange = (id, newStatus) => {
    console.log('newStatus', newStatus)
    console.log('orderID', id)
    setOrderData((prev)=>{
      return prev.map((order)=>{
        return (
          order.orderID === id ? {...order, shipStatus: newStatus} : order
        )
      })
    })
    setOpenId(null) //關閉下拉選單
  }

  // 出貨日期按鈕管理
  const [openDateId, setOpenDateId] = useState(null)
  // 修改出貨日期的資料
  const handleShipDateChange = (id, newDate) => {
    console.log('orderID', id)
    console.log('newDate', newDate)
    setOrderData((prev)=>{
      return prev.map((order)=> {
        return order.orderID === id ? {
          ...order, shipDate: newDate
        } : order
      })
    })
    setOpenDateId(null) //選完關閉datepicker
  }
  return (
    <>
      <main className={`main d-block d-lg-none overflow-hidden sticky-section ${mode === "hidden" ? "hide-top" : ""} ${isSticky ? "is-sticky bg-neutral-200 z-999" : "bg-neutral-300"}`}>
        {/* <main className={`main d-block d-lg-none overflow-hidden sticky-section ${isSticky ? "is-sticky bg-neutral-200 z-999" : "bg-neutral-300"} `}></main> */}
        {/* 如果沒有父層的 overflow-hidden，mt-20會因為外部塌陷凸出 main，造成navbar背景會有白色區塊，也就是 body的背景 */}
        {/* 加上 overflow-hidden後，mt-20會留在main內，預留空間給navbar顯示 */}
        {/* 沒置頂時區塊背景色300，置頂時覆蓋navbar，並且CSS設定translate(-80px)，視覺上就不會有預留的mt-20 */}
        <div className={`container mt-20`}>
          {/* 訂單編號 - mobile */}
          <div className={`order-mobile d-flex align-items-center underline  `}>
            <div className="icon me-2">
              <Icon icon={"material-symbols:chevron-left"} width={"22px"}/>
            </div>
            <div className="order-info d-flex justify-content-between align-items-center pe-3 w-100">
              <div className="subscription-title">
                <p className="fs-9 fw-bold mb-1 text-neutral-600 subscription-text">訂單編號</p>
                <p className="fs-5 fw-bold me-3 text-neutral-800 subscription-id">SS12G2H236</p>
              </div>
              <div className="order-status">
                <button type="button" className="btn orderStatusBtn bg-primary-200 text-primary-600">
                未處理
              </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className="main overflow-hidden bg-neutral-300">
        <div className="container mt-lg-11 mb-lg-11 mb-10">
          <AdminNav />
          {/* 訂單編號 */}
          <section className="mb-8 d-none d-lg-block">
            <div className="d-flex align-items-center p-3">
              <Icon icon={"material-symbols:chevron-left"} className="me-1"/>
              <p className="backList neutral-800 fs-8">返回列表</p>
            </div>
            <div className="d-flex align-items-center">
              <p className="fs-2 fw-bold me-3 orderID">SS12G2H236</p>
              <button type="button" className="btn orderStatusBtn bg-primary-200 text-primary-600">
                未處理
              </button>
            </div>
          </section>
          {/* 訂單編號 - mobile */}
          {/* <div className={`order-mobile d-block d-lg-none d-flex align-items-center underline sticky-top ${isSticky ? "bg-neutral-200" : ""} `}>
            <div className="icon me-2">
              <Icon icon={"material-symbols:chevron-left"} width={"22px"}/>
            </div>
            <div className="order-info d-flex justify-content-between align-items-center pe-3 w-100">
              <div className="subscription-title">
                <p className="fs-9 fw-bold mb-1 text-neutral-600 subscription-text">訂單編號</p>
                <p className="fs-5 fw-bold me-3 text-neutral-800 subscription-id">SS12G2H236</p>
              </div>
              <div className="order-status">
                <button type="button" className="btn orderStatusBtn bg-primary-200 text-primary-600">
                未處理
              </button>
              </div>
            </div>
          </div> */}
          {/* 訂閱內容 */}
          <section className="">
            <div className="d-flex flex-column flex-lg-row align-items-stretch gap-lg-2 mb-lg-6">
              {/* 訂閱方案 */}
              <div className="orderCard orderCase order-2 order-lg-1 underline">
                <div className="caseTitle pt-1 pb-1 pb-lg-4 mb-6 fw-bold fs-8 fs-lg-7 ">
                  訂閱方案
                </div>
                <div className="caseContent px-3">
                  <div className="d-flex gap-8 mb-2 fs-8">
                    <p className="text-neutral-600">方案名稱</p>
                    <p className="text-neutral-800">季節限定甜點盒</p>
                  </div>
                  <div className="d-flex gap-8 mb-2 fs-8">
                    <p className="text-neutral-600">方案時長</p>
                    <p className="text-neutral-800">12個月</p>
                  </div>
                  <div className="d-flex gap-8 mb-2 fs-8">
                    <p className="text-neutral-600">訂閱數量</p>
                    <p className="text-neutral-800">1盒</p>
                  </div>
                  <div className="d-flex gap-8 mb-2 fs-8">
                    <p className="text-neutral-600">訂閱價格</p>
                    <p className="text-neutral-800">NT$675 / 月</p>
                  </div>
                  <div className="d-flex gap-8 mb-2 fs-8">
                    <p className="text-neutral-600">支付方式</p>
                    <p className="text-neutral-800">信用卡 ****-5831</p>
                  </div>
                </div>
              </div>
              {/* 訂單進度 */}
              <div className="orderCard orderSchedule order-1 underline">
                <div className="caseTitle pt-1 pb-1 pb-lg-4 mb-6 fw-bold fs-8 fs-lg-7 ">
                  訂閱進度
                </div>
                <div className="d-flex justify-content-center">
                  <CircleProgress>
                    <p className="metric mb-2 fs-5 fw-bold text-neutral-800">4/12</p>
                    <p className="fs-9 text-neutral-600">
                      已配送4期
                      <br />
                      共12期
                    </p>
                  </CircleProgress>
                </div>
              </div>
              {/* 會員資訊 */}
              <div className="orderCard memberInfo order-3 underline">
                <div className="caseTitle pt-1 pb-1 pb-lg-4 mb-6 fw-bold fs-8 fs-lg-7">
                  會員資訊
                </div>
                <div className="d-flex gap-8 text-neutral-600 px-4  fs-8">
                  <div className="title">
                    <p className="mb-2">會員姓名 </p>
                    <p className="mb-2">Email
 </p>
                    <p className="mb-2">電子載具 </p>
                    <p className="mb-2">統一編號 </p>
                    <p className="mb-2">配送地址 </p>
                  </div>
                  <div className="content text-neutral-800">
                    <p className="mb-2">王小明</p>
                    <p className="mb-2">alma.lawson@example.com</p>
                    <p className="mb-2">/3SVJDTP</p>
                    <p className="mb-2">無</p>
                    <p className="mb-2">115 新北市泰山區泰山路 123 號 1 樓</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 未處理訂單 桌機版 */}
          <section className="unprocessed d-none d-lg-block bg-neutral-200 rounded-6 mb-6">
            <div className="p-6">
              <p className="mb-2 fw-bold text-neutral-800">
                未處理訂單
              </p>
              <div className="border-bottom" style={{marginTop: '6px', marginBottom: '14px'}}></div>
              <table className="subscribeDetailTable column-table bg-neutral-200 fs-8">
                <thead>
                  <tr className="text-neutral-600">
                    <th scope="col" className="ps-4 fw-bold text-neutral-600">訂單編號</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">期數</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">金額</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">付款日期</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">付款狀態</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">出貨狀態</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">預計出貨日</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderData.map((item) => {
                      return (
                        <tr key={item.orderID}>
                          <th scope="row" className="ps-4 fw-normal text-semantic-link">{item.orderID}</th>
                          <td className="text-center fw-normal">{item.period}</td>
                          <td className="text-center fw-normal">{item.price}</td>
                          <td className="text-center fw-normal">{item.payDate}</td>
                          <td className="text-center fw-normal">
                            <PayStatusBadge currentStatus={item.payStatus} isArchived={item.isArchived} isFailed={item.payStatus === "failed"}/>
                          </td>
                          <td className="text-center fw-normal">
                            <ShippingStatus record={item} isOpen={openId === item.orderID} onToggle={()=> setOpenId(openId === item.orderID ? null : item.orderID)} onChange={(status)=>handleShipStatusChange(item.orderID, status)}/>  
                          </td>
                          <td className="text-center fw-normal">
                            {/* <ShipDate record={item} isDatePickerOpen={openDatePicker[item.orderID] || false} onToggleDatePicker={toggleDatePicker}/> */}
                            <ShippedDate record={item} isOpen={openDateId === item.orderID} onToggle={()=>{setOpenDateId(openDateId === item.orderID ? null : item.orderID)}} onChange={(date)=>handleShipDateChange(item.orderID, date)} />
                          </td>
                          <td className="text-center fw-normal">
                            <span className={`badge rounded-pill fileBadge text-center fw-bold fs-9 ${item.shipStatus === 'failed' ? "shipped-failed" : ""}`}>
                              {item.isArchived ? "" : "歸檔"}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </section>
          {/* 未處理訂單 mobile版*/}
          <div className="unprocessed-mobile d-block d-lg-none  pt-6 px-3 pb-8 underline">
            <div className="order-category-text pt-1 pb-1 mb-4 fs-8 fw-bold">
              未處理訂單
            </div>
            <div className="order-list d-flex flex-column gap-3">
              {
                orderData.map((item)=>{
                  return (
                    <div className="order-card px-4 py-6 bg-neutral-200 rounded-6" key={item.orderID}>
                      <div className="order-content mb-17">
                        <div className="order-header d-flex justify-content-between align-items-end mb-6">
                          <div className="order-title">
                            <div className="text mb-1 fs-9 fw-bold text-neutral-600">
                              訂單編號
                            </div>
                            <div className="order-id fs-5 fw-bold text-neutral-800">
                              {item.orderID}
                            </div>
                          </div>
                          <PayStatusBadge currentStatus={item.payStatus} isArchived={item.isArchived} isFailed={item.payStatus === "failed"}/>
                        </div>
                        <div className="order-mobile-divider"></div>
                        
                        {/* 金額&期數&付款日期 */}
                        <div className="order-info fs-8 mt-2 mb-2">
                          <div className="row g-0">
                            <div className="col-4">
                              <div className="price-text text-neutral-600">金額</div>
                              <div className="price text-neutral-800">{item.price}</div>
                            </div>
                            <div className="col-4">
                              <div className="price-text text-neutral-600">期數</div>
                              <div className="price text-neutral-800">{item.period}</div>
                            </div>
                            <div className="col-4">
                              <div className="price-text text-neutral-600">付款日期</div>
                              <div className="price text-neutral-800">{item.payDate}</div>
                            </div>
                          </div>
                        </div>
                        {/* 分隔線 */}
                        <div className="order-mobile-divider"></div>
                        {/* 出貨狀態&預計出貨日 */}
                        <div className="order-shipStatus mt-6">
                          <div className="ship-status d-flex justify-content-between align-items-center mb-3">
                            <div className="ship-text fs-8 text-neutral-600">出貨狀態</div>
                            <div className="ship-button">
                              <ShippingStatus record={item} isOpen={openId === item.orderID} onToggle={()=> setOpenId(openId === item.orderID ? null : item.orderID)} onChange={(status)=>handleShipStatusChange(item.orderID, status)}/>
                            </div>
                          </div>
                          <div className="ship-status d-flex justify-content-between align-items-center">
                            <div className="ship-text fs-8 text-neutral-600">預計出貨日</div>
                            <div className="ship-button">
                              <ShippedDate record={item} isOpen={openDateId === item.orderID} onToggle={()=>setOpenDateId(openDateId === item.orderID ? null : item.orderID)} onChange={(date)=>handleShipDateChange(item.orderID, date)} />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 結案歸檔按鈕 */}
                      <div className="order-button">結案歸檔</div>
                    </div>
                  )
                })
              }
              
            </div>
          </div>       
          {/* 已歸檔訂單 桌機版 */}
          <section className="archived d-none d-lg-block bg-neutral-200 rounded-6 mb-6">
            <div className="p-6">
              <p className="mb-2 fw-bold text-neutral-800">
                已歸檔訂單
              </p>
              <div className="border-bottom" style={{marginTop: '6px', marginBottom: '14px'}}></div>
              <table className="subscribeDetailTable column-table bg-neutral-200 fs-8">
                <thead>
                  <tr className="text-neutral-600">
                    <th scope="col" className="ps-4 fw-bold text-neutral-600">訂單編號</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">期數</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">金額</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">付款日期</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">付款狀態</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">出貨狀態</th>
                    <th scope="col" className="text-center fw-bold text-neutral-600">出貨日期</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    archievedData.map((item) => {
                      return (
                        <tr key={item.orderID}>
                          <th scope="row" className="ps-4 fw-normal order-id text-semantic-link">{item.orderID}</th>
                          <td className="text-center fw-normal">{item.period}</td>
                          <td className="text-center fw-normal">{item.price}</td>
                          <td className="text-center fw-normal">{item.payDate}</td>
                          <td className="text-center fw-normal">
                            <span className={`badge rounded-pill payBadge ${item.payStatus} fs-9`}>
                              已付款
                            </span>
                          </td>
                          <td className="text-center fw-normal">
                            <ShippingStatus record={item} />  
                          </td>
                          <td className="text-center fw-normal">
                            {/* disable 跟 archived 沒互動效果 */}
                            {/* {
                              (!item.isEditable || item.isArchieved) && (
                                <span className={`shipText ${!item.isArchieved ? 'archieved' : 'disable'}`}>{item.isArchieved ? item.shipDate : '-'}</span>
                              )
                            } */}
                            {/* UI介面操作產生的狀態 default/expanded/selected */}
                            {/* {
                              (item.isEditable && !item.isArchieved) && (
                                <div className={`shipDateInput ${openDateOrderId === item.orderID ? 'expanded' : ''}`}
                                  onClick={()=>{setOpenOrderId(openDateOrderId === item.orderID ? null : item.orderID)}}
                                >
                                  <span className={`${item.shipDate} === null ? 'noValue' : 'value'`}>{item.shipDate || '選擇日期'}</span>
                                  <span className="calendarIcon"></span>
                                </div>
                              )
                            } */}
                            <ShippedDate record={item} isOpen={openDateId === item.orderID} onToggle={()=>setOpenDateId(openDateId === item.orderID ? null : item.orderID)} onChange={(date)=>handleShipDateChange(item.orderID, date)} />
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </section>
          {/* 已歸檔訂單 mobile版 */}
          <div className="archived-mobile d-block d-lg-none  pt-6 px-3 pb-8">
            <div className="order-category-text pt-1 pb-1 mb-4 fs-8 fw-bold">
              已歸檔訂單
            </div>
            <div className="order-list d-flex flex-column gap-3">
              {
                archievedData.map((item)=>{
                  return (
                    <div className="archived-order-card p-6 bg-neutral-200 rounded-5" key={item.orderID}>
                      <div className="order-header mb-6">
                        <div className="order-title mb-3">
                          <div className="text mb-1 fs-9 fw-bold text-neutral-600">
                            訂單編號
                          </div>
                          <div className="order-id fs-5 fw-bold text-neutral-800">
                            {item.orderID}
                          </div>
                        </div>
                        <div className="order-status d-flex justify-content-start gap-3 mb-3">
                          <PayStatusBadge currentStatus={item.payStatus} isArchived={item.isArchived} isFailed={item.payStatus === "failed"}/>
                          <ShippingStatus record={item} isOpen={openId === item.orderID} onToggle={()=> setOpenId(openId === item.orderID ? null : item.orderID)} onChange={(status)=>handleShipStatusChange(item.orderID, status)}/>
                        </div>
                        <div className="order-mobile-divider"></div>
                      </div>
                      <div className="order-info">
                        <div className="price-period d-flex mb-4">
                          <div className="flex-fill">
                            <div className="fs-8 text-neutral-600 mb-1">金額</div>
                            <div className="fs-8 text-neutral-800">{item.price}</div>
                          </div>
                          <div className="flex-fill">
                            <div className="fs-8 text-neutral-600 mb-1">期數</div>
                            <div className="fs-8 text-neutral-800">{item.period}</div>
                          </div>
                        </div>
                        <div className="payDate-shipDate d-flex ">
                          <div className="flex-fill">
                            <div className="text fs-8 text-neutral-600 mb-1">付款日期</div>
                            <div className="pay-date fs-8 text-neutral-800">{item.payDate}</div>
                          </div>
                          <div className="flex-fill">
                            <div className="text fs-8 text-neutral-600 mb-1">付款日期</div>
                            <div className="pay-date fs-8 text-neutral-800">{item.shipDate}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              
              
            </div>
          </div>
        </div>
      </main>
      {/* 底部按鈕列-mobile版才有 */}
      <div className={`d-flex d-lg-none justify-content-between align-items-center mobile-button-bar p-6 ${mode === "sticky-visible" ? "" : "hide-button-bar"}`}>
        <p className="fs-7 text-neutral-700 button-text">取消</p>
        <button type="button" className="btn fw-bold text-neutral-100 bg-CTA-200 save-button">儲存變更</button>
      </div>
      {openId !== null && (
        <div
          className="ship-overlay-mobile d-lg-none"
          onClick={() => setOpenId(null)}
        />
      )}
    </>
  )
}

export default SubscribeDetail;