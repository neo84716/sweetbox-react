// 外部工具
// import { useState, useEffect } from 'react';

// 元件區
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import Tab from "../components/subscriptions/user/Tab";
import SubscriptionList from "../components/subscriptions/user/SubscriptionList";

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

function Subscription() {

  return (
    <div className="py-sm-11 pt-20 pb-5 bg-neutral-300">
      <main className="container">
        {/* 導覽列表 */}
        <Tab />
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
        <SubscriptionList userSubscriptions={userSubscriptions} />
        {/* 分頁 */}
        <div className="d-flex justify-content-center">
          {/* <Pagination
            currentPage={1}
            totalItems={userSubscriptions.length}
            itemsPerPage={5} 
          /> */}
        </div>
      </main>
    </div>
  );
}

export default Subscription;