import productApi from '@/apis/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProductProps {
  name: string;
  productType: string; // 백엔드에서 string[] -> string으로 고쳐주셨습니다.
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

interface ProductPutMutationProps {
  productId: number;
  userId: number;
  categoryId: number;
  productInfo: ProductProps;
}

const useProductPutMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      productId,
      userId,
      categoryId,
      productInfo,
    }: ProductPutMutationProps) => {
      return productApi.putProduct(productId, userId, categoryId, productInfo);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['productPutMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useProductPutMutation;
