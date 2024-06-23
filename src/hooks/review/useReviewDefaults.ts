import { useEffect, useState } from 'react';
import useProductOptionQuery from '../reactQuery/productOption/useProductOptionQuery';

const useReviewDefaults = (optionId: number) => {
  const [optionTitle, setOptionTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState(0);

  const { productOption } = useProductOptionQuery(optionId);

  const oName = productOption?.optionName;

  useEffect(() => {
    if (productOption) setOptionTitle(oName);
    setProductName(productOption?.product.name);
    setProductId(productOption?.productId);
  }, [optionTitle, productOption]);

  return { productOption, optionTitle, productName, productId };
};

export default useReviewDefaults;
