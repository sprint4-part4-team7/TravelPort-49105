import { getGoogleLogin } from '@/apis/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getGoogleLogin(code);
      navigate('/', { replace: true });
    } catch (error: any) {
      alert(error.message);
    }
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Google Redirect Page</h1>
    </div>
  );
};

export default GoogleRedirect;
