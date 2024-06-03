import instance from '@/utils/axios';
import axios from 'axios';

interface UserSignupData {
  nickname: string;
  email: string;
  password: string;
}

interface PartnerSignupData {
  company: string;
  email: string;
  password: string;
}

export const postVerifyEmail = async (email: string) => {
  try {
    const res = await instance.post('/auth/valid-email', { email });
    const result = res.data;
    return result;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const postUserSignup = async (data: UserSignupData) => {
  const { nickname, email, password } = data;
  try {
    const res = await instance.post('/auth/user-signup', {
      nickname,
      email,
      password,
    });
    const result = res.data;
    return result;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// 현재 Swagger에는 /auth/partner-signup이 없음
// 추가 뒤 사용 권장
export const postPartnerSignup = async (data: PartnerSignupData) => {
  const { company, email, password } = data;
  try {
    const res = await instance.post('/auth/partner-signup', {
      company,
      email,
      password,
    });
    const result = res.data;
    return result;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
