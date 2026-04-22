import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';
import { Icon } from '@iconify/react';
import api from "../api";

// 載入 swiper 樣式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

// feedback swiper 資料
const feedbackData = [
  {
    img: './images/Home_Page/review_pic (2).png',
    rating: 4.5,
    text: '每次打開甜點盒都有拆禮物的感覺！我是那種選擇困難又愛吃甜點的人，有時候光選哪家蛋糕就滑一小時，現在每月都有驚喜幫我決定，超省心又療癒！',
    author: '無聊小日子',
    avatar: './images/Home_Page/Avatar-1.png',
  },
  {
    img: './images/Home_Page/review_pic (1).png',
    rating: 4.0,
    text: '超愛這種不寂寞的嚐鮮方式！上次吃到一家我從沒聽過的小店，竟然好吃到立刻加關注，下次想訂整顆主題回購。比起自己亂買，一盒甜起值又省時～',
    author: '焦糖人生好焦躁',
    avatar: './images/Home_Page/Avatar-2.png',
  },
  {
    img: './images/Home_Page/review_pic (6).png',
    rating: 4.2,
    text: '整個包裝跟口味都超級可愛，完全是我的風格。還特別拍照傳給我閨蜜，結果她現在也訂了🤣',
    author: '一點點可愛就好',
    avatar: './images/Home_Page/Avatar-3.png',
  },
  {
    img: './images/Home_Page/review_pic (5).png',
    rating: 4.5,
    text: '我太喜歡一盒甜的季節主題了，讓我很期待每次季節的交替。',
    author: 'Linda K.',
    avatar: './images/Home_Page/Avatar-4.png',
  },
  {
    img: './images/Home_Page/review_pic (4).png',
    rating: 5.0,
    text: '本來只是想試試，結果連我媽都搶著問🤤甜點不只好吃，還有詳細的介紹跟保存小卡，看得出來很用心。整體包裝跟體驗感都超棒，續訂沒懸念！',
    author: '啾啾在躺平',
    avatar: './images/Home_Page/Avatar-5.png',
  },
  {
    img: './images/Home_Page/review_pic (3).png',
    rating: 4.0,
    text: '一盒甜讓我太開心了！開箱的過程很刺激，裡面的甜點也總是能療癒我身心，驚喜又好吃。太喜歡了！',
    author: '南港裴勇俊',
    avatar: './images/Home_Page/Avatar-6.png',
  }
];

// 品牌 swiper 圖片資料
// Desktop
const desktopBrands = [
  './images/Home_Page/brand/brand-1.png',
  './images/Home_Page/brand/brand-2.png',
  './images/Home_Page/brand/brand-3.png',
  './images/Home_Page/brand/brand-4.png',
  './images/Home_Page/brand/brand-5.png',
  './images/Home_Page/brand/brand-6.png',
  './images/Home_Page/brand/brand-7.png',
  './images/Home_Page/brand/brand-8.png',
  './images/Home_Page/brand/brand-9.png',
  './images/Home_Page/brand/brand-10.png',
  './images/Home_Page/brand/brand-11.png',
  './images/Home_Page/brand/brand-12.png',
  './images/Home_Page/brand/brand-13.png',
  './images/Home_Page/brand/brand-14.png',
  './images/Home_Page/brand/brand-15.png',
  './images/Home_Page/brand/brand-16.png',
];

const desktopBrandsRow1 = desktopBrands.slice(0, 8);
const desktopBrandsRow2 = desktopBrands.slice(8, 16);

// Mobile
const mobileBrandsRow1 = [
  './images/Home_Page/brand-mobile/01.png',
  './images/Home_Page/brand-mobile/02.png',
  './images/Home_Page/brand-mobile/16.png',
  './images/Home_Page/brand-mobile/15.png',
  './images/Home_Page/brand-mobile/03.png',
  './images/Home_Page/brand-mobile/04.png',
];

const mobileBrandsRow2 = [
  './images/Home_Page/brand-mobile/05.png',
  './images/Home_Page/brand-mobile/11.png',
  './images/Home_Page/brand-mobile/12.png',
  './images/Home_Page/brand-mobile/06.png',
  './images/Home_Page/brand-mobile/13.png',
];

const mobileBrandsRow3 = [
  './images/Home_Page/brand-mobile/09.png',
  './images/Home_Page/brand-mobile/10.png',
  './images/Home_Page/brand-mobile/14.png',
  './images/Home_Page/brand-mobile/07.png',
  './images/Home_Page/brand-mobile/08.png',
];

