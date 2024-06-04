import { useUserMypageStore } from '@/utils/zustand';
import React from 'react';

interface MyPageButtonProps {
  children: React.ReactNode;
  page: string;
  setMyPage: (page: string) => void;
}

const MyPageButton = ({ children, setMyPage, page }: MyPageButtonProps) => {
  const myPage = useUserMypageStore((state) => state.userMypage);
  const isMyPage = myPage === page;
  return (
    <button
      type="button"
      className={`text-left text-14 font-normal px-12 py-8 hover:bg-blue-1 ${isMyPage ? 'bg-blue-1' : 'bg-white'}`}
      onClick={() => setMyPage(page)}
    >
      {children}
    </button>
  );
};

export default MyPageButton;
