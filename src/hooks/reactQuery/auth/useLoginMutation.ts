import { postLogin } from '@/apis/auth';
import { getCookie, setCookie } from '@/utils/Cookie';
import jwtDecode from '@/utils/JWTDecode';
import { useUserStore } from '@/utils/Zustand';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type LoginForm = {
  email: string;
  password: string;
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({
        queryKey: ['postLogin'],
      });
      const token = getCookie('accessToken');
      if (token) {
        toast.success('정상적으로 로그인 되었습니다.');
        const userInfo = jwtDecode(token);
        setUserInfo(userInfo);
        navigate('/');
      }
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
        throw new Error(error.response?.data.message);
      } else {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
  });
};

export default useLoginMutation;
