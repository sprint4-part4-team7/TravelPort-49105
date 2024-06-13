const uniqueProduct = (array: any) => {
  const optionId: number[] = [];
  const uniqueOptionAll = [];
  for (let i = 0; i < array?.length; i++) {
    if (!optionId.includes(array[i].productId)) {
      optionId.push(array[i].productId);
      uniqueOptionAll.push(array[i]);
    }
  }
  return uniqueOptionAll;
};

export default uniqueProduct;
