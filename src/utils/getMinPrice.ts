const getMinPrice = (array: any) => {
  const prices: number[] = [];
  array.forEach((optionInfo: any) => prices.push(optionInfo.optionPrice));
  const minPrice = Math.min(...prices);

  return minPrice === Infinity ? 0 : minPrice;
};
export default getMinPrice;
