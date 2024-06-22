import Google from '@/assets/images/google_login.png';
import Kakao from '@/assets/images/kakao_login.svg';
import Naver from '@/assets/images/naver_login.png';
import { Link } from 'react-router-dom';
import {
  useGoogleLogin,
  useKakaoLogin,
  useNaverLogin,
} from '@/hooks/useOAuthLogin';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/InputType';
import Logo from '@/assets/icons/travelPortLogo-login.svg';
import useLoginMutation from '@/hooks/reactQuery/auth/useLoginMutation';
import InputBox from '@/components/common/InputBox';
import Button from '@/components/common/Button';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' });
  const googleLogin = useGoogleLogin();
  const kakaoLogin = useKakaoLogin();
  const naverLogin = useNaverLogin();
  const { mutate } = useLoginMutation();

  const handleLoginForm = (data: LoginForm) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen my-20">
      <div className="flex flex-col gap-60 justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" width="180" src={Logo} />
        </Link>
        <div className="flex flex-col gap-30 max-w-350 ">
          <form
            className="flex flex-col gap-30"
            onSubmit={handleSubmit(handleLoginForm)}
          >
            <InputBox
              id="email"
              label="이메일"
              width="35rem"
              placeholder="example@example.com"
              error={errors.email}
              register={register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: EMAIL_REGEX,
                  message: '이메일 형식이 맞나요?',
                },
              })}
            />
            <InputBox
              id="password"
              label="비밀번호"
              inputType="password"
              width="35rem"
              placeholder="비밀번호"
              error={errors.password}
              register={register('password', {
                required: '비밀번호를 입력해주세요.',

                pattern: {
                  value: PASSWORD_REGEX,
                  message: '비밀번호를 확인해보세요!',
                },
              })}
            />
            <Button
              buttonType="submit"
              buttonStyle="p-12 text-16 font-semibold"
              onClick={handleSubmit(handleLoginForm)}
            >
              로그인 하기
            </Button>
          </form>
          <div className="text-center text-14 text-black-12">
            아직 회원이 아니신가요?{' '}
            <Link
              className="hover:opacity-75 active:opacity-50 text-blue-6"
              to="/signup/user"
            >
              이메일로 회원가입
            </Link>
          </div>
          <div className="flex flex-col gap-16 justify-between items-center">
            <div className="flex justify-center items-center gap-15">
              <div className="w-70 h-1 bg-black-5" />
              <div className="text-14 text-black-6 ">
                SNS로 간편하게 시작하기
              </div>
              <div className="w-70 h-1 bg-black-5" />
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
          <div className="text-center text-14 text-black-12">
            파트너 등록이 필요하신가요?{' '}
            <Link
              className="hover:opacity-75 active:opacity-50 text-blue-6"
              to="/signup/partner"
            >
              파트너 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
