const EditInfo = () => {
  const inputStyle =
    'w-full h-32 border-2 border-gray-300 rounded-9 px-4 py-2 focus:outline-none focus:border-black-modal';
  const buttonStyle = 'w-full h-fit bg-black-modal text-white rounded-9';

  return (
    <div className="p-16 flex flex-col gap-12 w-767">
      <div className="text-16 flex flex-col gap-24">
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
                placeholder="닉네임을 입력해주세요"
              />
            </label>
            <label htmlFor="email">
              이메일
              <input
                type="text"
                id="email"
                className={inputStyle}
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
              placeholder="이름을 추가해주세요"
            />
          </label>
          <label htmlFor="phone">
            전화번호
            <input
              type="text"
              id="phone"
              className={inputStyle}
              placeholder="연락처를 추가해주세요"
            />
          </label>
          <button type="button" className={buttonStyle}>
            비밀번호 변경하기
          </button>
        </div>
        <button type="button" className={buttonStyle}>
          저장
        </button>
      </div>
    </div>
  );
};

export default EditInfo;
