// import { useState } from "react";

const PAYSTATUS = {
  1: "已付款",
  2: "付款失敗",
  3: "即將付款",
};

function PayStatusBadge({currentStatus, isArchived, isFailed, onChange}) {
  // const [payStatus, setPayStatus] = useState(currentStatus)
  
  // 定義切換方法
  // const handlePayStatus = () => {
  //   setPayStatus((prev)=>{
  //     switch(prev) {
  //       case PAYSTATUS.DEFAULT:
  //         return PAYSTATUS.PAID;
  //       // case PAYSTATUS.PAID:
  //         // return PAYSTATUS.FAILED;
  //       // case PAYSTATUS.FAILED:
  //       case PAYSTATUS.PAID:
  //       default:
  //         return PAYSTATUS.DEFAULT;
  //     }
  //   })
  // }
  // const getPayLabel = () => {
  //   switch(payStatus) {
  //     case PAYSTATUS.DEFAULT:
  //     default:
  //       return "未付款";
  //     case PAYSTATUS.PAID:
  //       return "已付款";
  //     case PAYSTATUS.FAILED:
  //       return "付款失敗";
  //   }
  // }
  const getNewStatus = () => {
    switch(currentStatus) {
      case 1:
        return 3
      // case 2:
      //   return 3
      case 3:
      default:
        return 1
    }
  }
  // payStatus === PayStatusOptions.DEFAULT;
  // const isPaid = payStatus === PayStatusOptions.PAID;
  // const isFailed = payStatus === PayStatusOptions.FAILED;
  return (
    <button type="button" className={`payStatusBadge ${currentStatus === 2 ? "failed": ""}`} onClick={()=>{(!isFailed)&&(!isArchived)&&onChange(getNewStatus())}}>
      {PAYSTATUS[currentStatus]}
    </button>
  )
}

export default PayStatusBadge;