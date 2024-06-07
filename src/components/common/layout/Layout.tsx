import React, { ReactNode } from 'react';
import HeaderBar from '../headerBar/HeaderBar';

interface LayoutProps {
  children: ReactNode;
  main?: true | false;
  category?: true | false;
  noSearch?: true | false;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  main,
  category,
  noSearch,
}) => {
  return (
    <div className="flex flex-col min-h-screen font-plexSans">
      <HeaderBar main={main} category={category} noSearch={noSearch} />
      <div className="flex-grow px-[3.6rem] mt-[14.4rem] break-words whitespace-normal overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
