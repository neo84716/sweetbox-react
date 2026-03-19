// 格式化卡號
export const formatCardNumber = (value) => {
  const numbers = value.replace(/\D/g, '').slice(0, 16);
  const groups = numbers.match(/.{1,4}/g);
  return groups ? groups.join('-') : '';
};

// 判斷信用卡類型
export const getCardType = (number) => {
  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number)) return 'mastercard';
  if (/^35/.test(number)) return 'jcb';
  return 'visa';
};
