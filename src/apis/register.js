/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import instance from '@/utils/axios';

const postReview = async (reviewInfo) => {
  try {
    const response = await instance.post('/review', reviewInfo);
    return response;
  } catch(error) {
    console.log(error.message);
  }
};
export default postReview;
