import { useQuery } from '@tanstack/react-query';
import { getProductAll, getProductOptionAll } from '@/apis/productAll';

const useProductAll = () => {
  const {
    data: productAllResponse,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['getProductAll'],
    queryFn: getProductAll,
  });
  const productAll = productAllResponse?.data;

  const {
    data: optionAllResponse,
    isLoading: isLoadingOptions,
    error: optionsError,
  } = useQuery({
    queryKey: ['getProductOptionAll'],
    queryFn: getProductOptionAll,
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
