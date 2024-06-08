/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import instance from '@/utils/axios';
import {
  DefaultOptionType,
  GetReviewType,
  ReviewData,
  ReviewInfoType,
} from '@/constants/types';
import { getProduct } from './product';

export const postReview = async (
  userId: number,
  productOptionId: number,
  reviewInfo: ReviewInfoType,
) => {
  try {
    const response = await instance.post('/review', {
      userId,
      productOptionId,
      ...reviewInfo,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReviewInfo = async (
  reviewId: number,
): Promise<GetReviewType> => {
  try {
    const response = await instance.get(`/review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductReview = async (
  productId: number,
): Promise<ReviewData[]> => {
  try {
    const response = await instance.get(`/review/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteReviewInfo = async (reviewId: number) => {
  try {
    const response = await instance.delete(`/review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDefaultOption = async (
  optionId: number,
): Promise<DefaultOptionType> => {
  try {
    const response = await instance.get(`/productOption/${optionId}`);
    const { optionName } = response.data;
    const { productId } = response.data;
    const productName = (await getProduct(productId)).name;
    return { optionName, productName };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReviewAll = () => {
  return instance({
    url: `/review/all`,
    method: 'GET',
  });
};
