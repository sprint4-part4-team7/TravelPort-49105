// 카테고리(숙박,체험 고르기)의 api
import instance from '@/utils/axios';

export const postCategory = async (category: string) => {
  try {
    const response = await instance.post(`/category`, {
      name: category,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putCategory = async (id: number, category: string) => {
  try {
    const response = await instance.put(`/category/${id}`, {
      name: category,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategory = async (id: number) => {
  try {
    const response = await instance.get(`/category/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
