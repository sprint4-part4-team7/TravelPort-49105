import { useQuery } from '@tanstack/react-query';
import productOptionApi from '@/apis/productOption';
// import { OptionbyIdData } from '@/constants/types';

const useProductOptionQuery = (optionId: number) => {
  const {
    data: optionByOptionIdResponse,
    isLoading: isLoadingOption,
    error: optionError,
  } = useQuery({
    queryKey: ['getProductOptionByOptionId', optionId],
    queryFn: () => productOptionApi.getProductOptionByOptionId(optionId),
  });
  console.log(optionByOptionIdResponse);

  const productOption = optionByOptionIdResponse?.data;

  return { productOption, isLoadingOption, optionError };
};

export default useProductOptionQuery;
