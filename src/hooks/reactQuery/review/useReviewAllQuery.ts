import { useQuery } from '@tanstack/react-query';
import { getReviewAll } from '@/apis/review';

function useReviewAllQuery() {
  return useQuery({
    queryKey: [getReviewAll],
    queryFn: async () => {
      const { data } = await getReviewAll();
      return data;
    },
  });
}

export default useReviewAllQuery;
