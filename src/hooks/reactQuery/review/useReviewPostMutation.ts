import review from '@/apis/review';
import { ReviewInfoType } from '@/constants/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostReviewMutationProps {
  userId: number;
  productOptionId: number;
  productId: number;
  reviewInfo: ReviewInfoType;
}
const useReviewPostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      productOptionId,
      productId,
      reviewInfo,
    }: PostReviewMutationProps) => {
      return review.postReview(userId, productOptionId, productId, reviewInfo);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['ReviewPostMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useReviewPostMutation;
