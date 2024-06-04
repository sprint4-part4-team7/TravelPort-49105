import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/auth';

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return authApi.postLogout();
    },
  });
};

export default useLogoutMutation;
