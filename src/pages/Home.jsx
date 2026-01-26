import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';

// 載入 swiper 樣式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Footer from "../layouts/Footer";
import Header from "../layouts/Header";


function Home() {
  return (
    <>
      <Header />
      {/* 隱藏超出的背景圖 */}
      <main className="main overflow-hidden">
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
                <span className="text-primary-600">一盒甜</span>
                幫你安排一場好吃又不膩的甜點旅程
              </p>
            </div>
            <a href="theme.html" className="btn-primary-icon">
              立刻訂閱
              <svg
                className="ms-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                />
              </svg>
            </a>
          </div>
        </section>
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
              <li
                className="col-lg-3 col-12 p-lg-6 p-4 text-center text-lg-start"
                data-aos="fade-up"
              >
                <img
                  className="mb-lg-3 mb-2"
                  src="./images/Home_Page/unboxing.svg"
                  alt="unboxing"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  每月驚喜主題盒
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  每月依不同主題搭配 6 到 10
                  款不重複的甜點驚喜，讓你不再煩惱選擇。
                </p>
              </li>
              <li
                className="col-lg-3 col-12 p-lg-6 p-4 text-center text-lg-start"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img
                  className="mb-lg-3 mb-2"
                  src="./images/Home_Page/book.svg"
                  alt="book"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  詳細介紹與保存指南
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  每盒甜點附上詳細介紹與保存指南，讓你放心品嚐，輕鬆享受。
                </p>
              </li>
              <li
                className="col-lg-3 col-12 p-lg-6 p-4 text-center text-lg-start"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <img
                  className="mb-lg-3 mb-2"
                  src="./images/Home_Page/rating.svg"
                  alt="rating"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  主流與小眾品牌混搭
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  結合大品牌經典與小眾人氣店，帶來多樣化的口感體驗。
                </p>
              </li>
              <li
                className="col-lg-3 col-12 p-lg-6 p-4 text-center text-lg-start"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img
                  className="mb-lg-3 mb-2"
                  src="./images/Home_Page/nuts.svg"
                  alt="nuts"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  限量新品與在地特色
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  第一時間嚐到市場熱點新品與地方特色，讓你永遠走在甜點潮流前端。
                </p>
              </li>
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
                loop
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
              >
                <div className="swiper-wrapper">
                  {/* Additional required wrapper */}
                  {/* Slides */}
                  {/* 精選甜點 */}
                  <SwiperSlide className="swiper-slide position-relative">
                    <div className="d-flex">
                      <div className="row">
                        <div className="col-7">
                          <img
                            src="./images/Home_Page/pic_feature.png"
                            alt="精選甜點"
                            className="me-6 w-100"
                            height="auto"
                          />
                        </div>
                        <div className="col-5 py-10 px-9 d-flex flex-column justify-content-between align-items-start">
                          <div className="text">
                            <p className="en-font text-primary-600 ls-1 fw-bold fs-7 mb-6">
                              Featured
                            </p>
                            <h3 className="mb-9">
                              <span className="visually-hidden">精選甜點</span>
                              <img
                                src="./images/Home_Page/feature.svg"
                                alt="精選甜點標題"
                              />
                            </h3>
                            <h4 className="fs-6 fw-bold ls-1 mb-2">
                              我們幫你挑
                              <span className="text-primary">最值得期待</span>
                              的那一盒
                            </h4>
                            <p className="fs-6 fs-5">
                              不論是人氣爆款還是話題聯名,
                              通通不錯過。喜歡嚐鮮的你一定會愛上。
                            </p>
                          </div>
                          <a
                            href="theme_detail.html"
                            className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center"
                          >
                            了解更多
                            <svg
                              className="ms-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  {/* 季節限定 */}
                  <SwiperSlide className="swiper-slide position-relative">
                    <div className="d-flex">
                      <div className="row">
                        <div className="col-7">
                          <img
                            src="./images/Home_Page/pic_season.png"
                            alt="季節限定"
                            className="me-6 w-100"
                            height="auto"
                          />
                        </div>
                        <div className="col-5 py-10 px-9 d-flex flex-column justify-content-between align-items-start">
                          <div className="text">
                            <p className="en-font text-primary-600 ls-1 fw-bold fs-7 mb-6">
                              Limited
                            </p>
                            <h3 className="mb-9">
                              <span className="visually-hidden">季節限定</span>
                              <img
                                src="./images/Home_Page/season.svg"
                                alt="季節限定標題"
                              />
                            </h3>
                            <h4 className="fs-6 fw-bold ls-1 mb-2">
                              春夏秋冬, 不同的甜點
                              <span className="text-primary">陪你過日子</span>
                            </h4>
                            <p className="fs-6 fs-5">
                              當月份限定的口味與質地, 只在這時登場。錯過了,
                              就要再等一年。
                            </p>
                          </div>
                          <a
                            href="theme_detail.html"
                            className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center"
                          >
                            了解更多
                            <svg
                              className="ms-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  {/* 在地甜點 */}
                  <SwiperSlide className="swiper-slide position-relative">
                    <div className="d-flex">
                      <div className="row">
                        <div className="col-7">
                          <img
                            src="./images/Home_Page/pic_local.png"
                            alt="在地甜點"
                            className="me-6 w-100"
                            height="auto"
                          />
                        </div>
                        <div className="col-5 py-10 px-9 d-flex flex-column justify-content-between align-items-start">
                          <div className="text">
                            <p className="en-font text-primary-600 ls-1 fw-bold fs-7 mb-6">
                              Farm to table
                            </p>
                            <h3 className="mb-9">
                              <span className="visually-hidden">在地甜點</span>
                              <img
                                src="./images/Home_Page/local.svg"
                                alt="在地甜點標題"
                              />
                            </h3>
                            <h4 className="fs-6 fw-bold ls-1 mb-2">
                              重新品味土地的美味，
                              <span className="text-primary">
                                熟悉中遇見驚喜
                              </span>
                            </h4>
                            <p className="fs-6 fs-5">
                              精選以台灣食材與職人手藝製作的特色甜點,
                              簡單卻令人回味無窮。
                            </p>
                          </div>
                          <a
                            href="theme_detail.html"
                            className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center"
                          >
                            了解更多
                            <svg
                              className="ms-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
              <div className="swiper-button-prev text-neutral-700">
                <div className="p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M2.64 11.917h16.591a.78.78 0 0 1 .769.792a.78.78 0 0 1-.769.791H.771c-.688 0-1.03-.857-.541-1.354L5.549 6.73a.754.754 0 0 1 1.087.006a.81.81 0 0 1-.005 1.119z"
                    />
                  </svg>
                </div>
              </div>
              <div className="swiper-button-next text-neutral-700">
                <div className="p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* mobile:card */}
            <ul className="card-themeOpts d-lg-none">
              {/* 精選甜點card */}
              <li
                className="card text-center bg-transparent border-0 py-4 mb-9"
                data-aos="fade-up"
              >
                <div className="card-body">
                  <p className="en-font card-subtitle text-primary mb-3 ls-1 fs-7 fw-bold">
                    Featured
                  </p>
                  <h3 className="card-title">
                    <img
                      src="./images/Home_Page/feature.svg"
                      alt="精選甜點標題"
                    />
                  </h3>
                  <img
                    className="w-100 h-auto my-6"
                    src="./images/Home_Page/pic_feature.png"
                    alt="主題圖片-精選甜點"
                  />
                  <h4 className="fs-6 fw-bold ls-1">
                    我們幫你挑<span className="text-primary">最值得期待</span>
                    的那一盒
                  </h4>
                  <p className="card-text mb-6">
                    不論是人氣爆款還是話題聯名,
                    通通不錯過。喜歡嚐鮮的你一定會愛上。
                  </p>
                  <a
                    href="theme_detail.html"
                    className="d-inline-flex d-lg-flex btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center mx-auto"
                  >
                    了解更多
                    <svg
                      className="ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                      />
                    </svg>
                  </a>
                </div>
              </li>
              {/* 季節限定card */}
              <li
                className="card text-center bg-transparent border-0 py-4 mb-9 "
                data-aos="fade-up"
              >
                <div className="card-body">
                  <p className="en-font card-subtitle text-primary mb-3 ls-1 fs-7 fw-bold">
                    Limited
                  </p>
                  <h3 className="card-title">
                    <img
                      src="./images/Home_Page/season.svg"
                      alt="季節限定標題"
                    />
                  </h3>
                  <img
                    className="w-100 h-auto my-6"
                    src="./images/Home_Page/pic_season.png"
                    alt="主題圖片-季節限定"
                  />
                  <h4 className="fs-6 fw-bold ls-1">
                    春夏秋冬, 不同的甜點
                    <span className="text-primary">最值得期待</span>
                  </h4>
                  <p className="card-text mb-6">
                    當月份限定的口味與質地, 只在這時登場。錯過了, 就要再等一年。
                  </p>
                  <a
                    href="theme_detail.html"
                    className="d-inline-flex d-lg-flex btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center mx-auto"
                  >
                    了解更多
                    <svg
                      className="ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                      />
                    </svg>
                  </a>
                </div>
              </li>
              {/* 在地甜點card */}
              <li
                className="card text-center bg-transparent border-0 py-4"
                data-aos="fade-up"
              >
                <div className="card-body">
                  <p className="en-font card-subtitle text-primary mb-3 ls-1 fs-7 fw-bold">
                    Farm to table
                  </p>
                  <h3 className="card-title">
                    <img
                      src="./images/Home_Page/local.svg"
                      alt="在地甜點標題"
                    />
                  </h3>
                  <img
                    className="w-100 h-auto my-6"
                    src="./images/Home_Page/pic_local.png"
                    alt="主題圖片-在地甜點"
                  />
                  <h4 className="fs-6 fw-bold ls-1">
                    重新品味土地的美味，
                    <span className="text-primary">熟悉中遇見驚喜</span>
                  </h4>
                  <p className="card-text mb-6">
                    精選以台灣食材與職人手藝製作的特色甜點, 簡單卻令人回味無窮。
                  </p>
                  <a
                    href="theme_detail.html"
                    className="d-inline-flex d-lg-flex btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center mx-auto"
                  >
                    了解更多
                    <svg
                      className="ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                      />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <img
            className="position-absolute cake-img z-n1"
            data-aos="fade-up"
            height="244"
            width="272"
            src="./images/Home_Page/bg_cake.svg"
            alt="bg_cake"
          />
          <img
            className="position-absolute dessert-img z-n1  d-none d-lg-block"
            data-aos="fade-up"
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
            data-aos="fade-up"
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
              <li
                className="col-lg-4 col-12 p-lg-6 p-4 text-center"
                data-aos="fade-up"
              >
                <img
                  className="mb-lg-6 mb-2"
                  src="./images/Home_Page/select.svg"
                  alt="select"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  1. 挑選你的主題
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  無論你想和家人分享、或獨自探索甜味風景,
                  我們都有適合你的那一盒甜。
                </p>
              </li>
              <li
                className="col-lg-4 col-12 p-lg-6 p-4 text-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img
                  className="mb-lg-6 mb-2"
                  src="./images/Home_Page/subscribe.svg"
                  alt="subscribe"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  2. 訂閱並等待驚喜
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  選擇訂閱方式, 每月都有盒甜點準時送達, 像專屬你的節日驚喜。
                </p>
              </li>
              <li
                className="col-lg-4 col-12 p-lg-6 p-4 text-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <img
                  className="mb-lg-6 mb-2"
                  src="./images/Home_Page/enjoy.svg"
                  alt="enjoy"
                  width="120"
                  height="120"
                />
                <h3 className="fs-lg-4 fs-6 ls-1 fw-bold text-neutral-800 mb-lg-3 mb-2">
                  3. 享受一盒甜
                </h3>
                <p className="fs-lg-6 fs-7 text-neutral-800">
                  嚴選甜點搭配保存小秘訣, 美味與安心兼具。讓生活多一點甜。
                </p>
              </li>
            </ul>
            <div className="d-lg-flex d-none justify-content-center">
              <a
                href="theme.html"
                className="btn-primary-icon ls-1 lh-sm fs-6 fw-bold d-flex align-items-center"
              >
                立刻訂閱
                <svg
                  className="ms-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M15 7.586L22.414 15H2v-2h15.586l-4-4z"
                  />
                </svg>
              </a>
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
              <SwiperSlide
                className="swiper-slide h-100"
                style={{ width: '300px' }}
              >
                <div className="card bg border-light bg-neutral-200 feedback-card w-100 h-100">
                  <img
                    src="./images/Home_Page/review_pic (2).png"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="content">
                      <p className="star-number ls-1 text-neutral-800">
                        <span className="me-2">4.5</span>
                        <img src="./images/icon/star.svg" alt="星星圖示" />
                      </p>
                      <p className="card-text">
                        每次打開甜點盒都有拆禮物的感覺！我是那種選擇困難又愛吃甜點的人，有時候光選哪家蛋糕就滑一小時，現在每月都有驚喜幫我決定，超省心又療癒！
                      </p>
                    </div>
                    <div className="author d-flex align-items-center justify-content-end">
                      <p className="me-2">無聊小日子</p>
                      <img
                        src="./images/Home_Page/Avatar-1.png"
                        alt="author-img"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide h-100"
                style={{ width: '300px' }}
              >
                <div className="card bg border-light bg-neutral-200 feedback-card w-100 h-100">
                  <img
                    src="./images/Home_Page/review_pic (1).png"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="content">
                      <p className="star-number ls-1 text-neutral-800">
                        <span className="me-2">4.0</span>
                        <img src="./images/icon/star.svg" alt="星星圖示" />
                      </p>
                      <p className="card-text">
                        超愛這種不寂寞的嚐鮮方式！上次吃到一家我從沒聽過的小店，竟然好吃到立刻加關注，下次想訂整顆主題回購。比起自己亂買，一盒甜起值又省時～
                      </p>
                    </div>
                    <div className="author d-flex align-items-center justify-content-end">
                      <p className="me-2">焦糖人生好焦躁</p>
                      <img
                        src="./images/Home_Page/Avatar-2.png"
                        alt="author-img"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide h-100"
                style={{ width: '300px' }}
              >
                <div className="card bg border-light bg-neutral-200 feedback-card w-100 h-100">
                  <img
                    src="./images/Home_Page/review_pic (6).png"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="content">
                      <p className="star-number ls-1 text-neutral-800">
                        <span className="me-2">4.2</span>
                        <img src="./images/icon/star.svg" alt="星星圖示" />
                      </p>
                      <p className="card-text">
                        整個包裝跟口味都超級可愛，完全是我的風格。還特別拍照傳給我閨蜜，結果她現在也訂了🤣
                      </p>
                    </div>
                    <div className="author d-flex align-items-center justify-content-end">
                      <p className="me-2">一點點可愛就好</p>
                      <img
                        src="./images/Home_Page/Avatar-3.png"
                        alt="author-img"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide h-100"
                style={{ width: '300px' }}
              >
                <div className="card bg border-light bg-neutral-200 feedback-card w-100 h-100">
                  <img
                    src="./images/Home_Page/review_pic (5).png"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="content">
                      <p className="star-number d-flex flex-nowrap ls-1 text-neutral-800">
                        <span className="me-2">4.5</span>
                        <img src="./images/icon/star.svg" alt="星星圖示" />
                      </p>
                      <p className="card-text">
                        我太喜歡一盒甜的季節主題了，讓我很期待每次季節的交替。
                      </p>
                    </div>
                    <div className="author d-flex align-items-center justify-content-end">
                      <p className="me-2">Linda K.</p>
                      <img
                        src="./images/Home_Page/Avatar-4.png"
                        alt="author-img"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide h-100"
                style={{ width: '300px' }}
              >
                <div className="card bg border-light bg-neutral-200 feedback-card w-100 h-100">
                  <img
                    src="./images/Home_Page/review_pic (4).png"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="content">
                      <p className="star-number ls-1 text-neutral-800">
                        <span className="me-2">5.0</span>
                        <img src="./images/icon/star.svg" alt="星星圖示" />
                      </p>
                      <p className="card-text">
                        本來只是想試試，結果連我媽都搶著問🤤甜點不只好吃，還有詳細的介紹跟保存小卡，看得出來很用心。整體包裝跟體驗感都超棒，續訂沒懸念！
                      </p>
                    </div>
                    <div className="author d-flex align-items-center justify-content-end">
                      <p className="me-2">啾啾在躺平</p>
                      <img
                        src="./images/Home_Page/Avatar-5.png"
                        alt="author-img"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide h-100"
                style={{ width: '300px' }}
              >
                <div className="card bg border-light bg-neutral-200 feedback-card w-100 h-100">
                  <img
                    src="./images/Home_Page/review_pic (3).png"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="content">
                      <p className="star-number ls-1 text-neutral-800">
                        <span className="me-2">4.0</span>
                        <img src="./images/icon/star.svg" alt="星星圖示" />
                      </p>
                      <p className="card-text">
                        一盒甜讓我太開心了！開箱的過程很刺激，裡面的甜點也總是能療癒我身心，驚喜又好吃。太喜歡了！
                      </p>
                    </div>
                    <div className="author d-flex align-items-center justify-content-end">
                      <p className="me-2">南港裴勇俊</p>
                      <img
                        src="./images/Home_Page/Avatar-6.png"
                        alt="author-img"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
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
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-1.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-2.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-3.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-4.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-5.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-6.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-7.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-8.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
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
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-9.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-10.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-11.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-12.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-13.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-14.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-15.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand/brand-16.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
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
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/01.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/02.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/16.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/15.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/03.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/04.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
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
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/05.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/11.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/12.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/06.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/13.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
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
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/09.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/10.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/14.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/07.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <img
                    src="./images/Home_Page/brand-mobile/08.png"
                    alt=""
                    className="align-bottom"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="bg-neutral-300 position-relative faq-wave">
          <div className="container py-9 py-lg-11">
            <div className="faq-bg rounded-panel " data-aos="fade-up">
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
                {/* <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  Some placeholder content for the collapse component. This panel is
                  hidden by default but revealed when the user activates the relevant
                  trigger.
                </div>
              </div> */}
                <ul
                  className="nav nav-pills faq-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  {/* tab-熱門 */}
                  <li className="nav-item me-2 me-lg-3" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#hot"
                      type="button"
                      role="tab"
                      aria-controls="hot"
                      aria-selected="true"
                    >
                      熱門問題
                    </button>
                  </li>
                  {/* tab-會員帳號 */}
                  <li className="nav-item me-2 me-lg-3" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#Member&Account"
                      type="button"
                      role="tab"
                      aria-controls="Member&Account"
                      aria-selected="false"
                    >
                      會員與帳號
                    </button>
                  </li>
                  {/* tab-費用 */}
                  <li className="nav-item me-2 me-lg-3" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#Money"
                      type="button"
                      role="tab"
                      aria-controls="Money"
                      aria-selected="false"
                    >
                      費用與訂閱
                    </button>
                  </li>
                  {/* tab-其他 */}
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#other"
                      type="button"
                      role="tab"
                      aria-controls="other"
                      aria-selected="false"
                    >
                      其他
                    </button>
                  </li>
                </ul>
                <div
                  className="tab-content px-0 py-4 p-sm-6"
                  id="pills-tabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="hot"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    {/* 熱門問題 */}
                    <div
                      className="accordion accordion-flush"
                      id="accordionExample"
                    >
                      {/* Q1 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#hot1"
                            aria-expanded="false"
                            aria-controls="hot1"
                          >
                            我要訂購甜點盒, 需要加入會員嗎？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div id="hot1" className="accordion-collapse collapse">
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              是的，目前我們僅開放會員訂購服務，以方便你管理訂閱狀態、配送地址與付款資訊。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q2 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#hot2"
                            aria-expanded="false"
                            aria-controls="hot2"
                          >
                            有哪些付款方式呢？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="hot2"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>可以選用現金、信用卡、轉帳三種付款方式。</p>
                          </div>
                        </div>
                      </div>
                      {/* Q3 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#hot3"
                            aria-expanded="false"
                            aria-controls="hot3"
                          >
                            我的甜點盒什麼時候能到？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="hot3"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              下單後約需5–7
                              個工作天安排配送，我們會盡快把甜點送到你手上 ※
                              若遇旺季或天候影響，配送時間可能略有延遲。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q4 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#hot4"
                            aria-expanded="false"
                            aria-controls="hot4"
                          >
                            一盒甜提供哪些類型的盒子？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="hot4"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              我們提供精選、在地、異國、季節四種主題的甜點盒，來滿足每一
                              位甜點愛好者的味蕾
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Member&Account"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {/* 會員與帳號 */}
                    <div
                      className="accordion accordion-flush"
                      id="accordionExample"
                    >
                      {/* Q1 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#account1"
                            aria-expanded="false"
                            aria-controls="account1"
                          >
                            我要訂購甜點盒, 需要加入會員嗎？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="account1"
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              是的，目前我們僅開放會員訂購服務，以方便你管理訂閱狀態、配送地址與付款資訊。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q2 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#account2"
                            aria-expanded="false"
                            aria-controls="account2"
                          >
                            如何加入會員？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="account2"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>可以選用現金、信用卡、轉帳三種付款方式。</p>
                          </div>
                        </div>
                      </div>
                      {/* Q3 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#account3"
                            aria-expanded="false"
                            aria-controls="account3"
                          >
                            成為會員有哪些好處？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="account3"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              下單後約需5–7
                              個工作天安排配送，我們會盡快把甜點送到你手上 ※
                              若遇旺季或天候影響，配送時間可能略有延遲。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q4 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#account4"
                            aria-expanded="false"
                            aria-controls="account4"
                          >
                            我要怎麼查看我的訂單或訂閱狀態？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            <div className="p-3 sub">
                              {/* 減號 */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="account4"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              我們提供精選、在地、異國、季節四種主題的甜點盒，來滿足每一
                              位甜點愛好者的味蕾
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 費用 */}
                  <div
                    className="tab-pane fade"
                    id="Money"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div
                      className="accordion accordion-flush"
                      id="accordionExample"
                    >
                      {/* Q1 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#money1"
                            aria-expanded="false"
                            aria-controls="money1"
                          >
                            一盒甜提供哪些類型的盒子？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="money1"
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              是的，目前我們僅開放會員訂購服務，以方便你管理訂閱狀態、配送地址與付款資訊。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q2 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#money2"
                            aria-expanded="false"
                            aria-controls="money2"
                          >
                            我是否需要支付運費呢？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="money2"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>可以選用現金、信用卡、轉帳三種付款方式。</p>
                          </div>
                        </div>
                      </div>
                      {/* Q3 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#money3"
                            aria-expanded="false"
                            aria-controls="money3"
                          >
                            我可以取消或暫停我的訂閱嗎？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="money3"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              下單後約需5–7
                              個工作天安排配送，我們會盡快把甜點送到你手上 ※
                              若遇旺季或天候影響，配送時間可能略有延遲。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q4 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#money4"
                            aria-expanded="false"
                            aria-controls="money4"
                          >
                            有哪些付款方式呢？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="money4"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              我們提供精選、在地、異國、季節四種主題的甜點盒，來滿足每一
                              位甜點愛好者的味蕾
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="other"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {/* 其他 */}
                    <div
                      className="accordion accordion-flush"
                      id="accordionExample"
                    >
                      {/* Q1 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#other1"
                            aria-expanded="false"
                            aria-controls="other1"
                          >
                            我的甜點盒什麼時候能到？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="other1"
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              是的，目前我們僅開放會員訂購服務，以方便你管理訂閱狀態、配送地址與付款資訊。
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Q2 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#other2"
                            aria-expanded="false"
                            aria-controls="other2"
                          >
                            我拿到破損的產品, 怎麼辦？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="other2"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>可以選用現金、信用卡、轉帳三種付款方式。</p>
                          </div>
                        </div>
                      </div>
                      {/* Q3 */}
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <button
                            className="accordion-button collapsed justify-content-between fw-bold fs-7 fs-lg-6 text-neutral-800"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#other3"
                            aria-expanded="false"
                            aria-controls="other3"
                          >
                            我可以客製化甜點盒中的內容嗎？
                            {/* 加號 */}
                            <div className="p-3 add">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="add"
                              >
                                <path
                                  fill="currentColor"
                                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                />
                              </svg>
                            </div>
                            {/* 減號 */}
                            <div className="p-3 sub">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="M5 13v-2h14v2z" />
                              </svg>
                            </div>
                          </button>
                        </h3>
                        <div
                          id="other3"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body fs-7 fs-lg-6">
                            <p>
                              下單後約需5–7
                              個工作天安排配送，我們會盡快把甜點送到你手上 ※
                              若遇旺季或天候影響，配送時間可能略有延遲。
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home