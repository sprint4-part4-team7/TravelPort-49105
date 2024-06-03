import instance from '@/utils/axios';
import { setCookie } from '@/utils/cookie';
import axios from 'axios';

type LoginForm = {
  email: string;
  password: string;
};

export const postLogin = async (data: LoginForm) => {
  const { email, password } = data;
  try {
    const res = await instance.post('auth/user-login', {
      email,
      password,
    });
    const result = res.data;
    const ACCESS_TOKEN = result.accessToken;
    setCookie('accessToken', ACCESS_TOKEN);
    axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error(error.response.data.message);
    } else if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const getGoogleLogin = async (code: string | null) => {
  try {
    const res = await instance.get(`auth/google/callback?code=${code}`);
    const ACCESS_TOKEN = res.data.accessToken;
    setCookie('accessToken', ACCESS_TOKEN);
    axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getKakaoLogin = async (code: string | null) => {
  try {
    const res = await instance.get(`auth/kakao/callback?code=${code}`);
    const ACCESS_TOKEN = res.data.accessToken;
    setCookie('accessToken', ACCESS_TOKEN);
    axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getNaverLogin = async (code: string | null) => {
  try {
    const res = await instance.get(`auth/naver/callback?code=${code}`);
    const ACCESS_TOKEN = res.data.accessToken;
    setCookie('accessToken', ACCESS_TOKEN);
    axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error(error.response.data.message);
    }
  }
};
