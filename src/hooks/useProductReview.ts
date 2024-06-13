import { ReviewData } from '@/constants/types';
import { useState } from 'react';
import useReviewByProductIdQuery from './reactQuery/review/useReviewByProductIdQuery';

const useProductReview = (productId: number) => {
  const [productReviews, setProductReviews] = useState<ReviewData[]>();

  const { reviewByProductIdResponse } = useReviewByProductIdQuery(productId);

  setProductReviews(reviewByProductIdResponse);

  return { productReviews };
};

export default useProductReview;
