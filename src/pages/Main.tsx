/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import useProductAllQuery from '@/hooks/reactQuery/product/useProductAllQuery';
import useFilterByCategory from '@/hooks/category/useFilterByCategory';
import useDisplayCount from '@/hooks/useDispalyControl';
import { useUserStore } from '@/utils/Zustand';
import carousel1 from '@/assets/images/carousel2.jpg';
import carousel2 from '@/assets/images/carousel.jpg';
import carousel3 from '@/assets/images/carousel3.jpg';
import Carousel from '@/components/main/Carousel';
import Layout from '@/components/common/layout/Layout';
import MainCard from '@/components/main/MainCard';
import PartnerMain from '@/pages/PartnerMain';
import Loading from '@/components/common/Loading';
import Skeleton from '@/components/common/Skeleton';

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
    text: '서비스 소개 ~',
    path: '/',
  },
  {
    url: carousel2,
    text: '프라이빗 풀이 있는',
    text2: '추천 숙소 9곳',
    path: '/list/1',
    click: '숙소 상품 둘러보기',
  },
  {
    url: carousel3,
    text: '자연에서 즐기는',
    text2: '카파도키아 열기구 투어',
    path: '/list/2',
    click: '체험 상품 둘러보기',
  },
];

const Main = () => {
  const navigate = useNavigate();
  const { productAll, isLoadingProducts } = useProductAllQuery();
  const { userInfo } = useUserStore();

  // 카테고리로 분류
  const { sortedCategoryAccommodation, sortedCategoryActivity } =
    useFilterByCategory(productAll);

  const transformData = (data: any, categoryId: number) => {
    return (
      data &&
      data.map((item: any) => ({
        url: item.thumbnail,
        text: item.productName,
        path: `details/${categoryId}/${item.productId}`,
        location: item.productAddress,
        price: item.minPrice,
        score: item.reviewAvg.toFixed(1),
        review: item.reviewCount,
      }))
    );
  };

  const displayCount = useDisplayCount();

  const transformedAccommodation = transformData(
    sortedCategoryAccommodation,
    1,
  );
  const transformedActivity = transformData(sortedCategoryActivity, 2);

  const CategoryAccommodation = transformedAccommodation
    ? transformedAccommodation.slice(0, displayCount)
    : [];
  const CategoryActivity = transformedActivity
    ? transformedActivity.slice(0, displayCount)
    : [];

  const handleAccommodation = () => {
    navigate('/list/1');
  };
  const handleActivity = () => {
    navigate('/list/2');
  };

  if (userInfo) {
    if (userInfo.isPartner === 1) {
      return <PartnerMain />;
    }
  }

  return (
    <Layout main category noSearch={false}>
      <Carousel items={carousel} />
      <div className="flex justify-center p-20 pb-5 mb-80">
        <MainCard
          images={CategoryAccommodation}
          title="인기많은 숙소"
          onclick={handleAccommodation}
          isLoading={isLoadingProducts}
          displayCount={displayCount}
        />
      </div>
      <div className="flex justify-center p-20 pb-5">
        <MainCard
          images={CategoryActivity}
          title="인기많은 액티비티"
          onclick={handleActivity}
          isLoading={isLoadingProducts}
          displayCount={displayCount}
        />
      </div>
    </Layout>
  );
};

export default Main;
