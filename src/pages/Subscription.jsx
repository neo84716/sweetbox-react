// 外部工具
import { useState, useEffect } from 'react';
import api from '../api';

// 元件區
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import Tab from "../components/subscriptions/user/Tab";
import SubscriptionList from "../components/subscriptions/user/SubscriptionList";
import EmptySubscription from '../components/subscriptions/user/EmptySubscription';

const themeOptions = [
  { label: '全部主題', value: 'all' },
  { label: '精選甜點', value: 'select' },
  { label: '季節限定', value: 'seasonal' },
  { label: '在地甜點', value: 'local' },
  { label: '異國風味', value: 'global' },
  { label: '無負擔甜點', value: 'guilt-Free' },
  { label: '素食甜點', value: 'veggie' },
];

const statusOptions = [
  { label: '全部訂閱狀態', value: 'all' },
  { label: '進行中', value: 'active' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
];

function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);

  // 組合訂閱列表和主題資料
  useEffect(() => {
    (async () => {
      const [itemsRes, themesRes, ordersRes] = await Promise.all([
        api.get('/subscription_items?_expand=subscription&_expand=plan'),
        api.get('/themes'),
        api.get('/orders?_sort=createdAt&_order=desc'),
      ]);

      // 主題的資料預處理
      const themeMap = new Map(
        themesRes.data.map((theme) => [theme.id, theme]),
      );

      // 訂單的資料預處理
      const sortedOrders = ordersRes.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      const groupByOrders = (map, order) => {
        const key = order.subscriptionId;
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key).push(order);
        return map;
      };

      const ordersMap = sortedOrders.reduce(groupByOrders, new Map());

      // 訂閱資料的排序
      itemsRes.data.sort(
        (a, b) =>
          new Date(b.subscription.nextPaymentDate) -
          new Date(a.subscription.nextPaymentDate),
      );

      const items = itemsRes.data.map((item) => ({
        ...item,
        theme: themeMap.get(item.plan.themeId),
        orders: ordersMap.get(item.subscription.id) ?? [],
      }));
      setSubscriptions(items);
    })();
  }, []);

  return (
    <div className="py-sm-11 pt-20 pb-5 bg-neutral-300">
      <main className="container">
        {/* 導覽列表 */}
        <Tab />
        {/* 標題和篩選選單 */}
        <div className="py-4 p-sm-0 mb-4 mb-sm-8">
          <div className="d-flex justify-content-between">
            <h1 className="h2 d-none d-sm-block">訂閱管理</h1>
            {subscriptions.length > 0 && (
              <div className="d-flex gap-4">
                <Dropdown options={themeOptions} width="108px" />
                <Dropdown options={statusOptions} width="136px" />
              </div>
            )}
          </div>
        </div>
        {/* 訂閱列表 */}
        {subscriptions.length ? (
          <SubscriptionList subscriptions={subscriptions} />
        ) : (
          <EmptySubscription />
        )}

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