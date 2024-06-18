// 상품 전체의 api
import instance from '@/utils/axios';

interface ProductProps {
  name: string;
  productType: string; // 라디오버튼으로 1개로 받기로 변경(백엔드도 고쳐줌)
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

const getProductAll = async () => {
  return instance({
    url: '/product/all',
    method: 'GET',
  });
};

const getProductByCategory = async (categoryId: number) => {
  return instance({
    url: `/product/all?categoryId=${categoryId}`,
    method: 'GET',
  });
};

const getProductById = async (productId: number) => {
  return instance({
    url: `/product/${productId}`,
    method: 'GET',
  });
};

const getProductByPartner = async (partnerId: number) => {
  return instance({
    url: `/product/user/${partnerId}`,
    method: 'GET',
  });
};

const putProduct = async (
  productId: number,
  userId: number,
  categoryId: number,
  productInfo: ProductProps,
) => {
  return instance({
    url: `/product/${productId}`,
    method: 'PUT',
    data: {
      userId,
      categoryId,
      ...productInfo,
    },
  });
};

const putPostingState = async (
  productId: number,
  userId: number,
  isPosting: boolean,
) => {
  return instance({
    url: `/product/${productId}`,
    method: 'PUT',
    data: {
      userId,
      isPosting,
    },
  });
};

const deleteProductById = async (productId: number) => {
  return instance({
    url: `/product/${productId}`,
    method: 'DELETE',
  });
};

const postProduct = async (
  userId: number,
  categoryId: number,
  productInfo: ProductProps,
) => {
  return instance({
    url: `/product`,
    method: 'POST',
    data: {
      userId,
      categoryId,
      ...productInfo,
    },
  });
};

export default {
  getProductAll,
  getProductByCategory,
  getProductById,
  getProductByPartner,
  putProduct,
  putPostingState,
  deleteProductById,
  postProduct,
};
