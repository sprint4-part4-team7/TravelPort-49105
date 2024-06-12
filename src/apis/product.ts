/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { CardListsType, DetailData } from '@/constants/types';
import instance from '@/utils/axios';

export const getProduct = async (productId: number): Promise<DetailData> => {
  try {
    const response = await instance.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductOption = (productOptionId: number) => {
  return instance.get(`/productOption/${productOptionId}`);
};

export const getProductOptions = async (
  productId: number,
): Promise<CardListsType[]> => {
  try {
    const response = await instance.get(`/productOption/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
