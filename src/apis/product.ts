/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { CardListsType, DetailData, OptionData } from '@/constants/types';
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

export const getProductOption = async (
  productOptionId: number,
): Promise<OptionData> => {
  try {
    const response = await instance.get(`/productOption/${productOptionId}`);
    return response.data.productOption;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
