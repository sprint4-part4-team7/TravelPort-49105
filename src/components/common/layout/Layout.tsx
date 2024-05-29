import React, { ReactNode } from 'react';
import HeaderBar from '../headerBar/HeaderBar';

interface LayoutProps {
  children: ReactNode;
  userType: 'user' | 'partner';
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  return (
    <div>
      <HeaderBar userType={userType} />
      <div className="px-[3.6rem] pb-[4.5rem] mt-[14.4rem] overflow-hidden break-words whitespace-normal">
        {children}
      </div>
    </div>
  );
};

export default Layout;
