/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from '@/components/Carousel';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import MainCard from '@/components/MainCard';

// TODO: 카테고리가 숙소인 후기높은? 별점많은? api 불러오기
// TODO: 카테고리가 액티비티인 후기높은? 별점많은? api 불러오기

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

const datas: ImageItem[] = [
  {
    url: 'data:image/jpeg;base64,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',
    text: '낭만의 액티비티, 열기구',
    path: '/',
    location: '인천 남동구',
    price: 30000,
    score: 5,
    review: 1034,
  },
  {
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAQADBAf/xAAbEAEBAQEAAwEAAAAAAAAAAAAAARECEjFBIf/EABgBAQEBAQEAAAAAAAAAAAAAAAIBAAME/8QAGREBAQEBAQEAAAAAAAAAAAAAAAERAjES/9oADAMBAAIRAxEAPwD66lVnoeMKNPoVShRp0LFg0KNOjVEBp2DViihYilEhc+0wozpysKJCjO0Vo2FGdIsZY0iKjUsaxhrnRp2DYzl0CEzOb31CsRzQKmFUUQoWOlg1hrnRrpYFiwRwbHTBsWLAqYWNhHBxcWRcZ05aFI0iyI7RYuLIuM6RpGKRcTSHPxsORsTQ6crEx0sGxHHpysZ0xGc3sTCsSwEoWJh4NUQo10wasCudGx0sGwokAa6WJilAxsLGxdODi4si4xxMKNhSJrtGkWRZFkTTiyNIUhSJpWhIuHItiWhXLBsdsG8prl05Yzp4o2ubvYxWJYkQLBx0wbFGudg2Olg2KNAbHQbFGDYFjoOLDg42EzFBKRsXGOJhRJDkSuvNaFGkKRC1ZCkaFIlpNI2HIuBqVzwbHbBvLa59OXizpiNrkTVWqtRGw76FYFc6NdKFYaI0x69GMSwaTWLDgY0KxMZWxZG+NEpxsWNC+Icq8kkKMcpQ4MOBThSHInLpIFrB4peXTGsTUs1x8WdMRtc/lzqVUdBsSpWqLHOwaNKiwClWpTRGrNVhQa0VmZmjQolKNCiQohxiglEpylDglPQk6cukDk4501+MkWIyYiszOA1dGurn01CraNqxyqVGtG1YFa1Go04NX62pakYSRtVjYoJRKsKM0VKUWHIMhARQpBhxKcpcukc4UoHKTJamti6uoHkrY2uOjatC11iVqNrWpqxxqWjVtG0nOro2talWAzJakqoRShKrNpwoPNKDTKFBhQasKFEi/BLShQYqHKTDFtQ9XRta0L02Npajn5K2No6NqWpa6SNWtG1tG0nPper+Dalo2rI5UrUtS0LSA7WlDWlVjKOcpypWOHHOHyCyukPkOTg0iKCUGrKrNUQ1qa19BWXVtC1rQ6pRtXUc7WYdW1LUtTTdbWtTUtS0sc61qWpqE5WtalS1FwNXW1GbE05Slc4UbFdYccuXXkKp8ukc4cCrK6SqMqiStKmslXWoVbR6qxdTquXVK1z6qyNqawaxYOnU1kN3raNqjVc+mGqixyqMixgZmZmYoJRmdJ6OenOOnI9LD5dI58nHNT5IYqLK1ZqlQktDqlQtVhrn3Trl1Vg2hayViTXVqjE9VT6NZmcqyMxOfQrEZgVmZmWFGZmKHGYb6sdIUZgqnCZhaJUqsxhRrMiVz69OXSsQ1yZmJH//2Q==',
    text: '잔잔한 호수위로, 동동배',
    path: '/',
    location: '서울 마포구',
    price: 50000,
    score: 5,
    review: 103,
  },
  {
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALsAyAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAwEABgX/xAAZEAEBAQEBAQAAAAAAAAAAAAABABECQSH/xAAZAQEBAQEBAQAAAAAAAAAAAAACAAEDBQb/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APgJdkkuy9t4ugliTSxKboJYk0sSm6CXJJLkpup5Zk8uSi1NLEmkctKUMsSeWJTZU0jlRI5RygxyokUopQSKT8sS0pU0ilRIpRROxmkGigpda3Wlr0mWJNLsubx9TSxKiWJTdDLGaXJa3U0ik0uSi0Ejk8sym6mlyTSOU2UEjlRItpygkUnnyxKKVPLEmkUopQY+TyxtOUGLNIpRSpsfKjFo4Dda2U16ZLsmliQeNoJYk0sSm6CXJJLspup5Yk8sSi1PLEnkUtbKGWJUSKUaeWJPLEpsqaRyokUtOUGLPLGilTSKVEilHKmxqJFooDBqJFLSlTSybdRvTpYlRLEg8PU0uSaWJRanlyTSOU3QyxJ5YlFKnliTyxKKVNI5USKWlKCRZ5YlGnYk0ilNlTbGbFtdICRZ2NFE2LNi0UBIs2LaYN1rdRPVJYk0sSDwtFI5NLkotTSxJ5YlFqeWJNLEopU0jlRIpRSgkUnljRRNItRItpSp2M2LRgxZsUooDFmxbTgMGoxaKJsWaRadIDda3WlHrcsSaXJc3g6mkcqJHKboZYkkutbKmkcqJFKOUEik8saOVNilRilFKmkWoxaOVNiz6jacBizYtFAYs2LaUBik2LRxNizYtHAbJN1pvXpck0jlzfP6CRyqkUpsqaRyokUopQYpNjacoJFKjBo5QSLNi0UBizYtHAYs2LacBg1GDRQGLNi0cBizYNpwOos2LRwG65utN7NLEnliXJ85KmkcqJFLTlBIpPyxopU2KTYpRQGKTYtpwGDUYtHE2LNi06QGDUYNFAYs2La6QGLNg0UBizYtrpAYs2HVFAbrW6je1yxKmRS5vmpU0ilRi0cqaRZsW04DFmxaNNizYtFAYNRg2ukBizYtOkBgzYtHAYsmLaUBizYtOkBgz6i2lAYs2DRwG61uo49wxZpFub5qUEizYtFAYNRg2nAYNRh1RwGLNg0cFgzYtrpAYM2LTpAYM2LRwGLJi2nAYs2DRwWDNi0cBiyYtpQG61uo3umDUYdXJ8zAYs2DacDqLNg06QGLNg2lAYs2DTpBYM2DacFgzYNOkFgzYNHBYdTYtpwGLJi0cBizYNHBYM2DacFuubqN7th1Nh1cnzEFiyYtrpAYsmLRwGLJg2nBYM2DTpBYsmLacBgzYtHAYsuoNOkFiyYtpwWDNg0cFgyYtHBYsmLacDq2zq2jf//Z',
    text: '빛나는 도심 속, 별 구경하기',
    path: '/',
    location: '서울 마포구',
    price: 40000,
    score: 3,
    review: 112,
  },
  {
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwgMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBAYFB//EABgQAQEBAQEAAAAAAAAAAAAAAAABEQIS/8QAGQEBAQEBAQEAAAAAAAAAAAAAAQIAAwQF/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAEREgL/2gAMAwEAAhEDEQA/AP1u1NMq9CCqadKmKiamqqatUTU1dTTFRFRWlRVRURU1dLFKicGHh4xSFYMB1OHisGM2ow8VipBTKjDxfk5ym06iQYvyfkaqemeBpgbVdO1NOlUR84iplVRSSqk0mJpKqTFRNRWibFFngxeDGKMGL8jyx1GHisPBrajDkVhyC1tTOVSKkORNranyeL8icp1tRh408l5bTKzwNcA1WroAU8cKkZGLIUyJibE1pYmxlRFLFYMUU4MVgxtCcGKwYG1OHisGJGpxUhyLkFramQ8Xh4nW1Mgxch+U62owY0nI8tplZ4GnkDTrMUE7OUABsSwYYLJwrFljKicLFjGaowYvCwDU4MVh4NbUyCcqw8FTpYqQ5DkTRokOQ4qJbSkPAYOlgxUMVtRgXgB1yAB6hDhwoYIBnIFRODFeRjaySVgbRU4MUBQnAYgAwwIwqoABWioBAljhlDDHDiYqCkwAGcOmjVSvUyopEVKy4uLRzVIphkNFZqmkKTJMqCZJiEYYzhBgoCAVlQFDFY4ZHEscOEcFUAAGfPEqNOV7MZrKqVlKcosVG0qp0xnSvScLTRajRrYxlRpa2Jp6EnGBggKFQ0mkVUUmGzQ4ZGmscOEcSQcBikAAM+TKes9GvfgjaU9Y+lehio1nR+mPo50MLadK1jKeixmujWenoSvTQegLCZT0UKBGmtVRUQcAUZGKYZwocQVGk4KTAAZ8L0estGvp4I109Y+h6bC29HOmHo50MVG86V6YTpU6FgredKlYSrnSMDaU4zlVKnEVpDZyqlTWXKcqNODGWcTKcTWXKaZT1NMUcIJKjI4CYASzzXoemXoen18Q19D0x9D03Ko29idMPQnTcl0zpU6c86XOhYzonTSVzzpfPTnYzeVc6YTpcqLE1vKcrKVcqEtJVSs9VKllyqRDlFZcVEHKgrlUzVKmmLh6k0lQToYvJeh6Zei9PtY5a19D0x9D0eVStfQ9MPQnTYt1c9NOenLz0056R6jOrnpfPTn56XOnOxnROmnPTnnS+aixNdE6ac9OfnpfNRYl0SqlYzpcqLGayq1nKcqMZpKaNVKnGXKcqDThjTTlRKaKtehOhmeKtL0A+64Qr0XsAxUL0c6AZ0jTnppz0Ais056aToBzrNJ0vnoBzorSVpz0AipaTpfPQDnWXKuUBAVKegJZUqgE1cM5QEk9ACWf/9k=',
    text: '나른한 오후 1시, 호수 구경하기',
    path: '/',
    location: '인천 미추홀구',
    price: 30000,
    score: 2,
    review: 103,
  },
];

const Main = () => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(datas);

  // 화면 크기에 따라 데이터를 필터링
  const handleResize = () => {
    if (window.innerWidth >= 1199) {
      setFilteredData(datas.slice(0, 4)); // PC일 때는 4개의 데이터
    } else {
      setFilteredData(datas.slice(0, 3)); // 태블릿일 때는 3개의 데이터
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize); // 화면 크기 변경 시 실행

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // TODO: 경로 맞게 수정하기 (지금은 임시 ..)
  const handleAccommodation = () => {
    navigate('./list');
  };
  const handleActivity = () => {
    navigate('./list');
  };

  return (
    <>
      <Layout userType="user" main>
        <Carousel items={carousel} />
        <div className="flex justify-center p-20 pb-5 mb-80">
          <MainCard
            images={filteredData}
            title="인기많은 숙소"
            onclick={handleAccommodation}
          />
        </div>
        <div className="flex justify-center p-20 pb-5">
          <MainCard
            images={filteredData}
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
