const getMinPrice = (array: any) => {
  const prices: number[] = [];
  array.forEach((optionInfo: any) => prices.push(optionInfo.optionPrice));
  const minPrice = Math.min(...prices);

  return minPrice;
};
export default getMinPrice;
