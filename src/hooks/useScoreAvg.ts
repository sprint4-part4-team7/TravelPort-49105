import { getProductReview } from '@/apis/review';
import { useEffect, useState } from 'react';

const useScoreAvg = () => {
  const [total, setTotal] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const fetchProductReview = async () => {
      let count = 0;
      const response = await getProductReview(1);
      for (let i = 0; i < response.length; i++) {
        count += response[i].score;
      }
      setTotal(count);
      setLength(response.length);
    };
    fetchProductReview();
  }, []);
  const avg = Number((total / length).toFixed(1));
  return { avg, length };
};

export default useScoreAvg;
