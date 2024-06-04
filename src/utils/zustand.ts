import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
  profileImage?: string;
}
interface UserState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: {
        id: 0,
        nickname: '',
        email: '',
        profileImage:
          'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
      },
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'user-info',
    },
  ),
);

interface PartnerInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
  introduction?: string;
  profileImage?: string;
}

interface PartnerState {
  partnerInfo: PartnerInfo;
  setPartnerInfo: (partnerInfo: PartnerInfo) => void;
}

export const usePartnerStore = create(
  persist<PartnerState>(
    (set) => ({
      partnerInfo: {
        id: 0,
        nickname: '',
        email: '',
      },
      setPartnerInfo: (partnerInfo) => set({ partnerInfo }),
    }),
    {
      name: 'partner-info',
    },
  ),
);

interface UserMypageState {
  userMypage: string;
  setUserMypage: (userMypage: string) => void;
}

export const useUserMypageStore = create(
  persist<UserMypageState>(
    (set) => ({
      userMypage: 'user',
      setUserMypage: (userMypage) => set({ userMypage }),
    }),
    {
      name: 'user-type',
    },
  ),
);
