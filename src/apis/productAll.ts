// 상품 전체의 api
import instance from '@/utils/axios';

export const getProductAll = async () => {
  try {
    const response = await instance.get(`/product/all`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductOptionAll = async () => {
  try {
    const response = await instance.get(`/productOption/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
