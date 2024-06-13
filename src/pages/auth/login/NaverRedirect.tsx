import { useNaverLoginMutation } from '@/hooks/reactQuery/auth/useSocialLoginMutation';
import { useEffect } from 'react';

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { mutate } = useNaverLoginMutation();

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Naver Redirect Page</h1>
    </div>
  );
};

export default NaverRedirect;
