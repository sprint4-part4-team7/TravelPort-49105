import { useEffect, useState } from 'react';
import { ReviewData } from '@/constants/Types';
import useReviewByProductIdQuery from '../reactQuery/review/useReviewByProductIdQuery';

const useProductReview = (productId: number) => {
  const [productReviews, setProductReviews] = useState<ReviewData[]>([]);

  const { reviewByProductId } = useReviewByProductIdQuery(productId);

  useEffect(() => {
    if (reviewByProductId) setProductReviews(reviewByProductId);
  }, [reviewByProductId]);

  return { productReviews };
};

export default useProductReview;
