// 카테고리(숙박,체험 고르기)의 api
import instance from '@/utils/Axios';

export const postCategory = async (category: string) => {
  try {
    const response = await instance.post(`/category`, {
      name: category,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putCategory = async (id: number, category: string) => {
  try {
    const response = await instance.put(`/category/${id}`, {
      name: category,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (id: number) => {
  try {
    const response = await instance.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
