/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProductAll from '@/hooks/reactQuery/product/useProductAll';
import useReviewAllQuery from '@/hooks/reactQuery/review/useReviewAllQuery';
import useProductOptionsReviews from '@/hooks/useProductOptionsReviews';
import useFilterByCategory from '@/hooks/useFilterByCategory';
import useDisplayCount from '@/hooks/useDispalyControl';
import Carousel from '@/components/Carousel';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import MainCard from '@/components/MainCard';

interface ImageItem {
  url: string;
  text?: string;
  path?: string;
  location?: string;
  price?: number;
  score?: number;
  review?: number;
}

const carousel: ImageItem[] = [
  {
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALsAyAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAwEABgX/xAAZEAEBAQEBAQAAAAAAAAAAAAABABECQSH/xAAZAQEBAQEBAQAAAAAAAAAAAAACAAEDBQb/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APgJdkkuy9t4ugliTSxKboJYk0sSm6CXJJLkpup5Zk8uSi1NLEmkctKUMsSeWJTZU0jlRI5RygxyokUopQSKT8sS0pU0ilRIpRROxmkGigpda3Wlr0mWJNLsubx9TSxKiWJTdDLGaXJa3U0ik0uSi0Ejk8sym6mlyTSOU2UEjlRItpygkUnnyxKKVPLEmkUopQY+TyxtOUGLNIpRSpsfKjFo4Dda2U16ZLsmliQeNoJYk0sSm6CXJJLspup5Yk8sSi1PLEnkUtbKGWJUSKUaeWJPLEpsqaRyokUtOUGLPLGilTSKVEilHKmxqJFooDBqJFLSlTSybdRvTpYlRLEg8PU0uSaWJRanlyTSOU3QyxJ5YlFKnliTyxKKVNI5USKWlKCRZ5YlGnYk0ilNlTbGbFtdICRZ2NFE2LNi0UBIs2LaYN1rdRPVJYk0sSDwtFI5NLkotTSxJ5YlFqeWJNLEopU0jlRIpRSgkUnljRRNItRItpSp2M2LRgxZsUooDFmxbTgMGoxaKJsWaRadIDda3WlHrcsSaXJc3g6mkcqJHKboZYkkutbKmkcqJFKOUEik8saOVNilRilFKmkWoxaOVNiz6jacBizYtFAYs2LaUBik2LRxNizYtHAbJN1pvXpck0jlzfP6CRyqkUpsqaRyokUopQYpNjacoJFKjBo5QSLNi0UBizYtHAYs2LacBg1GDRQGLNi0cBizYNpwOos2LRwG65utN7NLEnliXJ85KmkcqJFLTlBIpPyxopU2KTYpRQGKTYtpwGDUYtHE2LNi06QGDUYNFAYs2La6QGLNg0UBizYtrpAYs2HVFAbrW6je1yxKmRS5vmpU0ilRi0cqaRZsW04DFmxaNNizYtFAYNRg2ukBizYtOkBgzYtHAYsmLaUBizYtOkBgz6i2lAYs2DRwG61uo49wxZpFub5qUEizYtFAYNRg2nAYNRh1RwGLNg0cFgzYtrpAYM2LTpAYM2LRwGLJi2nAYs2DRwWDNi0cBiyYtpQG61uo3umDUYdXJ8zAYs2DacDqLNg06QGLNg2lAYs2DTpBYM2DacFgzYNOkFgzYNHBYdTYtpwGLJi0cBizYNHBYM2DacFuubqN7th1Nh1cnzEFiyYtrpAYsmLRwGLJg2nBYM2DTpBYsmLacBgzYtHAYsuoNOkFiyYtpwWDNg0cFgyYtHBYsmLacDq2zq2jf//Z',
    text: '낭만의 액티비티, 열기구',
    path: '/',
    location: '인천 남동구',
    price: 30000,
    score: 5,
    review: 1034,
  },
  {
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAQADBAf/xAAbEAEBAQEAAwEAAAAAAAAAAAAAARECEjFBIf/EABgBAQEBAQEAAAAAAAAAAAAAAAIBAAME/8QAGREBAQEBAQEAAAAAAAAAAAAAAAERAjES/9oADAMBAAIRAxEAPwD66lVnoeMKNPoVShRp0LFg0KNOjVEBp2DViihYilEhc+0wozpysKJCjO0Vo2FGdIsZY0iKjUsaxhrnRp2DYzl0CEzOb31CsRzQKmFUUQoWOlg1hrnRrpYFiwRwbHTBsWLAqYWNhHBxcWRcZ05aFI0iyI7RYuLIuM6RpGKRcTSHPxsORsTQ6crEx0sGxHHpysZ0xGc3sTCsSwEoWJh4NUQo10wasCudGx0sGwokAa6WJilAxsLGxdODi4si4xxMKNhSJrtGkWRZFkTTiyNIUhSJpWhIuHItiWhXLBsdsG8prl05Yzp4o2ubvYxWJYkQLBx0wbFGudg2Olg2KNAbHQbFGDYFjoOLDg42EzFBKRsXGOJhRJDkSuvNaFGkKRC1ZCkaFIlpNI2HIuBqVzwbHbBvLa59OXizpiNrkTVWqtRGw76FYFc6NdKFYaI0x69GMSwaTWLDgY0KxMZWxZG+NEpxsWNC+Icq8kkKMcpQ4MOBThSHInLpIFrB4peXTGsTUs1x8WdMRtc/lzqVUdBsSpWqLHOwaNKiwClWpTRGrNVhQa0VmZmjQolKNCiQohxiglEpylDglPQk6cukDk4501+MkWIyYiszOA1dGurn01CraNqxyqVGtG1YFa1Go04NX62pakYSRtVjYoJRKsKM0VKUWHIMhARQpBhxKcpcukc4UoHKTJamti6uoHkrY2uOjatC11iVqNrWpqxxqWjVtG0nOro2talWAzJakqoRShKrNpwoPNKDTKFBhQasKFEi/BLShQYqHKTDFtQ9XRta0L02Npajn5K2No6NqWpa6SNWtG1tG0nPper+Dalo2rI5UrUtS0LSA7WlDWlVjKOcpypWOHHOHyCyukPkOTg0iKCUGrKrNUQ1qa19BWXVtC1rQ6pRtXUc7WYdW1LUtTTdbWtTUtS0sc61qWpqE5WtalS1FwNXW1GbE05Slc4UbFdYccuXXkKp8ukc4cCrK6SqMqiStKmslXWoVbR6qxdTquXVK1z6qyNqawaxYOnU1kN3raNqjVc+mGqixyqMixgZmZmYoJRmdJ6OenOOnI9LD5dI58nHNT5IYqLK1ZqlQktDqlQtVhrn3Trl1Vg2hayViTXVqjE9VT6NZmcqyMxOfQrEZgVmZmWFGZmKHGYb6sdIUZgqnCZhaJUqsxhRrMiVz69OXSsQ1yZmJH//2Q==',
    text: '낭만의 액티비티, 열기구',
    path: '/',
    location: '인천 남동구',
    price: 30000,
    score: 5,
    review: 1034,
  },
];

const Main = () => {
  const navigate = useNavigate();
  const { productAll, optionAll } = useProductAll();
  const { data: reviewAll } = useReviewAllQuery();
  // 카드에 들어가는 데이터
  const combinedData = useProductOptionsReviews(
    productAll,
    optionAll,
    reviewAll,
  );
  // 카테고리로 분류
  const { sortedCategoryAccommodation, sortedCategoryActivity } =
    useFilterByCategory(combinedData);

  const transformData = (data: any, categoryId: number) => {
    return (
      data &&
      data.map((item: any) => ({
        url: item.thumbnail,
        text: item.name,
        path: `detail/${categoryId}/${item.id}`,
        location: item.productAddress,
        price: item.minPrice,
        score: item.averageScore,
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

  return (
    <>
      <Layout main category noSearch={false}>
        <Carousel items={carousel} />
        <div className="flex justify-center p-20 pb-5 mb-80">
          <MainCard
            images={CategoryAccommodation}
            title="인기많은 숙소"
            onclick={handleAccommodation}
          />
        </div>
        <div className="flex justify-center p-20 pb-5">
          <MainCard
            images={CategoryActivity}
            title="인기많은 액티비티"
            onclick={handleActivity}
          />
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Main;
