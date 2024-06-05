import instance from '@/utils/axios';
import { setCookie } from '@/utils/cookie';
import axios from 'axios';

type LoginForm = {
  email: string;
  password: string;
};

type UserSignupForm = {
  nickname: string;
  email: string;
  password: string;
};

type PartnerSignupForm = {
  company: string;
  email: string;
  password: string;
};

/**
 * 로그아웃
 */
export const postLogout = () => {
  return instance.post('auth/logout');
};

/**
 * 로그인된 유저 정보 확인 (파트너인지, 일반 유저인지, 닉네임, 프로필 이미지가 있는 api)
 */

/**
 * 로그인 & 소셜 로그인(Google, Kakao, Naver), Access Token Cookie 저장
 */
export const postLogin = async (data: LoginForm) => {
  const { email, password } = data;
  try {
    const res = await instance.post('auth/login', {
      email,
      password,
    });
    const result = res.data;
    const ACCESS_TOKEN = result.accessToken;
    setCookie('accessToken', ACCESS_TOKEN);
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
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error(error.response.data.message);
    }
  }
};

/**
 * 회원가입(유저(user), 파트너(partner))
 */
export const postVerifyEmail = async (email: string) => {
  try {
    const res = await instance.post('auth/valid-email', { email });
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

export const postUserSignup = async (data: UserSignupForm) => {
  const { nickname, email, password } = data;
  const loginType = 'USER';
  try {
    const res = await instance.post('auth/signup', {
      nickname,
      email,
      password,
      loginType,
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

export const postPartnerSignup = async (data: PartnerSignupForm) => {
  const { company, email, password } = data;
  const loginType = 'PARTNER';
  try {
    const res = await instance.post('auth/signup', {
      company,
      email,
      password,
      loginType,
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
