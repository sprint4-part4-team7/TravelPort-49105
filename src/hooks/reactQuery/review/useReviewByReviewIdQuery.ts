import review from '@/apis/review';
import { useQuery } from '@tanstack/react-query';

const useReviewByReviewIdQuery = (reviewId: number) => {
  const {
    data: reviewByReviewIdResponse,
    isLoading: isLoadingReview,
    error: reviewError,
  } = useQuery({
    queryKey: ['getReviewByReviewId', reviewId],
    queryFn: () => review.getReviewInfo(reviewId),
  });

  return {
    reviewByReviewIdResponse,
    isLoadingReview,
    reviewError,
  };
};

export default useReviewByReviewIdQuery;
