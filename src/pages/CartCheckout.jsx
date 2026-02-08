import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import 'iconify-icon';
import { useState } from "react";
import taiwanData from "../assets/utils/taiwanDistricts.json";

// 信用卡效期
const currentYear = new Date().getFullYear();
const creditCardYears = Array.from({ length: 11 }, (_, i) => currentYear + i);
const creditCardMonths = Array.from({ length: 12 }, (_, i) => i + 1);

// 發票類型
const invoiceOpts = [
    { label: '請選擇發票類型', value: 'default' },
    { label: '會員載具(自動儲存)', value: 'member' },
    { label: '手機條碼', value: 'mobile' },
    { label: '捐贈發票', value: 'donation' },
    { label: '不使用載具', value: 'na' },
    { label: '公司戶發票(開立抬頭)', value: 'business' }
];

function CartCheckout() {
    // 地址
    const [selectedCity, setSelectedCity] = useState("城市");
    const [selectedDistrict, setSelectedDistrict] = useState("鄉鎮市區");
    const cities = Object.keys(taiwanData["台灣"]);
    const districts = selectedCity !== "城市" ? Object.keys(taiwanData["台灣"][selectedCity]) : [];
    const handleCityChange = (city) => {
        setSelectedCity(city);
        setSelectedDistrict("鄉鎮市區"); // 切換城市時，重設district預設值
    };

    //信用卡效期
    const [selectedExpMonth, setSelectedExpMonth] = useState("月份");
    const [selectedExpYear, setSelectedExpYear] = useState("年份");

    // 發票
    const [selectedInvoice, setSelectedInvoice] = useState('default');
    const currentInvoiceLabel = invoiceOpts.find(opt => opt.value === selectedInvoice)?.label;

    // 訂單備註字數
    const [noteText, setNoteText] = useState("");

    //訂單備註快選
    const [selectedChips, setSelectedChips] = useState([]);
    const quickNoteChips = [
        '請在下午送達。', '請直接放門口。', '請放管理室。', '請提前來電。', '對堅果過敏。', '對花生過敏。'
    ]
    const toggleChip = (chip) => {
        if (selectedChips.includes(chip)) {
            setSelectedChips(selectedChips.filter(item => item !== chip));
        } else {
            setSelectedChips([...selectedChips, chip]);
        }
    };

    // 訂購清單
    const orderList = [
        {
            theme_title: '季節限定甜點盒',
            duration_months: 12,
            price: 675,
            quantity: 3,
            imageUrl: './images/Cart_Page/pic_season.jpg'
        },
        {
            theme_title: '精選甜點盒',
            duration_months: 12,
            price: 675,
            quantity: 2,
            imageUrl: './images/Cart_Page/pic_feature.jpg'
        },
        {
            theme_title: '無負擔甜點盒',
            duration_months: 3,
            price: 720,
            quantity: 1,
            imageUrl: './images/Cart_Page/pic_health.jpg'
        }
    ]

    return (<>
        <Header />
        <div className="bg-neutral-300 cart-body">
            <div className="cart-main">
                <ol
                    className="stepper mx-auto d-flex justify-content-center align-items-center"
                >
                    <li className="step-item d-flex flex-column align-items-center active">
                        <div className="step mb-2">1</div>
                        <span className="step-intro">購物車</span>
                    </li>
                    <li className="step-item d-flex flex-column align-items-center active">
                        <div className="step mb-2">2</div>
                        <span className="step-intro">填寫資料</span>
                    </li>
                    <li className="step-item d-flex flex-column align-items-center">
                        <div className="step mb-2">3</div>
                        <span className="step-intro">訂單確認</span>
                    </li>
                </ol>
                <form className="container px-3 p-lg-0">
                    <div
                        className="d-flex justify-content-between align-items-center mb-2 mb-lg-6">
                        <h1 className="cart-title p-3 py-lg-2 px-lg-4">填寫資料</h1>
                        <a href="/Cart" className="btn py-3 px-4 px-lg-8 border-0 btn-shopping">返回購物車</a>
                    </div>
                    <div className="row mx-0 mx-sm-n3">
                        <div className="col-lg-8 px-0 px-lg-4 mb-2 mb-lg-0">
                            {/* 收件資料 */}
                            <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                <h2 className="cart-section-title mb-6">收件資料</h2>
                                <div className="mb-4 mb-lg-6">
                                    <div className="d-flex justify-content-between align-items-center px-2">
                                        <label htmlFor="shipping_name" className="form-label">姓名</label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input rounded-5"
                                                type="checkbox"
                                                id="sync_member_data"
                                                name="sync_member_data"
                                            />
                                            <label className="form-check-label s-text" htmlFor="sync_member_data">
                                                帶入會員資料
                                            </label>
                                        </div>
                                    </div>
                                    <div className="input-group form-group-filled">
                                        <span className="input-group-text text-neutral-600">
                                            <iconify-icon icon="material-symbols:person-outline-rounded" width="20" height="20"></iconify-icon>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control ps-1"
                                            placeholder="請輸入真實姓名"
                                            id="shipping_name"
                                            aria-label="收件者姓名"
                                            name="shipping_name"
                                        />
                                    </div>
                                    {/*錯誤訊息 */}
                                    <div className="px-2 error-message text-semantic-error">
                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon> 請輸入收件人姓名。
                                    </div>
                                </div>
                                <div className="mb-4 mb-lg-6">
                                    <label htmlFor="shipping_phone" className="form-label px-2">電話</label>
                                    <div className="input-group form-group-filled">
                                        <span className="input-group-text text-neutral-600">
                                            <iconify-icon icon="bx:phone" width="20" height="20"></iconify-icon>
                                        </span>
                                        <input
                                            type="tel"
                                            pattern="[0-9]*"
                                            className="form-control ps-1"
                                            placeholder="請輸入電話號碼"
                                            id="shipping_phone"
                                            aria-label="收件者電話號碼"
                                            name="shipping_phone"
                                            maxlength={10}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                            }}
                                        />
                                    </div>
                                    {/*錯誤訊息 */}
                                    <div className="px-2 error-message text-semantic-error">
                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                        電話格式不正確。
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="shipping_city" className="form-label px-2">地址</label>
                                    <div className="row g-3 mb-3">
                                        <div className="col-6">
                                            <div className="dropdown cart-dropdown">
                                                <button className="btn  d-flex align-items-center p-3" type="button" id="shipping_city"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span>{selectedCity}</span>
                                                    <iconify-icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></iconify-icon>
                                                </button>
                                                <ul className="dropdown-menu m-0 custom-dropdown" aria-labelledby="dropdownMenu" style={{ maxHeight: '256px' }}>
                                                    {cities.map((city) => (
                                                        <li key={city}>
                                                            <button
                                                                className={`dropdown-item ${selectedCity === city ? 'active' : ''}`}
                                                                type="button"
                                                                onClick={() => handleCityChange(city)}
                                                            >
                                                                {city}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {/*錯誤訊息 */}
                                            <div className="px-2 error-message text-semantic-error">
                                                <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                請選擇城市。
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="dropdown cart-dropdown">
                                                <button className="btn  d-flex align-items-center p-3 "  type="button" id="shipping_district"
                                                    data-bs-toggle="dropdown" aria-expanded="false" disabled={selectedCity === "城市"}>
                                                    <span>{selectedDistrict}</span>
                                                    <iconify-icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></iconify-icon>
                                                </button>
                                                <ul className="dropdown-menu m-0 custom-dropdown" aria-labelledby="dropdownMenu" style={{maxHeight:'253px'}}>
                                                    {districts.map((dist) => (
                                                        <li key={dist}>
                                                            <button
                                                                className={`dropdown-item ${selectedDistrict === dist ? 'active' : ''}`}
                                                                type="button"
                                                                onClick={() => setSelectedDistrict(dist)}
                                                            >
                                                                {dist}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {/*錯誤訊息 */}
                                            <div className="px-2 error-message text-semantic-error">
                                                <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                請選擇鄉鎮市區。
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group form-group-filled">
                                        <span className="input-group-text text-neutral-600">
                                            <iconify-icon icon="mi:location" width="20" height="20"></iconify-icon>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control ps-1"
                                            placeholder="請輸入地址"
                                            id="shipping_address"
                                            aria-label="收件者地址"
                                            name="shipping_address"
                                        />
                                    </div>
                                    {/*錯誤訊息 */}
                                    <div className="px-2 error-message text-semantic-error">
                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon> 請輸入地址。
                                    </div>
                                </div>
                            </section>

                            {/* 付款資料 */}
                            <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                <h2 className="cart-section-title mb-6">付款資料</h2>
                                <div className="mb-4 mb-lg-6">
                                    <div className="d-flex justify-content-between align-items-center px-2">
                                        <label htmlFor="shipping_name" className="form-label">信用卡卡號</label>
                                        <div className="d-flex">
                                            <iconify-icon className="me-3" icon="logos:visaelectron" width="35.93" height="16"></iconify-icon>
                                            <iconify-icon className="me-3" icon="logos:mastercard" width="20.59" height="16"></iconify-icon>
                                            <iconify-icon icon="logos:jcb" width="20.69" height="16"></iconify-icon>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="input-group form-group-filled">
                                            <span className="input-group-text text-neutral-600">
                                                <iconify-icon icon="tabler:credit-card" width="20" height="20"></iconify-icon>
                                            </span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className="form-control ps-1"
                                                placeholder="0000-0000-0000-0000"
                                                id="credit-card-number"
                                                aria-label="信用卡卡號"
                                                name="credit-card-number"
                                                maxLength={16}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                                }}
                                            />
                                        </div>
                                        {/*錯誤訊息 */}
                                        <div className="px-2 error-message text-semantic-error">
                                            <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                            請輸入完整信用卡卡號。
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 mb-lg-6">
                                    <label htmlFor="credit-card-owner" className="form-label px-2">持卡人姓名</label>
                                    <div className="input-group form-group-filled">
                                        <span className="input-group-text text-neutral-600">
                                            <iconify-icon icon="material-symbols:person-outline-rounded" width="20" height="20"></iconify-icon>                                           </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入卡片上的英文姓名"
                                            id="credit-card-owner"
                                            aria-label="信用卡卡號"
                                            name="credit-card-owner"
                                        />
                                    </div>
                                    {/*錯誤訊息 */}
                                    <div className="px-2 error-message text-semantic-error">
                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                        請輸入持卡人英文姓名。
                                    </div>
                                </div>
                                <div className="mb-4 mb-lg-6">

                                    <div className="row g-3">
                                        <div className="col-lg-6">
                                            <label htmlFor="" className="form-label px-2">有效期限</label>
                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <div className="dropdown cart-dropdown">
                                                        <button className="btn  d-flex align-items-center p-3" type="button" id="expired-month"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span>{selectedExpMonth === "月份" ? "月份" : `${selectedExpMonth}月`}</span>
                                                            <iconify-icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></iconify-icon>
                                                        </button>
                                                        <ul className="dropdown-menu m-0 custom-dropdown" aria-labelledby="dropdownMenu" style={{ maxHeight: '253px' }}>
                                                            {creditCardMonths.map(month => (
                                                                <li key={month}>
                                                                    <button className={`dropdown-item ${selectedExpMonth === month ? 'active' : ''}`}
                                                                        type="button" onClick={() => setSelectedExpMonth(month)}>
                                                                        {month}月
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {/*錯誤訊息 */}
                                                    <div className="px-2 error-message text-semantic-error">
                                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                        請選擇月份。
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="dropdown cart-dropdown">
                                                        <button className="btn  d-flex align-items-center p-3" type="button" id="expired-year"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span>{selectedExpYear === "年份" ? "年份" : `${selectedExpYear}年`}</span>
                                                            <iconify-icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></iconify-icon>
                                                        </button>
                                                        <ul className="dropdown-menu m-0 custom-dropdown" aria-labelledby="dropdownMenu" style={{ maxHeight: '253px' }}>
                                                            {creditCardYears.map(year => (
                                                                <li key={year}>
                                                                    <button className={`dropdown-item ${selectedExpYear === year ? 'active' : ''}`}
                                                                        type="button" onClick={() => setSelectedExpYear(year)}>
                                                                        {year}年
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {/*錯誤訊息 */}
                                                    <div className="px-2 error-message text-semantic-error">
                                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                        請選擇年份。
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-6">
                                            <label htmlFor="card-cvv" className="form-label px-2">安全碼</label>
                                            <div className=" input-group form-group-filled">
                                                <span className="input-group-text text-neutral-600">
                                                    <iconify-icon icon="lets-icons:lock" width="20" height="20"></iconify-icon>
                                                </span>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    className="form-control ps-1"
                                                    placeholder="CVV"
                                                    id="card-cvv"
                                                    aria-label="安全碼"
                                                    name="card-cvv"
                                                    maxLength={3}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                                    }}
                                                />
                                            </div>
                                            {/*錯誤訊息 */}
                                            <div className="px-2 error-message text-semantic-error">
                                                <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                請輸入正確的安全碼。
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input rounded-5"
                                        type="checkbox"
                                        id="save_card_info"
                                        name="save_card_info"
                                    />
                                    <label className="form-check-label s-text" htmlFor="save_card_info">
                                        記住此卡片資訊以提供下次使用
                                    </label>
                                </div>
                            </section>

                            {/* 索取發票 */}
                            <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                <h2 className="cart-section-title mb-6">索取發票</h2>
                                <label htmlFor="shipping_city" className="form-label px-2">發票類型</label>

                                <div className="dropdown cart-dropdown">
                                    <button className="btn d-flex align-items-center p-3" type="button" data-bs-toggle="dropdown"
                                    // aria-expanded="false" id="shipping_city"
                                    >
                                        <span>{currentInvoiceLabel}</span>
                                        <iconify-icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></iconify-icon>
                                    </button>
                                    <ul className="dropdown-menu m-0 custom-dropdown" aria-labelledby="dropdownMenu" style={{ maxHeight: '256px' }}>
                                        {invoiceOpts.map((opt) => (
                                            <li key={opt.value}>
                                                <button
                                                    className={`dropdown-item ${selectedInvoice === opt.value ? 'active' : ''}`}
                                                    type="button"
                                                    onClick={() => setSelectedInvoice(opt.value)}
                                                >
                                                    {opt.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/*錯誤訊息 */}
                                <div className="px-2 error-message text-semantic-error">
                                    <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                    請選擇發票類型
                                </div>


                                {/* 會員載具提示 */}
                                {selectedInvoice === 'member' && (
                                    <p className="px-2 s-text text-neutral-600 fs-8 mt-2">發票將自動儲存至您的會員帳戶</p>
                                )}

                                {/* 手機條碼 */}
                                {selectedInvoice === 'mobile' && (
                                    <div className="mt-4">
                                        <label htmlFor="invoice_carrier" className="form-label px-2">手機條碼</label>
                                        <div className="input-group form-group-filled">
                                            <span className="input-group-text text-neutral-600">
                                                <iconify-icon icon="mdi:cellphone" width="20" height="20"></iconify-icon>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control ps-1"
                                                placeholder="例：/ABC1234"
                                                maxlength={8}
                                                id="invoice_carrier"
                                                name="invoice_carrier"
                                            />
                                        </div>
                                        {/*錯誤訊息 */}
                                        <div className="px-2 error-message text-semantic-error">
                                            <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                            條碼格式不正確（例：/ABC1234）
                                        </div>
                                    </div>
                                )}

                                {/* 捐贈發票 */}
                                {selectedInvoice === 'donation' && (
                                    <div className="mt-4">
                                        <label htmlFor="donate_code" className="form-label px-2">捐贈碼</label>
                                        <div className="input-group form-group-filled">
                                            <span className="input-group-text text-neutral-600">
                                                <iconify-icon icon="humbleicons:heart" width="20" height="20"></iconify-icon>
                                            </span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className="form-control ps-1"
                                                placeholder="例：919"
                                                id="donate_code"
                                                name="donate_code"
                                                maxLength={7}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                                }}
                                            />
                                        </div>
                                        {/*錯誤訊息 */}
                                        <div className="px-2 error-message text-semantic-error">
                                            <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                            請輸入慈善機構愛心碼
                                        </div>
                                    </div>
                                )}

                                {/* 不使用載具 */}
                                {selectedInvoice === 'na' && (
                                    <p className="px-2 s-text text-neutral-600 fs-8 mt-2">將開立電子發票證明聯</p>
                                )}

                                {/* 公司戶發票 (包含多個欄位) */}
                                {selectedInvoice === 'business' && (
                                    <div className="mt-4 d-flex flex-column gap-4">
                                        <div>
                                            <label htmlFor="invoice_company_name" className="form-label px-2">公司名稱(發票抬頭)</label>
                                            <div className="input-group form-group-filled">
                                                <span className="input-group-text text-neutral-600">
                                                    <iconify-icon icon="fluent:building-multiple-16-regular" width="20" height="20"></iconify-icon>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control ps-1"
                                                    placeholder="例：○○有限公司"
                                                    id="invoice_company_name"
                                                    name="invoice_company_name"
                                                />
                                            </div>
                                            {/*錯誤訊息 */}
                                            <div className="px-2 error-message text-semantic-error">
                                                <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                請輸入公司名稱
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="invoice_tax_id" className="form-label px-2">統一編號</label>
                                            <div className="input-group form-group-filled">
                                                <span className="input-group-text text-neutral-600">
                                                    <iconify-icon icon="jam:hashtag" width="20" height="20"></iconify-icon>
                                                </span>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    className="form-control ps-1"
                                                    placeholder="例：40595252"
                                                    id="invoice_tax_id"
                                                    name="invoice_tax_id"
                                                    maxLength={8}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                                    }}
                                                />
                                            </div>
                                            {/*錯誤訊息 */}
                                            <div className="px-2 error-message text-semantic-error">
                                                <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                請輸入統一編號
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="invoice_company_email" className="form-label px-2">收件信箱</label>
                                            <div className="input-group form-group-filled">
                                                <span className="input-group-text text-neutral-600">
                                                    <iconify-icon icon="eva:email-outline" width="20" height="20"></iconify-icon>
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control ps-1"
                                                    placeholder="例：example@company.com"
                                                    id="invoice_company_email"
                                                    name="invoice_company_email"
                                                />
                                            </div>
                                            {/*錯誤訊息 */}
                                            <div className="px-2 error-message text-semantic-error">
                                                <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                                信箱格式不正確
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </section>

                            {/* 訂單備註 */}
                            <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                <h2 className="cart-section-title mb-6">訂單備註</h2>
                                <div className="mb-4 mb-lg-6">
                                    <div className="form-group-filled note-group">
                                        <textarea
                                            id="order_note"
                                            className="form-control mb-3"
                                            placeholder="有什麼想告訴我們的嗎？"
                                            maxLength={200}
                                            value={noteText}
                                            onChange={(e) => setNoteText(e.target.value)}
                                        />
                                        <div className="note-count text-end text-neutral-600">
                                            <span className="current-count">{noteText.length}</span>
                                            <span className="total-count"> / 200</span>
                                        </div>
                                    </div>
                                    {/*錯誤訊息 */}
                                    <div className="px-2 error-message text-semantic-error">
                                        <iconify-icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></iconify-icon>
                                        備註內容過長，請精簡至200字以內。
                                    </div>
                                </div>
                                {/* 快選備註 */}
                                <div className="order-note d-flex flex-wrap gap-2">
                                    {quickNoteChips.map((chip, index) => (
                                        <button className={`btn btn-chip lh-sm ${selectedChips.includes(chip) ? 'active' : ''}`}
                                            type="button" key={index} onClick={() => toggleChip(chip)}>
                                            <iconify-icon className="me-1" icon="ic:round-plus" width="16" height="16"></iconify-icon>
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-4 px-0 px-lg-3">
                            <section className="cart-panel py-4 px-3 p-lg-8 mb-2 mb-lg-6">
                                <h2 className="cart-section-title mb-3 mb-lg-6">訂單明細</h2>
                                <div className="px-2 px-lg-0 mb-0 mb-sm-6">
                                    <ul className="fs-8 order-list mb-6">
                                        {orderList.map((item, index) => (
                                            <li key={index} className="py-2 mb-3 d-flex text-neutral-800">
                                                <div className="flex-shrink-0 me-1 me-lg-2 align-self-lg-center">
                                                    <img
                                                        className="order-img rounded-2 bg-secondary d-inline-block"
                                                        src={item.imageUrl}
                                                        alt={item.theme_title}
                                                    />
                                                </div>
                                                <div className="px-2 flex-grow-1 d-flex flex-column justify-content-center">
                                                    <div className="fw-bold mb-1 text-neutral-800">{item.theme_title}</div>
                                                    <div>
                                                        <span>{item.duration_months}個月訂閱方案</span>
                                                        <span className="d-none d-lg-inline"> · </span>
                                                        <span className="d-block d-lg-inline">NT${item.price} / 盒</span>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 text-end px-2 ms-2 align-self-end">
                                                    <div className="mb-lg-1">x {item.quantity}</div>
                                                    <div className="fw-bold text-neutral-800">
                                                        ${(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="lh-base pb-6 mb-6 border-bottom border-neutral-400">
                                        <p
                                            className="d-flex justify-content-between align-items-center mb-2"
                                        >
                                            <span>小計</span><span>NT$6,190</span>
                                        </p>
                                        <p className="d-flex justify-content-between align-items-center">
                                            <span>折扣</span><span className="text-cta-200">- NT$175</span>
                                        </p>
                                    </div>
                                    <p
                                        className="d-flex justify-content-between align-items-center lh-sm ls-1 fw-bold"
                                    >
                                        <span>合計</span><span className="fs-5 lh-base ls-1">NT$6,015</span>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-primary-text w-100 d-none d-sm-block"
                                >
                                    確認支付並下單
                                </button>
                            </section>
                            <section className="py-4 px-3 p-lg-8 cart-notice">
                                <h3 className="mb-3 mb-lg-4">購物須知</h3>
                                <ol>
                                    <li className="mb-2">
                                        註冊會員即可獲得 NT$100
                                        入會購物金，立即加入會員，享受專屬優惠！
                                    </li>
                                    <li className="mb-2">
                                        台灣地區訂單將於 7–10 個工作日
                                        出貨（週末及國定假日順延）。如商品頁面標示為「預購商品」，則依照該頁公告日期出貨。
                                    </li>
                                    <li>
                                        若選擇超商取貨，單筆訂單商品總重量若超過 5
                                        公斤（超過超商收貨限制），系統將自動為您拆單寄出，敬請留意。
                                    </li>
                                </ol>
                            </section>
                        </div>
                    </div>
                </form>
                <div className="checkout-btn d-block d-sm-none">
                    <button type="button" className="btn-primary-text w-100">確認支付並下單</button>
                </div>
            </div>
        </div>
        <Footer />
    </>)
}

export default CartCheckout