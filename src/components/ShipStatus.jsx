import { Icon } from "@iconify/react";
import ShipDate from "./ShipDate";
import { useState, useEffect, useRef } from "react";


// function ShipStatus({payStatus, shipStatus, isArchieved}) {
//   const SHIP_STATUS = {
//     unshipped: "未出貨",
//     shipped: "已出貨"
//   }
//   if (payStatus === "failed") {
//     return (
//       <span className={`shipStatusBtn shipText ${shipStatus}`}>異常保留</span>
//     )
//   }
//   const text = SHIP_STATUS[shipStatus] || "請選擇";
//   if (isArchieved) {
//     return (
//       <div className="badge">{text}</div>
//     )
//   }
  
//   const showIcon = Boolean(text) 
//   return (
//     <div className="d-flex justify-content-center align-items-center shipStatusBtn" 
//     >
//       <span className={`shipText ${shipStatus}`}>
//         {SHIP_STATUS[shipStatus] || "請選擇"}
//       </span>
//       <Icon icon={"mdi:chevron-down"} className={`shipStatusIcon ${showIcon ? "show" : ""}`}/>
//     </div>
//   )

//     // <div className={`shipBadge ${item.shipStatus} 
//     //   ${openOrderId === item.orderID ? 'expanded' : ''}`}
//     //   onMouseEnter={()=>setHoverId(item.orderID)}
//     //   onMouseLeave={()=>setHoverId(null)}
//     //   onClick={()=>setOpenOrderId(openOrderId === item.orderID ? null : item.orderID)}>
//     //   <span className={`shipText ${item.shipStatus}`}>
//     //     { item.shipStatus === 'error' ? '異常保留' : (item.shipStatus === 'shipped' ? '已出貨' : '未出貨')}
//     //   </span>
//     //   <span className={`chevron ${hoverId === item.orderID || openOrderId === item.orderID ? 'show' : ''}`}>
//     //     <Icon icon={"mdi:chevron-down"} />
//     //   </span>
//     // </div>
//     // {openOrderId === item.orderID && (
//     //   <ul className="shipDropdown">
//     //     <li>未出貨</li>
//     //     <li>已出貨</li>
//     //   </ul>
//     // )}
// }

// function ShipStatus({record}) {
//   // 取出資料
//   const { payStatus, shipStatus, isArchieved, shipDate } = record;

//   // 狀態判斷
//   const isError = payStatus === "failed";
//   const isEmpty = shipDate === "-" && !isError;
//   const isSelected = shipStatus === 'shipped' || shipStatus === 'unshipped';

//   const [currentStatus, setCurrentStatus] = useState(shipStatus === '-' ? null : shipStatus)
//   // 下拉選單開關
//   const [isOpen, setIsOpen] = useState(false);

//   // 顯示文字
//   const shipTextMap = {
//     shipped: '已出貨',
//     unshipped: '未出貨'
//   };

//   const shipText = isError ? "異常保留" : (shipTextMap[shipStatus] ?? "請選擇")

//   let rootClass = 'shipStatus-btn'
//   if (isError) rootClass += " is-error";
//   if (isEmpty) rootClass += " is-empty";
//   if (isSelected) rootClass += " is-selected";
//   if (isOpen) rootClass += " is-open";
//   if (isArchieved) rootClass += " is-archieved badge";
//   if (isArchieved) {
//     return (
//       <span className="badge">{shipTextMap[shipStatus]}</span>
//     )
//   }
//   // 切換選單開關的狀態
//   const handleToggle = () => {
//     if (isError) return;
//     setIsOpen((prev) => !prev);
//   };

//   // 更新狀態
//   const handleSelect = (status) => {
//     setCurrentStatus(status);
//     setIsOpen(false);
//   };


//   return (
//     <div className="sub-dropdown">
//       <div type="button" className={`${rootClass}`} onClick={handleToggle}>
//         {/* text */}
//         <span className="shipStatus-text">{shipText}</span>
//         {/* icon */}
//         <span className="shipStatus-icon">
//           <Icon icon={"mdi:chevron-down"} width={"16px"} />
//         </span>
//       </div>
//       {/* 下拉式選單 */}
//       {isOpen && (
//         <ul className="shipStatus-dropdown-menu" aria-labelledby="dropdownMenu">
//           <li><button type="button" className="dropdown-btn"  onClick={() => handleSelect("unshipped")}>未出貨</button></li>
//           <li><button type="button" className="dropdown-btn" onClick={() => handleSelect("shipped")}>已出貨</button></li>
//         </ul>
//       )}
      
