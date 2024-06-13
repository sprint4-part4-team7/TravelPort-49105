import { useQuery } from '@tanstack/react-query';
import reviewApi from '@/apis/review';

function useReviewAllQuery() {
  return useQuery({
    queryKey: ['getReviewAll'],
    queryFn: async () => {
      const { data } = await reviewApi.getReviewAll();
      return data;
    },
  });
}

export default useReviewAllQuery;
