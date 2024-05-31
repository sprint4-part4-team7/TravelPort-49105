import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/InputType';
import Logo from '@/assets/icons/travelPortLogo.svg';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';

interface UserSignupData {
  nickname: string;
  email: string;
  password: string;
}

interface UserSignupForm extends UserSignupData {
  passwordCheck: string;
}

type EmailForm = {
  email: string;
};

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserSignupForm>({
    mode: 'onChange',
    defaultValues: { nickname: '', email: '', password: '', passwordCheck: '' },
  });
  // const [isEmailValid, setIsEmailValid] = useState(false);
  const checkBtnBasic = 'absolute px-8 py-4 text-13 rounded top-44 right-12';

  let checkBtnClass = `${checkBtnBasic}`;

  if (errors.email) {
    checkBtnClass = `${checkBtnBasic} bg-black-4 text-black-6`;
  } else {
    checkBtnClass = `${checkBtnBasic} bg-blue-1 text-black-13`;
  }

  const handleCheckEmail = (data: EmailForm) => {
    const { email } = data;
    console.log(email);
  };

  const handleSignupForm = (data: UserSignupData) => {
    const { nickname, email, password } = data;
    console.log({ nickname, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-[4rem] justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" src={Logo} />
        </Link>
        <div className="flex flex-col gap-30 max-w-[35rem]">
          <form
            className="flex flex-col gap-30 max-w-[35rem] "
            onSubmit={handleSubmit(handleSignupForm)}
          >
            <InputBox
              label="닉네임"
              width="350px"
              placeholder="닉네임"
              error={errors.nickname}
              register={register('nickname', {
                required: { value: true, message: '닉네임을 입력해주세요.' },
                maxLength: {
                  value: 20,
                  message: '닉네임은 20자 이하로 입력해주세요',
                },
              })}
            />
            <div className="flex gap-10">
              <div className="relative">
                <InputBox
                  label="이메일"
                  width="350px"
                  placeholder="example@example.com"
                  error={errors.email}
                  register={register('email', {
                    required: {
                      value: true,
                      message: '이메일을 입력해주세요.',
                    },
                    pattern: {
                      value: EMAIL_REGEX,
                      message: '이메일 형식이 맞나요?',
                    },
                  })}
                />
                {errors.email ? (
                  <button
                    className={checkBtnClass}
                    type="button"
                    onClick={handleSubmit(handleCheckEmail)}
                    disabled
                  >
                    중복체크
                  </button>
                ) : (
                  <button
                    className={checkBtnClass}
                    type="button"
                    onClick={handleSubmit(handleCheckEmail)}
                  >
                    중복체크
                  </button>
                )}
              </div>
            </div>

            <InputBox
              label="비밀번호"
              inputType="password"
              width="350px"
              placeholder="비밀번호"
              error={errors.password}
              register={register('password', {
                required: {
                  value: true,
                  message: '비밀번호를 입력해주세요.',
                },
                pattern: {
                  value: PASSWORD_REGEX,
                  message: '비밀번호 형식이 맞나요?',
                },
              })}
            />
            <InputBox
              label="비밀번호 확인"
              inputType="password"
              width="350px"
              placeholder="비밀번호 확인"
              error={errors.passwordCheck}
              register={register('passwordCheck', {
                required: {
                  value: true,
                  message: '비밀번호 확인을 위해 입력해주세요.',
                },
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

          <div className="text-center text-14 text-black-13">
            이미 회원이신가요? <Link to="/login">로그인하기</Link>
          </div>

          <div className="text-center text-14 text-black-13">
            파트너 등록이 필요하신가요?{' '}
            <Link to="/signup/partner">파트너 회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
