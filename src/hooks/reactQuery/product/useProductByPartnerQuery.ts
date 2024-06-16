import productApi from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

const useProductByPartnerQuery = (partnerId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getProductByPartner', partnerId],
    queryFn: () => productApi.getProductByPartner(partnerId),
  });

  const postingData = data?.data ?? [];

  return {
    postingData,
    isLoading,
    error,
  };
};

export default useProductByPartnerQuery;
