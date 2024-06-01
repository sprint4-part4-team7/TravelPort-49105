import instance from '@/utils/axios';
import { setCookie } from '@/utils/cookie';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    // back-end로 인가 코드 전달
    const GoogleLogin = async () => {
      const res = await instance.get(`auth/google/callback?code=${code}`);
      const ACCESS_TOKEN = res.data.accessToken;
      console.log(ACCESS_TOKEN);
      setCookie('accessToken', ACCESS_TOKEN);
      axios.defaults.headers.common.Authorization = `${ACCESS_TOKEN}`;
    };
    GoogleLogin();
    navigate('/', { replace: true });
  }, [code]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Google Redirect Page</h1>
    </div>
  );
};

export default GoogleRedirect;
