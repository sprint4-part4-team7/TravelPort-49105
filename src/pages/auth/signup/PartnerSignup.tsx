import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useState } from 'react';
import { EMAIL_REGEX } from '@/constants/InputType';
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

type EmailForm = {
  email: string;
};

const PartnerSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerSignupForm>({
    mode: 'onChange',
    defaultValues: { company: '', email: '', password: '', passwordCheck: '' },
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
    console.log('중복 확인');
    console.log(email);
  };

  const handleSignupForm = (data: PartnerSignupData) => {
    const { company, email, password } = data;
    console.log({ company, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-40 justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" />
        </Link>
        <div className="flex flex-col gap-30 max-w-350 ">
          <form
            className="flex flex-col gap-30 max-w-350 "
            onSubmit={handleSubmit(handleSignupForm)}
          >
            <InputBox label="닉네임" width="350px" placeholder="닉네임" />
            <div className="flex gap-10">
              <div className="relative">
                <InputBox
                  label="이메일"
                  width="350px"
                  placeholder="example@example.com"
                  error={errors.email}
                  register={register('email', {
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

            <InputBox label="비밀번호" width="350px" placeholder="비밀번호" />
            <InputBox
              label="비밀번호 확인"
              width="350px"
              placeholder="비밀번호 확인"
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
            일반 회원가입이 필요하신가요?{' '}
            <Link to="/signup/user">일반 회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignup;
