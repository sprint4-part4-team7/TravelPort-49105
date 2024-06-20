import { postSignup } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  loginType: 'USER' | 'PARTNER';
  isEmailValid: boolean | null | undefined;
};

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: SignupForm) => {
      const { name, email, password, loginType } = data;
      if (data.isEmailValid) {
        const res = await postSignup({ name, email, password, loginType });
        return res.data;
      }
      if (data.isEmailValid === null || data.isEmailValid === undefined) {
        toast.error('이메일 중복여부를 확인해주세요.');
        throw new Error('이메일 중복여부를 확인해주세요.');
      } else {
        toast.error('이미 가입한 계정입니다.');
        throw new Error('이미 가입한 계정입니다.');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.message);
    },
  });
};

export default useSignupMutation;
