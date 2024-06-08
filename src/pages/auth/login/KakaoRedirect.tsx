import { getKakaoLogin } from '@/apis/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getKakaoLogin(code);
      navigate('/', { replace: true });
    } catch (error: any) {
      alert(error.message);
    }
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Kakao Redirect Page</h1>
    </div>
  );
};

export default KakaoRedirect;
