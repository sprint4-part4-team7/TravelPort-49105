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

interface OptionPostMutationProps {
  productId: number;
  optionInfo: ProductOptionProps;
}

const useProductOptionPostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ productId, optionInfo }: OptionPostMutationProps) => {
      return productOption.postProductOption(productId, optionInfo);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['OptionPostMutationProps'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useProductOptionPostMutation;
