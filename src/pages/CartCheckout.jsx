import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch, Controller } from "react-hook-form";
import api from "../api";
import useAuth from "../../hooks/useAuth";
import { message } from "antd";
import taiwanData from "../assets/utils/taiwanDistricts.json";
import Input from "../components/Input";
import Select from "../components/Select";
import FormError from "../components/FormError";
import InvoiceSection from "../components/InvoiceSection";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { creditCardYears, creditCardMonths, invoiceOpts } from "../assets/utils/formOptions";
import { formatCardNumber, getCardType } from "../assets/utils/paymentUtils";

// 設定台灣時區
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Taipei");

function CartCheckout() {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, getValues, control, trigger, formState: { errors }
    } = useForm({ mode: 'onTouched' });

    const generateSubNumber = (abbr, durationMonths) => {
        const durationStr = String(durationMonths).padStart(2, '0'); // 期數補齊兩碼
        // 產生 6 碼隨機英文數字(大寫)
        const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase().padEnd(6, '0');
        return `${abbr || "XX"}${durationStr}${randomStr}`;
    };
    const onSubmit = async (formData) => {

        if (!cartItems || cartItems.length === 0) {
            message.warning("您的購物車裡還沒有甜點呢！");
            navigate('/cartEmpty');
            return;
        }
        message.loading({ content: '安全連線中，正在處理訂閱...', key: 'checkout' });

        try {
            const createdSubscriptions = [];
            const userId = user?.id;
            const todayStr = dayjs().format('YYYY-MM-DD');
            const nowIsoString = new Date().toISOString();

            // 判斷是否為新的信用卡
            const isUsingStoredCard = formData.cardNumber.includes('xxx');
            const shouldSaveNewCard = watch('saveCard') && !isUsingStoredCard;
            let finalPaymentMethodId = ""; //預留給新產生的卡片id

            // 信用卡資料轉換
            const currentCardBrand = getCardType(formData.cardNumber);
            const lastFour = formData.cardNumber.replace(/\s/g, '').slice(-4);

            // 抓取郵遞區號
            const { city: city, district: district } = formData;
            const zipCodeStr = taiwanData["台灣"]?.[city]?.[district]?.postalCode || "";

            // 儲存新卡
            if (shouldSaveNewCard) {
                // 1. 舊的預設卡設為 false
                const oldCardsRes = await api.get(`/payment_methods?userId=${userId}&isDefault=true`);
                for (const oldCard of oldCardsRes.data) {
                    await api.patch(`/payment_methods/${oldCard.id}`, { isDefault: false });
                }

                // 2. 儲存新卡資訊
                const newCardRes = await api.post('/payment_methods', {
                    userId: userId,
                    cardOwner: formData.cardOwner,
                    cardBrand: currentCardBrand,
                    lastFour: lastFour,
                    expiryMonth: Number(formData.expiryMonth),
                    expiryYear: Number(formData.expiryYear),
                    isDefault: true,
                    isDeleted: false,
                    creatAt: nowIsoString
                });

                finalPaymentMethodId = newCardRes.data.id; // 獲取新卡 ID

            } else if (isUsingStoredCard) {
                // 用舊卡，抓原本 ID
                const defaultCardRes = await api.get(`/payment_methods?userId=${userId}&isDefault=true`);
                finalPaymentMethodId = defaultCardRes.data[0]?.id || "";
            }

            // 跑迴圈處理每筆購物車內的商品
            for (const item of cartItems) {

                const subNo = generateSubNumber(item.theme?.titleAbbr, item.plan?.durationMonths);
                const subId = crypto.randomUUID();
                const endDateStr = dayjs().add(item.plan?.durationMonths - 1, 'month').format('YYYY-MM-DD');
                const nextPaymentStr = dayjs().add(1, 'month').format('YYYY-MM-DD');
                const firstOrderNo = `${subNo}01`;
                const itemTotal = (item.plan?.discountPrice || 0) * item.quantity;

                // ==========================================
                // 1.subscription 資料處理
                // ==========================================

                const subscriptionPayload = {
                    userId: userId,
                    planId: item.planId,
                    themeId: item.themeId,
                    subscriptionNumber: subNo,
                    quantity: item.quantity,
                    unitPrice: item.plan?.discountPrice || 0,
                    durationMonths: item.plan?.durationMonths,
                    startDate: todayStr,
                    endDate: endDateStr,
                    nextPaymentDate: nextPaymentStr,
                    status: "active",
                    isProcessed: false,
                    note: formData.note || "",
                    paymentMethodId: finalPaymentMethodId,
                    paymentMethod: {
                        cardBrand: currentCardBrand,
                        lastFour: lastFour,
                        expiryMonth: Number(formData.expiryMonth),
                        expiryYear: Number(formData.expiryYear)
                    },
                    shippingInfo: {
                        zipCode: zipCodeStr,
                        city: city,
                        district: district,
                        street: formData.street,
                        name: formData.name,
                        phone: formData.phone
                    },
                    invoiceInfo: {
                        type: formData.type,
                        carrier: formData.carrier || "",
                        tax_id: formData.taxId || "",
                        company_name: formData.companyName || "",
                        company_email: formData.companyEmail || "",
                        donate_code: formData.donateCode || ""
                    }
                };

                //等 json-server 產生 subscription ID
                const subRes = await api.post('/subscriptions', subscriptionPayload);
                const newSubId = subRes.data.id;
                createdSubscriptions.push(subRes.data);

                // =============================================
                // 2. orders (第一期訂單) 資料處理
                // =============================================
                const orderPayload = {
                    subscriptionId: newSubId,
                    orderNo: firstOrderNo,
                    amount: itemTotal,
                    createdAt: new Date().toISOString(),
                    paymentDueDate: todayStr,
                    paymentStatus: "paid",             // 模擬已付款
                    paymentDate: todayStr,
                    shippingStatus: "pending",         // 未出貨
                    shippingDate: null,
                    invoice: {
                        number: `AB-${Math.floor(Math.random() * 100000000)}`, // 模擬產生一張發票號碼
                        date: new Date().toISOString(),
                        fileUrl: null
                    },
                    isArchived: false
                };

                // 寫入剩下資料庫
                await api.post('/orders', orderPayload);

            }

            // 結帳後，清空購物車
            for (const item of cartItems) {
                await api.delete(`/cart_items/${item.id}`)
            }
            if (cartMain?.id) {
                await api.delete(`/carts/${cartMain.id}`);
            }

            message.success({ content: "訂閱成功！感謝您的支持。", key: 'checkout', duration: 2 });
            const subIds = createdSubscriptions.map(sub => sub.id).join(',');
            navigate(`/cartFinish?sub_ids=${subIds}`);

        } catch (error) {
            console.error("結帳失敗:", error);
            message.error({ content: "處理失敗，請稍後再試。", key: 'checkout', duration: 3 });
        }
    }

    const handleSyncMemberData = async (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            try {
                const res = await api.get(`/users/${user?.id}?_embed=payment_methods`);
                const userData = res.data;

                setValue("name", userData.name, { shouldValidate: true });
                setValue("phone", userData.phone, { shouldValidate: true });
                setValue("city", userData.address.city, { shouldValidate: true });
                setValue("district", userData.address.district, { shouldValidate: true });
                setValue("street", userData.address.street, { shouldValidate: true });

                const defaultCard = userData.payment_methods?.find(pm => pm.isDefault === true)
                if (defaultCard) {
                    const maskedCardNumber = `xxxx-xxxx-xxxx-${defaultCard.lastFour}`;

                    setValue("cardNumber", maskedCardNumber, { shouldValidate: true });
                    setValue("cardOwner", defaultCard.cardOwner, { shouldValidate: true });
                    setValue("expiryMonth", String(defaultCard.expiryMonth).padStart(2, '0'), { shouldValidate: true });
                    setValue("expiryYear", String(defaultCard.expiryYear), { shouldValidate: true });
                }
            } catch (error) {
                console.error("取得會員資料失敗：", error);
                message.error("無法帶入會員資料，請稍後再試。");
            }
        } else {
            // 取消勾選，清空欄位
            setValue("name", "");
            setValue("phone", "");
            setValue("city", "");
            setValue("district", "");
            setValue("street", "");
            setValue("cardNumber", "");
            setValue("cardOwner", "");
            setValue("expiryMonth", "");
            setValue("expiryYear", "");
        }
    }

    const { user } = useAuth();
    const [cartMain, setCartMain] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [themes, setThemes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartRes = await api.get(`/carts?userId=${user.id}&_embed=cart_items`);
                const userCart = cartRes.data[0];

                // 防呆：如果沒有購物車 or 購物車空的，導回 '/cart'
                if (!userCart || !userCart.cart_items || userCart.cart_items.length === 0) {
                    navigate('/cart');
                    return;
                }
                setCartMain(userCart);

                const [themesRes, plansRes] = await Promise.all([
                    api.get("/themes"),
                    api.get("/plans")
                ])
                const plansData = plansRes.data;
                const themesData = themesRes.data;

                setPlans(plansData);
                setThemes(themesData);

                //資料組合
                const enrichedItems = userCart.cart_items.map(item => {
                    const planDetail = plansData.find(p => p.id === item.planId);
                    const themeDeatail = themesData.find(t => t.id === planDetail?.themeId);
                    return {
                        ...item,
                        plan: planDetail || null,
                        theme: themeDeatail || null
                    }
                })

                setCartItems(enrichedItems);

            } catch (err) {
                console.error("資料讀取失敗", err);
                message.error("無法取得訂單資訊");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    // 地址
    const currentCity = watch('city');
    const cities = Object.keys(taiwanData["台灣"]);
    const districts = currentCity ? Object.keys(taiwanData["台灣"][currentCity]) : [];

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setValue('cardNumber', formattedValue, { shouldValidate: true });
    }

    // 訂閱備註字數
    const currentNote = watch('note', '');

    //訂閱備註快選
    const [selectedChips, setSelectedChips] = useState([]);
    const quickNoteChips = [
        '請在下午送達。', '請直接放門口。', '請放管理室。', '請提前來電。', '對堅果過敏。', '對花生過敏。'
    ]
    const toggleChip = (chip) => {
        const currentText = getValues("note") || "";
        if (selectedChips.includes(chip)) {
            setSelectedChips(selectedChips.filter(item => item !== chip));
            setValue("note", currentText.replace(chip, ""), { shouldValidate: true });
        } else {
            setSelectedChips([...selectedChips, chip]);
            setValue("note", currentText + chip, { shouldValidate: true });
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
                        <li className="step-item d-flex flex-column align-items-center">
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
                                        id='name'
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
                                                    id='syncMemberData'
                                                    {...register('syncMemberData', {
                                                        onChange: handleSyncMemberData
                                                    })}
                                                />
                                                <label className="form-check-label s-text" htmlFor='syncMemberData'>
                                                    帶入會員資料
                                                </label>
                                            </div>
                                        }
                                    />
                                    <Input
                                        id='phone'
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
                                        <label htmlFor="city" className="form-label px-2">地址</label>
                                        <div className="row g-3 mb-3">
                                            <div className="col-6">
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    rules={{ required: '請選擇城市' }}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <Select
                                                            id='city'
                                                            placeholderText='城市'
                                                            options={cities}
                                                            value={value}
                                                            onChange={(val) => {
                                                                onChange(val); // 告訴 RHF 城市換了
                                                                //清空值時，觸發鄉鎮市區「必填」提醒
                                                                setValue('district', '', { shouldValidate: true }); // 💡 連動防呆：城市切換時，清空鄉鎮市區的值
                                                            }}
                                                            errorMsg={error?.message}
                                                        />
                                                    )}
                                                />
                                                <FormError
                                                    message={errors?.city?.message}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <Controller
                                                    name="district"
                                                    control={control}
                                                    rules={{ required: '請選擇鄉鎮市區' }}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <Select
                                                            id='district'
                                                            placeholderText='鄉鎮市區'
                                                            options={districts}
                                                            value={value}
                                                            onChange={(val) => {
                                                                onChange(val);
                                                                trigger(['city', 'district']);
                                                            }}
                                                            disabled={!currentCity} // 防呆：沒選城市，不給選
                                                            errorMsg={error?.message}
                                                        />
                                                    )}
                                                />
                                                <FormError
                                                    message={errors?.district?.message}
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            id='street'
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
                                        id="cardNumber"
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
                                        id="cardOwner"
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
                                                            name="expiryMonth"
                                                            control={control}
                                                            rules={{
                                                                validate: (val) => {
                                                                    if (!val) return '請選擇效期';

                                                                    const currentYear =
                                                                        getValues('expiryYear');
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
                                                                    id="expiryMonth"
                                                                    placeholderText="月份"
                                                                    options={creditCardMonths}
                                                                    value={value}
                                                                    onChange={(val) => {
                                                                        onChange(val);
                                                                        trigger([
                                                                            'expiryMonth',
                                                                            'expiryYear',
                                                                        ]); // 💡 觸發年份與月份的連動驗證
                                                                    }}
                                                                    errorMsg={error?.message}
                                                                    suffix=" 月"
                                                                />
                                                            )}
                                                        />
                                                        <FormError
                                                            message={errors?.expiryMonth?.message}
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <Controller
                                                            name="expiryYear"
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
                                                                    id="expiryYear"
                                                                    placeholderText="年份"
                                                                    options={creditCardYears}
                                                                    value={value}
                                                                    onChange={(val) => {
                                                                        onChange(val);
                                                                        trigger([
                                                                            'expiryMonth',
                                                                            'expiryYear',
                                                                        ]);
                                                                    }}
                                                                    errorMsg={error?.message}
                                                                    suffix=" 年"
                                                                />
                                                            )}
                                                        />
                                                        <FormError
                                                            message={errors?.expiryYear?.message}
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
                                            id="saveCard"
                                            {...register('saveCard')}
                                        />
                                        <label
                                            className="form-check-label s-text"
                                            htmlFor="saveCard"
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
                                            className={`form-group-filled note-group ${errors.note ? 'border border-semantic-error' : ''}`}
                                        >
                                            <textarea
                                                id="note"
                                                className="form-control mb-3"
                                                placeholder="有什麼想告訴我們的嗎？"
                                                {...register('note', {
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
                                        {errors.note && (
                                            <div className="px-2 error-message text-semantic-error mt-2">
                                                <Icon
                                                    className="me-2"
                                                    icon="gridicons:notice-outline"
                                                    width="16"
                                                    height="16"
                                                ></Icon>
                                                {errors.note.message}
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
                                            {cartItems.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="py-2 mb-3 d-flex text-neutral-800"
                                                >
                                                    <div className="flex-shrink-0 me-1 me-lg-2 align-self-lg-center">
                                                        <img
                                                            className="order-img rounded-2 bg-secondary d-inline-block"
                                                            src={item.theme?.images?.square}
                                                            alt={item.theme?.title}
                                                        />
                                                    </div>
                                                    <div className="px-2 flex-grow-1 d-flex flex-column justify-content-center">
                                                        <div className="fw-bold mb-1 text-neutral-800">
                                                            {item.theme?.title}甜點盒
                                                        </div>
                                                        <div>
                                                            <span>
                                                                {item.plan?.durationMonths}個月訂閱方案
                                                            </span>
                                                            <span className="d-none d-lg-inline">
                                                                {' '}·{' '}
                                                            </span>
                                                            <span className="d-block d-lg-inline">
                                                                NT${item.plan?.discountPrice} / 盒
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0 text-end px-2 ms-2 align-self-end">
                                                        <div className="mb-lg-1">x {item.quantity}</div>
                                                        <div className="fw-bold text-neutral-800">
                                                            NT$
                                                            {(
                                                                (item.plan?.discountPrice || 0) * item.quantity
                                                            ).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </li>

                                            ))}
                                        </ul>

                                        {/* 小計、折扣、合計 */}
                                        <div className="lh-base pb-6 mb-6 border-bottom border-neutral-400">
                                            <p className="d-flex justify-content-between align-items-center mb-2">
                                                <span>小計</span>
                                                <span>NT${cartMain?.subTotal?.toLocaleString() || 0}</span>
                                            </p>
                                            <p className="d-flex justify-content-between align-items-center">
                                                <span>折扣</span>
                                                <span className="text-cta-200">
                                                    - NT${cartMain?.discountTotal?.toLocaleString() || 0}
                                                </span>
                                            </p>
                                        </div>
                                        <p className="d-flex justify-content-between align-items-center lh-sm ls-1 fw-bold">
                                            <span>合計</span>
                                            <span className="fs-5 lh-base ls-1">
                                                NT${cartMain?.finalTotal?.toLocaleString() || 0}
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