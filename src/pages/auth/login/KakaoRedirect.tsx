import { useKakaoLoginMutation } from '@/hooks/reactQuery/auth/useSocialLoginMutation';
import { useEffect } from 'react';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { mutate } = useKakaoLoginMutation();

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Kakao Redirect Page</h1>
    </div>
  );
};

export default KakaoRedirect;
