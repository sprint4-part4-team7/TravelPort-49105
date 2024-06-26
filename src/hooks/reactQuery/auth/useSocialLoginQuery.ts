import { getGoogleLogin, getKakaoLogin, getNaverLogin } from '@/apis/auth';
import { getCookie, setCookie } from '@/utils/Cookie';
import jwtDecode from '@/utils/JWTDecode';
import { useUserStore } from '@/utils/Zustand';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type SocialLoginType = {
  provider: 'google' | 'kakao' | 'naver';
  code: string | null;
};

const useSocialLoginQuery = ({ provider, code }: SocialLoginType) => {
  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const getLoginAPI = () => {
    switch (provider) {
      case 'google':
        return getGoogleLogin(code);
      case 'kakao':
        return getKakaoLogin(code);
      case 'naver':
        return getNaverLogin(code);
      default:
        throw new Error('Unsupported login type');
    }
  };

  const query = useQuery({
    queryKey: [provider, code],
    queryFn: () => getLoginAPI(),
    meta: {
      errorMessage: '소셜 로그인을 다시 확인해주세요.',
    },
  });

  useEffect(() => {
    if (query.data) {
      const ACCESS_TOKEN = query.data.data.accessToken;
      setCookie('accessToken', ACCESS_TOKEN);
      const token = getCookie('accessToken');
      if (token) {
        toast.success('소셜 로그인 완료!');
        const userInfo = jwtDecode(token);
        setUserInfo(userInfo);
        navigate('/');
      }
    }
  }, [provider, code, query.data]);

  return query;
};

export const useGoogleLoginQuery = (code: string | null) =>
  useSocialLoginQuery({ provider: 'google', code });
export const useKakaoLoginQuery = (code: string | null) =>
  useSocialLoginQuery({ provider: 'kakao', code });
export const useNaverLoginQuery = (code: string | null) =>
  useSocialLoginQuery({ provider: 'naver', code });
