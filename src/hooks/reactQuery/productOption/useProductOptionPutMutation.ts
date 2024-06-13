import productOption from '@/apis/productOption';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProductOptionProps {
  optionName: string;
  optionDesc: string;
  optionPrice: number;
  optionImage: string;
  minUserCount: number;
  maxUserCount: number;
  userCount: number;
  timeTable: {
    startTimeOnly: string;
    endTimeOnly: string;
  }[];
}

interface OptionPutMutationProps {
  productOptionId: number;
  productId: number;
  optionInfo: ProductOptionProps;
}

const useProductOptionPutMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      productOptionId,
      productId,
      optionInfo,
    }: OptionPutMutationProps) => {
      return productOption.putProductOption(
        productOptionId,
        productId,
        optionInfo,
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['productOptionPutMutation'],
      });
    },
  });
  const isLoading = mutation.status === 'pending';

  return { mutate: mutation.mutate, isLoading };
};

export default useProductOptionPutMutation;