// FAQ tab
const faqTabs = [
  {
    id: 'hot',
    label: '熱門問題',
    isDefault: true,
    items: [
      {
        id: 'hot-1',
        question: '我要訂購甜點盒，需要加入會員嗎？',
        answer:
          '是的，目前我們僅開放會員訂購服務，以方便你管理訂閱狀態、配送地址與付款資訊。',
      },
      {
        id: 'hot-2',
        question: '有哪些付款方式呢？',
        answer: '目前支援信用卡付款。',
      },
      {
        id: 'hot-3',
        question: '我的甜點盒什麼時候能到？',
        answer:
          '下單後約需5–7個工作天安排配送，我們會盡快把甜點送到你手上。※若遇旺季或天候影響，配送時間可能略有延遲。',
      },
      {
        id: 'hot-4',
        question: '一盒甜提供哪些類型的盒子？',
        answer:
          '我們提供精選、在地、異國、季節、無負擔、素食六種主題的甜點盒，來滿足每一位甜點愛好者的味蕾。',
      },
    ],
  },
  {
    id: 'account',
    label: '會員與帳號',
    items: [
      {
        id: 'account-1',
        question: '我要訂購甜點盒，需要加入會員嗎？',
        answer:
          '是的，目前我們僅開放會員訂購服務，以方便你管理訂閱狀態、配送地址與付款資訊。',
      },
      {
        id: 'account-2',
        question: '如何加入會員？',
        answer: '點選右上角「註冊/登入」按鈕，填寫基本資料即可成為會員。',
      },
      {
        id: 'account-3',
        question: '成為會員有哪些好處？',
        answer:
          '將不定期收到會員專屬優惠、當朋友以你的邀請碼訂閱成功後，你將獲得100元折價券。',
      },
      {
        id: 'account-4',
        question: '我要怎麼查看我的訂單或訂閱狀態？',
        answer:
          '登入會員後前往「會員中心」的「訂閱紀錄」，即可查看目前與過去的訂單資訊。',
      },
    ],
  },
  {
    id: 'money',
    label: '費用與訂閱',
    items: [
      {
        id: 'money-1',
        question: '一盒甜提供哪些類型的盒子？',
        answer:
          '我們提供精選、在地、異國、季節、無負擔、素食六種主題的甜點盒，來滿足每一位甜點愛好者的味蕾。',
      },
      {
        id: 'money-2',
        question: '我是否需要支付運費呢？',
        answer: '我們提供全台免運服務，讓你輕鬆享受甜點，不必擔心運費問題！',
      },
      {
        id: 'money-3',
        question: '我可以取消或暫停我的訂閱嗎？',
        answer:
          '可以，但若在訂閱期間取消或暫停，需補齊過去訂閱期數的折扣差額。',
      },
      {
        id: 'money-4',
        question: '有哪些付款方式呢？',
        answer: '目前支援信用卡付款。',
      },
    ],
  },
  {
    id: 'other',
    label: '其他',
    items: [
      {
        id: 'other-1',
        question: '我的甜點盒什麼時候能到？',
        answer:
          '下單後約需5–7個工作天安排配送，我們會盡快把甜點送到你手上。※若遇旺季或天候影響，配送時間可能略有延遲。',
      },
      {
        id: 'other-2',
        question: '我拿到破損的產品，怎麼辦？',
        answer:
          '不用擔心！我們會提供協助。請拍照告訴我們破損產品的狀況，我們將盡快為你處理。',
      },
      {
        id: 'other-3',
        question: '我可以客製化甜點盒中的內容嗎？',
        answer:
          '目前無法客製化甜點盒的內容。如果您有任何飲食限制或對於產品有任何問題或疑慮，請於購買前與我們聯繫。',
      },
    ],
  },
];

