// 外部工具
import { Icon } from '@iconify/react';
import * as bootstrap from 'bootstrap';
import { useState, useEffect, useRef } from 'react';

// 元件區
import PaymentModal from './PaymentModal';

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
                  <div
                    className="modal fade"
                    tabIndex="-1"
                    aria-labelledby="paymentCancelModalLabel"
                    aria-hidden="true"
                    ref={cancelReminderModalRef}
                  >
                    <div className="modal-dialog modal-fullscreen-sm-down modal-wide mx-auto px-sm-2">
                      <div className="modal-content bg-transparent">
                        <div className="d-flex flex-column flex-sm-row cancel-modal">
                          {/* 取消訂閱提醒 Modal 左側 */}
                          <div className="cancel-modal-left d-flex justify-content-center align-items-center bg-neutral-800">
                            <div className="cancel-modal-left-content">
                              <div className="notice-icon-wrapper d-flex justify-content-center align-items-center mb-8">
                                <Icon
                                  icon="gridicons:notice-outline"
                                  width="32"
                                  height="32"
                                ></Icon>
                              </div>
                              <div className="px-2 px-sm-0">
                                <h2 className="cancel-modal-title desktop-title text-neutral-100 ls-1 mb-4">
                                  確定要取消訂閱嗎？
                                </h2>
                                <h2 className="cancel-modal-title mobile-title text-neutral-100 ls-1 mb-4">
                                  真的要離開嗎？
                                </h2>
                                <p className="text-neutral-250 fs-8">
                                  我們很遺憾看到您要結束訂閱旅程。取消後，您的會員專屬方案與目前的優惠折扣將失效。
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* 取消訂閱提醒 Modal 右側 */}
                          <div className="cancel-modal-right bg-neutral-200">
                            <div className="cancel-modal-reminder-content">
                              <div className="d-none d-sm-block text-end">
                                <button
                                  type="button"
                                  className="btn-close btn-close-lg"
                                  aria-label="Close"
                                  onClick={() =>
                                    handleCloseModal(cancelReminderModalRef)
                                  }
                                ></button>
                              </div>
                              <div className="d-flex flex-column gap-6 gap-sm-8">
                                {/* 右側標題 */}
                                <div>
                                  <p className="fs-9 text-neutral-700 mb-2">
                                    NOTICE
                                  </p>
                                  <h1 className="h6 ls-1">提前取消說明</h1>
                                </div>
                                {/* 右側說明 */}
                                <div className="modal-info-card">
                                  <p className="mb-8">
                                    您的「6個月在地甜點盒」已享有連續 4 期
                                    的優惠折扣。若現在終止訂閱，將失去 $40/盒
                                    的優惠折扣，並需補足先前4期的差額共：
                                  </p>
                                  <p className="d-flex gap-4 align-items-end">
                                    <span className="text-label">補貼總額</span>
                                    <span className="h2 ls-1">$160</span>
                                    <span className="text-label">NTD</span>
                                  </p>
                                </div>
                                {/* 桌面版下方按鈕 */}
                                <div className="d-none d-sm-flex flex-column gap-3">
                                  <button
                                    type="button"
                                    className="btn btn-cta-200 btn-action py-3 px-6"
                                    onClick={() =>
                                      handleCloseModal(cancelReminderModalRef)
                                    }
                                  >
                                    保留訂閱，繼續甜點旅程
                                  </button>
                                  <button
                                    type="button"
                                    className="btn py-3 fs-8 text-neutral-700 border-0"
                                    onClick={() => {
                                      handleCloseModal(cancelReminderModalRef);
                                      handleOpenModal(
                                        cancelConfirmModalRef,
                                        'cancelConfirm',
                                      );
                                    }}
                                  >
                                    確認前往取消並支付價差
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* 取消訂閱提醒 Modal 行動版下方按鈕 */}
                            <div className="payment-button-container d-flex gap-3 d-sm-none">
                              <button
                                className="btn flex-grow-1 border-0"
                                onClick={() => {
                                  handleCloseModal(cancelReminderModalRef);
                                  handleOpenModal(
                                    cancelConfirmModalRef,
                                    'cancelConfirm',
                                  );
                                }}
                              >
                                取消訂閱
                              </button>
                              <button
                                className="btn btn-cta-200 btn-action flex-grow-1"
                                onClick={() =>
                                  handleCloseModal(cancelReminderModalRef)
                                }
                              >
                                保留訂閱
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 取消訂閱確認 Modal */}
                  <div
                    className="modal fade"
                    tabIndex="-1"
                    aria-labelledby="paymentCancelModalLabel"
                    aria-hidden="true"
                    ref={cancelConfirmModalRef}
                  >
                    <div className="modal-dialog modal-fullscreen-sm-down modal-wide mx-auto px-sm-2">
                      <div className="modal-content bg-transparent">
                        <div className="d-flex flex-column flex-sm-row cancel-modal">
                          {/* 取消訂閱確認 Modal 左側 */}
                          <div className="cancel-modal-left bg-neutral-100 d-none d-sm-block">
                            <div className="cancel-modal-left-content h-100 d-flex flex-column justify-content-between">
                              {/* 結算明細 */}
                              <div>
                                <p className="text-label mb-6 fw-bold ls-1 lh-sm">
                                  結算明細
                                </p>
                                <div className="d-flex gap-4">
                                  <img
                                    className="align-self-start rounded-3"
                                    src="./images/Subscription_Page/local_theme_pic_thumbnail.png"
                                    alt="甜點盒圖片"
                                  />
                                  <div>
                                    <p className="h6 ls-1 mb-6">在地甜點盒</p>
                                    <ul className="d-flex flex-column gap-3">
                                      <li>
                                        <p className="mb-1 text-label">
                                          訂閱編號
                                        </p>
                                        <p className="small">LC062HY2C7</p>
                                      </li>
                                      <li>
                                        <p className="mb-1 text-label">
                                          已配送期數
                                        </p>
                                        <p className="small">4/6期</p>
                                      </li>
                                      <li>
                                        <p className="mb-1 text-label">
                                          訂閱數量
                                        </p>
                                        <p className="small">1 盒</p>
                                      </li>
                                      <li>
                                        <p className="mb-1 text-label">
                                          訂閱價格
                                        </p>
                                        <p className="small">NT$700/月</p>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* 扣款方式 */}
                              <div className="rounded-4 p-4 bg-neutral-200">
                                <p className="text-label mb-3">扣款方式</p>
                                <div className="d-flex gap-2 align-items-center">
                                  <div className="credit-card-logo">
                                    <Icon
                                      icon="logos:visaelectron"
                                      width="28"
                                      height="16"
                                    />
                                  </div>
                                  <p>**** **** **** 1234</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 取消訂閱確認 Modal 右側 */}
                          <div className="cancel-modal-right bg-neutral-200">
                            <div className="cancel-modal-confirm-content">
                              {/* 關閉按鈕 */}
                              <div className="d-none d-sm-block text-end">
                                <button
                                  type="button"
                                  className="btn-close btn-close-md"
                                  aria-label="Close"
                                  onClick={() =>
                                    handleCloseModal(cancelConfirmModalRef)
                                  }
                                ></button>
                              </div>
                              <div className="d-flex flex-column gap-8">
                                {/* 最後確認標題 */}
                                <div>
                                  <p className="h4 ls-1 mb-2">最後確認</p>
                                  <p className="small text-neutral-700">
                                    提前解約將收取原價差額補貼，請確認以下結算明細
                                  </p>
                                </div>
                                {/* 確認結算明細和補貼總額 */}
                                <div>
                                  <div className="subscription-summary d-flex flex-column gap-1 mb-4">
                                    <p className="subscription-summary-item">
                                      <span>單期原價</span>
                                      <span>$740</span>
                                    </p>
                                    <p className="subscription-summary-item">
                                      <span>訂閱優惠價</span>
                                      <span>$700</span>
                                    </p>
                                    <div className="subscription-info-divider"></div>
                                    <p className="subscription-summary-item">
                                      <span>每期優惠金額(價差)</span>
                                      <span>$40</span>
                                    </p>
                                    <p className="subscription-summary-item">
                                      <span>累計已配送期數</span>
                                      <span>4期</span>
                                    </p>
                                  </div>
                                  <div className="rounded-3 p-4 bg-primary-200 d-flex justify-content-between">
                                    <span className="fs-8 fw-bold ls-1 lh-sm">
                                      補貼總額計算
                                    </span>
                                    <span className="fs-8 fw-bold ls-1 lh-sm text-primary-600">
                                      $40 X 4期 = $160
                                    </span>
                                  </div>
                                </div>
                                {/* 取消訂閱確認 Modal 桌面版按鈕 */}
                                <div className="d-none d-sm-flex flex-column gap-3">
                                  <button
                                    type="button"
                                    className="btn btn-semantic-error rounded-pill px-6 py-3 ls-1 lh-sm"
                                    onClick={() =>
                                      handleCloseModal(cancelConfirmModalRef)
                                    }
                                  >
                                    確認扣款 NT$160 ，並取消訂閱
                                  </button>
                                  <button
                                    type="button"
                                    className="btn py-3 fs-8 text-neutral-700 border-0"
                                    onClick={() => {
                                      handleCloseModal(cancelConfirmModalRef);
                                      handleOpenModal(
                                        cancelReminderModalRef,
                                        'cancelReminder',
                                      );
                                    }}
                                  >
                                    返回上一步
                                  </button>
                                </div>
                                {/* 行動版扣款方式 */}
                                <div className="rounded-4 p-4 bg-neutral-100 d-sm-none">
                                  <p className="text-label mb-3">扣款方式</p>
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="py-1 px-2">
                                      <Icon
                                        icon="logos:visaelectron"
                                        width="28"
                                        height="16"
                                      />
                                    </div>
                                    <span>**** **** **** 1234</span>
                                  </div>
                                </div>
                                {/* 行動版訂閱編號卡片 */}
                                <div className="rounded-3 p-4 border border-neutral-400 d-sm-none">
                                  {/* 訂閱編號 */}
                                  <div className="d-flex gap-4 mb-4">
                                    <img
                                      className="rounded-3"
                                      src="./images/Subscription_Page/local_theme_pic_thumbnail.png"
                                      alt="甜點盒圖片"
                                    />
                                    <div>
                                      <p className="fs-9 lh-sm ls-1 fw-bold text-neutral-600 mb-1">
                                        訂閱編號：LC062HY2C7
                                      </p>
                                      <p className="fs-8 fw-bold lh-sm ls-1">
                                        在地甜點盒
                                      </p>
                                    </div>
                                  </div>
                                  {/* 訂閱內容 */}
                                  <div className="d-flex gap-4">
                                    <div className="flex-grow-1">
                                      <p className="text-label mb-1">數量</p>
                                      <p>1 盒</p>
                                    </div>
                                    <div className="flex-grow-1">
                                      <p className="text-label mb-1">價格</p>
                                      <p>NT$700/月</p>
                                    </div>
                                    <div className="flex-grow-1">
                                      <p className="text-label mb-1">已配送</p>
                                      <p>4/6期</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* 取消訂閱確認 Modal 行動板下方按鈕 */}
                            <div className="payment-button-container d-flex gap-3 d-sm-none">
                              <button
                                className="btn w-100 border-0 py-3 fs-8 text-neutral-700"
                                onClick={() => {
                                  handleCloseModal(cancelConfirmModalRef);
                                  handleOpenModal(
                                    cancelReminderModalRef,
                                    'cancelReminder',
                                  );
                                }}
                              >
                                返回上一步
                              </button>
                              <button
                                className="btn btn-semantic-error btn-action py-3 w-100"
                                onClick={() =>
                                  handleCloseModal(cancelConfirmModalRef)
                                }
                              >
                                扣款並取消訂閱
                              </button>
                            </div>
                          </div>
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
