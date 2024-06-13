import productOptionApi from '@/apis/productOption';
import { useQuery } from '@tanstack/react-query';

const useProductOptionAll = () => {
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
    optionAll,
    isLoadingOptions,
    optionsError,
  };
};

export default useProductOptionAll;
