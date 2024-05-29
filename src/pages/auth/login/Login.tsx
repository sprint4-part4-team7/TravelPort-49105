import Google from '@/assets/images/google_login.png';
import Kakao from '@/assets/images/kakao_login.svg';
import Naver from '@/assets/images/naver_login.png';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';
import useOAuthLogin from '@/hooks/useOAuthLogin';

const Login = () => {
  const googleLogin = useOAuthLogin('google');
  const kakaoLogin = useOAuthLogin('kakao');
  const naverLogin = useOAuthLogin('naver');

  const loginClick = () => {
    console.log('로그인');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-40 justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" />
        </Link>
        <div className="flex flex-col gap-30 max-w-350 ">
          <InputBox
            label="이메일"
            width="350px"
            placeholder="example@example.com"
          />
          <InputBox label="비밀번호" width="350px" placeholder="비밀번호" />
          <Button text="로그인 하기" onClick={loginClick} />
          <div className="text-center">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup/user">이메일로 회원가입</Link>
          </div>
          <div
            className="flex px-24 py-12 justify-between items-center  
    border-1 rounded-2xl 
    border-solid border-black"
          >
            <div className="text-3xl font-bold ">소셜 로그인</div>
            <div className="flex gap-16">
              <button type="button" onClick={googleLogin}>
                <img alt="Google" src={Google} />
              </button>
              <button type="button" onClick={kakaoLogin}>
                <img alt="Kakao" width="40px" height="40px" src={Kakao} />
              </button>
              <button type="button" onClick={naverLogin}>
                <img alt="Naver" width="40px" height="40px" src={Naver} />
              </button>
            </div>
          </div>
          <div className="text-center">
            파트너 등록이 필요하신가요?{' '}
            <Link to="/signup/partner">파트너 회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
