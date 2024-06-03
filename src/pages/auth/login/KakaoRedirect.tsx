import { getKakaoLogin } from '@/apis/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    // back-end로 인가 코드 전달
    try {
      getKakaoLogin(code);
    } catch (error: any) {
      alert(error.message);
    }
    navigate('/', { replace: true });
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Kakao Redirect Page</h1>
    </div>
  );
};

export default KakaoRedirect;
