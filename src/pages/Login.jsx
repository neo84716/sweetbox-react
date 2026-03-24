import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Icon } from "@iconify/react";

function Login() {
    // if (!subscriptions || subscriptions.length === 0) {
    //         return <Navigate to="/subscription" replace />;
    //     }

    const { register, handleSubmit, watch, setValue, getValues, control, trigger, formState: { errors }
    } = useForm({ mode: 'onTouched' });
    const onSubmit = (data) => {
        console.log(errors);
        console.log(data);
    };

    //信箱密碼字元過濾
    const handleEmailInput = (e) => {
        e.target.value = e.target.value.replace(/\s+/g, '').replace(/[^A-Za-z0-9._%+-@]/g, '');
    };
    const handlePasswordInput = (e) => {
        e.target.value = e.target.value.replace(/\s+/g, '').replace(/[^a-zA-Z0-9._%+-~&]/g, '');
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <>
            <main className="bg-login px-6 position-relative overflow-hidden bg-neutral-300">
                <div className="container login-main">
                    <section className="row panel-wrapper">
                        <div className="col-md-6 position-relative login-left-modal">
                            <div className="login-panel-bg"></div>
                        </div>
                        <div className="login-right-modal col-md-6 px-8">
                            <h1 className="fs-3 fs-md-2 text-md-center mb-6">登入</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    id='email'
                                    register={register}
                                    errors={errors}
                                    labelText='電子信箱'
                                    type='email'
                                    placeholderText='請輸入電子信箱'
                                    ariaLabel='電子信箱'
                                    iconName='material-symbols:person-outline-rounded'
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
                                    iconName='material-symbols:person-outline-rounded'
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
                                        <button type="button" className="btn-icon-leading"
                                                style={{ zIndex: 5, cursor: 'pointer' }}
                                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                             >
                                            {isPasswordVisible ? (
                                                <Icon icon="mdi:hide" width="16" height="16" />
                                            ) : (
                                                <Icon icon="mdi:eye" width="16" height="16" />
                                            )}
                                            
                                            
                                        </button>

                                    }
                                />
                                <button type="submit" className="btn-primary-icon align-items-center ls-1 lh-sm w-100 mt-6" >
                                    登入
                                    <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M15 7.586L22.414 15H2v-2h15.586l-4-4z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>

            </main>
        </>
    )
}

export default Login