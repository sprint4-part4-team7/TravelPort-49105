import review from '@/apis/review';
import { useQuery } from '@tanstack/react-query';

function useReviewByProductIdQuery(productId: number) {
  const {
    data: reviewByProductIdResponse,
    isLoading: isLoadingReview,
    error: reviewError,
  } = useQuery({
    queryKey: ['getReviewByProductId', productId],
    queryFn: () => review.getProductReview(productId),
  });

  return {
    reviewByProductIdResponse,
    isLoadingReview,
    reviewError,
  };
}

export default useReviewByProductIdQuery;
