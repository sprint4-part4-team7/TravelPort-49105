import { postLogin } from '@/apis/auth';
import { setCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type LoginForm = {
  email: string;
  password: string;
};

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await postLogin(data);
      const ACCESS_TOKEN = res.data.accessToken;
      setCookie('accessToken', ACCESS_TOKEN);
      return res.data;
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
