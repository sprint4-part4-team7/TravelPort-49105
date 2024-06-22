import React, { ReactNode } from 'react';
import HeaderBar from '@/components/common/headerBar/HeaderBar';
import Footer from '@/components/common/Footer';

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
      <div className="flex-grow px-36 mt-144 break-words whitespace-normal overflow-y-auto">
        {children}
      </div>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
