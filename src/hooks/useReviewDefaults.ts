/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';
import useProductOptionQuery from './reactQuery/productOption/useProductOptionQuery';

const useReviewDefaults = (optionId: number) => {
  const [optionTitle, setOptionTitle] = useState('');
  const [productName, setProductName] = useState('');

  const { productOption } = useProductOptionQuery(optionId);
  console.log(productOption);

  const { productId, optionName } = productOption;
  const { productByProductId } = useProductByIdQuery(productId);

  useEffect(() => {
    if (productOption) setOptionTitle(optionName);
    if (productByProductId) setProductName(productByProductId.name);
  }, [optionTitle, productOption]);

  return { optionTitle, productName };
};

export default useReviewDefaults;
