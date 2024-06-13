import { useEffect, useState } from 'react';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';
import useProductOptionQuery from './reactQuery/productOption/useProductOptionQuery';

const useFetchDetailsQuery = (productId: number) => {
  const [product, setProduct] = useState<any>();
  const [options, setOptions] = useState<any>([]);

  const { productByProductId } = useProductByIdQuery(productId);
  const { productOption } = useProductOptionQuery(productId);

  useEffect(() => {
    if (productByProductId) setProduct(productByProductId);
    if (productOption) setOptions(productOption);
  }, [productByProductId, productOption]);

  return { product, options };
};

export default useFetchDetailsQuery;
