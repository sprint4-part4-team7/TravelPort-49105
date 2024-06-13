import productApi from '@/apis/product';
import productOptionApi from '@/apis/productOption';
import { useQuery } from '@tanstack/react-query';

const useProductAll = () => {
  const {
    data: productAllResponse,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['getProductAll'],
    queryFn: productApi.getProductAll,
  });
  const productAll = productAllResponse?.data;

  const {
    data: optionAllResponse,
    isLoading: isLoadingOptions,
    error: optionsError,
  } = useQuery({
    queryKey: ['getProductOptionAll'],
    queryFn: productOptionApi.getProductOptionAll,
  });
  const optionAll = optionAllResponse
    ? optionAllResponse.data.productOptions
    : [];

  return {
    productAll,
    optionAll,
    isLoadingProducts,
    isLoadingOptions,
    productsError,
    optionsError,
  };
};

export default useProductAll;
