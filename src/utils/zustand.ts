import { create } from 'zustand';

interface UserInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
}

type SetUserInfo = (userInfo: UserInfo) => void;

export const useUserStore = create<{
  userInfo: UserInfo;
  setUserInfo: SetUserInfo;
}>((set) => ({
  userInfo: {
    nickname: '',
    email: '',
    name: '',
    phone: '',
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

interface PartnerInfo {
  nickname: string;
  email: string;
  name?: string;
  phone?: string;
  description?: string;
}

type SetPartnerInfo = (partnerInfo: PartnerInfo) => void;

export const usePartnerStore = create<{
  partnerInfo: PartnerInfo;
  setPartnerInfo: SetPartnerInfo;
}>((set) => ({
  partnerInfo: {
    nickname: '',
    email: '',
  },
  setPartnerInfo: (partnerInfo) => set({ partnerInfo }),
}));
