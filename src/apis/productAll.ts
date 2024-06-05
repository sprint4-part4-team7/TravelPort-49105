// 상품 전체의 api
import instance from '@/utils/axios';

// export const getProductAll = async () => {
//   try {
//     const response = await instance.get(`/product/all`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const getProductAll = () => {
  return instance.get('/product/all');
};

export const getProductOptionAll = async () => {
  try {
    const response = await instance.get(`/productOption/all`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
