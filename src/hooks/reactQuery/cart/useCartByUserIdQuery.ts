import cartApi from '@/apis/cart';
import { useQuery } from '@tanstack/react-query';

const useCartByUserIdQuery = (userId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getCartById', userId],
    queryFn: () => cartApi.getCartById(userId),
  });

  const cartData = data?.data;

  return {
    cartData,
    isLoading,
    error,
  };
};

export default useCartByUserIdQuery;
