// api/payments.ts
import instance from '@/utils/axios';

const getTimeTable = async (optionId: number) => {
  try {
    const response = await instance.get(`/timeTable/productOption/${optionId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTimeTable;
