import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from 'react';
import FormError from "./FormError";

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
    const borderClass = errorMsg ? 'border border-semantic-error' : '';

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
            <FormError message={errorMsg} />
        </>
    )
}

export default Select;