import { useQuery } from '@tanstack/react-query';
import cartApi from '@/apis/cart';

const useCartByUserIdQuery = (userId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getCartById'],
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
