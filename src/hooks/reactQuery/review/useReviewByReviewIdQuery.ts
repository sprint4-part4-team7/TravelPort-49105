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

  const reviewData = reviewByReviewIdResponse?.data;

  return {
    reviewData,
    isLoadingReview,
    reviewError,
  };
};

export default useReviewByReviewIdQuery;
