import { useEffect, useState } from 'react';
import useReviewByReviewIdQuery from '../reactQuery/review/useReviewByReviewIdQuery';

const useGetUserIdByReviewId = (reviewId: number) => {
  const [uId, setUId] = useState<number | null>(null);
  const { reviewData, isLoadingReview, reviewError } =
    useReviewByReviewIdQuery(reviewId);

  useEffect(() => {
    if (reviewData && !isLoadingReview) {
      const reviewUId = reviewData.review.user.id;
      if (reviewUId) {
        setUId(reviewUId);
      }
    }
  }, [reviewData, isLoadingReview]);

  return { uId, isLoadingReview, reviewError };
};
export default useGetUserIdByReviewId;
