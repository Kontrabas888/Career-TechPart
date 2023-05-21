export const formatNumber = number => {
  if (number < 1000) {
    return number;
  }

  const thousands = Math.floor(number / 1000);
  const ones = number.toString().slice(-3);
  return `${thousands},${ones}`;
};
