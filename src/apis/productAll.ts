// 상품 전체의 api
import instance from '@/utils/axios';

export const getProductAll = () => {
  return instance.get('/product/all');
};

export const getProductOptionAll = () => {
  return instance({
    url: `/productOption/all`,
    method: 'GET',
  });
};
