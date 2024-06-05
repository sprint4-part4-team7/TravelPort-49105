import { useQuery } from '@tanstack/react-query';
import { getProductAll } from '@/apis/productAll';

const useProductAllQuery = () => {
  return useQuery({
    queryKey: [getProductAll],
    queryFn: async () => {
      const data = await getProductAll();
      return data;
    },
    // { Success or Error 처리 등의 옵션자리 }
  });
};

export default useProductAllQuery;
