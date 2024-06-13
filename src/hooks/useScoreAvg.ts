import reviewApi from '@/apis/review';
import { useEffect, useState } from 'react';

const useScoreAvg = (id: number) => {
  const [total, setTotal] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const fetchProductReview = async () => {
      let count = 0;
      const response = await reviewApi.getProductReview(id);
      for (let i = 0; i < response.length; i++) {
        count += response[i].score;
      }
      setTotal(count);
      setLength(response.length);
    };
    fetchProductReview();
  }, [id]);
  const avg = Number((total / length).toFixed(1)) || 0;
  return { avg, length };
};

export default useScoreAvg;
