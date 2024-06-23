import review from '@/apis/review';
import { ReviewInfoType } from '@/constants/Types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PutReviewMutationProps {
  userId: number;
  productOptionId: number;
  reviewId: number;
  reviewInfo: ReviewInfoType;
}

const useReviewPutMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      productOptionId,
      reviewId,
      reviewInfo,
    }: PutReviewMutationProps) => {
      return review.putReview(userId, productOptionId, reviewId, reviewInfo);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['reviewPutMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useReviewPutMutation;
