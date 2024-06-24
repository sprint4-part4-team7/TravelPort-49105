import instance from '@/utils/Axios';

type LoginForm = {
  email: string;
  password: string;
};

type SignupForm = {
  name: string;
  email: string;
  password: string;
  loginType: 'USER' | 'PARTNER';
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
 * 회원가입(이메일 중복 확인, 회원가입 API)
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

export const postSignup = async (data: SignupForm): Promise<any> => {
  const { name, email, password, loginType } = data;
  return instance({
    url: '/auth/signup',
    method: 'POST',
    data: {
      name,
      email,
      password,
      loginType,
    },
  });
};
