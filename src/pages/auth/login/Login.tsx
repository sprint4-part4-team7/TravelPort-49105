import Google from '@/assets/images/google_login.png';
import Kakao from '@/assets/images/kakao_login.svg';
import Naver from '@/assets/images/naver_login.png';
import { Link } from 'react-router-dom';
import useOAuthLogin from '@/hooks/useOAuthLogin';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/InputType';
import Logo from '@/assets/icons/travelPortLogo.svg';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';

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
  const googleLogin = useOAuthLogin('google');
  const kakaoLogin = useOAuthLogin('kakao');
  const naverLogin = useOAuthLogin('naver');

  const handleLoginForm = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen font-plexSans">
      <div className="flex flex-col gap-[4rem] justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" src={Logo} />
        </Link>
        <div className="flex flex-col gap-[3rem] max-w-[35rem] ">
          <form
            className="flex flex-col gap-[3rem]"
            onSubmit={handleSubmit(handleLoginForm)}
          >
            <InputBox
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
              text="로그인 하기"
              onClick={handleSubmit(handleLoginForm)}
            />
          </form>
          <div className="text-center text-14 text-black-12">
            아직 회원이 아니신가요?{' '}
            <Link className="text-blue-6" to="/signup/user">
              이메일로 회원가입
            </Link>
          </div>
          <div
            className="flex px-[2.4rem] py-[1.2rem] justify-between items-center  
    border-1 rounded-2xl 
    border-solid border-black-7"
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
          <div className="text-center text-14 text-black-12">
            파트너 등록이 필요하신가요?{' '}
            <Link className="text-blue-6" to="/signup/partner">
              파트너 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
