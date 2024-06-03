import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/InputType';
import Logo from '@/assets/icons/travelPortLogo.svg';
import instance from '@/utils/axios';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';

interface PartnerSignupData {
  company: string;
  email: string;
  password: string;
}

interface PartnerSignupForm extends PartnerSignupData {
  passwordCheck: string;
}

const PartnerSignup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PartnerSignupForm>({
    mode: 'onChange',
    defaultValues: { company: '', email: '', password: '', passwordCheck: '' },
  });
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const checkBtnBasic = 'absolute px-8 py-4 text-13 rounded top-44 right-12';

  let checkBtnClass = `${checkBtnBasic}`;
  let disableType = false;

  if (errors.email || !watch('email')) {
    disableType = true;
    checkBtnClass = `${checkBtnBasic} bg-black-3 text-black-5`;
  } else {
    disableType = false;
    checkBtnClass = `${checkBtnBasic} bg-blue-1 text-black-12`;
  }

  const handleCheckEmail = async () => {
    const email = watch('email');
    setIsEmailValid(false);
    try {
      const res = await instance({
        url: '/auth/valid-email',
        method: 'POST',
        data: {
          email,
        },
      });
      if (res.data.result) {
        setIsEmailValid(res.data.result);
        setEmailMessage(res.data.message);
      } else {
        setIsEmailValid(res.data.result);
        setEmailMessage(res.data.message);
      }
    } catch (e: any) {
      setIsEmailValid(false);
      setEmailMessage(e.message);
    }
  };

  const handleSignupForm = async (data: PartnerSignupData) => {
    const { company, email, password } = data;
    try {
      await instance({
        url: 'auth/partner-signup',
        method: 'POST',
        data: {
          company,
          email,
          password,
        },
      });
      if (isEmailValid) {
        navigate('/login', { replace: true });
      }
    } catch (e: any) {
      console.log(0);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-40 justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" src={Logo} />
        </Link>
        <div className="flex flex-col gap-30 max-w-350 ">
          <form
            className="flex flex-col gap-30 max-w-350 "
            onSubmit={handleSubmit(handleSignupForm)}
          >
            <InputBox
              label="이름/법인명"
              width="35rem"
              placeholder="이름/법인명"
              error={errors.company}
              register={register('company', {
                required: '이름 또는 법인명을 입력해주세요.',
              })}
            />
            <div className="flex gap-10">
              <div className="relative">
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
                <button
                  className={checkBtnClass}
                  type="button"
                  onClick={handleCheckEmail}
                  disabled={disableType}
                >
                  중복체크
                </button>
              </div>
              {isEmailValid !== null && !errors.email && (
                <p
                  className={`text-12 ${
                    isEmailValid ? 'text-system-complete' : 'text-system-error'
                  }`}
                >
                  {emailMessage}
                </p>
              )}
            </div>

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
                  message: '비밀번호 형식이 맞나요?',
                },
              })}
            />
            <InputBox
              label="비밀번호 확인"
              inputType="password"
              width="35rem"
              placeholder="비밀번호 확인"
              error={errors.passwordCheck}
              register={register('passwordCheck', {
                required: '비밀번호 확인을 위해 입력해주세요.',
                validate: (value) =>
                  value === getValues('password') ||
                  `위 비밀번호랑 일치하지 않아요!`,
              })}
            />
            <Button
              text="회원가입 하기"
              onClick={handleSubmit(handleSignupForm)}
            />
          </form>

          <div className="text-center text-14 text-black-12">
            이미 회원이신가요?{' '}
            <Link className="text-blue-6" to="/login">
              로그인하기
            </Link>
          </div>

          <div className="text-center text-14 text-black-12">
            일반 회원가입이 필요하신가요?{' '}
            <Link className="text-blue-6" to="/signup/user">
              일반 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignup;
