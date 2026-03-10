import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';

function FormSelect({ options, suffix }) {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });

  const selectOption = (value) => {
    setIsOpen(false);
    setOption(value);
  };

  return (
    <div className="dropdown flex-grow-1">
      <button
        className="btn btn-neutral-300 rounded-pill d-flex justify-content-between align-items-center w-100 py-2 px-4 border-0"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        ref={dropdownRef}
      >
        <span className="px-2">{option ? `${option}${suffix}` : suffix}</span>
        <Icon
          className="text-neutral-700"
          icon="iconamoon:arrow-down-2-bold"
          width="20"
          height="20"
        />
      </button>
      <ul
        className={`dropdown-menu dropdown-menu-neutral-250 text-start mt-2 overflow-auto ${isOpen ? 'show' : ''}`}
        style={{
          maxHeight: '150px',
          scrollbarWidth: 'none',
        }}
      >
        {options.map((item) => (
          <li
            key={item.value}
            className={`${item.value === option ? 'active' : ''}`}
          >
            <button
              type="button"
              className="dropdown-item px-2"
              onClick={() => selectOption(item.value)}
              disabled={option === item.value}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormSelect;
