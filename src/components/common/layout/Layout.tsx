import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="px-[3.6rem] py-[4.5rem]">{children}</div>;
};

export default Layout;
