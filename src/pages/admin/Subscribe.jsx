import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import DropdownComponent from "../../components/DropdownComponent";
import { useState } from "react";
import StatusButton, { STATUS } from "../../components/StatusButton";
function Subscribe() {
    const [status, setStatus] = useState(STATUS.UNPROCESSED); const toggleStatus = () => { setStatus(status === STATUS.UNPROCESSED ? STATUS.PROCESSED : STATUS.UNPROCESSED); };
    const [planFilter, setPlanFilter] = useState("plan_all");
    const [themeFilter, setThemeFilter] = useState("theme_all");
    const [statusFilter, setStatusFilter] = useState("status_all");

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

    return (
        <main className="bg-neutral-300 main overflow-hidden">
            <div className="container mt-11">
                {/* 側邊選單 */}
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
                    <div>Date製作中</div>

                    <DropdownComponent
                        label="全部方案"
                        options={planOptions}
                        activeValue={planFilter}
                        onSelect={setPlanFilter}
                    />

                    <DropdownComponent
                        label="全部主題"
                        options={themeOptions}
                        activeValue={themeFilter}
                        onSelect={setThemeFilter}
                    />

                    <DropdownComponent
                        label="全部狀態"
                        options={statusOptions}
                        activeValue={statusFilter}
                        onSelect={setStatusFilter}
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
            </div>
        </main>
    );
}

export default Subscribe;
