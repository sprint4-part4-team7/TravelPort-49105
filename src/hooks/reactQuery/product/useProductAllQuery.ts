import productApi from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

const useProductAllQuery = () => {
  const {
    data: productAllResponse,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['getProductAll'],
    queryFn: productApi.getProductAll,
  });

  const productAll = productAllResponse?.data;

  return {
    productAll,
    isLoadingProducts,
    productsError,
  };
};

export default useProductAllQuery;
