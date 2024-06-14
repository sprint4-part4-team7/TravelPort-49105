import { useQuery } from '@tanstack/react-query';
import reviewApi from '@/apis/review';

function useReviewAllQuery() {
  const {
    data: reviewAllResponse,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ['getReviewAll'],
    queryFn: reviewApi.getReviewAll,
  });

  const reviewAll = reviewAllResponse?.data;

  return {
    reviewAll,
    isLoadingReviews,
    reviewsError,
  };
}

export default useReviewAllQuery;
