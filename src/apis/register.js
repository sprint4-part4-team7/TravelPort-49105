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

const postReview = async (userId, productId, productOptionId, reviewInfo) => {
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
export default postReview;
