import { postVerifyEmail } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await postVerifyEmail(email);
      return res.data;
    },
  });
};

export default useVerifyEmail;
