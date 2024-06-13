import productApi from '@/apis/product';
import { ProductType } from '@/constants/types';
import { useQuery } from '@tanstack/react-query';

const useProductByIdQuery = (productId: number) => {
  const {
    data: productByProductIdResponse,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery<ProductType, Error>({
    queryKey: ['getProductById', productId, productApi.getProductById],
    queryFn: () => productApi.getProductById(productId),
  });

  return {
    productByProductIdResponse,
    isLoadingProducts,
    productsError,
  };
};

export default useProductByIdQuery;
