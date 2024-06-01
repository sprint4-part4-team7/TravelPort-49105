import instance from '@/utils/axios';
import { setCookie } from '@/utils/cookie';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    // back-end로 인가 코드 전달
    const KakaoLogin = async () => {
      const res = await instance.get(`auth/kakao/callback?code=${code}`);
      const ACCESS_TOKEN = res.data.accessToken;
      setCookie('accessToken', ACCESS_TOKEN);
      axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;
    };
    KakaoLogin();
    navigate('/', { replace: true });
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Kakao Redirect Page</h1>
    </div>
  );
};

export default KakaoRedirect;
