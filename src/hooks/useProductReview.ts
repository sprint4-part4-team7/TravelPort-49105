import reviewApi from '@/apis/review';
import { ReviewData } from '@/constants/types';
import { useEffect, useState } from 'react';

const useProductReview = (productId: number) => {
  const [productReviews, setProductReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const fetchProductReview = async () => {
      const resp = await reviewApi.getProductReview(productId);
      setProductReviews(resp);
    };
    fetchProductReview();
  }, []);

  return { productReviews };
};

export default useProductReview;
