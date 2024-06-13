import productOption from '@/apis/productOption';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useProductOptionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productOptionId: number) => {
      return productOption.deleteProductOption(productOptionId);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['OptionDeleteMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useProductOptionDeleteMutation;
