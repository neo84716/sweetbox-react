import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";

const tabs = [
  { label: '會員資料', to: '/' },
  { label: '訂閱管理', to: '/subscription' },
  { label: '我的優惠', to: '/' },
  { label: '我的評論', to: '/' },
  { label: '推薦獎勵', to: '/' },
];

const themeOptions = [
  { label: '全部主題', value: 'theme_all' },
  { label: '精選甜點', value: 'featured' },
  { label: '季節限定', value: 'seasonal' },
  { label: '在地甜點', value: 'local' },
  { label: '異國風味', value: 'international' },
  { label: '無負擔甜點', value: 'healthy' },
  { label: '素食甜點', value: 'vegan' },
];

const statusOptions = [
  { label: '全部訂閱狀態', value: 'all' },
  { label: '進行中', value: 'pending' },
  { label: '已完成', value: 'done' },
  { label: '已取消', value: 'cancelled' },
];

// /api/users/:userId/subscriptions，取得所有使用者訂閱，來自 user_subscriptions table
const userSubscriptions = [
  {
    id: 1,
    userId: 1,
    subscriptionId: 'SS12G2H239',
    status: 'pending',
    totalPeriods: 12,
    currentPeriod: 2, // 目前訂幾期
    quantity: 1,
    nextPaymentDate: '2026-03-01',
    paymentMethod: 'credit_card',
    createdAt: '2026-01-01',
    updatedAt: '2026-02-01',
    subscriptions: [
      {
        id: 'SS12G2H239',
        title: 'seasonal',
        originPrice: 740,
        price: 675,
        durationMonths: 12,
        images: {
          default: './images/Subscription_Page/season_theme_pic.png',
          small: './images/Subscription_Page/season_theme_pic_small.png',
        },
      },
    ],
  },
  {
    id: 2,
    userId: 1,
    subscriptionId: 'LC062HY2C7',
    status: 'pending',
    totalPeriods: 6,
    currentPeriod: 2, // 目前訂幾期
    quantity: 1,
    nextPaymentDate: '2026-03-01',
    paymentMethod: 'credit_card',
    createdAt: '2026-01-01',
    updatedAt: '2026-02-01',
    subscriptions: [
      {
        id: 'LC062HY2C7',
        title: 'local',
        originPrice: 740,
        price: 700,
        durationMonths: 6,
        images: {
          default: './images/Subscription_Page/local_theme_pic.png',
          small: './images/Subscription_Page/local_theme_pic_small.png',
        },
      },
    ],
  },
  {
    id: 3,
    userId: 1,
    subscriptionId: 'SS0368JK84',
    status: 'pending',
    totalPeriods: 3,
    currentPeriod: 2, // 目前訂幾期
    quantity: 1,
    nextPaymentDate: '2026-03-01',
    paymentMethod: 'credit_card',
    createdAt: '2026-01-01',
    updatedAt: '2026-02-01',
    subscriptions: [
      {
        id: 'SS0368JK84',
        title: 'featured',
        originPrice: 740,
        price: 720,
        durationMonths: 3,
        images: {
          default: './images/Subscription_Page/feature_theme_pic.png',
          small: './images/Subscription_Page/feature_theme_pic_small.png',
        },
      },
    ],
  },
];

