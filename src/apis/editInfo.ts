import instance from '@/utils/axios';

interface UserData {
  name: string;
  realName?: string;
  phone?: string;
  profileImage?: string;
  description?: string;
}

const putUserInfo = (data: UserData) => {
  return instance.put('user/modify', data);
};

export default putUserInfo;
