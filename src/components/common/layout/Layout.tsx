import React, { ReactNode } from 'react';
import HeaderBar from '@/components/common/layout/headerBar/HeaderBar';
import Footer from '@/components/common/layout/Footer';

interface LayoutProps {
  children: ReactNode;
  main?: true | false;
  category?: true | false;
  noSearch?: true | false;
  noFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  main,
  category,
  noSearch,
  noFooter = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen font-plexSans">
      <HeaderBar main={main} category={category} noSearch={noSearch} />
      <div className="flex-grow overflow-y-auto break-words whitespace-normal px-36 mt-100">
        {children}
      </div>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
