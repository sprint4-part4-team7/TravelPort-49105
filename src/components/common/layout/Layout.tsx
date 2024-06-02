import React, { ReactNode } from 'react';
import HeaderBar from '../headerBar/HeaderBar';

interface LayoutProps {
  children: ReactNode;
  userType: 'user' | 'partner';
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  return (
    <div className="flex flex-col min-h-screen font-plexSans">
      <HeaderBar userType={userType} />
      <div className="flex-grow px-[3.6rem] mt-[14.4rem] break-words whitespace-normal overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
