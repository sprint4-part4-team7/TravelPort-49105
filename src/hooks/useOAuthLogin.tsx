import { useCallback } from 'react';

type Provider = 'google' | 'kakao' | 'naver';

const useOAuthLogin = (provider: Provider) => {
  const clientId = {
    google: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    kakao: process.env.REACT_APP_KAKAO_CLIENT_ID,
    naver: process.env.REACT_APP_NAVER_CLIENT_ID,
  };

  const uri = {
    google: `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=http://localhost:3000/login/oauth/google&client_id=${clientId.google}`,
    kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${clientId.kakao}&redirect_uri=http://localhost:3000/login/oauth/kakao&response_type=code`,
    naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId.naver}&state=hLiDdL2uhPtsftcU&redirect_uri=http://localhost:3000/login/oauth/naver&response_type=code`,
  };

  const loginHandler = useCallback(() => {
    window.location.href = uri[provider];
  }, [provider, uri]);

  return loginHandler;
};

export default useOAuthLogin;
