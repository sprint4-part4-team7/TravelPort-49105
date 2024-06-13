import productApi from '@/apis/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProductProps {
  name: string;
  productType: string[];
  productDesc: string;
  productSiteLat: number;
  productSiteLng: number;
  productAddress: string;
  buildingName: string;
  thumbnail: string;
  productImages: string[];
  startDate: string;
  endDate: string;
  closedDay: string[];
}

interface ProductPostMutationProps {
  userId: number;
  categoryId: number;
  productInfo: ProductProps;
}

const useProductPostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      categoryId,
      productInfo,
    }: ProductPostMutationProps) => {
      return productApi.postProduct(userId, categoryId, productInfo);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['ProductPostMutationProps'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useProductPostMutation;
