import React from "react"
import AdminNav from "../../layouts/AdminNav"
import CircleProgress from "../../layouts/CircleProgress"
const { useState } = React

function SubscribeDetail() {
  const orderData = [
    {
      orderID: 'SS12G2H23604',
      period: 4,
      price: '$675',
      payDate: '2026-04-05',
      payStatus: 'failed',
      shipStatus: 'error',
      shipDate: '-',
      operate: '歸檔',
      isEditable: false,
      isArchieved: false
    },
    {
      orderID: 'SS12G2H23603',
      period: 3,
      price: '$675',
      payDate: '2026-03-05',
      payStatus: 'paid',
      shipStatus: 'shipped',
      shipDate: '2026-03-05',
      operate: '歸檔',
      isEditable: true,
      isArchieved: false
    }
  ]
  const [hoverId, setHoverId] = useState(null)
  const [openOrderId, setOpenOrderId] = useState(null)
  const [openDateOrderId, setOpenDateOrderId] = useState(null)
  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  return (
    <>
      
      <main className="main overflow-hidden bg-neutral-300">
        <div className="container mb-11">
          <AdminNav />
          <section className="mb-8">
          <div className="d-flex align-items-center p-3">
            <div className="d-flex justify-content-center align-items-center">
              {/* <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="me-1"
              >
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg> */}
              <p className="backList neutral-800 fs-8">返回列表</p>
            </div>
          </div>
          <div className="d-flex">
            <p className="orderID fs-2 me-3">SS12G2H236</p>
            <button type="button" className="orderStatusBtn btn  bg-primary-200 text-primary-600">
              未處理
            </button>
          </div>
          </section>
          <section className="">
            <div className="d-flex align-items-stretch gap-2 mb-6">
              {/* 訂閱方案 */}
              <div className="orderCard orderCase" style={{width: '542px'}}>
                <div className="caseTitle fw-bold fs-7 ">
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
              <div className="orderCard orderSchedule" style={{width: '180px'}}>
                <div className="caseTitle fw-bold fs-7 ">
                  訂閱進度
                </div>
                <CircleProgress>
                  <p className="metric mb-2 fs-5 fw-bold text-neutral-800">4/12</p>
                  <p className="fs-9 text-neutral-600">
                    已配送4期
                    <br />
                    共12期
                  </p>
                </CircleProgress>
              </div>
              {/* 會員資訊 */}
              <div className="orderCard memberInfo" style={{width: '542px'}}>
                <div className="caseTitle fw-bold fs-7 ">
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
          <section className="unprocessed bg-neutral-200 rounded-6 mb-6">
            <div className="p-6">
              <p className="mb-2 fw-bold text-neutral-800">
                未處理訂單
              </p>
              <div className="border-bottom" style={{marginTop: '6px', marginBottom: '14px'}}></div>
              <table className="subscribeDetailTable table bg-neutral-200 fs-8">
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
                          <th scope="row" className="ps-4 fw-normal orderID">{item.orderID}</th>
                          <td className="text-center fw-normal">{item.period}</td>
                          <td className="text-center fw-normal">$675</td>
                          <td className="text-center fw-normal">2026-04-05</td>
                          <td className="text-center fw-normal">
                            <span className={`badge rounded-pill payBadge ${item.payStatus} fs-9`}>
                              { item.payStatus === 'paid' ? '已付款' : '付款失敗'}
                            </span>
                          </td>
                          <td className="text-center fw-normal">
                            <div className={`shipBadge ${item.shipStatus} 
                              ${openOrderId === item.orderID ? 'expanded' : ''}`}
                              onMouseEnter={()=>setHoverId(item.orderID)}
                              onMouseLeave={()=>setHoverId(null)}
                              onClick={()=>setOpenOrderId(openOrderId === item.orderID ? null : item.orderID)}>
                              <span className={`shipText ${item.shipStatus}`}>
                                { item.shipStatus === 'error' ? '異常保留' : (item.shipStatus === 'shipped' ? '已出貨' : '未出貨')}
                              </span>
                              <span className={`chevron ${hoverId === item.orderID || openOrderId === item.orderID ? 'show' : ''}`}>
                                <ChevronDownIcon />
                              </span>
                            </div>
                            {openOrderId === item.orderID && (
                              <ul className="shipDropdown">
                                <li>未出貨</li>
                                <li>已出貨</li>
                              </ul>
                            )}  
                          </td>
                          <td className="text-center fw-normal">
                            {/* disable 跟 archived 沒互動效果 */}
                            {
                              (!item.isEditable || item.isArchieved) && (
                                <span className={`shipText ${!item.isArchieved ? 'archieved' : 'disable'}`}>{item.isArchieved ? item.shipDate : '-'}</span>
                              )
                            }
                            {/* UI介面操作產生的狀態 default/expanded/selected */}
                            {
                              (item.isEditable && !item.isArchieved) && (
                                <div className={`shipDateInput ${openDateOrderId === item.orderID ? 'expanded' : ''}`}
                                  onClick={()=>{setOpenOrderId(openDateOrderId === item.orderID ? null : item.orderID)}}
                                >
                                  <span className={`${item.shipDate} === null ? 'noValue' : 'value'`}>{item.shipDate || '選擇日期'}</span>
                                  <span className="calendarIcon"></span>
                                </div>
                              )
                            }
                          </td>
                          <td className="text-center fw-normal">
                            <span className={`badge rounded-pill fileBadge text-center fw-bold fs-9`}>
                              {item.operate}
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
          {/* 已歸檔訂單 */}
          <section className="archived bg-neutral-200 rounded-6 mb-6">
            <div className="p-6">
              <p className="mb-2 fw-bold text-neutral-800">
                已歸檔訂單
              </p>
              <div className="border-bottom" style={{marginTop: '6px', marginBottom: '14px'}}></div>
              <table className="subscribeDetailTable table bg-neutral-200 fs-8">
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
                    orderData.map((item) => {
                      return (
                        <tr key={item.orderID}>
                          <th scope="row" className="ps-4 fw-normal orderID">{item.orderID}</th>
                          <td className="text-center fw-normal">{item.period}</td>
                          <td className="text-center fw-normal">$675</td>
                          <td className="text-center fw-normal">2026-04-05</td>
                          <td className="text-center fw-normal">
                            <span className={`badge rounded-pill payBadge ${item.payStatus} fs-9`}>
                              '已付款'
                            </span>
                          </td>
                          <td className="text-center fw-normal">
                            <div className={`shipBadge ${item.shipStatus} 
                              ${openOrderId === item.orderID ? 'expanded' : ''}`}
                              onMouseEnter={()=>setHoverId(item.orderID)}
                              onMouseLeave={()=>setHoverId(null)}
                              onClick={()=>setOpenOrderId(openOrderId === item.orderID ? null : item.orderID)}>
                              <span className={`shipText ${item.shipStatus}`}>
                                '已出貨'
                              </span>
                              <span className={`chevron ${hoverId === item.orderID || openOrderId === item.orderID ? 'show' : ''}`}>
                                <ChevronDownIcon />
                              </span>
                            </div>
                          </td>
                          <td className="text-center fw-normal">
                            {/* disable 跟 archived 沒互動效果 */}
                            {
                              (!item.isEditable || item.isArchieved) && (
                                <span className={`shipText ${!item.isArchieved ? 'archieved' : 'disable'}`}>{item.isArchieved ? item.shipDate : '-'}</span>
                              )
                            }
                            {/* UI介面操作產生的狀態 default/expanded/selected */}
                            {
                              (item.isEditable && !item.isArchieved) && (
                                <div className={`shipDateInput ${openDateOrderId === item.orderID ? 'expanded' : ''}`}
                                  onClick={()=>{setOpenOrderId(openDateOrderId === item.orderID ? null : item.orderID)}}
                                >
                                  <span className={`${item.shipDate} === null ? 'noValue' : 'value'`}>{item.shipDate || '選擇日期'}</span>
                                  <span className="calendarIcon"></span>
                                </div>
                              )
                            }
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default SubscribeDetail;