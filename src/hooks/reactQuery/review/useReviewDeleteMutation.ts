import review from '@/apis/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useReviewDeleteMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (reviewId: number) => {
      return review.deleteReview(reviewId);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['ReviewDeleteMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useReviewDeleteMutation;
