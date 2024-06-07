import { useQuery } from '@tanstack/react-query';
import { getProductAll, getProductOptionAll } from '@/apis/productAll';

const useProductAll = () => {
  const {
    data: productAll,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['getProductAll'],
    queryFn: getProductAll,
  });

  const {
    data: optionAll,
    isLoading: isLoadingOptions,
    error: optionsError,
  } = useQuery({
    queryKey: ['getProductOptionAll'],
    queryFn: getProductOptionAll,
  });

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
