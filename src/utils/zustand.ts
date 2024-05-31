import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initUserInfo, initPartnerInfo } from '@/mocks/InfoMock';

interface UserInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
}
interface UserState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: {
        ...initUserInfo,
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
}

interface PartnerState {
  partnerInfo: PartnerInfo;
  setPartnerInfo: (partnerInfo: PartnerInfo) => void;
}

export const usePartnerStore = create(
  persist<PartnerState>(
    (set) => ({
      partnerInfo: {
        ...initPartnerInfo,
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
