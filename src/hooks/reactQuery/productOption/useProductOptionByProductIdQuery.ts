import { useQuery } from '@tanstack/react-query';
import productOptionApi from '@/apis/productOption';

const useProductOptionByProductIdQuery = (productId: number) => {
  const {
    data: productOptionResponse,
    isLoading: isLoadingOptions,
    error: optionsError,
  } = useQuery({
    queryKey: ['getProductOption', productId],
    queryFn: () => productOptionApi.getProductOptions(productId),
  });

  console.log(productOptionResponse);

  const productOption = productOptionResponse?.data;

  return { productOption, isLoadingOptions, optionsError };
};

export default useProductOptionByProductIdQuery;
