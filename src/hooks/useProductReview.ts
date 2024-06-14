import { ReviewData } from '@/constants/types';
import { useEffect, useState } from 'react';
import useReviewByProductIdQuery from './reactQuery/review/useReviewByProductIdQuery';

const useProductReview = (productId: number) => {
  const [productReviews, setProductReviews] = useState<ReviewData[]>();

  const { reviewByProductIdResponse } = useReviewByProductIdQuery(productId);

  useEffect(() => {
    if (reviewByProductIdResponse) setProductReviews(reviewByProductIdResponse);
  }, [reviewByProductIdResponse]);

  return { productReviews };
};

export default useProductReview;
