import cartApi from '@/apis/cart';
import { useQuery } from '@tanstack/react-query';

const useCartByUserIdQuery = (userId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getCartById', userId, cartApi.getCartById],
    queryFn: () => cartApi.getCartById(userId),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useCartByUserIdQuery;
