const initUserInfo = {
  nickname: 'nickname',
  email: 'email',
};

const initPartnerInfo = {
  nickname: 'partnerNickname',
  email: 'partnerEmail',
};

const password = 'travelPort49105!';

const checkPassword = (inputPassword: string) => {
  return inputPassword === password;
};

export { initUserInfo, initPartnerInfo, checkPassword };

// 사용자, 파트너 정보를 로그인(회원가입)에서 받고 전역으로 관리
// 이메일은 고정값으로 설정
// 이외의 데이터는 post or put 요청을 통해 보내고 결과를 받아옴

// 비밀번호 확인 api 전송 후 결과값 받아오기
