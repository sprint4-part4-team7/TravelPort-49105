import {
  useGoogleLogin,
  useKakaoLogin,
  useNaverLogin,
} from '@/hooks/auth/useOAuthLogin';

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
        <button
          className="rounded-full hover:opacity-75 active:opacity-50"
          type="button"
          onClick={googleLogin}
        >
          <img
            className="rounded-full"
            alt="Google"
            width="50"
            height="50"
            src={Google}
          />
        </button>
        <button
          className="rounded-full hover:opacity-75 active:opacity-50"
          type="button"
          onClick={kakaoLogin}
        >
          <img
            className="rounded-full"
            alt="Kakao"
            width="50"
            height="50"
            src={Kakao}
          />
        </button>
        <button
          className="rounded-full hover:opacity-75 active:opacity-50"
          type="button"
          onClick={naverLogin}
        >
          <img
            className="rounded-full"
            alt="Naver"
            width="50"
            height="50"
            src={Naver}
          />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
