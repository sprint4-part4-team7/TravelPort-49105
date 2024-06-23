import { useUserMypageStore } from '@/utils/Zustand';
import React from 'react';

interface MyPageButtonProps {
  children: React.ReactNode;
  page: string;
  setStatus: (page: string) => void;
}

const MyPageButton = ({ children, setStatus, page }: MyPageButtonProps) => {
  const myPage = useUserMypageStore((state) => state.userMypage);
  const isMyPage = myPage === page;
  return (
    <button
      type="button"
      className={`text-left text-14 font-normal px-12 py-8 rounded-4 hover:bg-blue-1 ${isMyPage ? 'bg-blue-1' : 'bg-white'}`}
      onClick={() => setStatus(page)}
    >
      {children}
    </button>
  );
};

export default MyPageButton;
