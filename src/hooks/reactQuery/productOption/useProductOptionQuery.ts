import { useQuery } from '@tanstack/react-query';
import productOptionApi from '@/apis/productOption';

const useProductOptionQuery = (optionId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getProductOption', optionId],
    queryFn: () => productOptionApi.getProductOptionByOptionId(optionId),
  });

  const productOption = data?.data;

  return { productOption, isLoading, error };
};

export default useProductOptionQuery;
