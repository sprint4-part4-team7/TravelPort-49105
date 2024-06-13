// 상품 전체의 api
import { ProductType } from '@/constants/types';
import instance from '@/utils/axios';

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

const getProductAll = () => {
  return instance({
    url: '/product/all',
    method: 'GET',
  });
};

const getProductById = (productId: number): Promise<ProductType> => {
  return instance({
    url: `/product/${productId}`,
    method: 'GET',
  });
};

const putProduct = (
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

const deleteProductById = (productId: number) => {
  return instance({
    url: `/product/${productId}`,
    method: 'DELETE',
  });
};

const postProduct = (
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
  getProductById,
  putProduct,
  deleteProductById,
  postProduct,
};
