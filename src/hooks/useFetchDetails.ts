import { useState } from 'react';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';
import useProductOptionQuery from './reactQuery/productOption/useProductOptionQuery';

const useFetchDetailsQuery = (productId: number) => {
  const [product, setProduct] = useState<any>();
  const [options, setOptions] = useState<any>([]);

  const { productByProductIdResponse } = useProductByIdQuery(productId);
  const { productOption } = useProductOptionQuery(productId);

  setProduct(productByProductIdResponse);
  setOptions(productOption);

  return { product, options };
};

export default useFetchDetailsQuery;