// Brand features
const features = [
  {
    id: 'unboxing',
    img: { src: './images/Home_Page/unboxing.svg', alt: 'unboxing' },
    title: '每月驚喜主題盒',
    description:
      '每月依不同主題搭配 6 到 10 款不重複的甜點驚喜，讓你不再煩惱選擇。',
    delay: 0,
  },
  {
    id: 'book',
    img: { src: './images/Home_Page/book.svg', alt: 'book' },
    title: '詳細介紹與保存指南',
    description: '每盒甜點附上詳細介紹與保存指南，讓你放心品嚐，輕鬆享受。',
    delay: 100,
  },
  {
    id: 'rating',
    img: { src: './images/Home_Page/rating.svg', alt: 'rating' },
    title: '主流與小眾品牌混搭',
    description: '結合大品牌經典與小眾人氣店，帶來多樣化的口感體驗。',
    delay: 200,
  },
  {
    id: 'nuts',
    img: { src: './images/Home_Page/nuts.svg', alt: 'nuts' },
    title: '限量新品與在地特色',
    description:
      '第一時間嚐到市場熱點新品與地方特色，讓你永遠走在甜點潮流前端。',
    delay: 300,
  },
];

// Themes
const themesTitleMap = {
  1: { src: './images/Home_Page/feature.svg', alt: '精選甜點標題' },
  2: { src: './images/Home_Page/season.svg', alt: '季節限定標題' },
  3: { src: './images/Home_Page/local.svg', alt: '在地甜點標題' },
};

// theme title highlight
const highlightMap = {
  1: '最值得期待',
  2: '陪你過日子',
  3: '熟悉中遇見驚喜',
};

// steps
const steps = [
  {
    id: 1,
    image: './images/Home_Page/select.svg',
    imageAlt: 'select 圖示',
    title: '1. 挑選你的主題',
    description:
      '無論你想和家人分享、或獨自探索甜味風景，我們都有適合你的那一盒甜。'
  },
  {
    id: 2,
    image: './images/Home_Page/subscribe.svg',
    imageAlt: 'subscribe 圖示',
    title: '2. 訂閱並等待驚喜',
    description: '選擇訂閱方式，每月都有盒甜點準時送達，像專屬你的節日驚喜。'
  },
  {
    id: 3,
    image: './images/Home_Page/enjoy.svg',
    imageAlt: 'enjoy 圖示',
    title: '3. 享受一盒甜',
    description: '嚴選甜點搭配保存小秘訣，美味與安心兼具。讓生活多一點甜。'
  },
];


