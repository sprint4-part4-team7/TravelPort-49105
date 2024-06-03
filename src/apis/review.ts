/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import instance from '@/utils/axios';

type ReviewInfoType = {
  reviewContent: string;
  reviewScore: number;
};

type GetReviewType = {
  id: number;
  userId: number;
  productOptionId: number;
  score: number;
  reviewImages: string[];
  reviewContent: string;
  partnerAnswer: string;
  createdAt: string;
};

type DefaultOptionType = {
  optionName: string;
  productName: string;
};

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
    const productName = await instance.get(`/product/${productId}`);
    return { optionName, productName };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
