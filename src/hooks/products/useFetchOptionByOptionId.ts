import { useEffect, useState } from 'react';
import useProductOptionQuery from '../reactQuery/productOption/useProductOptionQuery';

const useFetchOptionByOptionId = (optionId: number) => {
  const [optionArray, setOptionArray] = useState([]);
  const { productOption } = useProductOptionQuery(optionId);

  useEffect(() => {
    setOptionArray(productOption);
  }, [optionId, productOption]);

  return { optionArray };
};

export default useFetchOptionByOptionId;
