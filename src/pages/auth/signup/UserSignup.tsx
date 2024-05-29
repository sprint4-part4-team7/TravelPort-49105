import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import InputBox from '@/components/common/InputBox';

const UserSignup = () => {
  const signupClick = () => {
    console.log('일반 회원가입');
  };
  const checkClick = () => {
    console.log('중복 확인');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-40 justify-center items-center">
        <Link to="/">
          <img alt="travelport logo" />
        </Link>
        <div className="flex flex-col gap-30 max-w-350 ">
          <InputBox label="닉네임" width="350px" placeholder="닉네임" />
          <div className="flex gap-10">
            <InputBox
              label="이메일"
              width="300px"
              placeholder="example@example.com"
            />
            <Button text="중복 확인" onClick={checkClick} />
          </div>

          <InputBox label="비밀번호" width="350px" placeholder="비밀번호" />
          <InputBox
            label="비밀번호 확인"
            width="350px"
            placeholder="비밀번호 확인"
          />
          <Button text="회원가입 하기" onClick={signupClick} />
          <div className="text-center">
            이미 회원이신가요? <Link to="/login">로그인하기</Link>
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

export default UserSignup;
