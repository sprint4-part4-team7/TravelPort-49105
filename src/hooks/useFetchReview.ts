import { getReviewInfo } from '@/apis/review';
import { ReviewData } from '@/constants/types';
import { useEffect, useState } from 'react';

const useFetchReview = (curReviewId: number) => {
  const [review, setReview] = useState<ReviewData>();

  useEffect(() => {
    const fetchReview = async (reviewId: number) => {
      const reviewData = await getReviewInfo(reviewId);
      setReview(reviewData.review);
    };
    fetchReview(curReviewId);
  });

  return { review };
};

export default useFetchReview;
