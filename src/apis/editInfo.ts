import instance from '@/utils/axios';

interface UserData {
  name: string;
  realName?: string;
  phone?: string;
  profileImage?: string;
  description?: string;
}

export const putUserInfo = (data: UserData) => {
  return instance.put('user/modify', data);
};

export const putPassword = (data: {
  prevPassword: string;
  newPassword: string;
}) => {
  return instance.put('user/modify-password', data);
};