//     </div>
//   )

// }

// };
const SHIP_TEXT = {
  1: "待出貨",
  2: "已出貨",
  3: "異常保留",
}

function ShippingStatus({record, isOpen, onToggle, onChange}) {
  const {payment_status, shipping_status, is_archived} = record
  // const [open, setOpen] =useState(false)
  const isPayFailed = payment_status === 2;
  const hasData = shipping_status !== null && shipping_status !== undefined;

  // 將寬度交給React管理，解決了從桌面板改成行動版，需要手動重新整理才能顯示行動版樣式的問題
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992)
  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  // const wrapperRef = useRef(null);
  // 偵測外部點選
//   useEffect(() => {
//   function handleClickOutside(event) {
//     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//       if (isOpen) {
//         onToggle(false); // 關閉
//       }
//     }
//   }

//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, [isOpen, onToggle]);
  
  if(is_archived) {
    return (
      <span className="ship-badge archieved">
        {SHIP_TEXT[shipping_status]}
      </span>
    )
  }
  if(isPayFailed) {
    return (
      <div className="d-flex d-lg-block justify-content-center align-items-center gap-1 ship-error-button">
        <span className="ship-text error">
          {SHIP_TEXT[3]}
        </span>
        <Icon
          icon="mdi:chevron-down"
          className="ship-icon d-lg-none"
        />
      </div>
    )
  }
  if(hasData) {
    return (
      <div className="ship-status-button position-relative">
        <div
          className={`ship-dropdown ${isOpen ? "open" : ""}`}
          onClick={() => onToggle()}
        >
          <span className={`ship-label ${hasData ? "hasData" : ""}`}>
            {SHIP_TEXT[shipping_status]}
          </span>

          <Icon
            icon="mdi:chevron-down"
            className="ship-icon"
          />
        </div>
        {!isMobile && isOpen && (
          <div className="ship-menu">
            <button className="ship-option" onClick={() => onChange(1)}>
              待出貨
            </button>
            <button className="ship-option" onClick={() => onChange(2)}>
              已出貨
            </button>
          </div>
        )}
        {isMobile && isOpen && (
          <div className="ship-menu-mobile">
            <div className="bottom-header d-flex flex-column align-items-center">
              <div className="tab mb-6"></div>
              <div className="bottom-header-title fw-bold">變更出貨狀態</div>
            </div>
            <div className="bottom-content">
              <div className="bottom-options d-flex flex-column px-3 mb-6">
                <button className={`ship-option mb-4 ${shipping_status === 1 ? "active" : ""}`} onClick={() => onChange(1)}>
                  <p className="fw-bold fs-8 text-neutral-800 mb-1">待出貨</p>
                  <p className="fs-8 text-neutral-600">訂單準備中，尚未安排物流</p>
                </button>
                <button className={`ship-option ${shipping_status === 2 ? "active" : ""}`} onClick={() => onChange(2)}>
                  <p className="fw-bold fs-8 text-neutral-800 mb-1">已出貨</p>
                  <p className="fs-8 text-neutral-600">訂單已完成出貨作業</p>
                </button>
              </div>
              <div className="bottom-text py-3 fs-8 text-center text-neutral-700">取消不變更</div>
            </div>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="ship-status-button position-relative">
      <div
        className={`ship-dropdown ${isOpen ? "open" : ""}`}
        onClick={() => onToggle()}
      >
        <span className={`ship-label ${hasData ? "hasData" : ""}`}>
          {isOpen ? "請選擇" : "出貨狀態"}
        </span>

        <Icon
          icon="mdi:chevron-down"
          className="ship-icon"
        />
      </div>
      {!isMobile && isOpen && (
        <div className="ship-menu">
          <button className="ship-option aa" onClick={() => onChange(1)}>
            待出貨
          </button>
          <button className="ship-option" onClick={() => onChange(2)}>
            已出貨
          </button>
        </div>
      )}
      {isMobile && isOpen && (
        <div className="ship-menu">
          <div className="bottom-header">
            <div className="tab"></div>
            <div className="bottom-header-title">變更出貨狀態</div>
          </div>
          <div className="bottom-content">
            <div className="bottom-options">
              <button className="ship-option aa" onClick={() => onChange(1)}>
                待出貨
              </button>
              <button className="ship-option" onClick={() => onChange(2)}>
                已出貨
              </button>
            </div>
            <div className="bottom-text">取消不變更</div>
          </div>
        </div>
      )}
    </div>
  );

}
export default ShippingStatus;