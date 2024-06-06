import React, { ReactNode } from 'react';
import HeaderBar from '../headerBar/HeaderBar';

interface LayoutProps {
  children: ReactNode;
  userType: 'user' | 'partner';
  main?: true | false;
  category?: true | false;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  userType,
  main,
  category,
}) => {
  return (
    <div className="flex flex-col min-h-screen font-plexSans">
      <HeaderBar main={main} userType={userType} category={category} />
      <div className="flex-grow px-[3.6rem] mt-[14.4rem] break-words whitespace-normal overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
