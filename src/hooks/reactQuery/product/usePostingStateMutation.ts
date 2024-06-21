import productApi from '@/apis/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProductPutMutationProps {
  productId: number;
  userId: number;
  isPosting: boolean;
}

const usePostingStateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      productId,
      userId,
      isPosting,
    }: ProductPutMutationProps) => {
      return productApi.putPostingState(productId, userId, isPosting);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['getProductByPartner'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default usePostingStateMutation;
