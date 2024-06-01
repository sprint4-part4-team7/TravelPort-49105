/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import instance from '@/utils/axios';

// type postReviewData = {
//   userId: number;
//   productId: number;
//   productOptionId: number;
//   reviewInfo: {
//     reviewContent: string;
//     reviewScore: number;
//   };
// };

export const postReview = async (userId, productId, productOptionId, reviewInfo) => {
  try {
    const response = await instance.post('/review', {
      userId,
      productId,
      productOptionId,
      ...reviewInfo,
    });
    return response.data;
  } catch(error) {
    console.log(error?.message);
  }
};

export const getReviewInfo = async (reviewId) => {
  try {
    const response = await instance.get(`/review/${reviewId}`)
    return response.data
  } catch(error) {
    console.log(error?.message);
  }
}

export const putReviewInfo = async (userId, productId, productOptionId, reviewId, reviewInfo) => {
  try {
    const response = await instance.put(`/review/${reviewId}`, {
      userId,
      productId,
      productOptionId,
      ...reviewInfo
    })
    return response.data
  } catch(error) {
    console.log(error?.message);
  }
}

export const deleteReviewInfo = async (reviewId) => {
  try {
    const response = await instance.delete(`/review/${reviewId}`)
    return response.data
  } catch(error) {
    console.log(error?.message);
  }
}