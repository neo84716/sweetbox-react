import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import DropdownComponent from "../../components/DropdownComponent";
import { useState } from "react";
import StatusButton, { STATUS } from "../../components/StatusButton";
import React from 'react';
import { DatePicker, Button } from 'antd';
import Pagination from "../../components/Pagination";
import AdminNav from "../../layouts/AdminNav"
const { RangePicker } = DatePicker;

function Subscribe() {
    const [status, setStatus] = useState(STATUS.UNPROCESSED); const toggleStatus = () => { setStatus(status === STATUS.UNPROCESSED ? STATUS.PROCESSED : STATUS.UNPROCESSED); };
    const [planFilter, setPlanFilter] = useState("plan_all");
    const [themeFilter, setThemeFilter] = useState("theme_all");
    const [statusFilter, setStatusFilter] = useState("status_all");
    const [dotsFilter, setDotsFilter] = useState("");

    const planOptions = [
        { label: "全部方案", value: "plan_all" },
        { label: "3個月", value: "3m" },
        { label: "6個月", value: "6m" },
        { label: "12個月", value: "12m" },
    ];
    const themeOptions = [
        { label: "全部主題", value: "theme_all" },
        { label: "精選甜點", value: "featured" },
        { label: "季節限定", value: "seasonal" },
        { label: "在地甜點", value: "local" },
        { label: "異國風味", value: "international" },
        { label: "無負擔甜點", value: "healthy" },
        { label: "素食甜點", value: "vegan" },
    ];
    const statusOptions = [
        { label: "全部狀態", value: "status_all" },
        { label: "未處理", value: "status_pending" },
        { label: "已處理", value: "status_done" },
    ];
    const dotsOptions = [
        { label: "篩選條件", value: "filter_mode" },
        { label: "匯出資料", value: "export_mode" },
    ]

    return (
        <>
            {/* 桌面板 */}
            <main className="bg-neutral-300 overflow-hidden d-lg-block d-none">
                <div className="container mt-11">
                    <ul className="nav d-flex side-menu mb-6">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/admin/order">
                                <span className="underline">訂單管理</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/admin/theme">
                                <span className="underline">主題管理</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link d-flex align-items-center active"
                                aria-current="page"
                                to="/admin/subscribe"
                            >
                                <span className="underline">訂閱管理</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/admin/comment">
                                <span className="underline">評論管理</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/admin/service">
                                <span className="underline">客服管理</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/admin/coupon">
                                <span className="underline">優惠管理</span>
                            </Link>
                        </li>
                    </ul>

                    <h1 className="fs-2 fw-bold ls-1 lh-sm mb-6">訂閱管理</h1>
                    {/* 搜尋 + 篩選 */}
                    <div className="d-flex align-items-center column-gap-3 mb-4">
                        <div className="d-flex align-items-center position-relative">
                            <Icon
                                className="position-absolute text-neutral-600 ms-4"
                                icon="meteor-icons:search"
                                width="20"
                                height="20"
                            />
                            <input
                                className="bg-neutral-200 text-neutral-600 ps-17 pe-4 py-3 border-0 rounded-pill"
                                type="text"
                                placeholder="搜尋訂閱編號或Email"
                            />
                        </div>
                        <div>
                            <RangePicker
                                placeholder={['開始日期', '結束日期']}
                                renderExtraFooter={() => (
                                    <div className="d-flex justify-content-end my-2">
                                        <Button className="bg-primary-600 text-white fs-8 px-2 rounded-1" onClick={() => console.log('OK clicked')}>
                                            OK
                                        </Button>
                                    </div>
                                )}

                                variant="filled"
                                className="custom-range-picker"
                            />
                        </div>
                        <DropdownComponent
                            label="全部方案"
                            options={planOptions}
                            activeValue={planFilter}
                            onSelect={setPlanFilter}
                            variant="default"
                            menuWidth={124}
                        />

                        <DropdownComponent
                            label="全部主題"
                            options={themeOptions}
                            activeValue={themeFilter}
                            onSelect={setThemeFilter}
                            variant="default"
                            menuWidth={124}
                        />

                        <DropdownComponent
                            label="全部狀態"
                            options={statusOptions}
                            activeValue={statusFilter}
                            onSelect={setStatusFilter}
                            variant="default"
                            menuWidth={124}
                        />
                    </div>

                    {/* 表格 */}
                    <div className="p-6 bg-neutral-200 rounded-6 mb-8">
                        <table className="table table-borderless custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">訂單編號</th>
                                    <th scope="col" className="text-center">Email</th>
                                    <th scope="col" className="text-center">訂閱方案</th>
                                    <th scope="col" className="text-center">訂閱主題</th>
                                    <th scope="col" className="text-center">訂閱進度</th>
                                    <th scope="col" className="text-center">狀態</th>
                                    <th scope="col" className="text-center">開始日期</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="divider-row">
                                    <td colSpan="7"></td>
                                </tr>
                                <tr>
                                    <td className="text-center text-semantic-link">
                                        <span className="order-id">SS03BA4756</span>
                                    </td>
                                    <td>manhhac8@gmail.com</td>
                                    <td className="text-center">3個月</td>
                                    <td className="text-center">季節限定甜點盒</td>
                                    <td className="text-center">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <div className="progress sub-progress bg-neutral-400 mb-1" style={{ width: "120px" }} role="progressbar"
                                                aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar" style={{ width: "75%" }}></div>
                                            </div>
                                            <span className="fs-8 fw-medium">2/3</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <StatusButton status={status} onClick={toggleStatus} />
                                    </td>
                                    <td className="text-center">2025-12-01</td>
                                </tr>
                                <tr>
                                    <td className="text-center text-semantic-link">
                                        <span className="order-id">SS03BA4756</span>
                                    </td>
                                    <td>manhhac8@gmail.com</td>
                                    <td className="text-center">3個月</td>
                                    <td className="text-center">季節限定甜點盒</td>
                                    <td className="text-center">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <div className="progress sub-progress bg-neutral-400 mb-1" style={{ width: "120px" }} role="progressbar"
                                                aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar" style={{ width: "75%" }}></div>
                                            </div>
                                            <span className="fs-8 fw-medium">2/3</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <StatusButton status={status} onClick={toggleStatus} />
                                    </td>
                                    <td className="text-center">2025-12-01</td>
                                </tr>
                                <tr>
                                    <td className="text-center text-semantic-link">
                                        <span className="order-id">SS03BA4756</span>
                                    </td>
                                    <td>manhhac8@gmail.com</td>
                                    <td className="text-center">3個月</td>
                                    <td className="text-center">季節限定甜點盒</td>
                                    <td className="text-center">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <div className="progress sub-progress bg-neutral-400 mb-1" style={{ width: "120px" }} role="progressbar"
                                                aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar" style={{ width: "75%" }}></div>
                                            </div>
                                            <span className="fs-8 fw-medium">2/3</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <StatusButton status={status} onClick={toggleStatus} />
                                    </td>
                                    <td className="text-center">2025-12-01</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-center mb-11">
                        <Pagination />
                    </div>
                </div>
            </main>

            {/* 手機板 */}
            <main className="bg-neutral-300 overflow-hidden d-block d-lg-none">
                <AdminNav />
                <div className="container px-3 py-4 mb-17">
                    <div className="d-flex gap-2 mb-4">
                        <div className="d-flex align-items-center position-relative w-100">
                            <Icon
                                className="position-absolute text-neutral-600 ms-4"
                                icon="meteor-icons:search"
                                width="20"
                                height="20"
                            />
                            <input
                                className="bg-neutral-200 text-neutral-600 ps-17 pe-4 py-3 border-0 rounded-pill w-100"
                                type="text"
                                placeholder="搜尋訂閱編號或Email"
                            />
                        </div>
                        <DropdownComponent
                            options={dotsOptions}
                            activeValue={dotsFilter}
                            onSelect={setDotsFilter}
                            variant="dots"
                            menuWidth={84}
                        />
                    </div>
                    <div className="p-6 bg-neutral-200 rounded-5">
                        <div className="d-flex mb-6">
                            <div className="flex-fill">
                                <h3 className="text-neutral-600 fw-bold fs-9 mb-1">訂單編號</h3>
                                <p className="text-neutral-800 fw-bold fs-5 ls-1">SS066T7W9</p>
                            </div>
                            <div className="flex-fill d-flex justify-content-end align-items-end">
                                <div className="rounded-pill bg-primary-200 px-4 py-1">
                                    <p className="text-primary-600 fs-9">未處裡</p>
                                </div>
                            </div>
                        </div>
                        {/* 線條 */}
                        <div className="divider mb-3"></div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <p class="fs-8 text-neutral-600 mb-1">訂閱主題</p>
                                <p class="fs-8 text-neutral-800">無負擔甜點盒</p>
                            </div>
                            <div class="col-6">
                                <p class="fs-8 text-neutral-600 mb-1">期數</p>
                                <p class="fs-8 text-neutral-800">6個月</p>
                            </div>
                        </div>
                        <div class="row mb-6">
                            <div class="col-6">
                                <p class="fs-8 text-neutral-600 mb-1">開始日期</p>
                                <p class="fs-8 text-neutral-800">2025-12-01</p>
                            </div>
                            <div class="col-6">
                                <p class="fs-8 text-neutral-600 mb-1">Email</p>
                                <p class="fs-8 text-neutral-800 text-truncate">nvt.isst.nute@gmail.com</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-neutral-300 rounded-5">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="text-neutral-600 fs-9 fw-medium">服務進度</p>
                                    <p className="text-neutral-800 fs-9 fw-medium">2/3</p>
                                </div>
                                <div>
                                    <div className="progress sub-progress bg-neutral-400 mb-1 w-100" role="progressbar"
                                        aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar" style={{ width: "75%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination />
                </div>

            </main>
        </>
    );
}

export default Subscribe;
