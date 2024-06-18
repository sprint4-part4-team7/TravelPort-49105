import { postLogout } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return postLogout();
    },
    onSuccess: () => {
      toast.success('로그아웃 되었습니다.');
    },
  });
};

export default useLogoutMutation;
