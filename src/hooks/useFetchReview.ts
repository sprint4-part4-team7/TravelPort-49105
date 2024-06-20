import { GetReviewType, ReviewByIdData } from '@/constants/types';
import { useState } from 'react';
import useReviewByReviewIdQuery from './reactQuery/review/useReviewByReviewIdQuery';

const useFetchReview = (curReviewId: number) => {
  const [review, setReview] = useState<ReviewByIdData>();

  const { reviewData } = useReviewByReviewIdQuery(curReviewId);

  setReview(reviewData);

  return { review };
};

export default useFetchReview;
