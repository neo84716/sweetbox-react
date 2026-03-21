import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch, Controller } from "react-hook-form";
import api from "../api";
import { message } from "antd";
import taiwanData from "../assets/utils/taiwanDistricts.json";
import { creditCardYears, creditCardMonths, invoiceOpts } from "../assets/utils/formOptions";
import Input from "../components/Input";
import Select from "../components/Select";
import { formatCardNumber, getCardType } from "../assets/utils/paymentUtils";
import InvoiceSection from "../components/InvoiceSection";
import FormError from "../components/FormError";

function CartCheckout() {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, getValues, control, trigger, formState: { errors }
    } = useForm({ mode: 'onTouched' });

    const generateSubNumber = (themeId, durationMonths) => {
        const theme = themes.find(t => t.id.toString() === themeId.toString());
        const abbr = theme ? theme.theme_title_abbr : "XX";
        const durationStr = String(durationMonths).padStart(2, '0'); // 期數補齊兩碼
        // 產生 6 碼隨機英文數字(大寫)
        const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase().padEnd(6, '0');

        return `${abbr}${durationStr}${randomStr}`;
    };
    const onSubmit = async (formData) => {
        //取得當前購物車的商品與金額
        const currentCart = cartData[0];
        if (!currentCart || !currentCart.items || currentCart.items.length === 0) {
            message.warning("您的購物車裡還沒有甜點呢！");
            navigate('/cartEmpty');
            return;
        }
        message.loading({ content: '安全連線中，正在處理訂閱...', key: 'checkout' });

        try {
            const createdSubscriptions = [];
            const todayStr = new Date().toISOString().split('T')[0]; // 取得 YYYY-MM-DD
            // 跑迴圈處理每筆購物車內的商品
            for (const item of currentCart.items) {
                const matchedTheme = themes.find(t => t.id.toString() === item.theme_id.toString());
                const themeName = matchedTheme?.theme_title;
                const originalPrice = matchedTheme?.price || 0;
                const subNo = generateSubNumber(item.theme_id, item.duration_months);
                const matchedPlan = matchedTheme?.theme_plans?.find(p => p.duration_months === item.duration_months);
                const discountedPrice = matchedPlan?.price || item.price;

                // 產生第一期訂單編號 (母編號 + 01)
                const firstOrderNo = `${subNo}01`;
                const sharedTransactionId = `TRANS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

                // ==========================================
                // 1.subscription 資料處理
                // ==========================================
                // 結束日期
                const endObj = new Date(todayStr);
                endObj.setMonth(endObj.getMonth() + item.duration_months - 1);
                const endDateStr = endObj.toISOString().split('T')[0];
                // 下次付款日
                const nextPayObj = new Date(todayStr);
                nextPayObj.setMonth(nextPayObj.getMonth() + 1);
                const nextPaymentStr = nextPayObj.toISOString().split('T')[0];
                // 抓郵遞區號
                const { shipping_city: city, shipping_district: district } = formData;
                const postalCodeStr = taiwanData["台灣"]?.[city]?.[district]?.postalCode || "";

                const subscriptionPayload = {
                    user_id: 1,
                    theme_id: Number(item.theme_id),
                    theme_name: themeName,
                    subscription_no: subNo,
                    duration_months: item.duration_months,
                    quantity: item.quantity,
                    original_price: originalPrice,
                    discounted_price: discountedPrice,
                    start_date: todayStr,
                    end_date:endDateStr,
                    next_payment_date:nextPaymentStr,
                    status: "active",
                    is_processed:false,
                    subscription_note: formData.subscription_note || "",
                    card_info: {
                        token: `tok_${Math.random().toString(36).substring(2, 11)}`,
                        type: getCardType(formData['credit-card-number']),
                        last_four: formData['credit-card-number'].slice(-4),
                        updated_at:todayStr,
                        expired_month: formData.expired_month,
                        expired_year:formData.expired_year
                    },
                    shipping_info: {
                        postalCode: postalCodeStr,
                        name: formData.shipping_name,
                        phone: formData.shipping_phone,
                        city:city,
                        district: district,
                        street: formData.shipping_address,
                        email:`${ (formData.shipping_name).trim().replace(/\s+/g, '_').toLowerCase() }@example.com`
                    },
                    invoice_info: {
                        type: formData.invoice_type,
                        carrier: formData.invoice_carrier || "",
                        tax_id: formData.invoice_tax_id || "",
                        company_name: formData.invoice_company_name || "",
                        company_email: formData.invoice_company_email || "",
                        donate_code: formData.donate_code || ""
                    }
                };

                // =============================================
                // 2. subscription_orders (第一期訂單) 資料處理
                // =============================================
                const firstOrderPayload = {
                    subscription_no: subNo,
                    order_no: firstOrderNo,
                    transaction_id: sharedTransactionId, // 模擬金流交易序號
                    amount: discountedPrice * item.quantity,
                    created_at: new Date().toISOString(),
                    due_date: todayStr,            
                    payment_status: 1,             // 模擬已付款
                    payment_date: todayStr,
                    shipping_status: 1,            // 未出貨
                    shipping_date: null,
                    invoice: {
                        number: `AB-${Math.floor(Math.random() * 100000000)}`, // 模擬產生一張發票號碼
                        date: new Date().toISOString(),
                        file_url:null
                    },
                    is_archived: false
                };
                // 先產生訂閱訂單ID
                const subRes = await api.post('/subscriptions', subscriptionPayload);
                const createdSubscription = subRes.data;
                const orderRes = await api.post('/subscription_orders', firstOrderPayload);
                const createdOrderId = orderRes.data.id;
                
                // =============================================
                // 3. payments 資料處理
                // =============================================
                const paymentPayload = {
                    subscription_order_id: createdOrderId, 
                    transaction_id: sharedTransactionId,   
                    amount: discountedPrice * item.quantity,
                    status: "success",
                    card_type: getCardType(formData['credit-card-number']),
                    created_at: new Date().toISOString(),
                    gateway_status: null,
                    error_code: null,
                    error_message: null
                };

                await api.post('/payments', paymentPayload);

                // 存訂閱資料，交給其他頁
                createdSubscriptions.push(createdSubscription);
            }

            // 結帳後，清空購物車 //開發階段先不清除
            // await api.delete(`/carts/${currentCart.id}`);

            message.success({ content: "訂閱成功！感謝您的支持。", key: 'checkout', duration: 2 });
            navigate('/cartFinish', { state: { subscriptions: createdSubscriptions } });

        } catch (error) {
            console.error("結帳失敗:", error);
            message.error({ content: "處理失敗，請稍後再試。", key: 'checkout', duration: 3 });
        }
    }

    const handleSyncMemberData = async (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            try {
                const res = await api.get("/users/1");
                const userData = res.data;

                setValue("shipping_name", userData.name, { shouldValidate: true });
                setValue("shipping_phone", userData.phone, { shouldValidate: true });
                setValue("shipping_city", userData.address.city, { shouldValidate: true });
                setValue("shipping_district", userData.address.district, { shouldValidate: true });
                setValue("shipping_address", userData.address.street, { shouldValidate: true });
            } catch (error) {
                console.error("取得會員資料失敗：", error);
                message.error("無法帶入會員資料，請稍後再試。");
            }
        } else {
            // 取消勾選，清空欄位
            setValue("shipping_name", "");
            setValue("shipping_phone", "");
            setValue("shipping_city", "");
            setValue("shipping_district", "");
            setValue("shipping_address", "");
        }
    }

    const [cartData, setCartData] = useState([]);
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        api.get("/carts")
            .then(res => {
                const fetchedCart = res.data;
                
                // 防呆：如果沒有購物車 or 購物車空的，導回 '/cart'
                if (!fetchedCart || fetchedCart.length === 0 || !fetchedCart[0].items || fetchedCart[0].items.length === 0) {
                    navigate('/cart');
                } else {
                    setCartData(fetchedCart);
                }
            })
            .catch(err => console.log("取得購物車失敗:", err)); 

        api.get("/themes")
            .then(res => setThemes(res.data))
            .catch(err => console.log("取得主題失敗:", err));

    }, [navigate]);

    // 地址
    const currentCity = watch('shipping_city');
    const cities = Object.keys(taiwanData["台灣"]);
    const districts = currentCity ? Object.keys(taiwanData["台灣"][currentCity]) : [];

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setValue('credit-card-number', formattedValue, { shouldValidate: true });
    }

    // 訂閱備註字數
    const currentNote = watch('subscription_note', '');

    //訂閱備註快選
    const [selectedChips, setSelectedChips] = useState([]);
    const quickNoteChips = [
        '請在下午送達。', '請直接放門口。', '請放管理室。', '請提前來電。', '對堅果過敏。', '對花生過敏。'
    ]
    const toggleChip = (chip) => {
        const currentText = getValues("subscription_note") || "";
        if (selectedChips.includes(chip)) {
            setSelectedChips(selectedChips.filter(item => item !== chip));
            setValue("subscription_note", currentText.replace(chip, ""), { shouldValidate: true });
        } else {
            setSelectedChips([...selectedChips, chip]);
            setValue("subscription_note", currentText + chip, { shouldValidate: true });
        }
    };

    return (
        <>
            <div className="bg-neutral-300 cart-body">
                <div className="cart-main">
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

                    <form id="checkoutForm" className="container px-3 p-lg-0" onSubmit={handleSubmit(onSubmit)}>
                        <div
                            className="d-flex justify-content-between align-items-center mb-2 mb-lg-6">
                            <h1 className="cart-title p-3 py-lg-2 px-lg-4">填寫資料</h1>
                            <Link to="/cart" className="btn py-3 px-4 px-lg-8 border-0 btn-shopping">返回購物車</Link>
                        </div>
                        <div className="row mx-0 mx-sm-n3">
                            <div className="col-lg-8 px-0 px-lg-4 mb-2 mb-lg-0">
                                {/* 收件資料 */}
                                <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                    <h2 className="cart-section-title mb-6">收件資料</h2>
                                    <Input
                                        id='shipping_name'
                                        register={register}
                                        errors={errors}
                                        labelText='姓名'
                                        type='text'
                                        placeholderText='請輸入真實姓名'
                                        ariaLabel='收件者姓名'
                                        iconName='material-symbols:person-outline-rounded'
                                        rules={{
                                            required: {
                                                value: true,
                                                message: '請輸入真實收件人全名。'
                                            }
                                        }}
                                        labelRight={
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input rounded-5"
                                                    type="checkbox"
                                                    id='sync_member_data'
                                                    {...register('sync_member_data', {
                                                        onChange: handleSyncMemberData
                                                    })}
                                                />
                                                <label className="form-check-label s-text" htmlFor='sync_member_data'>
                                                    帶入會員資料
                                                </label>
                                            </div>
                                        }
                                    />
                                    <Input
                                        id='shipping_phone'
                                        register={register}
                                        errors={errors}
                                        labelText='電話'
                                        type='tel'
                                        placeholderText='請輸入電話號碼'
                                        ariaLabel='收件者電話號碼'
                                        iconName='bx:phone'
                                        rules={{
                                            required: {
                                                value: true,
                                                message: '請輸入電話號碼。'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: '至少 6 碼。'
                                            }
                                        }}
                                        // ...rest 部分
                                        maxLength={10}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                        }}
                                    />
                                    <div>
                                        <label htmlFor="shipping_city" className="form-label px-2">地址</label>
                                        <div className="row g-3 mb-3">
                                            <div className="col-6">
                                                <Controller
                                                    name="shipping_city"
                                                    control={control}
                                                    rules={{ required: '請選擇城市' }}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <Select
                                                            id='shipping_city'
                                                            placeholderText='城市'
                                                            options={cities}
                                                            value={value}
                                                            onChange={(val) => {
                                                                onChange(val); // 告訴 RHF 城市換了
                                                                //清空值時，觸發鄉鎮市區「必填」提醒
                                                                setValue('shipping_district', '', { shouldValidate: true }); // 💡 連動防呆：城市切換時，清空鄉鎮市區的值
                                                            }}
                                                            errorMsg={error?.message}
                                                        />
                                                    )}
                                                />
                                                <FormError
                                                    message={errors?.shipping_city?.message}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <Controller
                                                    name="shipping_district"
                                                    control={control}
                                                    rules={{ required: '請選擇鄉鎮市區' }}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <Select
                                                            id='shipping_district'
                                                            placeholderText='鄉鎮市區'
                                                            options={districts}
                                                            value={value}
                                                            onChange={(val) => {
                                                                onChange(val);
                                                                trigger(['shipping_city', 'shipping_district']);
                                                            }}
                                                            disabled={!currentCity} // 防呆：沒選城市，不給選
                                                            errorMsg={error?.message}
                                                        />
                                                    )}
                                                />
                                                <FormError
                                                    message={errors?.shipping_district?.message}
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            id='shipping_address'
                                            register={register}
                                            errors={errors}
                                            wrapperClass='mb-0'
                                            type='text'
                                            placeholderText='請輸入地址'
                                            ariaLabel='收件者地址'
                                            iconName='mi:location'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請輸入地址。'
                                                }
                                            }}
                                        />
                                    </div>
                                </section>
                                {/* 付款資料 */}
                                <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                    <h2 className="cart-section-title mb-6">付款資料</h2>
                                    <Input
                                        id="credit-card-number"
                                        register={register}
                                        errors={errors}
                                        labelText="信用卡卡號"
                                        type="tel"
                                        placeholderText="0000-0000-0000-0000"
                                        ariaLabel="信用卡卡號"
                                        iconName="tabler:credit-card"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: '請輸入信用卡卡號。',
                                            },
                                            minLength: {
                                                value: 19,
                                                message: '信用卡卡號需為 16 碼。',
                                            },
                                            onChange: handleCardNumberChange,
                                        }}
                                        labelRight={
                                            <div className="d-flex">
                                                <Icon
                                                    className="me-3"
                                                    icon="logos:visaelectron"
                                                    width="35.93"
                                                    height="16"
                                                ></Icon>
                                                <Icon
                                                    className="me-3"
                                                    icon="logos:mastercard"
                                                    width="20.59"
                                                    height="16"
                                                ></Icon>
                                                <Icon
                                                    icon="logos:jcb"
                                                    width="20.69"
                                                    height="16"
                                                ></Icon>
                                            </div>
                                        }
                                        // ...rest 部分
                                        maxLength={19}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, ''); // 強制過濾非數字字元
                                        }}
                                    />
                                    <Input
                                        id="credit-card-owner"
                                        register={register}
                                        errors={errors}
                                        labelText="持卡人姓名"
                                        type="text"
                                        placeholderText="請輸入卡片上的英文姓名。"
                                        ariaLabel="持卡人姓名"
                                        iconName="material-symbols:person-outline-rounded"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: '請輸入持卡人英文姓名。',
                                            },
                                        }}
                                    />

                                    <div className="mb-4 mb-lg-6">
                                        <div className="row g-3">
                                            <div className="col-lg-6">
                                                <label htmlFor="" className="form-label px-2">
                                                    有效期限
                                                </label>
                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <Controller
                                                            name="expired_month"
                                                            control={control}
                                                            rules={{
                                                                validate: (val) => {
                                                                    if (!val) return '請選擇效期';

                                                                    const currentYear =
                                                                        getValues('expired_year');
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
                                                                field: { onChange, value },
                                                                fieldState: { error },
                                                            }) => (
                                                                <Select
                                                                    id="expired_month"
                                                                    placeholderText="月份"
                                                                    options={creditCardMonths}
                                                                    value={value}
                                                                    onChange={(val) => {
                                                                        onChange(val);
                                                                        trigger([
                                                                            'expired_month',
                                                                            'expired_year',
                                                                        ]); // 💡 觸發年份與月份的連動驗證
                                                                    }}
                                                                    errorMsg={error?.message}
                                                                    suffix=" 月"
                                                                />
                                                            )}
                                                        />
                                                        <FormError
                                                            message={errors?.expired_month?.message}
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <Controller
                                                            name="expired_year"
                                                            control={control}
                                                            rules={{
                                                                validate: (val) => {
                                                                    if (!val) return '請選擇年份';
                                                                    return true;
                                                                },
                                                            }}
                                                            render={({
                                                                field: { onChange, value },
                                                                fieldState: { error },
                                                            }) => (
                                                                <Select
                                                                    id="expired_year"
                                                                    placeholderText="年份"
                                                                    options={creditCardYears}
                                                                    value={value}
                                                                    onChange={(val) => {
                                                                        onChange(val);
                                                                        trigger([
                                                                            'expired_month',
                                                                            'expired_year',
                                                                        ]);
                                                                    }}
                                                                    errorMsg={error?.message}
                                                                    suffix=" 年"
                                                                />
                                                            )}
                                                        />
                                                        <FormError
                                                            message={errors?.expired_year?.message}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <Input
                                                    id="card-cvv"
                                                    register={register}
                                                    errors={errors}
                                                    labelText="安全碼"
                                                    type="tel"
                                                    placeholderText="CVV"
                                                    ariaLabel="信用卡安全碼"
                                                    iconName="lets-icons:lock"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: '請輸入信用卡安全碼。',
                                                        },
                                                        minLength: {
                                                            value: 3,
                                                            message: '安全碼應為 3 碼。',
                                                        },
                                                    }}
                                                    // ...rest 部分
                                                    maxLength={3}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.replace(
                                                            /\D/g,
                                                            '',
                                                        ); // 強制過濾非數字字元
                                                    }}
                                                />
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
                                        <label
                                            className="form-check-label s-text"
                                            htmlFor="save_card_info"
                                        >
                                            記住此卡片資訊以提供下次使用
                                        </label>
                                    </div>
                                </section>

                                {/* 索取發票 */}
                                <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                    <h2 className="cart-section-title mb-6">索取發票</h2>
                                    <label htmlFor="invoice_info" className="form-label px-2">
                                        發票類型
                                    </label>
                                    <InvoiceSection
                                        register={register}
                                        control={control}
                                        errors={errors}
                                        watch={watch}
                                        setValue={setValue}
                                    />
                                </section>

                                {/* 訂閱備註 */}
                                <section className="cart-panel p-4 p-lg-6 mb-2 mb-lg-6">
                                    <h2 className="cart-section-title mb-6">訂閱備註</h2>
                                    <div className="mb-4 mb-lg-6">
                                        <div
                                            className={`form-group-filled note-group ${errors.subscription_note ? 'border border-semantic-error' : ''}`}
                                        >
                                            <textarea
                                                id="subscription_note"
                                                className="form-control mb-3"
                                                placeholder="有什麼想告訴我們的嗎？"
                                                {...register('subscription_note', {
                                                    maxLength: {
                                                        value: 200,
                                                        message: '備註內容過長，請精簡至 200 字以內。',
                                                    },
                                                })}
                                            />
                                            <div className="note-count text-end text-neutral-600">
                                                <span className="current-count">
                                                    {currentNote.length}
                                                </span>
                                                <span className="total-count"> / 200</span>
                                            </div>
                                        </div>
                                        {/*錯誤訊息 */}
                                        {errors.subscription_note && (
                                            <div className="px-2 error-message text-semantic-error mt-2">
                                                <Icon
                                                    className="me-2"
                                                    icon="gridicons:notice-outline"
                                                    width="16"
                                                    height="16"
                                                ></Icon>
                                                {errors.subscription_note.message}
                                            </div>
                                        )}
                                    </div>
                                    {/* 快選備註 */}
                                    <div className="order-note d-flex flex-wrap gap-2">
                                        {quickNoteChips.map((chip, index) => (
                                            <button
                                                className={`btn btn-chip lh-sm ${selectedChips.includes(chip) ? 'active' : ''}`}
                                                type="button"
                                                key={index}
                                                onClick={() => toggleChip(chip)}
                                            >
                                                <Icon
                                                    className="me-1"
                                                    icon="ic:round-plus"
                                                    width="16"
                                                    height="16"
                                                ></Icon>
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>
                            <div className="col-lg-4 px-0 px-lg-3">
                                <section className="cart-panel py-4 px-3 p-lg-8 mb-2 mb-lg-6">
                                    <h2 className="cart-section-title mb-3 mb-lg-6">
                                        訂單明細
                                    </h2>
                                    <div className="px-2 px-lg-0 mb-0 mb-sm-6">
                                        <ul className="fs-8 order-list mb-6">
                                            {cartData[0]?.items.map((item) => {
                                                const theme = themes.find(
                                                    (t) => t.id.toString() === item.theme_id.toString(),
                                                );
                                                return (
                                                    <li
                                                        key={item.id}
                                                        className="py-2 mb-3 d-flex text-neutral-800"
                                                    >
                                                        <div className="flex-shrink-0 me-1 me-lg-2 align-self-lg-center">
                                                            <img
                                                                className="order-img rounded-2 bg-secondary d-inline-block"
                                                                src={theme?.square_image_url}
                                                                alt={theme?.theme_title}
                                                            />
                                                        </div>
                                                        <div className="px-2 flex-grow-1 d-flex flex-column justify-content-center">
                                                            <div className="fw-bold mb-1 text-neutral-800">
                                                                {theme?.theme_title}甜點盒
                                                            </div>
                                                            <div>
                                                                <span>
                                                                    {item.duration_months}個月訂閱方案
                                                                </span>
                                                                <span className="d-none d-lg-inline">
                                                                    {' '}
                                                                    ·{' '}
                                                                </span>
                                                                <span className="d-block d-lg-inline">
                                                                    NT${item.price} / 盒
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0 text-end px-2 ms-2 align-self-end">
                                                            <div className="mb-lg-1">x {item.quantity}</div>
                                                            <div className="fw-bold text-neutral-800">
                                                                NT$
                                                                {(
                                                                    item.price * item.quantity
                                                                ).toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>

                                        {/* 小計、折扣、合計 */}
                                        <div className="lh-base pb-6 mb-6 border-bottom border-neutral-400">
                                            <p className="d-flex justify-content-between align-items-center mb-2">
                                                <span>小計</span>
                                                <span>NT${cartData[0]?.subtotal}</span>
                                            </p>
                                            <p className="d-flex justify-content-between align-items-center">
                                                <span>折扣</span>
                                                <span className="text-cta-200">
                                                    - NT${cartData[0]?.discount_total}
                                                </span>
                                            </p>
                                        </div>
                                        <p className="d-flex justify-content-between align-items-center lh-sm ls-1 fw-bold">
                                            <span>合計</span>
                                            <span className="fs-5 lh-base ls-1">
                                                NT${cartData[0]?.final_total}
                                            </span>
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
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
                        <button
                            type="submit"
                            form="checkoutForm"
                            className="btn-primary-text w-100"
                        >
                            確認支付並下單
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartCheckout