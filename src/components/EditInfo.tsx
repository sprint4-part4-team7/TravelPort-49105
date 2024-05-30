import { ChangeEventHandler, useState } from 'react';
import { useUserStore } from '@/utils/zustand';
import { initUserInfo } from '@/mocks/InfoMock';
import Button from '@/components/common/Button';
import InputBox from './common/InputBox';

interface UserInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
}

const EditInfo = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [edittedInfo, setEdittedInfo] = useState<UserInfo>(initUserInfo);

  const handleNicknameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEdittedInfo({ ...edittedInfo, nickname: e.target.value });
  };
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEdittedInfo({ ...edittedInfo, name: e.target.value });
  };
  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEdittedInfo({ ...edittedInfo, phone: e.target.value });
  };
  const handleSave = () => {
    if (!edittedInfo.nickname) {
      alert('닉네임을 입력해주세요');
      return;
    }
    setUserInfo(edittedInfo);
    alert('저장되었습니다');
    console.log(edittedInfo);
  };

  return (
    <div className="p-16 flex flex-col gap-12 w-767">
      <form className="text-16 flex flex-col gap-24" onSubmit={handleSave}>
        <div className="flex flex-row gap-24 items-center">
          <label htmlFor="profile" className="p-40 rounded-9 bg-black-modal">
            프로필 사진
            <input type="file" id="profile" hidden />
          </label>
          <div className="flex flex-col gap-12">
            <InputBox
              label="닉네임"
              value={edittedInfo.nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요"
              width="100%"
            />
            <InputBox label="이메일" value={edittedInfo.email} width="100%" />
          </div>
        </div>
        <div className="flex flex-col gap-12 w-fit">
          <InputBox
            label="이름"
            value={edittedInfo.name}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요"
          />
          <InputBox
            label="전화번호"
            value={edittedInfo.phone}
            onChange={handlePhoneChange}
            placeholder="전화번호를 입력해주세요"
          />
          <Button
            text="비밀번호 변경하기"
            onClick={() => console.log('비밀번호 변경')}
          />
        </div>
        <Button text="저장하기" onClick={handleSave} />
      </form>
    </div>
  );
};

export default EditInfo;
