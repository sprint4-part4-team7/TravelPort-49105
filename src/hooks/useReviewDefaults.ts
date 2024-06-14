import { useEffect, useState } from 'react';
import useProductOptionQuery from './reactQuery/productOption/useProductOptionQuery';

const useReviewDefaults = (optionId: number) => {
  const [optionTitle, setOptionTitle] = useState('');
  const [productName, setProductName] = useState('');

  const { productOption } = useProductOptionQuery(optionId);

  const oName = productOption?.optionName;

  useEffect(() => {
    if (productOption) setOptionTitle(oName);
    setProductName(productOption?.product.name);
  }, [optionTitle, productOption]);

  return { productOption, optionTitle, productName };
};

export default useReviewDefaults;
