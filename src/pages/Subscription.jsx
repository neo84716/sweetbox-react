// 外部工具
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import { BeatLoader } from 'react-spinners';

// 元件區
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import Tab from "../components/subscriptions/user/Tab";
import SubscriptionList from "../components/subscriptions/user/SubscriptionList";
import EmptySubscription from '../components/subscriptions/user/EmptySubscription';

const themeOptions = [
  { label: '全部主題', value: '' },
  { label: '精選甜點', value: 't0000001' },
  { label: '季節限定', value: 't0000002' },
  { label: '在地甜點', value: 't0000003' },
  { label: '異國風味', value: 't0000004' },
  { label: '無負擔甜點', value: 't0000005' },
  { label: '素食甜點', value: 't0000006' },
];

const statusOptions = [
  { label: '全部訂閱狀態', value: '' },
  { label: '進行中', value: 'active' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
];

function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchSubscriptions = useCallback(async () => {
    try {
      setIsLoading(true);

      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      // 取得篩選條件
      const themeId = searchParams.get('themeId');
      const status = searchParams.get('status');

      // 組合 subscriptions
      let url = `/subscriptions?userId=${userId}&_expand=plan&_expand=theme&_sort=createdAt&_order=desc&_page=${currentPage}`;

      if (themeId) {
        url += `&themeId=${themeId}`;
      }

      if (status) {
        url += `&status=${status}`;
      }

      const [itemsRes, ordersRes] = await Promise.all([
        api.get(url),
        api.get('/orders?_sort=createdAt&_order=desc'),
      ]);

      // 訂單的資料預處理
      const groupByOrders = (map, order) => {
        const key = order.subscriptionId;
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key).push(order);
        return map;
      };

      const ordersMap = ordersRes.data.reduce(groupByOrders, new Map());

      const items = itemsRes.data.map((item) => ({
        ...item,
        orders: ordersMap.get(item.id) ?? [],
      }));

      setSubscriptions(items);
    } catch (error) {
      console.error('取得訂閱資料失敗：', error?.message);
      setError('載入訂閱資料失敗，請稍後再試');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [navigate, searchParams, currentPage]);
  
  // 組合訂閱列表和主題資料
  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // api error, 顯示錯誤訊息
  if (error) { return <h1 className='d-flex justify-content-center align-items-center vh-100'>{error}</h1> }

  const handelThemeChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('themeId', value);
    } else {
      params.delete('themeId');
    }
    setSearchParams(params);
  }

  const handelStatusChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('status', value);
    } else {
      params.delete('status');
    }
    setSearchParams(params);
  };

  const hasFilters = searchParams.get('themeId') || searchParams.get('status');

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
              <Dropdown
                options={themeOptions}
                width="108px"
                onChange={handelThemeChange}
                value={searchParams.get('themeId') || ''}
              />
              <Dropdown
                options={statusOptions}
                width="136px"
                onChange={handelStatusChange}
                value={searchParams.get('status') || ''}
              />
            </div>
          </div>
        </div>
        {/* 訂閱列表 */}
        {isLoading ? (
          <div className="d-flex justify-content-center gap-2 vh-100">
            <BeatLoader size={20} />
            <p className="text-center">載入訂閱中...</p>
          </div>
        ) : subscriptions.length ? (
          <SubscriptionList
            subscriptions={subscriptions}
            fetchSubscriptions={fetchSubscriptions}
          />
        ) : hasFilters ? (
          <p className="h3 text-center">目前篩選條件下沒有訂閱紀錄</p>
        ) : (
          <EmptySubscription />
        )}

        {/* 分頁 */}
        {subscriptions.length > 0 && (
          <div className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalItems={subscriptions.length}
              itemsPerPage={5}
              onChangePage={setCurrentPage}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Subscription;