function Home() {
  const [themes, setThemes] = useState([]);
  
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themesRes = await api.get('/themes');
        setThemes(themesRes.data.slice(0, 3));
      } catch (error) {
        console.error('取得主題失敗', error?.message || '請重新再試！')
      }
    }
    fetchThemes();
  }, [])

  const highlightText = (subtitle, highlight) => {
    const [before, after] = subtitle.split(highlight);

    return (
      <>
        {before}
        <span className="text-primary">{highlight}</span>
        {after}
      </>
    );
  }

  return (
    <>
      {/* 隱藏超出的背景圖 */}
      <main className="main overflow-hidden">
        {/* Hero banner */}
        <section className="hero-banner bg-neutral-200">
          <div className="container px-4 px-sm-0">
            <h1>
              <span className="visually-hidden">選擇障礙救星</span>
              <img
                className="title-hero mb-6 mb-sm-9"
                src="./images/Home_Page/title_hero_mobile.svg"
                alt="選擇障礙救星標題"
              />
            </h1>
            <div className="mb-10 mb-sm-9">
              <h2 className="mb-1 mb-sm-2 slogan-title">
                告別選擇困難，甜點人生更輕鬆
              </h2>
              <p className="slogan-subtitle">
                <span className="text-primary-600 me-1">一盒甜</span>
                幫你安排一場好吃又不膩的甜點旅程
              </p>
            </div>
            <NavLink to="/themedetail/1" className="btn-primary-icon">
              立刻訂閱
              <Icon
                className="ms-2"
                icon="tdesign:swap-right"
                width="24"
                height="24"
              />
            </NavLink>
          </div>
        </section>
        {/* Brand Features */}
        <section className="position-relative">
          <img
            className="position-absolute end-0 top-0 d-none d-lg-block z-n1"
            src="./images/Home_Page/bg_brownies.png"
            alt="bg_brownies"
            height="744"
            width="584"
          />
          <div className="container pt-lg-12 pb-lg-11 py-10">
            <div className="mb-lg-10 mb-9 text-center text-lg-start">
              <p className="en-font text-primary-600 fs-7 fs-lg-6 ls-1 fw-bold mb-lg-6 mb-3">
                Sweet in box
              </p>
              <h2>
                <span className="visually-hidden">
                  讓你的味蕾每個月都充滿期待
                </span>
                <picture>
                  <source
                    srcSet="./images/Home_Page/title_mobile.svg"
                    media="(max-width: 992px)"
                  />
                  <img
                    src="./images/Home_Page/title_desktop.svg"
                    alt="讓你的味蕾每個月都充滿期待標題"
                  />
                </picture>
              </h2>
            </div>
            <ul className="row card-custom">
              {features.map((feature) => (
                <li
                  key={feature.id}
                  className="col-lg-3 p-lg-6 p-4 text-center text-lg-start"
                >
                  <img
                    className="mb-lg-3 mb-2"
                    src={feature.img.src}
                    alt={feature.img.alt}
                    width="120"
                    height="120"
                  />
                  <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                    {feature.title}
                  </h3>
                  <p className="fs-lg-6 fs-7 text-neutral-800">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* Theme option */}
        <section className="position-relative">
          <div className="container py-md-11 py-10">
            {/* desktop: Slider main container */}
            <div className="swiper-themeOpts-area d-lg-block d-none position-relative">
              <Swiper
                className="swiper-themeOpts"
                speed={800}
                modules={[Navigation]}
                autoplay={{
                  delay: 2500,
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                grabCursor={true}
                resistanceRatio={0}
              >
                {/* Additional required wrapper */}
                {/* Slides */}
                {themes.map((theme) => (
                  <SwiperSlide
                    key={theme.id}
                    className="swiper-slide position-relative"
                  >
                    <div className="d-flex">
                      <div className="row">
                        <div className="col-7">
                          <img
                            src={theme.images.home}
                            alt={theme.title}
                            className="me-6 w-100"
                            height="auto"
                          />
                        </div>
                        <div className="col-5 py-10 px-9 d-flex flex-column justify-content-between align-items-start">
                          <div className="text">
                            <p className="en-font text-capitalize text-primary-600 ls-1 fw-bold fs-7 mb-6">
                              {theme.titleEn}
                            </p>
                            <h3 className="mb-9">
                              <span className="visually-hidden">
                                {theme.title}
                              </span>
                              <img
                                src={themesTitleMap[theme.id].src}
                                alt={themesTitleMap[theme.id].alt}
                              />
                            </h3>
                            <h4 className="fs-6 fw-bold ls-1 mb-2">
                              {highlightText(
                                theme.subtitle,
                                highlightMap[theme.id],
                              )}
                            </h4>
                            <p className="fs-6 fs-5">{theme.description}</p>
                          </div>
                          <NavLink
                            to={`/themedetail/${theme.id}`}
                            className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center"
                          >
                            了解更多
                            <Icon
                              className="ms-2"
                              icon="tdesign:swap-right"
                              width="24"
                              height="24"
                            />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-prev text-neutral-700">
                <div className="p-3">
                  <Icon icon="tdesign:swap-left" width="24" height="24" />
                </div>
              </div>
              <div className="swiper-button-next text-neutral-700">
                <div className="p-3">
                  <Icon icon="tdesign:swap-right" width="24" height="24" />
                </div>
              </div>
            </div>
            {/* mobile:card */}
            <ul className="card-themeOpts d-lg-none">
              {themes.map((theme) => (
                <li
                  key={theme.id}
                  className="card text-center bg-transparent border-0 py-4 mb-9"
                >
                  <div className="card-body px-0">
                    <p className="en-font card-subtitle text-primary text-capitalize mb-3 ls-1 fs-7 fw-bold">
                      {theme.titleEn}
                    </p>
                    <h3 className="card-title">
                      <img
                        src={themesTitleMap[theme.id].src}
                        alt={themesTitleMap[theme.id].alt}
                      />
                    </h3>
                    <img
                      className="w-100 h-auto my-6"
                      src={theme.images.home}
                      alt={`${theme.title}圖片`}
                    />
                    <h4 className="fs-6 fw-bold ls-1 mb-2 mb-lg-0">
                      {highlightText(theme.subtitle, highlightMap[theme.id])}
                    </h4>
                    <p className="card-text mb-6">{theme.description}</p>
                    <NavLink
                      to={`/themedetail/${theme.id}`}
                      className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-inline-flex align-items-center mx-auto"
                    >
                      了解更多
                      <Icon
                        className="ms-2"
                        icon="tdesign:swap-right"
                        width="24"
                        height="24"
                      />
                    </NavLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <img
            className="position-absolute cake-img z-n1"
            height="244"
            width="272"
            src="./images/Home_Page/bg_cake.svg"
            alt="bg_cake"
          />
          <img
            className="position-absolute dessert-img z-n1  d-none d-lg-block"
            height="335"
            width="325"
            src="./images/Home_Page/bg_dessert.svg"
            alt="bg_dessert"
          />
        </section>
        {/* Subscription steps */}
        <section className="position-relative">
          <img
            className="position-absolute cakeroll-img z-0"
            src="./images/Home_Page/bg_cakeroll.svg"
            alt="蛋糕捲圖示"
            height="612"
            width="880"
          />
          <div className="container py-lg-11 py-10">
            <div className="mb-lg-10 mb-9 text-center position-relative z-1">
              <p className="en-font text-primary-600 fs-7 fs-lg-5 ls-1 fw-bold mb-lg-6 mb-3">
                How to subscribe
              </p>
              <h2>
                <span className="visually-hidden">訂閱流程</span>
                <img
                  className="subscribe-img"
                  src="./images/Home_Page/title_section4.svg"
                  alt="訂閱流程圖示"
                  height="56"
                  width="208"
                />
              </h2>
            </div>
            <ul className="row card-custom mb-13 position-relative z-1">
              {steps.map((step) => (
                <li key={step.id} className="col-lg-4 p-lg-6 p-4 text-center">
                  <img
                    className="mb-lg-6 mb-2"
                    src={step.image}
                    alt={step.imageAlt}
                    width="120"
                    height="120"
                  />
                  <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                    {step.title}
                  </h3>
                  <p className="fs-lg-6 fs-7 text-neutral-800">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
            <div className="d-lg-flex d-none justify-content-center">
              <NavLink
                to="/themedetail/1"
                className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center"
              >
                立刻訂閱
                <Icon
                  className="ms-2"
                  icon="tdesign:swap-right"
                  width="24"
                  height="24"
                />
              </NavLink>
            </div>
          </div>
        </section>
        {/* Sub banner */}
        <section className="py-0 py-lg-10">
          <div className="w100Banner"></div>
        </section>
        {/* Feedback */}
        <section className="bg-neutral-200 position-relative">
          <div className="container py-lg-11 py-10">
            <div className="mb-9 mb-lg-10 text-center position-relative z-1">
              <p className="en-font fs-7 fs-lg-5 ls-1 fw-bold mb-lg-6 mb-3 text-primary-600">
                Sweet words
              </p>
              <h2>
                <span className="visually-hidden">好評分享</span>
                <picture>
                  <source
                    media="(min-width: 576px)"
                    srcSet="./images/Home_Page/title_section06.svg"
                  />
                  <img
                    className="feedback-img"
                    src="./images/Home_Page/title_section06_mobile.png"
                    alt="feedback"
                  />
                </picture>
              </h2>
            </div>
            <Swiper
              className="feedback-swiper"
              modules={[Autoplay]}
              slidesPerView={'auto'}
              spaceBetween={24}
              autoplay={true}
              loop
              speed={800}
              grabCursor={true}
            >
              {feedbackData.map((feedback, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper-slide"
                  style={{ width: '300px' }}
                >
                  <div className="card bg border-light bg-neutral-200 feedback-card w-100">
                    <img
                      src={feedback.img}
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className="content">
                        <p className="star-number ls-1 text-neutral-800">
                          <span className="me-2">{feedback.rating}</span>
                          <img src="./images/icon/star.svg" alt="星星圖示" />
                        </p>
                        <p className="card-text">{feedback.text}</p>
                      </div>
                      <div className="author d-flex align-items-center justify-content-end">
                        <p className="me-2">{feedback.author}</p>
                        <img
                          src={feedback.avatar}
                          alt="author-img"
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* Brands partner */}
        <section className="bg-neutral-200 position-relative">
          <div className="container brands-partner">
            {/* 上半部-partners合作夥伴字樣&圖 */}
            <div className="mb-9 mb-lg-10 text-center position-relative z-1">
              <p className="en-font fs-7 fs-lg-5 ls-1 fw-bold mb-lg-6 mb-3 text-primary-600">
                Partners
              </p>
              <h2>
                <span className="visually-hidden">好評分享</span>
                <picture>
                  <source
                    media="(max-width: 576px)"
                    srcSet="./images/Home_Page/title_section07_mobile.png"
                  />
                  <img
                    className="brands-img"
                    src="./images/Home_Page/title_section07.svg"
                    alt="partners"
                  />
                </picture>
              </h2>
            </div>
            {/* 下半部-品牌 swiper */}
            {/* desktop */}
            <div className="d-none d-lg-block">
              <Swiper
                className="brands-swiper mb-5"
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={4}
                autoplay={true}
                loop
                speed={800}
                breakpoints={{
                  576: { spaceBetween: 20 },
                }}
                grabCursor={true}
              >
                {desktopBrandsRow1.map((img, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img src={img} alt="" className="align-bottom" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                className="brands-swiper"
                dir="rtl"
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={4}
                autoplay={true}
                loop
                speed={800}
                breakpoints={{
                  576: { spaceBetween: 20 },
                }}
                grabCursor={true}
              >
                {desktopBrandsRow2.map((img, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img src={img} alt="" className="align-bottom" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* mobile */}
            <div className="d-block d-lg-none">
              {/* mobile-1 */}
              <Swiper
                className="brands-swiper"
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={4}
                autoplay={true}
                loop
                speed={800}
                grabCursor={true}
              >
                {mobileBrandsRow1.map((img, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img src={img} alt="" className="align-bottom" />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* mobile-2 */}
              <Swiper
                className="brands-swiper"
                dir="rtl"
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={4}
                autoplay={true}
                loop
                speed={800}
                grabCursor={true}
              >
                {mobileBrandsRow2.map((img, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img src={img} alt="" className="align-bottom" />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* mobile-3 */}
              <Swiper
                className="brands-swiper"
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={4}
                autoplay={true}
                loop
                speed={800}
                grabCursor={true}
              >
                {mobileBrandsRow3.map((img, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img src={img} alt="" className="align-bottom" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="bg-neutral-300 position-relative faq-wave">
          <div className="container py-9 py-lg-11">
            <div className="faq-bg rounded-panel ">
              <div className="px-lg-9 py-lg-10 py-9">
                <div className="text-center mb-9">
                  <p className="en-font fs-7 fs-lg-5 fw-bold ls-1 mb-3 mb-lg-6 text-primary-600">
                    FAQ
                  </p>
                  <h2>
                    <span className="visually-hidden">FAQ</span>
                    <picture>
                      <source
                        media="(min-width: 576px)"
                        srcSet="./images/Home_Page/title_section08.svg"
                      />
                      <img
                        src="./images/Home_Page/title_section08_mobile.png"
                        alt="FAQ-img"
                      />
                    </picture>
                  </h2>
                </div>
                {/* Tab */}
                <ul
                  className="nav nav-pills faq-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  {faqTabs.map((tab) => {
                    return (
                      <li
                        key={tab.id}
                        className="nav-item me-2 me-lg-3"
                        role="presentation"
                      >
                        <button
                          className={`nav-link ${tab.isDefault && 'active'}`}
                          id={`pills-${tab.id}-tab`}
                          data-bs-toggle="pill"
                          data-bs-target={`#${tab.id}`}
                          type="button"
                          role="tab"
                          aria-controls={tab.id}
                          aria-selected={tab.isDefault && 'true'}
                        >
                          {tab.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {/* FAQ 內容 */}
                <div
                  className="tab-content px-0 py-4 p-sm-6"
                  id="pills-tabContent"
                >
                  {faqTabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`tab-pane fade ${tab.isDefault && 'show active'}`}
                      id={tab.id}
                      role="tabpanel"
                      aria-labelledby={`pills-${tab.id}-tab`}
                    >
                      {/* 問題 */}
                      <div
                        className="accordion accordion-flush"
                        id={`accordion-${tab.id}`}
                      >
                        {tab.items.map((item) => (
                          <div key={item.id} className="accordion-item">
                            <h3 className="accordion-header">
                              <button
                                className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${item.id}`}
                                aria-expanded="false"
                                aria-controls={item.id}
                              >
                                {item.question}
                                <div className="p-3">
                                  {/* 加號 */}
                                  <Icon
                                    className="add"
                                    icon="material-symbols:add-rounded"
                                    width="24"
                                    height="24"
                                  />
                                  {/* 減號 */}
                                  <Icon
                                    className="sub"
                                    icon="ic:round-minus"
                                    width="24"
                                    height="24"
                                  />
                                </div>
                              </button>
                            </h3>
                            <div
                              id={item.id}
                              className="accordion-collapse collapse"
                              data-bs-parent={`#accordion-${tab.id}`}
                            >
                              <div className="accordion-body fs-7 fs-lg-6">
                                <p>{item.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home