const orders = [
  {
    id: 'SS12G2H23903',
    userSubscriptionId: 1,
    periodNumber: 3,
    billingDate: '2026-02-28',
    price: 675,
    paymentStatus: 'paid', // paid, pending, unpaid, failed
    shipmentStatus: 'delivered', // pending(未出貨) / shipped(出貨中) / delivered(已送達) / canceled
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 'SS12G2H23902',
    userSubscriptionId: 1,
    periodNumber: 2,
    billingDate: '2026-01-28',
    price: 675,
    paymentStatus: 'paid',
    shipmentStatus: 'delivered',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
  {
    id: 'SS12G2H23901',
    userSubscriptionId: 1,
    periodNumber: 1,
    billingDate: '2025-12-28',
    price: 675,
    paymentStatus: 'paid',
    shipmentStatus: 'shipped',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
];

// 狀態樣式
const paymentStatus = [
  {
    label: '已付款',
    value: 'paid',
  },
];

const shippingStatus = [
  {
    label: '已到貨',
    value: 'delivered',
  },
  {
    label: '出貨中',
    value: 'shipped',
  },
];



function Subscription() {
  
  return (
    <div className="py-sm-11 pt-20 pb-5 bg-neutral-300">
      <main className="container">
        {/* 導覽列表 */}
        <ul className="nav py-2 mb-sm-6 mb-0 nav-subscription gap-2 gap-sm-0">
          {tabs.map((tab, index) => (
            <li className="nav-item" key={index}>
              <NavLink
                to={tab.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''} px-3 py-4 px-sm-4 py-sm-5`
                }
              >
                <span className="underline">{tab.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* 標題和篩選選單 */}
        <div className="py-4 p-sm-0 mb-4 mb-sm-8">
          <div className="d-flex justify-content-between">
            <h1 className="h2 d-none d-sm-block">訂閱管理</h1>
            <div className="d-flex gap-4">
              <Dropdown options={themeOptions} width="108px" />
              <Dropdown options={statusOptions} width="136px" />
            </div>
          </div>
        </div>
        {/* 訂閱列表 */}
        <div
          className="accordion card-accordion p-0 d-flex flex-column gap-4 mb-17"
          id="accordion-subscription"
        >
          {userSubscriptions.map((userSubscription) => (
            <div
              key={userSubscription.id}
              className="accordion-item bg-neutral-250 p-sm-8 p-6 rounded-6 border-0"
            >
              <div className="accordion-header mb-0 mb-xl-8">
                <div className="d-flex flex-xl-row flex-column gap-6 gap-xl-8">
                  {/* 甜點主題圖片 */}
                  <div className="d-flex gap-6 mb-xl-0">
                    <picture>
                      <source
                        srcSet={userSubscription.subscriptions[0].images.small}
                        media="(max-width: 1200px)"
                      />
                      <img
                        src={userSubscription.subscriptions[0].images.default}
                        alt="季節甜點主題圖片"
                      />
                    </picture>
                    {/* 訂閱標題-mobile */}
                    <div className="d-flex flex-column gap-2 d-xl-none">
                      <p className="fs-9 text-neutral-600 fw-bold ls-1">
                        {`訂閱編號：${userSubscription.subscriptionId}`}
                      </p>
                      <h2 className="fs-7 fw-bold ls-1">
                        {
                          themeOptions.find((option) => {
                            return (
                              option.value ===
                              userSubscription.subscriptions[0].title
                            );
                          })?.label
                        }
                      </h2>
                      <span className="badge-in-progress d-block">
                        {
                          statusOptions.find((option) => {
                            return option.value === userSubscription.status;
                          })?.label
                        }
                      </span>
                    </div>
                  </div>

                  {/* 訂閱詳細內容 */}
                  <div className="flex-grow-1 py-xl-2 py-0 subscription-info">
                    {/* 訂閱編號 */}
                    <div className="mb-8 d-none d-xl-block">
                      <p className="fs-8 text-neutral-600 mb-2">
                        {`訂閱編號：${userSubscription.subscriptionId}`}
                      </p>
                      <div>
                        <h2 className="h4 d-inline-block fw-bold ls-1 me-3">
                          {
                            themeOptions.find((option) => {
                              return (
                                option.value ===
                                userSubscription.subscriptions[0].title
                              );
                            })?.label
                          }
                        </h2>
                        <span className="badge-in-progress">
                          {
                            statusOptions.find((option) => {
                              return option.value === userSubscription.status;
                            })?.label
                          }
                        </span>
                      </div>
                    </div>
                    <div className="subscription-info-divider"></div>
                    <div className="d-flex py-2 py-xl-0">
                      {/* 訂閱期數與價格 */}
                      <div className="flex-grow-1">
                        <div className="mb-4">
                          <p className="subscription-info-title">期數</p>
                          <p className="subscription-info-content">{`${userSubscription.totalPeriods}個月`}</p>
                        </div>
                        <div>
                          <p className="subscription-info-title">訂閱價格</p>
                          <p className="subscription-info-content">
                            {`NT$${userSubscription.subscriptions[0].price}/月 (原價$${userSubscription.subscriptions[0].originPrice})`}
                          </p>
                        </div>
                      </div>
                      {/* 數量與下次付款日 */}
                      <div className="flex-grow-1">
                        <div className="mb-4">
                          <p className="subscription-info-title">數量</p>
                          <p className="subscription-info-content">{`${userSubscription.quantity} 盒`}</p>
                        </div>
                        <div>
                          <p className="subscription-info-title">下次付款日</p>
                          <p className="subscription-info-content">
                            {userSubscription.nextPaymentDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="subscription-info-divider"></div>
                  </div>
                  {/* 分隔線 */}
                  <div className="vertical-divider d-none d-xl-block"></div>
                  {/* 付款方式 */}
                  <div className="py-0 py-xl-2 flex-grow-1">
                    <button
                      className="accordion-button d-xl-flex justify-content-end align-items-center d-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${userSubscription.id}`}
                      aria-expanded="true"
                      aria-controls={`collapse-${userSubscription.id}`}
                    >
                      <Icon
                        icon="iconamoon:arrow-up-2-bold"
                        width="32"
                        height="32"
                      />
                    </button>
                    {/* 輸入付款號碼 */}
                    <div className="mb-3">
                      <label
                        htmlFor="payment"
                        className="form-label fs-8 text-neutral-600"
                      >
                        目前付款方式
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text border-0 rounded-start-pill bg-neutral-300 py-3 ps-4 pe-0"
                          id="visa"
                        >
                          <img
                            className="py-1 px-2"
                            src="./images/Subscription_Page/logo_visa.png"
                            alt="visa icon"
                            width="44"
                            height="24"
                          />
                        </span>
                        <input
                          type="text"
                          className="form-control border-0 rounded-end-pill bg-neutral-300 ps-3 pe-4 ls-0"
                          id="payment"
                          aria-describedby="visa payment-number"
                          value="•••• •••• •••• 4321"
                          readOnly
                        />
                      </div>
                    </div>
                    {/* Modal */}
                    <div className="text-center">
                      {/* 付款管理Modal */}
                      <button
                        type="button"
                        className="btn btn-cta-200 w-100 rounded-pill py-3 px-6 fw-bold lh-sm ls-1 text-neutral-100 border-0 mb-1"
                        data-bs-toggle="modal"
                        data-bs-target="#paymentManageModal"
                      >
                        付款管理
                      </button>

                      <div
                        className="modal fade"
                        id="paymentManageModal"
                        tabIndex="-1"
                        aria-labelledby="paymentManageModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="paymentManageModalLabel"
                              >
                                Modal title
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 取消訂閱Modal */}
                      <button
                        type="button"
                        className="btn p-3 border-0 mb-1"
                        data-bs-toggle="modal"
                        data-bs-target="#paymentCancelModal"
                      >
                        <small>取消目前訂閱方案</small>
                      </button>

                      <div
                        className="modal fade"
                        id="paymentCancelModal"
                        tabIndex="-1"
                        aria-labelledby="paymentCancelModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="paymentCancelModalLabel"
                              >
                                Modal title
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 手風琴 mobile 下拉按鈕 */}
                  <button
                    className="accordion-button d-flex d-xl-none flex-column gap-2 mb-6"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${userSubscription.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse-${userSubscription.id}`}
                  >
                    <div className="subscription-info-divider"></div>
                    <div className="d-flex justify-content-center align-items-center text-neutral-600 py-1">
                      <Icon
                        className="p-1 me-2"
                        icon="iconamoon:arrow-up-2-bold"
                        width="32"
                        height="32"
                      />
                      <h3 className="fs-8 fw-bold ls-1">歷史訂單紀錄</h3>
                    </div>
                  </button>
                </div>
              </div>
              {/* 手風琴下拉內容 */}
              <div
                id={`collapse-${userSubscription.id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordion-subscription"
              >
                {/* 手風琴下拉 table */}
                <div className="accordion-body p-0 d-none d-xl-block">
                  <table className="table table-borderless rounded-5 overflow-hidden subscription-table align-middle">
                    <thead>
                      <tr className="table-neutral-200">
                        <th scope="col">訂單編號</th>
                        <th scope="col">期數</th>
                        <th scope="col">帳單日期</th>
                        <th scope="col">金額</th>
                        <th scope="col">付款狀態</th>
                        <th scope="col">出貨狀態</th>
                        <th scope="col">發票</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <th scope="row">{order.id}</th>
                          <td>{order.periodNumber}</td>
                          <td>{order.billingDate}</td>
                          <td>{`NT$${order.price}`}</td>
                          <td>
                            {
                              paymentStatus.find((status) => {
                                return status.value === order.paymentStatus;
                              })?.label
                            }
                          </td>
                          <td>
                            {
                              shippingStatus.find((status) => {
                                return status.value === order.shipmentStatus;
                              })?.label
                            }
                          </td>
                          <td>
                            <button type="button" className="btn border-0 me-3">
                              <Icon icon="tabler:eye" width="20" height="20" />
                            </button>
                            <button type="button" className="btn border-0">
                              <Icon
                                icon="material-symbols:download-rounded"
                                width="20"
                                height="20"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* 手風琴 mobile 下拉卡片 */}
                <div className="accordion-body p-0 d-xl-none d-block d-flex flex-column gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-5 border border-neutral-400 p-6 d-flex flex-column gap-4">
                      <div className="d-flex flex-column gap-6">
                        {/* 訂單編號與狀態 */}
                        <div>
                          <div className="mb-3">
                            <h3 className="mb-1 fs-9 ls-1 text-neutral-600">
                              訂單編號
                            </h3>
                            <p className="h5">{order.id}</p>
                          </div>
                          <div>
                            <span className="badge-resolved me-3">已付款</span>
                            <span className="badge-resolved">已出貨</span>
                          </div>
                        </div>
                        {/* 訂單詳細內容 */}
                        <div className="d-flex flex-column gap-2">
                          <div className="subscription-info-divider"></div>
                          <div className="d-flex">
                            <div className="flex-grow-1 small">
                              <p className="mb-1 text-neutral-600">金額</p>
                              <p>NT$675</p>
                            </div>
                            <div className="flex-grow-1 small">
                              <p className="mb-1 text-neutral-600">期數</p>
                              <p>3</p>
                            </div>
                            <div className="flex-grow-1 small">
                              <p className="mb-1 text-neutral-600">付款日期</p>
                              <p>2026-02-28</p>
                            </div>
                          </div>
                          <div className="subscription-info-divider"></div>
                        </div>

                        {/* 訂單發票按鈕 */}
                        <div className="d-flex gap-3">
                          <button className="btn btn-md btn-neutral-300 flex-grow-1 rounded-pill">
                            查看發票
                          </button>
                          <button className="btn btn-md btn-neutral-300 flex-grow-1 rounded-pill">
                            下載發票
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination />
        </div>
      </main>
    </div>
  );
}

export default Subscription;