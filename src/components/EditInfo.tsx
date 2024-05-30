import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useUserStore } from '@/utils/zustand';
import { initUserInfo } from '@/mocks/InfoMock';

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
  const handleSave: FormEventHandler = (e) => {
    e.preventDefault();
    if (!edittedInfo.nickname) {
      alert('닉네임을 입력해주세요');
      return;
    }
    setUserInfo(edittedInfo);
    alert('저장되었습니다');
    console.log(edittedInfo);
  };

  const inputStyle =
    'w-full h-32 border-2 border-gray-300 rounded-9 px-4 py-2 focus:outline-none focus:border-black-modal';
  const buttonStyle = 'w-full h-fit bg-black-modal text-white rounded-9';

  return (
    <div className="p-16 flex flex-col gap-12 w-767">
      <form className="text-16 flex flex-col gap-24" onSubmit={handleSave}>
        <div className="flex flex-row gap-6 items-center">
          <label htmlFor="profile" className="p-40 rounded-9 bg-black-modal">
            프로필 사진
            <input type="file" id="profile" hidden />
          </label>
          <div className="flex flex-col gap-6">
            <label htmlFor="nickname">
              닉네임
              <input
                type="text"
                id="nickname"
                className={inputStyle}
                value={edittedInfo.nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임을 입력해주세요"
              />
            </label>
            <label htmlFor="email">
              이메일
              <input
                type="text"
                id="email"
                className="w-full h-32 border-2 border-gray-300 rounded-9 px-4 py-2 text-gray-500 focus:outline-none"
                value={edittedInfo.email}
                disabled
                placeholder="이메일을 입력해주세요"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-fit">
          <label htmlFor="name">
            이름
            <input
              type="text"
              id="name"
              className={inputStyle}
              value={edittedInfo.name}
              onChange={handleNameChange}
              placeholder="이름을 추가해주세요"
            />
          </label>
          <label htmlFor="phone">
            전화번호
            <input
              type="text"
              id="phone"
              className={inputStyle}
              value={edittedInfo.phone}
              onChange={handlePhoneChange}
              placeholder="연락처를 추가해주세요"
            />
          </label>
          <button type="button" className={buttonStyle}>
            비밀번호 변경하기
          </button>
        </div>
        <button type="submit" className={buttonStyle} onSubmit={handleSave}>
          저장
        </button>
      </form>
    </div>
  );
};

export default EditInfo;
