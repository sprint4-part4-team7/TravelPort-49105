import Google from '@/assets/images/google_login.png';
import Kakao from '@/assets/images/kakao_login.png';
import Naver from '@/assets/images/naver_login.png';
import useOAuthLogin from '@/hooks/useOAuthLogin';

const Login = () => {
  const googleLogin = useOAuthLogin('google');
  const kakaoLogin = useOAuthLogin('kakao');
  const naverLogin = useOAuthLogin('naver');

  return (
    <div
      className="flex justify-between items-center w-400 h-50 
      border-1 rounded-2xl 
      border-solid border-black"
    >
      <span className="text-3xl font-bold ">SNS Login</span>
      <button type="button" onClick={googleLogin}>
        <img alt="Google" src={Google} />
      </button>
      <button type="button" onClick={kakaoLogin}>
        <img alt="Google" src={Kakao} />
      </button>
      <button type="button" onClick={naverLogin}>
        <img alt="Naver" width="40px" height="40px" src={Naver} />
      </button>
    </div>
  );
};

export default Login;
