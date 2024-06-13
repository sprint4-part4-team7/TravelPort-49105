import { getGoogleLogin, getKakaoLogin, getNaverLogin } from '@/apis/auth';
import { getCookie, setCookie } from '@/utils/cookie';
import jwtDecode from '@/utils/jwtDecode';
import { useUserStore } from '@/utils/zustand';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Provider = 'google' | 'kakao' | 'naver';

const useSocialLoginMutation = (loginType: Provider) => {
  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const getLoginAPI = (code: string | null) => {
    switch (loginType) {
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

  return useMutation({
    mutationFn: async (code: string | null) => {
      const res = await getLoginAPI(code);
      const ACCESS_TOKEN = res.data.accessToken;
      setCookie('accessToken', ACCESS_TOKEN);
      return res;
    },
    onSuccess: () => {
      const token = getCookie('accessToken');
      if (token) {
        const userInfo = jwtDecode(token);
        setUserInfo(userInfo);
        navigate('/');
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        throw new Error(error.response.data.message);
      }
    },
  });
};

export const useGoogleLoginMutation = () => useSocialLoginMutation('google');
export const useKakaoLoginMutation = () => useSocialLoginMutation('kakao');
export const useNaverLoginMutation = () => useSocialLoginMutation('naver');
