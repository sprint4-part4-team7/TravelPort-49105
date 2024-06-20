import { useEffect, useState } from 'react';
import useReviewByReviewIdQuery from './reactQuery/review/useReviewByReviewIdQuery';

const useGetUserIdByReviewId = (reviewId: number) => {
  const [uId, setUId] = useState(0);
  const { reviewData } = useReviewByReviewIdQuery(reviewId);

  useEffect(() => {
    if (reviewData) {
      const reviewUId = reviewData.review.user.id;
      if (reviewUId) {
        setUId(reviewUId);
      }
    }
  }, [reviewData, reviewId]);

  return { uId };
};
export default useGetUserIdByReviewId;
