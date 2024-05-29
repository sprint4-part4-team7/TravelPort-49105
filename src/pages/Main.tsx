/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import Carousel from '@/components/Carousel';
import Layout from '@/components/common/layout/Layout';

const images = [
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKD1-YGiJrzk3PakRGE8AbqtzgkEG3iWpoA&usqp=CAU',
    text: '낭만의 액티비티, 열기구',
    path: '/',
  },

  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    text: '잔잔한 호수위로, 동동배',
    path: '/',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJh0dep1ggbJRjae6T8ux_lDc3n2ZiW55bw&usqp=CAU',
    text: '빛나는 도심 속, 별 구경하기',
    path: '/',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5UHoR3EZQ9Yu0Cs-SVxI4Yx5Y1uBtCrqbg&usqp=CAU',
    text: '나른한 오후 그쯤, 호수 구경하기',
    path: '/',
  },
];

const Main = () => {
  return (
    <Layout userType="user">
      <Carousel items={images} />
      <div className="mt-[8.2rem] grid grid-cols-4 gap-[2.4rem]">
        {images.map((item, index) => (
          <div key={index}>
            <img
              src={item.url}
              alt={item.text}
              className="w-[32.4rem] h-[24rem] rounded-[1.2rem]"
              onClick={() => (window.location.href = item.path)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Main;
