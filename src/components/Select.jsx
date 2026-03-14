import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from 'react';

const Select = ({
    //字尾(選用)
    id, options, value, onChange, placeholderText, suffix = "", disabled = false, errorMsg, hasError
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isSelected = value && value !== placeholderText;
    const displayText = isSelected ? `${value}${suffix}` : placeholderText;
    const textColorClass = isSelected ? 'text-neutral-800' : 'text-neutral-600';
    const borderClass = errorMsg ? 'border border-semantic-error' : 'border border-transparent';

    return (
        <>
            <div className="dropdown cart-dropdown" ref={dropdownRef}>
                <button className={`btn d-flex align-items-center p-3 justify-content-between w-100 py-2 px-4 ${textColorClass} ${borderClass}`}
                    type="button" id={id}
                    aria-expanded={isOpen} disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    >
                    <span>{displayText}</span>
                    <Icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></Icon>
                </button>
                {isOpen && (
                <ul className="dropdown-menu m-0 custom-dropdown show" aria-labelledby="dropdownMenu" style={{ maxHeight: '256px' }}>
                    {options?.map((opt) => (
                        <li key={opt}>
                            <button
                                className={`dropdown-item ${value === opt ? 'active' : ''}`}
                                type="button"
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                            >
                                {opt}{suffix}
                            </button>
                        </li>
                    ))}
                </ul>
                )}
            </div>
            {errorMsg &&
                <div className="px-2 error-message text-semantic-error">
                    <Icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></Icon>
                    {errorMsg}
                </div>
            }
        </>
    )
}

export default Select;

// import { Icon } from "@iconify/react";
// const Select = ({
//     //字尾(選用)
//     id, options, value, onChange, placeholderText, suffix = "", disabled = false, errorMsg
// }) => {
//     const isSelected = value && value !== placeholderText;
//     const displayText = isSelected ? `${value}${suffix}` : placeholderText;
//     const textColorClass = isSelected ? 'text-neutral-800' : 'text-neutral-600';
//     return (
//         <>
//             <div className="dropdown cart-dropdown">
//                 <button className={`btn  d-flex align-items-center p-3  ${textColorClass}`} type="button" id={id}
//                     data-bs-toggle="dropdown" aria-expanded="false" disabled={disabled}>
//                     <span>{displayText}</span>
//                     <Icon className="ms-2" icon="iconamoon:arrow-down-2-duotone" width="24" height="24"></Icon>
//                 </button>
//                 <ul className="dropdown-menu m-0 custom-dropdown" aria-labelledby="dropdownMenu" style={{ maxHeight: '256px' }}>
//                     {options?.map((opt) => (
//                         <li key={opt}>
//                             <button
//                                 className={`dropdown-item ${value === opt ? 'active' : ''}`}
//                                 type="button"
//                                 onClick={() => {
//                                     setTimeout(() => {
//                                         onChange(opt);
//                                     }, 0);
//                                 }}
//                             >
//                                 {opt}{suffix}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>

//             </div>
//             {errorMsg &&
//                 <div className="px-2 error-message text-semantic-error">
//                     <Icon className="me-2" icon="gridicons:notice-outline" width="16" height="16"></Icon>
//                     {errorMsg}
//                 </div>
//             }
//         </>
//     )
// }

// export default Select;