import { Icon } from "@iconify/react";

const Input = ({
    id, register, errors, wrapperClass = "mb-4 mb-lg-6", labelText, type, placeholderText, ariaLabel, iconName, rules, labelRight,
    ...rest //可打包剩餘未提及之 html 原生屬性
}) => {
    
    return (
        <div className={wrapperClass}>
            {labelText && (
                <div className="d-flex justify-content-between align-items-center px-2">
                    <label htmlFor={id} className="form-label">{labelText}</label>
                    {/* 右側欄位 */}
                    {labelRight && <div>{labelRight}</div>}
                </div>
            )}
            <div className="input-group form-group-filled">
                <span className="input-group-text text-neutral-600">
                    <Icon icon={iconName} width="20" height="20"></Icon>
                </span>
                <input
                    type={type}
                    className={`form-control ps-1 ${errors[id] && 'is-invalid'}`}
                    placeholder={placeholderText}
                    id={id}
                    aria-label={ariaLabel}
                    {...register(id, rules)}
                    {...rest} //其餘未提及之 html 原生屬性
                />
            </div>
            {/*錯誤訊息 */}
            {errors[id] &&
                <div className="px-2 error-message text-semantic-error">
                    <Icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></Icon> {errors?.[id]?.message}
                </div>
            }
        </div>
    )
}

export default Input;