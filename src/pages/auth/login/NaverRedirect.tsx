import { getNaverLogin } from '@/apis/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getNaverLogin(code);
    } catch (error: any) {
      alert(error.message);
    }
    navigate('/', { replace: true });
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Naver Redirect Page</h1>
    </div>
  );
};

export default NaverRedirect;
