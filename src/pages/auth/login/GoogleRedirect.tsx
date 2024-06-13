import { useGoogleLoginMutation } from '@/hooks/reactQuery/auth/useSocialLoginMutation';
import { useEffect } from 'react';

const GoogleRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { mutate } = useGoogleLoginMutation();

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Google Redirect Page</h1>
    </div>
  );
};

export default GoogleRedirect;
