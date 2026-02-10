import { Icon } from "@iconify/react";
import { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";


function ShipDate({record}) {
  const { payStatus, shipStatus, shipDate, isArchieved } = record;

  // 狀態判斷
  const isError = payStatus === "failed";
  const isShipped = shipStatus === "shipped";
  const hasDate = Boolean(shipDate && shipDate !== "-");

  const [currentDate, setCurrentDate] = useState(
    shipDate && shipDate !== "-" ? dayjs(shipDate) : null
  );

  // 決定顯示內容
  let text = "-";
  if (isError) {
    text = "-";
  } else if (!isShipped) {
    text = "選擇日期";
  } else {
    text = currentDate
    ? currentDate.format("YYYY-MM-DD")
    : "選擇日期";
  }

  // 產生 CSS 
  let rootClass = "shipDate-btn";
  if (isError) rootClass += " is-error";
  if (!isShipped && !isError) rootClass += " is-empty btn";
  if (isShipped) rootClass += " is-filled btn";
  if (isArchieved) rootClass += " is-archieved btn";

  // ===== 是否可互動 =====
  const isDisabled = isError || isArchieved;

  return (
    <div className="shipDate-wrapper">
      {/* 主顯示區 */}
      <div className={`${rootClass}`}>
        <span className="shipDate-text">{text}</span>

        {/* icon 先全部 render，之後用 CSS 控制 */}
        {!isError && (<span className="shipDate-icon">
          <Icon icon="mdi:calendar-month-outline" />
        </span>)}
      </div>
      {/* 行事曆 */}
      {!isDisabled && (
        <DatePicker className="datePicker"
          popupClassName="shipDate-picker-popup"
          value={currentDate}
          onChange={(date) => setCurrentDate(date)}
          format="YYYY-MM-DD"
          placement="bottomLeft"
          getPopupContainer={(trigger) =>
            trigger.parentElement
          } 
        />
      )}
    </div>
  )
};

export default ShipDate;