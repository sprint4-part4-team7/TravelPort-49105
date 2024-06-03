import { getGoogleLogin } from '@/apis/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getGoogleLogin(code);
    } catch (error: any) {
      alert(error.message);
    }
    navigate('/', { replace: true });
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Google Redirect Page</h1>
    </div>
  );
};

export default GoogleRedirect;
