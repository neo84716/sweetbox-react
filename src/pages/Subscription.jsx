import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { useRef, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";

import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import FormSelect from "../components/FormSelect";

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

const months = Array.from({ length: 12 } , (_, i) => ({
  label: `${i + 1}月`,
  value: i + 1
}))

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => ({
  label: `${currentYear + i}年`,
  value: currentYear + i
}));

// 最多的卡片數量
const maxCards = 5;

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

// 信用卡資料
const creditCards = [
  {
    id: 1,
    userId: 1,
    type: 'visa',
    lastFour: '4242',
    expMonth: '12',
    expYear: '2026',
    isDefault: true,
    isDeleted: false,
    token: 'tok_demo_1',
    users: [
      {
        id: 1,
        name: 'Lucas Wang',
      },
    ],
  },
  {
    id: 2,
    userId: 1,
    type: 'mastercard',
    lastFour: '5136',
    expMonth: '6',
    expYear: '2028',
    isDefault: false,
    isDeleted: false,
    token: 'tok_demo_2',
    users: [
      {
        id: 1,
        name: 'Lucas Wang',
      },
    ],
  },
];

// 信用卡 icon 樣式
const cardIcons = {
  visa: 'logos:visaelectron',
  mastercard: 'logos:mastercard',
  jcb: 'logos:jcb'
};

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
  const [isAdd, setIsAdd] = useState(false);
  const [cards, setCards] = useState(creditCards);
  const paymentModalRef = useRef(null);
  const paymentModalInstanceRef = useRef(null);
  const cancelReminderModalRef = useRef(null);
  const cancelReminderModalInstanceRef = useRef(null);
  const cancelConfirmModalRef = useRef(null);
  const cancelConfirmModalInstanceRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, control, reset, trigger, getValues, setValue} = useForm({
    defaultValues: {
      cardNumber: '',
      userName: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    },
    mode: 'onBlur'
  });

  const defaultCard = cards?.find(card => card?.isDefault) || cards?.[0];
  const activeCards = cards?.filter(card => !card?.isDeleted);

  // Modal 初始化
  useEffect(() => {
    const { Modal } = bootstrap;
    const paymentModalEle = paymentModalRef.current;
    const cancelReminderModalEle = cancelReminderModalRef.current;
    const cancelConfirmModalEle = cancelConfirmModalRef.current;

    paymentModalInstanceRef.current = new Modal(paymentModalEle, {
      keyboard: false,
    });
    cancelReminderModalInstanceRef.current = new Modal(cancelReminderModalEle, {
      keyboard: false,
    });
    cancelConfirmModalInstanceRef.current = new Modal(cancelConfirmModalEle, {
      keyboard: false,
    });

    const handleHide = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    paymentModalEle.addEventListener('hide.bs.modal', handleHide);
    cancelReminderModalEle.addEventListener('hide.bs.modal', handleHide);
    cancelConfirmModalEle.addEventListener('hide.bs.modal', handleHide);

    return () => {
      paymentModalEle?.removeEventListener('hide.bs.modal', handleHide);
      cancelReminderModalEle?.removeEventListener('hide.bs.modal', handleHide);
      cancelConfirmModalEle?.removeEventListener('hide.bs.modal', handleHide);
    };
  }, []);

  // Modal 開關
  const openModal = (type) => {
    switch (type) {
      case 'paymentModal':
        paymentModalInstanceRef.current?.show();
        break;
      case 'cancelReminderModal':
        cancelReminderModalInstanceRef.current?.show();
        break;   
      case 'cancelConfirmModal':
        cancelConfirmModalInstanceRef.current?.show(); 
        break;  
    }
  };

  const closeModal = (type) => {
    switch (type) {
      case 'paymentModal':
        paymentModalInstanceRef.current?.hide();
        break;
      case 'cancelReminderModal':
        cancelReminderModalInstanceRef.current?.hide();
        break;
      case 'cancelConfirmModal':
        cancelConfirmModalInstanceRef.current?.hide();
        break;
    }
  };

  const handleAddCard = () => {
    setIsAdd((prev) => !prev);
    reset();
  };

  // 格式化卡號
  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '').slice(0, 16);
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join('-') : '';
  }

  const formatToUpperCase = (name) => {
    return name.toUpperCase();
  }

  const formatExpireDate = (month = '', year = '') => {
    return `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`;
  }

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setValue('cardNumber', formattedValue, { shouldValidate: true});
  }

  const handleCvcChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '');
    setValue('cvc', formattedValue, { shouldValidate: true});
  }

  const setDefaultCard = (cardId) => {
    const newCards = cards.map((card) => ({
      ...card,
      isDefault: card.id === cardId
    }));
    setCards(newCards);
  }

  const handleRemoveCard = (cardId) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId 
          ? { ...card, isDeleted: true } 
          : card,
      ),
    );
  }

  // 判斷信用卡類型
  const getCardType = (number) => {
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^35/.test(number)) return 'jcb';
    return 'visa';
  }

  const submitPaymentForm = (data) => {
    const { cardNumber, expMonth, expYear } = data;
    const creditCard = {
      id: crypto.randomUUID(),
      userId: 1,
      type: getCardType(cardNumber),
      lastFour: cardNumber.slice(-4),
      expMonth,
      expYear,
      isDefault: true,
      token: crypto.randomUUID(),
      users: [
        {
          id: 1,
          name: 'Lucas Wang',
        },
      ],
    };

    // 將使用者的信用卡都設為非預設卡片
    const newCards = cards.map((card) => ({
      ...card,
      isDefault: false
    }))

    setIsAdd(false);
    setCards([creditCard, ...newCards])
    reset();
  }

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
                        htmlFor={`${userSubscription.id}`}
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
                          id={`${userSubscription.id}`}
                          aria-describedby="visa payment-number"
                          value="•••• •••• •••• 4321"
                          readOnly
                        />
                      </div>
                    </div>
                    {/* Modal */}
                    <div>
                      {/* 付款管理 Modal button*/}
                      <button
                        type="button"
                        className="btn btn-cta-200 btn-action w-100 py-3 mb-1"
                        // data-bs-target="#paymentManageModal"
                        onClick={() => {
                          openModal('paymentModal');
                          setIsAdd(false);
                        }}
                      >
                        付款管理
                      </button>
                      {/* 付款管理 Modal */}
                      <div
                        className="modal fade"
                        tabIndex="-1"
                        aria-labelledby="paymentManageModalLabel"
                        aria-hidden="true"
                        ref={paymentModalRef}
                      >
                        <div className="modal-dialog modal-wide">
                          <div className="modal-content bg-neutral-200 border-0 h-100 p-lg-8">
                            {/* Modal header */}
                            <div className="modal-header p-0 justify-content-center justify-content-lg-between mb-0 mb-lg-6">
                              <div className="text-start">
                                <h1
                                  className="ls-1 mb-0 mb-lg-2 modal-title"
                                  id="paymentManageModalLabel"
                                >
                                  設定付款方式
                                </h1>
                                <p className="small text-neutral-700 d-none d-lg-block">
                                  管理您的信用卡資訊與訂閱扣款卡片
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close btn-close-lg align-self-start me-0 mt-0 d-none d-lg-block"
                                aria-label="Close"
                                onClick={() => closeModal('paymentModal')}
                              ></button>
                            </div>
                            {/* Modal 內容 */}
                            <div className="modal-body p-6 p-lg-0 d-flex gap-6">
                              {/* 付款管理 Modal 左側區塊 */}
                              <div className="subscription-modal-left-section d-flex flex-column">
                                {isAdd ? (
                                  <>
                                    {/* 新增信用卡表單 */}
                                    <h2 className="py-3 fs-8 ls-1 text-neutral-600 mb-6">
                                      新增付款方式
                                    </h2>
                                    <form
                                      className="flex-grow-1 d-flex flex-column"
                                      onSubmit={handleSubmit(submitPaymentForm)}
                                    >
                                      {/* label 包 input 是為了解決 Bootstrap Modal focus trap 問題 */}
                                      <div className="d-flex flex-column gap-4 flex-grow-1">
                                        {/* 信用卡卡號 */}
                                        <div>
                                          <label className="d-block">
                                            <div className="mx-2 mb-2 small d-flex justify-content-between align-items-center">
                                              <span>信用卡卡號</span>
                                              <div className="d-flex gap-3">
                                                <Icon
                                                  icon="logos:visaelectron"
                                                  width="28"
                                                  height="16"
                                                />
                                                <Icon
                                                  icon="logos:mastercard"
                                                  width="24"
                                                  height="16"
                                                />
                                                <Icon
                                                  icon="logos:jcb"
                                                  width="24"
                                                  height="16"
                                                />
                                              </div>
                                            </div>
                                            <div className="input-wrapper">
                                              <Icon
                                                icon="tabler:credit-card"
                                                width="24"
                                                height="24"
                                                className="input-icon"
                                              />
                                              <input
                                                type="text"
                                                className={`form-control ms-0 ${errors.cardNumber ? 'border border-semantic-error' : ''}`}
                                                aria-describedby="error-message"
                                                placeholder="0000-0000-0000-0000"
                                                {...register('cardNumber', {
                                                  required: '請輸入信用卡卡號',
                                                  validate: (value) => {
                                                    const numbers =
                                                      value.replace(/\D/g, '');
                                                    if (numbers.length !== 16) {
                                                      return '信用卡卡號需為 16 碼';
                                                    }
                                                    return true;
                                                  },
                                                  onChange:
                                                    handleCardNumberChange,
                                                })}
                                              />
                                            </div>
                                            {errors.cardNumber && (
                                              <div className="text-semantic-error mt-2">
                                                <Icon
                                                  className="mx-2"
                                                  icon="gridicons:notice-outline"
                                                  width="16"
                                                  height="16"
                                                ></Icon>
                                                {errors.cardNumber.message}
                                              </div>
                                            )}
                                          </label>
                                        </div>
                                        {/* 持卡人姓名 */}
                                        <div>
                                          <label className="d-block">
                                            <div className="mx-2 mb-2 small">
                                              持卡人姓名
                                            </div>
                                            <div className="input-wrapper">
                                              <Icon
                                                icon="material-symbols:person-outline-rounded"
                                                width="24"
                                                height="24"
                                                className="input-icon"
                                              />
                                              <input
                                                type="text"
                                                className={`form-control ms-0 ${errors.userName && 'border border-semantic-error'}`}
                                                aria-describedby="error-message"
                                                placeholder="請輸入卡片上的英文姓名"
                                                {...register('userName', {
                                                  required: '請輸入持卡人姓名',
                                                })}
                                              />
                                            </div>
                                            {errors.userName && (
                                              <div className="text-semantic-error mt-2">
                                                <Icon
                                                  className="mx-2"
                                                  icon="gridicons:notice-outline"
                                                  width="16"
                                                  height="16"
                                                ></Icon>
                                                {errors.userName.message}
                                              </div>
                                            )}
                                          </label>
                                        </div>
                                        {/* 有效期限 */}
                                        <div>
                                          <label className="form-label mx-2 small">
                                            有效期限
                                          </label>
                                          <div className="d-flex gap-3">
                                            <Controller
                                              name="expMonth"
                                              control={control}
                                              rules={{
                                                validate: (val) => {
                                                  if (!val)
                                                    return '請選擇有效期限';

                                                  const currentYear =
                                                    getValues('expYear');
                                                  if (!currentYear) return true;

                                                  const now = new Date();
                                                  const expiration = new Date(
                                                    Number(currentYear),
                                                    Number(val),
                                                    1,
                                                  );

                                                  if (now >= expiration) {
                                                    return '信用卡已過期';
                                                  }

                                                  return true;
                                                },
                                              }}
                                              render={({
                                                field: { value, onChange },
                                              }) => (
                                                <FormSelect
                                                  options={months}
                                                  suffix="月"
                                                  value={value}
                                                  onChange={(val) => {
                                                    onChange(val);
                                                    trigger([
                                                      'expMonth',
                                                      'expYear',
                                                    ]);
                                                  }}
                                                  hasError={!!errors.expMonth}
                                                />
                                              )}
                                            />
                                            <Controller
                                              name="expYear"
                                              control={control}
                                              rules={{
                                                validate: (val) => {
                                                  if (!val)
                                                    return '請選擇有效期限';

                                                  return true;
                                                },
                                              }}
                                              render={({
                                                field: { value, onChange },
                                              }) => (
                                                <FormSelect
                                                  options={years}
                                                  suffix="年"
                                                  value={value}
                                                  onChange={(val) => {
                                                    onChange(val);
                                                    trigger([
                                                      'expMonth',
                                                      'expYear',
                                                    ]);
                                                  }}
                                                  hasError={!!errors.expYear}
                                                />
                                              )}
                                            />
                                          </div>
                                          {(errors.expMonth ||
                                            errors.expYear) && (
                                            <div className="text-semantic-error mt-2">
                                              <Icon
                                                className="mx-2"
                                                icon="gridicons:notice-outline"
                                                width="16"
                                                height="16"
                                              ></Icon>
                                              {errors.expMonth?.message ||
                                                errors.expYear?.message}
                                            </div>
                                          )}
                                        </div>
                                        {/* 安全碼 */}
                                        <div>
                                          <label className="d-block">
                                            <div className="mx-2 mb-2 small">
                                              安全碼
                                            </div>
                                            <div className="input-wrapper">
                                              <Icon
                                                icon="lets-icons:lock"
                                                width="24"
                                                height="24"
                                                className="input-icon"
                                              />
                                              <input
                                                type="text"
                                                className={`form-control ms-0 ${errors.cvc && 'border border-semantic-error'}`}
                                                aria-describedby="error-message"
                                                placeholder="CVC"
                                                inputMode="numeric"
                                                maxLength="3"
                                                {...register('cvc', {
                                                  required: '請輸入安全碼',
                                                  pattern: {
                                                    value: /^[0-9]{3}$/,
                                                    message: '安全碼需為 3 碼',
                                                  },
                                                  onChange: handleCvcChange,
                                                })}
                                              />
                                            </div>
                                            {errors.cvc && (
                                              <div className="text-semantic-error mt-2">
                                                <Icon
                                                  className="mx-2"
                                                  icon="gridicons:notice-outline"
                                                  width="16"
                                                  height="16"
                                                ></Icon>
                                                {errors.cvc.message}
                                              </div>
                                            )}
                                          </label>
                                        </div>
                                      </div>
                                      <div className="text-end d-none d-lg-block">
                                        <button
                                          type="button"
                                          className="btn py-3 px-4 border-0 me-6"
                                          onClick={() => setIsAdd(false)}
                                        >
                                          取消新增
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-cta-200 btn-action py-3 px-6"
                                        >
                                          確認並儲存
                                        </button>
                                      </div>
                                    </form>
                                  </>
                                ) : (
                                  <>
                                    {/* 信用卡圖片 */}
                                    <div className="mb-4">
                                      {defaultCard ? (
                                        <>
                                          <h2 className="p-2 py-lg-3 small ls-1 text-neutral-600 mb-2 mb-lg-1">
                                            預設付款方式
                                          </h2>
                                          <div className="credit-card-image d-flex flex-column justify-content-between">
                                            <div className="d-flex justify-content-between">
                                              <div
                                                className="bg-neutral-600 opacity-70 rounded-2"
                                                style={{
                                                  width: '48px',
                                                  height: '36px',
                                                }}
                                              ></div>
                                              <div className="px-2 rounded-1 bg-neutral-100 align-self-start">
                                                <Icon
                                                  icon={
                                                    cardIcons[
                                                      defaultCard.type
                                                    ] || 'logos:visaelectron'
                                                  }
                                                  width="28"
                                                  height="16"
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              <p className="mb-6 text-neutral-100 h6 ls-1 credit-card-number">
                                                <span>••••</span>
                                                <span>••••</span>
                                                <span>••••</span>
                                                {defaultCard.lastFour}
                                              </p>
                                              <div className="d-flex justify-content-between text-neutral-100">
                                                <div>
                                                  <p className="text-neutral-600 fs-9">
                                                    CARD HOLDER
                                                  </p>
                                                  <p className="fs-8">
                                                    {formatToUpperCase(
                                                      defaultCard.users[0].name,
                                                    )}
                                                  </p>
                                                </div>
                                                <div className="text-end">
                                                  <p className="text-neutral-600 fs-9">
                                                    EXPIRES
                                                  </p>
                                                  <p className="fs-8">
                                                    {formatExpireDate(
                                                      defaultCard.expMonth,
                                                      defaultCard.expYear,
                                                    )}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <div>...Loading</div>
                                      )}
                                    </div>
                                    {/* 信用卡列表 */}
                                    <div className="d-flex justify-content-between align-items-center mb-0 mb-lg-1 px-2 pb-2">
                                      <h2
                                        className={`small ls-1 text-neutral-600 py-3 ${activeCards.length === maxCards ? 'text-semantic-error' : ''}`}
                                      >
                                        其他卡片
                                        {activeCards.length === maxCards
                                          ? `(已達上限 ${maxCards} 張)`
                                          : `(目前 ${activeCards.length} / ${maxCards} 張)`}
                                      </h2>
                                      {activeCards.length < maxCards ? (
                                        <button
                                          type="button"
                                          className="btn d-none d-lg-flex align-items-center p-3 border-0"
                                          onClick={() => handleAddCard()}
                                        >
                                          <Icon
                                            icon="ic:round-plus"
                                            width="16"
                                            height="16"
                                            className="me-1"
                                          />
                                          <span className="small">
                                            新增卡片
                                          </span>
                                        </button>
                                      ) : (
                                        <div className="d-flex flex-column text-neutral-600 gap-1">
                                          <small>已達信用卡上限 (5 張)</small>
                                          <small>如需新增請先移除卡片</small>
                                        </div>
                                      )}
                                    </div>
                                    <ul className="mb-4 credit-card-list d-flex flex-column gap-2">
                                      {activeCards.map((card) => (
                                        <li
                                          key={card.id}
                                          className={`d-flex ${!card.isDefault && 'flex-column'} flex-sm-row justify-content-between align-items-start align-items-sm-center rounded-4 bg-neutral-100 p-4`}
                                        >
                                          <div className="d-flex justify-content-start justify-content-sm-between gap-3 mb-4 mb-sm-0">
                                            <div className="credit-card-logo align-self-center">
                                              <Icon
                                                icon={cardIcons[card.type]}
                                                width="24"
                                                height="16"
                                              />
                                            </div>
                                            <div className="small">
                                              <p className="mb-1 d-flex flex-column flex-sm-row">
                                                <span className="mb-1 mb-sm-0">
                                                  {card.type.toUpperCase()}
                                                </span>
                                                <span>{`• • • • ${card.lastFour}`}</span>
                                              </p>
                                              <p className="text-neutral-600">
                                                到期日{' '}
                                                {formatExpireDate(
                                                  card.expMonth,
                                                  card.expYear,
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                          {/* 編輯和設為預設按鈕 */}
                                          <div className="d-none d-sm-block">
                                            {card.isDefault ? (
                                              <span className="badge-completed">
                                                預設
                                              </span>
                                            ) : (
                                              <>
                                                <button
                                                  type="button"
                                                  className="btn p-3 fs-8 border-0"
                                                  onClick={() =>
                                                    setDefaultCard(card.id)
                                                  }
                                                >
                                                  設為預設
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn p-3 fs-8 border-0 text-semantic-error"
                                                  onClick={() =>
                                                    handleRemoveCard(card.id)
                                                  }
                                                >
                                                  移除
                                                </button>
                                              </>
                                            )}
                                          </div>
                                          {/* 編輯和設為預設按鈕-mobile */}
                                          {card.isDefault ? (
                                            <span className="badge-completed d-block d-sm-none text-center align-self-center">
                                              預設
                                            </span>
                                          ) : (
                                            <div className="d-sm-none d-flex w-100 gap-2">
                                              <button
                                                type="button"
                                                className="btn btn-neutral-300 rounded-pill flex-fill py-2 py-sm-3 px-3 px-sm-6 fs-9"
                                                onClick={() =>
                                                  setDefaultCard(card.id)
                                                }
                                              >
                                                設為預設
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-semantic-error rounded-pill flex-fill py-2 py-sm-3 px-3 px-sm-6 fs-9"
                                              >
                                                移除
                                              </button>
                                            </div>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                    {activeCards.length < maxCards && (
                                      <button
                                        type="button"
                                        className="btn btn-neutral-100 w-100 opacity-70 border-neutral-300 rounded-4 py-3 d-block d-lg-none"
                                        onClick={() => handleAddCard()}
                                      >
                                        <Icon
                                          icon="ic:round-plus"
                                          width="16"
                                          height="16"
                                          className="me-1"
                                        />
                                        <span className="small">新增卡片</span>
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      className="btn btn-cta-200 btn-action w-100 py-3 d-none d-lg-block"
                                      onClick={() => closeModal('paymentModal')}
                                    >
                                      完成管理
                                    </button>
                                  </>
                                )}
                              </div>
                              {/* 付款管理 Modal 右側區塊 */}
                              <div className="subscription-modal-right-section d-none d-lg-flex flex-column">
                                <div className="modal-info-card mb-4 flex-grow-1">
                                  <h2 className="small ls-1 text-neutral-600 mb-4">
                                    訂閱方案
                                  </h2>
                                  {/* 訂閱方案標題 */}
                                  <div className="d-flex gap-3 mb-17">
                                    <img
                                      src="./images/Subscription_Page/season_theme_pic_thumbnail.png"
                                      alt="甜點主題圖片"
                                    />
                                    <div>
                                      <h3 className="fs-7 ls-1 mb-1">
                                        季節限定甜點盒
                                      </h3>
                                      <p className="small text-neutral-600">
                                        12個月 · 1盒
                                      </p>
                                    </div>
                                  </div>
                                  {/* 訂閱方案詳情 */}
                                  <div>
                                    <div className="small mb-3">
                                      <p className="d-flex justify-content-between">
                                        <span className="text-neutral-600">
                                          方案價格
                                        </span>
                                        <span>$675 / 月</span>
                                      </p>
                                      <div className="subscription-info-divider"></div>
                                      <p className="d-flex justify-content-between">
                                        <span className="text-neutral-600">
                                          扣款卡片
                                        </span>
                                        <span>VISA **** 1234</span>
                                      </p>
                                      <div className="subscription-info-divider"></div>
                                      <p className="d-flex justify-content-between">
                                        <span className="text-neutral-600">
                                          下次扣款日期
                                        </span>
                                        <span>2026-03-28</span>
                                      </p>
                                    </div>
                                    <div className="rounded-4 p-4 bg-neutral-100">
                                      <p className="text-neutral-600 small mb-3">
                                        自動扣款
                                      </p>
                                      <p className="d-flex justify-content-between align-items-end">
                                        <span className="h3 ls-1">$675</span>
                                        <span className="small text-neutral-600">
                                          NTD / Monthly
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-4 border border-neutral-400 p-3 fs-9 text-neutral-600">
                                  🔒 您的交易資訊均透過最高業界標準的 SSL
                                  256-bit
                                  加密技術處理，確保信用卡號碼與個資均受中最高安全。
                                </div>
                              </div>
                            </div>
                            {/* 付款管理 Modal 行動版固定下方的按鈕*/}
                            {isAdd ? (
                              <div className="payment-button-container d-flex d-lg-none">
                                <button
                                  type="button"
                                  className="btn py-3 px-4 border-0 me-6 flex-grow-1"
                                  onClick={() => setIsAdd(false)}
                                >
                                  取消新增
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-cta-200 btn-action py-3 px-6 flex-grow-1"
                                  onClick={handleSubmit(submitPaymentForm)}
                                >
                                  確認並儲存
                                </button>
                              </div>
                            ) : (
                              <div className="payment-button-container d-block d-lg-none">
                                <button
                                  type="button"
                                  className="btn btn-cta-200 btn-action w-100 py-3"
                                  onClick={() => closeModal('paymentModal')}
                                >
                                  完成管理
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* 取消訂閱提醒 Modal button*/}
                      <button
                        type="button"
                        className="btn p-3 border-0 mb-1"
                        // data-bs-target="#paymentCancelModal"
                        onClick={() => openModal('cancelReminderModal')}
                      >
                        <small>取消目前訂閱方案</small>
                      </button>
                      {/* 取消訂閱提醒 Modal */}
                      <div
                        className="modal fade"
                        // id="paymentCancelModal"
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
                                        closeModal('cancelReminderModal')
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
                                        的優惠折扣。若現在終止訂閱，將失去
                                        $40/盒
                                        的優惠折扣，並需補足先前4期的差額共：
                                      </p>
                                      <p className="d-flex gap-4 align-items-end">
                                        <span className="text-label">
                                          補貼總額
                                        </span>
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
                                          closeModal('cancelReminderModal')
                                        }
                                      >
                                        保留訂閱，繼續甜點旅程
                                      </button>
                                      <button
                                        type="button"
                                        className="btn py-3 fs-8 text-neutral-700 border-0"
                                        onClick={() => {
                                          closeModal('cancelReminderModal');
                                          openModal('cancelConfirmModal');
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
                                      closeModal('cancelReminderModal');
                                      openModal('cancelConfirmModal');
                                    }}
                                  >
                                    取消訂閱
                                  </button>
                                  <button
                                    className="btn btn-cta-200 btn-action flex-grow-1"
                                    onClick={() =>
                                      closeModal('cancelReminderModal')
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
                                        <p className="h6 ls-1 mb-6">
                                          在地甜點盒
                                        </p>
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
                                        closeModal('cancelConfirmModal')
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
                                          closeModal('cancelConfirmModal')
                                        }
                                      >
                                        確認扣款 NT$160 ，並取消訂閱
                                      </button>
                                      <button
                                        type="button"
                                        className="btn py-3 fs-8 text-neutral-700 border-0"
                                        onClick={() => {
                                          closeModal('cancelConfirmModal');
                                          openModal('cancelReminderModal');
                                        }}
                                      >
                                        返回上一步
                                      </button>
                                    </div>
                                    {/* 行動版扣款方式 */}
                                    <div className="rounded-4 p-4 bg-neutral-100 d-sm-none">
                                      <p className="text-label mb-3">
                                        扣款方式
                                      </p>
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
                                          <p className="text-label mb-1">
                                            數量
                                          </p>
                                          <p>1 盒</p>
                                        </div>
                                        <div className="flex-grow-1">
                                          <p className="text-label mb-1">
                                            價格
                                          </p>
                                          <p>NT$700/月</p>
                                        </div>
                                        <div className="flex-grow-1">
                                          <p className="text-label mb-1">
                                            已配送
                                          </p>
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
                                      closeModal('cancelConfirmModal');
                                      openModal('cancelReminderModal');
                                    }}
                                  >
                                    返回上一步
                                  </button>
                                  <button
                                    className="btn btn-semantic-error btn-action py-3 w-100"
                                    onClick={() =>
                                      closeModal('cancelConfirmModal')
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
        {/* 分頁 */}
        <div className="d-flex justify-content-center">
          <Pagination />
        </div>
      </main>
    </div>
  );
}

export default Subscription;