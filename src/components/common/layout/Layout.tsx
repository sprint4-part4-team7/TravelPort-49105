import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="px-[3.6rem] pb-[4.5rem] mt-[14.4rem] overflow-hidden break-words whitespace-normal">
      {children}
    </div>
  );
};

export default Layout;
