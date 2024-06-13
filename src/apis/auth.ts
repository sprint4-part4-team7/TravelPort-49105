import instance from '@/utils/axios';
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
  return instance({
    url: '/auth/logout',
    method: 'POST',
  });
};

/**
 * 로그인된 유저 정보 확인 (파트너인지, 일반 유저인지, 닉네임, 프로필 이미지가 있는 api)
 */

/**
 * 로그인 & 소셜 로그인(Google, Kakao, Naver), Access Token Cookie 저장
 */
export const postLogin = async (data: LoginForm): Promise<any> => {
  const { email, password } = data;
  return instance({
    url: '/auth/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
};

export const getGoogleLogin = async (code: string | null): Promise<any> => {
  return instance({
    url: `/auth/google/callback?code=${code}`,
    method: 'GET',
  });
};

export const getKakaoLogin = async (code: string | null): Promise<any> => {
  return instance({
    url: `/auth/kakao/callback?code=${code}`,
    method: 'GET',
  });
};

export const getNaverLogin = async (code: string | null): Promise<any> => {
  return instance({
    url: `/auth/naver/callback?code=${code}`,
    method: 'GET',
  });
};

/**
 * 회원가입(유저(user), 파트너(partner))
 */

export const postVerifyEmail = async (email: string): Promise<any> => {
  return instance({
    url: '/auth/valid-email',
    method: 'POST',
    data: {
      email,
    },
  });
};

export const postUserSignup = async (data: UserSignupForm) => {
  const { nickname: name, email, password } = data;
  const loginType = 'USER';
  try {
    const res = await instance.post('auth/signup', {
      name,
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
  const { company: name, email, password } = data;
  const loginType = 'PARTNER';
  try {
    const res = await instance.post('auth/signup', {
      name,
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
