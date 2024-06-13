import { postLogin } from '@/apis/auth';
import { getCookie, setCookie } from '@/utils/cookie';
import jwtDecode from '@/utils/jwtDecode';
import { useUserStore } from '@/utils/zustand';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type LoginForm = {
  email: string;
  password: string;
};

const useLoginMutation = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await postLogin(data);
      const ACCESS_TOKEN = res.data.accessToken;
      setCookie('accessToken', ACCESS_TOKEN);
      return res.data;
    },
    onSuccess: () => {
      const token = getCookie('accessToken');
      if (token) {
        const userInfo = jwtDecode(token);
        setUserInfo(userInfo);
        navigate('/');
      }
    },
    onError(error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error(error.response.data.message);
      } else if (axios.isAxiosError(error) && error.response?.status === 500) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    },
  });
};

export default useLoginMutation;
