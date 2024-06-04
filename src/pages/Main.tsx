/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import Carousel from '@/components/Carousel';
import Card from '@/components/common/card/Card';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';

interface ImageItem {
  url: string;
  text?: string;
  path?: string;
  location?: string;
  price?: number;
  score?: number;
  review?: number;
}

const images: ImageItem[] = [
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKD1-YGiJrzk3PakRGE8AbqtzgkEG3iWpoA&usqp=CAU',
    text: '낭만의 액티비티, 열기구',
    path: '/',
    location: '인천 남동구',
    price: 30000,
    score: 5,
    review: 1034,
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    text: '잔잔한 호수위로, 동동배',
    path: '/',
    location: '서울 마포구',
    price: 50000,
    score: 5,
    review: 103,
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJh0dep1ggbJRjae6T8ux_lDc3n2ZiW55bw&usqp=CAU',
    text: '빛나는 도심 속, 별 구경하기',
    path: '/',
    location: '서울 마포구',
    price: 40000,
    score: 3,
    review: 112,
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5UHoR3EZQ9Yu0Cs-SVxI4Yx5Y1uBtCrqbg&usqp=CAU',
    text: '나른한 오후 1시, 호수 구경하기',
    path: '/',
    location: '인천 미추홀구',
    price: 30000,
    score: 2,
    review: 103,
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKD1-YGiJrzk3PakRGE8AbqtzgkEG3iWpoA&usqp=CAU',
    text: '낭만의 액티비티, 열기구',
    path: '/',
    location: '인천 남동구',
    price: 30000,
    score: 5,
    review: 1034,
  },

  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    text: '잔잔한 호수위로, 동동배',
    path: '/',
    location: '서울 마포구',
    price: 50000,
    score: 5,
    review: 103,
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJh0dep1ggbJRjae6T8ux_lDc3n2ZiW55bw&usqp=CAU',
    text: '빛나는 도심 속, 별 구경하기',
    path: '/',
    location: '서울 마포구',
    price: 40000,
    score: 3,
    review: 112,
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5UHoR3EZQ9Yu0Cs-SVxI4Yx5Y1uBtCrqbg&usqp=CAU',
    text: '나른한 오후 1시, 호수 구경하기',
    path: '/',
    location: '인천 미추홀구',
    price: 30000,
    score: 2,
    review: 103,
  },
];

const Main = () => {
  return (
    <>
      <Layout userType="user" main>
        <Carousel items={images} />
        <div className="flex justify-center p-20">
          <div className="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
            {images.map((item, index) => (
              <Card
                key={index}
                title={item.text as string}
                location={item.location as string}
                price={item.price as number}
                score={item.score as number}
                review={item.review as number}
                image={item.url as string}
                link={item.path as string}
              />
            ))}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Main;
