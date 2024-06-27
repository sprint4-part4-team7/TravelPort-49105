import Google from '@/assets/images/googleLogin.png';
import Kakao from '@/assets/icons/kakaoLogin.svg';
import Naver from '@/assets/images/naverLogin.png';
import {
  useGoogleLogin,
  useKakaoLogin,
  useNaverLogin,
} from '@/hooks/auth/useOAuthLogin';

interface SocialButtonProps {
  alt: string;
  src: string;
  onClick: () => void;
}

const SocialLoginButton = ({ alt, src, onClick }: SocialButtonProps) => (
  <button
    className="rounded-full hover:opacity-75 active:opacity-50"
    type="button"
    onClick={onClick}
  >
    <img className="rounded-full" alt={alt} width="50" height="50" src={src} />
  </button>
);

const SocialLogin = () => {
  const googleLogin = useGoogleLogin();
  const kakaoLogin = useKakaoLogin();
  const naverLogin = useNaverLogin();

  return (
    <div className="flex flex-col items-center justify-between gap-16">
      <div className="flex items-center justify-center gap-15">
        <div className="h-1 w-70 bg-black-5" />
        <div className="text-14 text-black-6 ">SNS로 간편하게 시작하기</div>
        <div className="h-1 w-70 bg-black-5" />
      </div>

      <div className="flex gap-20">
        <SocialLoginButton alt="Google" src={Google} onClick={googleLogin} />
        <SocialLoginButton alt="Kakao" src={Kakao} onClick={kakaoLogin} />
        <SocialLoginButton alt="Naver" src={Naver} onClick={naverLogin} />
      </div>
    </div>
  );
};

export default SocialLogin;
