import { Icon } from "@iconify/react";

function DropdownComponent({ label, options, onSelect, activeValue }) {
  const activeOption = options.find(opt => opt.value === activeValue);

  return (
    <div className="sub-dropdown">
      <button
        className={`btn bg-neutral-200 ps-4 pe-2 py-3 border-0 rounded-pill d-flex align-items-center ${activeValue.endsWith("_all") ? "text-neutral-600" : "text-neutral-800"
          }`}
        type="button"
        id="dropdownMenu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-display="static"
        onClick={() => onSelect(currentValue)}
      >
        {/* 如果有選中，就顯示選中的 label，否則顯示預設 label */}
        {activeOption ? activeOption.label : label}
        <div className="ms-3 d-flex align-items-center" style={{ width: "24px", height: "24px" }}>
          <Icon icon="iconamoon:arrow-down-2-bold" width="20" height="20" />
        </div>
      </button>

      <ul className="dropdown-menu sub-dropdown-menu m-0 shadow-sm" aria-labelledby="dropdownMenu">
        {options.map((opt, idx) => (
          <li key={idx}>
            <button
              type="button"
              className={`dropdown-btn ${activeValue === opt.value ? "active" : ""}`}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownComponent;
