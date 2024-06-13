import { postSignup } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  loginType: 'USER' | 'PARTNER';
};

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: SignupForm) => {
      const res = await postSignup(data);
      return res.data;
    },
  });
};

export default useSignupMutation;
