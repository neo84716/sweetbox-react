import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Icon } from "@iconify/react";

function Login() {
    const [authMode, setAuthMode] = useState('login');

    const { register, handleSubmit, watch, reset, formState: { errors }
    } = useForm({ mode: 'onTouched' });

    // 切換登入/註冊時，清空表格
    const toggleMode = (mode) => {
        setAuthMode(mode);
        reset();
    }

    const onSubmit = (data) => {
        if (authMode === 'login') {
            console.log("執行登入 API", data);
        } else {
            console.log("執行註冊 API", data)
        }
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //欄位字元過濾
    const handleEmailInput = (e) => {
        e.target.value = e.target.value.replace(/\s+/g, '').replace(/[^A-Za-z0-9._%+-@]/g, '');
    };
    const handlePasswordInput = (e) => {
        e.target.value = e.target.value.replace(/\s+/g, '').replace(/[^a-zA-Z0-9._%+-~&]/g, '');
    };

    return (
        <>
            <main className="bg-login px-6 position-relative overflow-hidden bg-neutral-300">
                <div className="container login-main">
                    <section className="row panel-wrapper">
                        <div className="col-md-6 position-relative login-left-modal">
                            <div className="login-panel-bg"></div>
                        </div>
                        <div className="login-right-modal col-md-6 px-lg-10 px-md-8 px-7">
                            <ul className="nav nav-subsciption py-2 mb-sm-6 mb-0 gap-2 gap-sm-0 justify-content-center">
                                <li className="nav-item">
                                    <button type="button"
                                        className={`nav-link px-3 py-4 px-sm-4 py-sm-5 
                                    ${authMode === 'login' ? 'active' : ''}`}
                                        onClick={() => toggleMode('login')}
                                    >
                                        <span className="underline">登入</span>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button type="button"
                                        className={`nav-link px-3 py-4 px-sm-4 py-sm-5 
                                        ${authMode === 'register' ? 'active' : ''}`}
                                        onClick={() => toggleMode('register')}
                                    >
                                        <span className="underline">註冊</span>
                                    </button>
                                </li>
                            </ul>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {authMode === 'login' ? (
                                    <>
                                        <Input
                                            id='email'
                                            register={register}
                                            errors={errors}
                                            labelText='電子信箱'
                                            type='email'
                                            placeholderText='請輸入電子信箱'
                                            ariaLabel='電子信箱'
                                            iconName='mi:email'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請輸入電子信箱。'
                                                },
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: '電子信箱格式不正確',
                                                }
                                            }}
                                            onInput={handleEmailInput}
                                        />
                                        <Input
                                            id='password'
                                            register={register}
                                            errors={errors}
                                            labelText='密碼'
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholderText='請輸入密碼'
                                            ariaLabel='密碼'
                                            iconName='mdi:password-outline'
                                            minLength={6}
                                            maxLength={14}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請輸入密碼'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-~&]{6,14}$/,
                                                    message: '密碼為 6-14 字元'
                                                }
                                            }}
                                            onInput={handlePasswordInput}
                                            labelRight={
                                                <button type="button" className="btn-simple-icon mb-2 me-2"
                                                    style={{ zIndex: 5, cursor: 'pointer' }}
                                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                >
                                                    {isPasswordVisible ? (
                                                        <Icon icon="mdi:eye" width="16" height="16" />
                                                    ) : (
                                                        <Icon icon="mdi:hide" width="16" height="16" />
                                                    )}
                                                </button>

                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            id='registerName'
                                            register={register}
                                            errors={errors}
                                            labelText='姓名'
                                            type='text'
                                            placeholderText='請輸入姓名'
                                            ariaLabel='姓名'
                                            iconName='material-symbols:person-outline-rounded'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請輸入真實姓名。'
                                                }, pattern: {
                                                    value: /^[\u4e00-\u9fa5a-zA-Z\s.-]+$/,
                                                    message: '姓名僅限中英文、空格與點號'
                                                },setValueAs: v => v.trim()
                                            }}
                                        />
                                        <Input
                                            id='registerEmail'
                                            register={register}
                                            errors={errors}
                                            labelText='電子信箱'
                                            type='email'
                                            placeholderText='請輸入電子信箱'
                                            ariaLabel='電子信箱'
                                            iconName='mi:email'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請輸入電子信箱。'
                                                },
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: '電子信箱格式不正確',
                                                }
                                            }}
                                            onInput={handleEmailInput}
                                        />
                                        <Input
                                            id='registerPassword'
                                            register={register}
                                            errors={errors}
                                            labelText='密碼'
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholderText='請輸入密碼'
                                            ariaLabel='密碼'
                                            iconName='mdi:password-outline'
                                            minLength={6}
                                            maxLength={14}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請輸入密碼'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-~&]{6,14}$/,
                                                    message: '密碼為 6-14 字元'
                                                }
                                            }}
                                            onInput={handlePasswordInput}
                                            labelRight={
                                                <button type="button" className="btn-simple-icon mb-2 me-2"
                                                    style={{ zIndex: 5, cursor: 'pointer' }}
                                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                >
                                                    {isPasswordVisible ? (
                                                        <Icon icon="mdi:eye" width="16" height="16" />
                                                    ) : (
                                                        <Icon icon="mdi:hide" width="16" height="16" />
                                                    )}
                                                </button>

                                            }
                                        />
                                        <Input
                                            id='registerConfirmPassword'
                                            register={register}
                                            errors={errors}
                                            labelText='確認密碼'
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholderText='請再次輸入密碼'
                                            ariaLabel='確認密碼'
                                            iconName='mdi:password-outline'
                                            minLength={6}
                                            maxLength={14}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: '請再次輸入密碼'
                                                },
                                                validate: (value) => value === watch('registerPassword') || '密碼不一致'
                                            }}
                                            onInput={handlePasswordInput}
                                            labelRight={
                                                <button type="button" className="btn-simple-icon mb-2 me-2"
                                                    style={{ zIndex: 5, cursor: 'pointer' }}
                                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                >
                                                    {isPasswordVisible ? (
                                                        <Icon icon="mdi:eye" width="16" height="16" />
                                                    ) : (
                                                        <Icon icon="mdi:hide" width="16" height="16" />
                                                    )}


                                                </button>

                                            }
                                        />
                                    </>
                                )}
                                <button type="submit" className="btn-primary-icon align-items-center ls-1 lh-sm w-100 mt-6" >
                                    {authMode === 'login' ? '立即登入' : '完成註冊'}
                                    <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M15 7.586L22.414 15H2v-2h15.586l-4-4z" />
                                    </svg>
                                </button>
                                {/* <p>還沒有帳號？ <link rel="stylesheet" href="">立即註冊</link></p> */}
                            </form>
                        </div>
                    </section>
                </div>

            </main>
        </>
    )
}

export default Login