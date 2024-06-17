import { useEffect, useState } from 'react';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';
import useProductOptionByProductIdQuery from './reactQuery/productOption/useProductOptionByProductIdQuery';

const useFetchDetailsQuery = (productId: number) => {
  const [product, setProduct] = useState<any>();
  const [options, setOptions] = useState<any>([]);

  const { productByProductId, isLoadingProducts } =
    useProductByIdQuery(productId);
  const { productOption, isLoadingOptions } =
    useProductOptionByProductIdQuery(productId);

  useEffect(() => {
    if (productByProductId && productByProductId !== product)
      setProduct(productByProductId);
    if (productOption && productOption !== options) setOptions(productOption);
  }, [productByProductId, productOption, product, options, productId]);

  return { product, options, isLoadingProducts, isLoadingOptions };
};

export default useFetchDetailsQuery;
