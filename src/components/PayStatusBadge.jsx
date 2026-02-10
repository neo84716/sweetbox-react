import { useState } from "react";

export const PAYSTATUS = {
  DEFAULT: "default",
  PAID: "paid",
  FAILED: "failed",
};

function PayStatusBadge({currentStatus}) {
  const [payStatus, setPayStatus] = useState(currentStatus)
  
  // 定義切換方法
  const handlePayStatus = () => {
    setPayStatus((preStatus)=>{
      switch(preStatus) {
        case PAYSTATUS.DEFAULT:
          return PAYSTATUS.PAID;
        case PAYSTATUS.PAID:
          return PAYSTATUS.FAILED;
        case PAYSTATUS.FAILED:
        default:
          return PAYSTATUS.DEFAULT;
      }
    })
  }
  const getPayLabel = () => {
    switch(payStatus) {
      case PAYSTATUS.DEFAULT:
      default:
        return "未付款";
      case PAYSTATUS.PAID:
        return "已付款";
      case PAYSTATUS.FAILED:
        return "付款失敗";
    }
  }
  // payStatus === PayStatusOptions.DEFAULT;
  // const isPaid = payStatus === PayStatusOptions.PAID;
  // const isFailed = payStatus === PayStatusOptions.FAILED;
  return (
    <button type="button" className={`badge payStatusBadge ${payStatus}`} onClick={()=>{handlePayStatus()}}>
      {getPayLabel()}
    </button>
  )
}

export default PayStatusBadge;