import React, { ReactNode } from 'react';
import carousel1 from '@/assets/images/carousel1.jpg';
import carousel2 from '@/assets/images/carousel2.jpg';
import carousel3 from '@/assets/images/carousel3.jpg';
import HeaderBar from '@/components/common/layout/headerBar/HeaderBar';
import Footer from '@/components/common/layout/Footer';
import Carousel from '@/components/main/Carousel';

interface LayoutProps {
  children: ReactNode;
  main?: true | false;
  category?: true | false;
  noSearch?: true | false;
  noFooter?: boolean;
  carouselView?: boolean;
}

interface ImageItem {
  url: string;
  text?: string;
  text2?: string;
  path?: string;
  click?: string;
}

const carousel: ImageItem[] = [
  {
    url: carousel1,
    text: '여행과 모험의 시작점,',
    text2: '여행 파트너가 함께합니다 !',
    path: '/',
  },
  {
    url: carousel2,
    text: '편안한 휴식을 위한 숙소,',
    text2: '다양한 옵션을 선택하세요 !',
    path: '/list/1',
    click: '숙소 상품 둘러보기',
  },
  {
    url: carousel3,
    text: '여행의 재미를 더해줄',
    text2: '액티비티가 기다리고 있습니다 !',
    path: '/list/2',
    click: '체험 상품 둘러보기',
  },
];

const Layout: React.FC<LayoutProps> = ({
  children,
  main,
  category,
  noSearch,
  noFooter = false,
  carouselView = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen font-plexSans">
      <HeaderBar main={main} category={category} noSearch={noSearch} />
      {carouselView && (
        <div className="mt-100 mobile:mt-116">
          <Carousel items={carousel} />
        </div>
      )}
      <div
        className={`flex-grow overflow-y-auto break-words whitespace-normal px-36 ${carouselView === false && 'mt-100'}`}
      >
        {children}
      </div>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
