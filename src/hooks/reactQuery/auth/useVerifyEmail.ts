import { postVerifyEmail } from '@/apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await postVerifyEmail(email);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['postVerifyEmail'],
      });
    },
  });
};

export default useVerifyEmail;
