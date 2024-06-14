import { GetReviewType } from '@/constants/types';
import { useState } from 'react';
import useReviewByReviewIdQuery from './reactQuery/review/useReviewByReviewIdQuery';

const useFetchReview = (curReviewId: number) => {
  const [review, setReview] = useState<GetReviewType>();

  const { reviewByReviewIdResponse } = useReviewByReviewIdQuery(curReviewId);

  setReview(reviewByReviewIdResponse);

  return { review };
};

export default useFetchReview;
