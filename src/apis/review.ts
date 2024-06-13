/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import instance from '@/utils/axios';
import { GetReviewType, ReviewData, ReviewInfoType } from '@/constants/types';

const getReviewAll = () => {
  return instance({
    url: `/review/all`,
    method: 'GET',
  });
};

const getReviewInfo = async (reviewId: number): Promise<GetReviewType> => {
  return instance({
    url: `/review/${reviewId}`,
    method: 'GET',
  });
};

const putReview = async (
  userId: number,
  productOptionId: number,
  reviewId: number,
  reviewInfo: ReviewInfoType,
) => {
  return instance({
    url: `/review/${reviewId}`,
    method: 'POST',
    data: {
      userId,
      productOptionId,
      ...reviewInfo,
    },
  });
};

const deleteReview = async (reviewId: number) => {
  return instance({
    url: `/review/${reviewId}`,
    method: 'DELETE',
  });
};

const getProductReview = async (productId: number): Promise<ReviewData[]> => {
  return instance({
    url: `/review/product/${productId}`,
    method: 'GET',
  });
};

const postReview = async (
  userId: number,
  productOptionId: number,
  productId: number,
  reviewInfo: ReviewInfoType,
) => {
  return instance({
    url: '/review',
    method: 'POST',
    data: {
      userId,
      productOptionId,
      productId,
      ...reviewInfo,
    },
  });
};

// const getDefaultOption = async (
//   optionId: number,
// ): Promise<DefaultOptionType> => {
//   try {
//     const response = await instance.get(`/productOption/${optionId}`);
//     const { optionName } = response.data;
//     const { productId } = response.data;
//     const productName = (await product.getProductById(productId)).name;
//     return { optionName, productName };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export default {
  getReviewAll,
  getReviewInfo,
  putReview,
  deleteReview,
  getProductReview,
  postReview,
};
