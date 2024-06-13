import productApi from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

const useProductByIdQuery = (productId: number) => {
  const {
    data: productByProductIdResponse,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['getProductById', productId, productApi.getProductById],
    queryFn: () => productApi.getProductById(productId),
  });

  const productByProductId = productByProductIdResponse?.data;

  return {
    productByProductId,
    isLoadingProducts,
    productsError,
  };
};

export default useProductByIdQuery;
