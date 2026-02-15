import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

function Dropdown({ options, width = '108px' }) {
  const [option, setOption] = useState(options[0].label);
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function selectOption(e, label) {
    e.preventDefault();
    setOption(label);
    setIsSelected(true);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [])

  return (
    <div className="dropdown dropdown-neutral-250">
      <button
        ref={dropdownRef}
        className={`btn btn-secondary dropdown-toggle d-flex justify-content-center align-items-center
          ${isSelected ? 'text-neutral-800' : ''}
          ${isOpen ? 'is-open' : ''}`}
        style={{ width }}
        type="button"
        aria-expanded="false"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className='me-1'>{option}</span>
        <Icon icon="iconamoon:arrow-down-2-bold" width="20" height="20" />
      </button>
      <ul
        className={`dropdown-menu mt-2 dropdown-menu-neutral-250 ${isOpen ? 'show' : ''}`}
      >
        {options.map((opt, index) => (
          <li key={index}>
            <a
              className="dropdown-item"
              onClick={(e) => selectOption(e, opt.label)}
            >
              {opt.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
