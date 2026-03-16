import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusButton, { STATUS } from "../../components/StatusButton";
import React from 'react';
import { DatePicker, Button } from 'antd';
import Pagination from "../../components/Pagination";
import Dropdown from "../../components/Dropdown";
import api from "../../api";


const { RangePicker } = DatePicker;

function Subscribe() {
    const tabs = [
        { label: '主題管理', to: '/topics' },
        { label: '訂閱管理', to: '/admin/subscribe' },
        { label: '訂單管理', to: '/orders' },
        { label: '評論管理', to: '/reviews' },
        { label: '客服管理', to: '/support' },
        { label: '優惠管理', to: '/promotions' },
    ];
    const [themeOptions, setThemeOptions] = useState([
        { label: "全部主題", value: "theme_all" }
    ]);
    const planOptions = [
        { label: "全部方案", value: "plan_all" },
        { label: "3個月", value: 3 },
        { label: "6個月", value: 6 },
        { label: "12個月", value: 12 },
    ];
    const statusOptions = [
        { label: "全部狀態", value: "status_all" },
        { label: "未處理", value: false },
        { label: "已處理", value: true },
    ];
    const [subData, setSubData] = useState([]);
    const [subscriptionOrders, setSubscriptionOrders] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterTheme, setFilterTheme] = useState("theme_all");
    const [filterStatus, setFilterStatus] = useState("status_all");
    const [filterPlan, setFilterPlan] = useState("plan_all");
    const [mode, setMode] = useState(""); // 初始值可依需求
    const [dateRange, setDateRange] = useState([]); // 存開始、結束日期
    const [selectedIds, setSelectedIds] = useState([]);

    const hasFilter =
        dateRange.length > 0 ||
        filterTheme !== "theme_all" ||
        filterStatus !== "status_all" ||
        filterPlan !== "plan_all";


    useEffect(() => {
        api.get("/themes")
            .then(res => {
                console.log("themes:", res.data);
                const options = [
                    { label: "全部主題", value: "theme_all" },
                    ...res.data.map(item => ({
                        label: item.theme_title,
                        value: item.theme_title
                    }))
                ]
                setThemeOptions(options);
                console.log("options:", options);
            })
            .catch(err => console.log("subscriptions error:", err));

        api.get("/subscriptions")
            .then(res => {
                console.log("subscriptions:", res.data); // 加 log
                setSubData(res.data);
            })
            .catch(err => console.log("subscriptions error:", err));

        api.get("/subscription_orders")
            .then(res => {
                console.log("subscription_orders:", res.data); // 加 log
                setSubscriptionOrders(res.data);
            })
            .catch(err => console.log("subscription_orders error:", err));
    }, []);

    const updateSubscription = async (item) => {
        try {
            const res = await api.patch(`/subscriptions/${item.id}`, {
                is_processed: !item.is_processed, // 切換狀態
                updated_at: new Date().toISOString(), // 更新時間
            });

            console.log("updated:", res.data);

            // 更新前端 state
            setSubData((prev) =>
                prev.map((s) => (s.id === item.id ? { ...s, ...res.data } : s))
            );
        } catch (err) {
            console.error("Update failed", err);
        }
    };
    // 計算篩選數量
    const filterCount =
        (dateRange.length > 0 ? 1 : 0) +
        (filterPlan !== "plan_all" ? 1 : 0) +
        (filterTheme !== "theme_all" ? 1 : 0) +
        (filterStatus !== "status_all" ? 1 : 0);

    const dotsOptions = [
        {
            label: filterCount > 0 ? `篩選條件(${filterCount})` : "篩選條件",
            value: "filter_mode",
        },
        { label: "匯出資料", value: "export_mode" },
        ...(filterCount > 0
            ? [{ label: "清除篩選", value: "clear_filter" }]
            : []),
    ];
    const filterDotsOptions = [
        { label: "收合篩選", value: "collapse_filter" },
        { label: "匯出資料", value: "export_mode" },
        ...(filterCount > 0
            ? [{ label: "清除篩選", value: "clear_filter" }]
            : []),
    ];
    // 計算總數（符合篩選的 subData 數量）
    const filteredData = subData.filter(item =>
        (filterTheme === "theme_all" || item.theme_name === filterTheme) &&
        (filterStatus === "status_all" || item.is_processed === filterStatus) &&
        (filterPlan === "plan_all" || item.duration_months === filterPlan) &&
        (
            searchText === "" ||
            item.subscription_no?.toString().includes(searchText) ||
            item.shipping_info.email?.toLowerCase().includes(searchText.toLowerCase())
        ) &&
        (
            dateRange.length === 0 ||
            (new Date(item.start_date) >= dateRange[0].toDate() &&
                new Date(item.start_date) <= dateRange[1].toDate()
            )
        )
    );

    const totalCount = filteredData.length;
    const selectedCount = selectedIds.length;
    return (
        <>
            {/* 桌面板 */}
            <main className="bg-neutral-300 overflow-hidden d-lg-block d-none">
                <div className="container mt-11">
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
                                className="custom-input ps-17 pe-4 py-3 border-0 rounded-pill"
                                type="text"
                                placeholder="搜尋訂閱編號或Email"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div>
                            <RangePicker
                                placeholder={['開始日期', '結束日期']}
                                value={dateRange}
                                onChange={(values) => setDateRange(values || [])}
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
                        <Dropdown options={planOptions} width="w-auto" value={filterPlan} prefix="方案" onChange={(value) => setFilterPlan(value)} />
                        <Dropdown options={themeOptions} width="w-auto" value={filterTheme} prefix="主題" onChange={(value) => setFilterTheme(value)} />
                        <Dropdown options={statusOptions} width="w-auto" value={filterStatus} prefix="狀態" onChange={(value) => setFilterStatus(value)} />
                    </div>

                    {/* 表格 */}
                    <div className="p-6 bg-neutral-200 rounded-6 mb-8">
                        <table className="table table-borderless custom-table">
                            <thead>
                                <tr>
                                    <th scope="col" >訂閱編號</th>
                                    <th scope="col" className="text-center">Email</th>
                                    <th scope="col" className="text-center">訂閱方案</th>
                                    <th scope="col" className="text-center">訂閱主題</th>
                                    <th scope="col" className="text-center">訂閱進度</th>
                                    <th scope="col" className="text-center">狀態</th>
                                    <th scope="col" className="text-center">開始日期</th>
                                </tr>
                                <tr className="divider-row">
                                    <td colSpan="7"></td>
                                </tr>
                            </thead>
                            <tbody>
                                {subData
                                    .filter(item =>
                                        (filterTheme === "theme_all" || item.theme_name === filterTheme) &&
                                        (filterStatus === "status_all" || item.is_processed === filterStatus) &&
                                        (filterPlan === "plan_all" || item.duration_months === filterPlan) &&
                                        (
                                            searchText === "" ||
                                            item.subscription_no?.toString().includes(searchText) ||
                                            item.shipping_info.email?.toLowerCase().includes(searchText.toLowerCase())
                                        ) &&
                                        (
                                            dateRange.length === 0 ||
                                            (new Date(item.start_date) >= dateRange[0].toDate() &&
                                                new Date(item.start_date) <= dateRange[1].toDate()
                                            )
                                        )
                                    )
                                    .map((item) => {
                                        // 計算 subscription_orders 裡相同 subscription_no 的數量
                                        const orderCount = subscriptionOrders.filter(
                                            order => order.subscription_no === item.subscription_no
                                        ).length;

                                        // 計算進度百分比
                                        const progressPercent = Math.round((orderCount / item.duration_months) * 100);

                                        return (
                                            <tr key={item.id}>
                                                <td className="text-start text-semantic-link">
                                                    <NavLink to={`/admin/subscribeDetail/${item.subscription_no}`}>
                                                        <span className="order-id">{item.subscription_no}</span>
                                                    </NavLink>
                                                </td>
                                                <td>{item.shipping_info.email}</td>
                                                <td className="text-center">{item.duration_months}個月</td>
                                                <td className="text-center">{item.theme_name}</td>
                                                <td className="text-center">
                                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <div
                                                            className="progress sub-progress bg-neutral-400 mb-1"
                                                            style={{ width: "120px" }}
                                                            role="progressbar"
                                                            aria-label="Basic example"
                                                            aria-valuenow={progressPercent}
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                        >
                                                            <div
                                                                className="progress-bar"
                                                                style={{ width: `${progressPercent}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="fs-8 fw-medium">
                                                            {orderCount}/{item.duration_months}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <StatusButton
                                                        status={item.is_processed ? STATUS.PROCESSED : STATUS.UNPROCESSED}
                                                        onClick={() => updateSubscription(item)}
                                                        variant="desktop"
                                                    />
                                                </td>
                                                <td className="text-center">{item.start_date}</td>
                                            </tr>
                                        );
                                    })}

                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-center mb-11">
                        <Pagination />
                    </div>
                </div>
            </main>

            {/* 手機板 */}
            <main className="bg-neutral-300 d-block d-lg-none pb-9">
                <ul className="container nav px-3 py-2 mb-sm-6 mb-0 nav-subscription gap-2 gap-sm-0 mt-20">
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
                                className="custom-input ps-17 pe-4 py-3 border-0 rounded-pill w-100 fs-8"
                                type="text"
                                placeholder="搜尋訂閱編號或Email"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="position-relative d-inline-block">
                            <Dropdown
                                options={mode === "filter_mode" ? filterDotsOptions : dotsOptions}
                                width="w-auto"
                                variant="dots"
                                value={mode}
                                onChange={(value) => {
                                    setMode(value);

                                    if (value === "clear_filter") {
                                        setDateRange([]);
                                        setFilterPlan("plan_all");
                                        setFilterTheme("theme_all");
                                        setFilterStatus("status_all");
                                    }
                                }}
                            />
                            {filterCount > 0 && (
                                <span className="position-absolute rounded-circle filterBadge">
                                    {filterCount}
                                </span>

                            )}
                        </div>
                    </div>
                    {mode === "filter_mode" && (
                        <div className="d-flex flex-column gap-2 mb-4">
                            <div className="d-flex gap-2">
                                <RangePicker
                                    placeholder={['開始日期', '結束日期']}
                                    value={dateRange}
                                    onChange={(values) => setDateRange(values || [])}
                                    renderExtraFooter={() => (
                                        <div className="d-flex justify-content-end my-2">
                                            <Button
                                                className="bg-primary-600 text-white fs-8 px-2 rounded-1"
                                                onClick={() => console.log('OK clicked')}
                                            >
                                                OK
                                            </Button>
                                        </div>
                                    )}
                                    variant="filled"
                                    className="custom-range-picker"
                                />
                            </div>

                            <div className="d-flex flex-wrap  align-items-center gap-2">
                                <Dropdown options={planOptions} width="w-auto" value={filterPlan} prefix="方案" onChange={(value) => setFilterPlan(value)} />
                                <Dropdown options={themeOptions} width="w-auto" value={filterTheme} prefix="主題" onChange={(value) => setFilterTheme(value)} />
                                <Dropdown options={statusOptions} width="w-auto" value={filterStatus} prefix="狀態" onChange={(value) => setFilterStatus(value)} />
                                {hasFilter && (
                                    <div className="d-flex align-items-center p-3">
                                        <Icon icon="tabler:trash" width="16" height="16" />
                                        <Button className="bg-transparent text-neutral-800 fs-8 border-0 shadow-none p-0 ms-1"
                                            onClick={() => {
                                                setDateRange([]);
                                                setFilterPlan("plan_all");
                                                setFilterTheme("theme_all");
                                                setFilterStatus("status_all");
                                            }}>
                                            清除篩選
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {mode === "export_mode" && (
                        <div className="bg-neutral-200 d-flex align-items-center justify-content-between px-6 py-4 rounded-5 mb-4">
                            <div className="custom-checkbox d-flex align-items-center gap-4">
                                <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    id="selectAll"
                                    checked={selectedCount === totalCount && totalCount > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedIds(filteredData.map(item => item.id));
                                        } else {
                                            setSelectedIds([]);
                                        }
                                    }}
                                />
                                <label className="form-check-label text-neutral-800 fs-8 fw-bold " htmlFor="selectAll">
                                    選取全部的項目
                                </label>
                            </div>
                            <p className="text-neutral-600 fs-8">{selectedCount}/{totalCount}</p>
                        </div>
                    )}

                    <div className="d-flex flex-column gap-4">
                        {subData
                            .filter(item =>
                                (filterTheme === "theme_all" || item.theme_name === filterTheme) &&
                                (filterStatus === "status_all" || item.is_processed === filterStatus) &&
                                (filterPlan === "plan_all" || item.duration_months === filterPlan) &&
                                (
                                    searchText === "" ||
                                    item.subscription_no?.toString().includes(searchText) ||
                                    item.shipping_info.email?.toLowerCase().includes(searchText.toLowerCase())
                                ) &&
                                (
                                    dateRange.length === 0 ||
                                    (new Date(item.start_date) >= dateRange[0].toDate() &&
                                        new Date(item.start_date) <= dateRange[1].toDate()
                                    )
                                )
                            )
                            .map((item) => {
                                // 計算 subscription_orders 裡相同 subscription_no 的數量
                                const orderCount = subscriptionOrders.filter(
                                    order => order.subscription_no === item.subscription_no
                                ).length;

                                // 計算進度百分比
                                const progressPercent = Math.round((orderCount / item.duration_months) * 100);

                                return (
                                    <div className="p-6 bg-neutral-200 rounded-5" key={item.id}>
                                        <div className="d-flex mb-6">
                                            {mode === "export_mode" && (
                                                <div className="custom-checkbox d-flex align-items-center me-4">
                                                    <input
                                                        className="form-check-input mt-0"
                                                        type="checkbox"
                                                        id={"order_" + item.id}
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedIds(prev => [...prev, item.id]);
                                                            } else {
                                                                setSelectedIds(prev => prev.filter(id => id !== item.id));
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-fill">
                                                <h3 className="text-neutral-600 fw-bold fs-9 mb-1">訂閱編號</h3>
                                                <p className="text-neutral-800 fw-bold fs-5 ls-1">{item.subscription_no}</p>
                                            </div>
                                            <StatusButton
                                                status={item.is_processed ? STATUS.PROCESSED : STATUS.UNPROCESSED}
                                                onClick={() => updateSubscription(item)}
                                                variant="mobile"
                                            />


                                        </div>
                                        {/* 線條 */}
                                        <div className="divider mb-3"></div>
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <p className="fs-8 text-neutral-600 mb-1">訂閱主題</p>
                                                <p className="fs-8 text-neutral-800">{item.theme_name}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="fs-8 text-neutral-600 mb-1">期數</p>
                                                <p className="fs-8 text-neutral-800">{item.duration_months}個月</p>
                                            </div>
                                        </div>
                                        <div className="row mb-6">
                                            <div className="col-6">
                                                <p className="fs-8 text-neutral-600 mb-1">開始日期</p>
                                                <p className="fs-8 text-neutral-800">{item.start_date}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="fs-8 text-neutral-600 mb-1">Email</p>
                                                <p className="fs-8 text-neutral-800 text-truncate">{item.shipping_info.email}</p>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 bg-neutral-300 rounded-5">
                                            <div className="d-flex flex-column">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <p className="text-neutral-600 fs-9 fw-medium">服務進度</p>
                                                    <p className="text-neutral-800 fs-9 fw-medium">{orderCount}/{item.duration_months}</p>
                                                </div>
                                                <div>
                                                    <div className="progress sub-progress bg-neutral-400 mb-1 w-100" role="progressbar"
                                                        aria-label="Basic example" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                    </div>


                </div>
                <div className="d-flex justify-content-center">
                    <Pagination />
                </div>
            </main>
            {mode === "export_mode" && selectedCount > 0 && (
                <div className="d-flex justify-content-between align-items-center mobile-button-bar p-6">
                    <div className="d-flex align-items-center">
                        <div className="textBadge bg-neutral-800 rounded-circle me-2">
                            {selectedCount}
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <p className="text-neutral-600 fw-bold fs-9">已選取</p>
                            <p className="text-neutral-800 fs-8">筆資料</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn fw-bold text-neutral-100 bg-CTA-200 save-button"
                    >
                        匯出 CSV
                    </button>
                </div>
            )}
        </>
    );
}

export default Subscribe;
