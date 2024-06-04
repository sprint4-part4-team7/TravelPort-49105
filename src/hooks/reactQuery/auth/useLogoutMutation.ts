import { postLogout } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return postLogout();
    },
  });
};

export default useLogoutMutation;
