import review from '@/apis/review';
import { useEffect, useState } from 'react';

const useGetUserIdByReviewId = (reviewId: number) => {
  const [uId, setUId] = useState(0);

  useEffect(() => {
    const fetchReviewData = async (rId: number) => {
      const response = await review.getReviewInfo(rId);
      setUId(response.review.userId);
    };
    fetchReviewData(reviewId);
  }, [reviewId]);

  return { uId };
};
export default useGetUserIdByReviewId;
