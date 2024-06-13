import productApi from '@/apis/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useProductDeleteMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId: number) => {
      return productApi.deleteProductById(productId);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['ProductDeleteMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useProductDeleteMutation;
