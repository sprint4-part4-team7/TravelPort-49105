import instance from '@/utils/axios';

/**
 * 로그아웃
 */
const postLogout = () => {
  return instance({
    url: 'http://ec2-43-201-69-246.ap-northeast-2.compute.amazonaws.com/auth/logout',
    method: 'POST',
    data: '',
  });
};

/**
 * 로그인된 유저 정보 확인 (파트너인지, 일반 유저인지, 닉네임, 프로필 이미지가 있는 api)
 */

export default { postLogout };
