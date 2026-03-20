import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api";

function CartFinish() {
    const [cartData, setCartData] = useState([]);
    const [themes, setThemes] = useState([]);

    return (
        <>
            <main className="bg-neutral-300">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 cart-main">
                            {/* 購物車步驟 */}
                            <ol className="stepper mx-auto d-flex justify-content-center align-items-center">
                                <li className="step-item d-flex flex-column align-items-center active">
                                    <div className="step mb-2">1</div>
                                    <span className="step-intro">購物車</span>
                                </li>
                                <li className="step-item d-flex flex-column align-items-center active">
                                    <div className="step mb-2">2</div>
                                    <span className="step-intro">填寫資料</span>
                                </li>
                                <li className="step-item d-flex flex-column align-items-center active">
                                    <div className="step mb-2">3</div>
                                    <span className="step-intro">完成訂閱</span>
                                </li>
                            </ol>
                            <div
                                className="d-flex justify-content-between align-items-center mb-2 mb-lg-6">
                                <h1 className="cart-title p-3 py-lg-2 px-lg-4">完成訂閱</h1>
                            </div>
                            {/* 感謝訂閱 */}
                            <section className="cart-wrapper text-center mb-9 mb-lg-6">
                                <div className="mx-auto mb-6 mb-sm-8">
                                    <img src="./images/Cart_Page/pic_finish.svg" alt="空的購物車圖片" />
                                </div>
                                <h2 className="empty-cart-title mb-2">感謝您的訂閱</h2>
                                <p className="lh-base mb-3 mb-sm-2">您的一盒甜將於 <span className="text-primary-600">2025/9/28</span> 開始陸續配送。</p>
                            </section>
                            {/* 訂閱明細 */}
                            <section className="cart-wrapper mb-2 mb-lg-6 fs-8 fs-md-7">
                                <h3 className="fs-8 fs-sm-7 pb-3 fw-bold border-bottom border-neutral-400">訂閱明細</h3>
                                <table className="w-100">
                                    <tbody>
                                        <tr className="align-top">
                                            <td className="text-nowrap"># <span>SL12X9D2A1</span></td>
                                            <td className="w-50">
                                                <div className="fw-bold mb-1">精選甜點</div>
                                                <div className="d-flex">
                                                    <div className="badge text-bg-primary-200 text-primary-700 fw-medium rounded-pill me-1">
                                                        3個月訂閱方案
                                                    </div>
                                                    <div className="badge text-bg-neutral-400 text-neutral-700 fw-medium rounded-pill">
                                                        2盒
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <p className="fw-bold ">NT$560</p>
                                                <p className="fs-8">/月</p>
                                            </td>
                                        </tr>
                                        <tr className="align-top">
                                            <td className="text-nowrap"># <span>SL12X9D2A1</span></td>
                                            <td className="w-50">
                                                <div className="fw-bold mb-1">精選甜點</div>
                                                <div className="d-flex">
                                                    <div className="badge text-bg-primary-200 text-primary-700 fw-medium rounded-pill me-1">
                                                        3個月訂閱方案
                                                    </div>
                                                    <div className="badge text-bg-neutral-400 text-neutral-700 fw-medium  rounded-pill">
                                                        2盒
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <p className="fw-bold ">NT$560</p>
                                                <p className="fs-8">/月</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                            {/* 配送資訊 */}
                            <section className="cart-wrapper mb-9 mb-lg-6">
                                <h3 className="fs-8 fs-sm-7 pb-3 fw-bold border-bottom border-neutral-400">配送資訊</h3>
                                <div className="d-flex justify-content-between fs-8 fs-sm-7 my-2">
                                    <p className="fs-8 text-neutral-600">首次出貨日</p>
                                    <p className="text-primary">2025/9/28</p>
                                </div>
                                <div className="d-flex justify-content-between fs-8 fs-sm-7 my-2">
                                    <p className="fs-8 text-neutral-600">每月扣款日</p>
                                    <p>每月 <span>28</span> 日</p>
                                </div>
                                <div className="d-flex justify-content-between fs-8 fs-sm-7 my-2">
                                    <p className="fs-8 text-neutral-600">付款方式</p>
                                    <p>VISA ···· 4321</p>
                                </div>
                                <p className="my-2 fs-8"></p>
                                <p className="my-2 fs-8"></p>
                            </section>
                            {/* 查看訂閱按鈕 */}
                            <section className="row gx-2 mb-18">
                                <div className="col-6">
                                    <Link
                                        className="btn-secondary fw-bold text-center w-100"
                                        to="/theme">
                                        繼續購物
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link
                                        className="btn-primary-text fw-bold text-center w-100"
                                        to="/subscription">
                                        查看訂閱內容
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default CartFinish