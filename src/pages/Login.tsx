import Google from '@/assets/images/google_login.png';
import Kakao from '@/assets/images/kakao_login.png';
import Naver from '@/assets/images/naver_login.png';

const Login = () => {
  const GoogleId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const KakaoId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const NaverId = process.env.REACT_APP_NAVER_CLIENT_ID;

  const GoogleURI = `https://accounts.google.com/o/oauth2/auth?client_id=${GoogleId}&redirect_uri=http://localhost:3000/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  const GoogleLoginHandler = () => {
    window.location.href = GoogleURI;
  };

  const KakaoURI = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoId}&redirect_uri=http://localhost:3000/login&response_type=code`;
  const KakaoLoginHandler = () => {
    window.location.href = KakaoURI;
  };

  const NaverURI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverId}&state=hLiDdL2uhPtsftcU&redirect_uri=http://localhost:3000/login&response_type=code`;
  const NaverLoginHandler = () => {
    window.location.href = NaverURI;
  };

  return (
    <div
      className="flex justify-between items-center w-400 h-50 
      border-1 rounded-2xl 
      border-solid border-black"
    >
      <span className="text-3xl font-bold ">SNS Login</span>
      <button type="button" onClick={GoogleLoginHandler}>
        <img alt="Google" src={Google} />
      </button>
      <button type="button" onClick={KakaoLoginHandler}>
        <img alt="Google" src={Kakao} />
      </button>
      <button type="button" onClick={NaverLoginHandler}>
        <img alt="Naver" width="40px" height="40px" src={Naver} />
      </button>
    </div>
  );
};

export default Login;
