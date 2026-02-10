import { Icon } from "@iconify/react";
import ShipDate from "./ShipDate";
import { useState } from "react";


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

function ShipStatus({record}) {
  // 取出資料
  const { payStatus, shipStatus, isArchieved, shipDate } = record;

  // 狀態判斷
  const isError = payStatus === "failed";
  const isEmpty = shipDate === "-" && !isError;
  const isSelected = shipStatus === 'shipped' || shipStatus === 'unshipped';

  const [currentStatus, setCurrentStatus] = useState(shipStatus === '-' ? null : shipStatus)
  // 下拉選單開關
  const [isOpen, setIsOpen] = useState(false);

  // 顯示文字
  const shipTextMap = {
    shipped: '已出貨',
    unshipped: '未出貨'
  };

  const shipText = isError ? "異常保留" : (shipTextMap[shipStatus] ?? "請選擇")

  let rootClass = 'shipStatus-btn'
  if (isError) rootClass += " is-error";
  if (isEmpty) rootClass += " is-empty";
  if (isSelected) rootClass += " is-selected";
  if (isOpen) rootClass += " is-open";
  if (isArchieved) rootClass += " is-archieved badge";
  if (isArchieved) {
    return (
      <span className="badge">{shipTextMap[shipStatus]}</span>
    )
  }
  // 切換選單開關的狀態
  const handleToggle = () => {
    if (isError) return;
    setIsOpen((prev) => !prev);
  };

  // 更新狀態
  const handleSelect = (status) => {
    setCurrentStatus(status);
    setIsOpen(false);
  };


  return (
    <div className="sub-dropdown">
      <div type="button" className={`${rootClass}`} onClick={handleToggle}>
        {/* text */}
        <span className="shipStatus-text">{shipText}</span>
        {/* icon */}
        <span className="shipStatus-icon">
          <Icon icon={"mdi:chevron-down"} width={"16px"} />
        </span>
      </div>
      {/* 下拉式選單 */}
      {isOpen && (
        <ul className="shipStatus-dropdown-menu" aria-labelledby="dropdownMenu">
          <li><button type="button" className="dropdown-btn"  onClick={() => handleSelect("unshipped")}>未出貨</button></li>
          <li><button type="button" className="dropdown-btn" onClick={() => handleSelect("shipped")}>已出貨</button></li>
        </ul>
      )}
      
    </div>
  )

}

export default ShipStatus;