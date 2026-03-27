// 外部工具
import { Icon } from '@iconify/react';
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef } from 'react';

// 元件區
import PaymentModal from './PaymentModal';
import CancelReminderModal from './CancelReminderModal';
import CancelConfirmModal from './CancelConfirmModal';

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

const { Modal } = bootstrap;

function SubscriptionList({ userSubscriptions }) {
  const [isAdd, setIsAdd] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]); // 已展開的訂閱 Id

  const paymentModalRef = useRef(null);
  const cancelReminderModalRef = useRef(null);
  const cancelConfirmModalRef = useRef(null);

  // Modal 初始化
  useEffect(() => {
    const modalRefs = [
      paymentModalRef,
      cancelReminderModalRef,
      cancelConfirmModalRef,
    ];

    const handleHide = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur(); // 解決關閉 modal，focus 停在 modal 內，影響螢幕閱讀器判讀
      }
    };

    modalRefs.forEach((ref) => {
      if (!ref.current) {
        console.log('ref.current is null');
        return;
      }
      new Modal(ref.current, { keyboard: false });
      ref.current?.addEventListener('hide.bs.modal', handleHide);
    });

    return () => {
      modalRefs.forEach((ref) => {
        ref.current?.removeEventListener('hide.bs.modal', handleHide);
      });
    };
  }, []);

  // 切換 accordion
  const handleToggleAccordion = (id) => {
    setExpandedIds((prev) =>
      expandedIds.includes(id)
        ? prev.filter((expandedId) => expandedId !== id)
        : [...prev, id],
    );
  };

  // Modal 開關
  const handleOpenModal = (ref, type) => {
    Modal.getOrCreateInstance(ref.current)?.show();
    setActiveModal(type);
  };

  const handleCloseModal = (ref) => {
    Modal.getInstance(ref.current)?.hide();
    setActiveModal(null);
  };

  return (
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
                    className="rounded-6"
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
                <div className="subscription-info-divider d-xl-none"></div>
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
                <div className="subscription-info-divider d-xl-none"></div>
              </div>
              {/* 分隔線 */}
              <div className="vertical-divider d-none d-xl-block"></div>
              {/* 付款方式 */}
              <div className="py-0 py-xl-2 flex-grow-1">
                <button
                  id={userSubscription.id}
                  className="accordion-button d-xl-flex justify-content-end align-items-center d-none"
                  type="button"
                  aria-expanded="false"
                  aria-controls={`collapse-${userSubscription.id}`}
                  onClick={() => handleToggleAccordion(userSubscription.id)}
                >
                  <Icon
                    className={`arrow-down-icon ${expandedIds.includes(userSubscription.id) ? 'rotate' : ''}`}
                    icon="iconamoon:arrow-down-2-bold"
                    width="32"
                    height="32"
                  />
                </button>
                {/* 輸入付款號碼 */}
                <div className="mb-3">
                  <p className="text-label mb-2">目前付款方式</p>
                  <div className="rounded-pill py-3 px-4 bg-neutral-300 d-flex gap-3">
                    <Icon
                      className="py-1 px-2"
                      icon="logos:visaelectron"
                      width="44"
                      height="24"
                    />
                    <div className="credit-card-number gap-2">
                      <span className="masked-number-compact">••••</span>
                      <span className="masked-number-compact">••••</span>
                      <span className="masked-number-compact">••••</span>
                      4321{' '}
                    </div>
                  </div>
                </div>
                {/* Modal */}
                <div>
                  {/* 付款管理 Modal button*/}
                  <button
                    type="button"
                    className="btn btn-cta-200 btn-action w-100 py-3 mb-1"
                    onClick={() => {
                      handleOpenModal(paymentModalRef, 'payment');
                      setIsAdd(false);
                    }}
                  >
                    付款管理
                  </button>
                  {/* 付款管理 Modal */}
                  <PaymentModal
                    modalRef={paymentModalRef}
                    isOpen={activeModal === 'payment'}
                    onClose={handleCloseModal}
                    isAdd={isAdd}
                    onToggleAddCard={(value) => setIsAdd(value)}
                  />
                  {/* 取消訂閱提醒 Modal button*/}
                  <button
                    type="button"
                    className="btn p-3 border-0 mb-1 w-100"
                    onClick={() =>
                      handleOpenModal(cancelReminderModalRef, 'cancelReminder')
                    }
                  >
                    <span className="small">取消目前訂閱方案</span>
                  </button>
                  {/* 取消訂閱提醒 Modal */}
                  <CancelReminderModal
                    cancelReminderModalRef={cancelReminderModalRef}
                    cancelConfirmModalRef={cancelConfirmModalRef}
                    isOpen={activeModal === 'cancelReminder'}
                    onClose={handleCloseModal}
                    handleOpenModal={handleOpenModal}
                  />
                  {/* 取消訂閱確認 Modal */}
                  <CancelConfirmModal 
                    cancelConfirmModalRef={cancelConfirmModalRef}
                    cancelReminderModalRef={cancelReminderModalRef}
                    isOpen={activeModal === 'cancelConfirm'}
                    onClose={handleCloseModal}
                    handleOpenModal={handleOpenModal}
                  />
                </div>
              </div>
              {/* 手風琴 mobile 下拉按鈕 */}
              <button
                className="accordion-button d-flex d-xl-none flex-column gap-2 mb-6"
                type="button"
                aria-expanded="false"
                aria-controls={`collapse-${userSubscription.id}`}
                onClick={() => handleToggleAccordion(userSubscription.id)}
              >
                <div className="subscription-info-divider"></div>
                <div className="d-flex justify-content-center align-items-center text-neutral-600 py-1">
                  <Icon
                    className={`p-1 me-2 arrow-down-icon ${expandedIds.includes(userSubscription.id) ? 'rotate' : ''}`}
                    icon="iconamoon:arrow-down-2-bold"
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
            className={`accordion-collapse collapse ${expandedIds.includes(userSubscription.id) ? 'show' : ''}`}
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
                <div
                  key={order.id}
                  className="rounded-5 border border-neutral-400 p-6 d-flex flex-column gap-4"
                >
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
                      <button
                        type="button"
                        className="btn btn-md btn-neutral-300 flex-grow-1 rounded-pill"
                      >
                        查看發票
                      </button>
                      <button
                        type="button"
                        className="btn btn-md btn-neutral-300 flex-grow-1 rounded-pill"
                      >
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
  );
}

export default SubscriptionList;
