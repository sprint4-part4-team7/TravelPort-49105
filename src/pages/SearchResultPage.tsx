import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchData from '@/hooks/useSearchData';
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import Card from '@/components/common/card/Card';

const cardLists = [
  {
    id: 1,
    title: '스쿠버 다이빙',
    description: '신나는 바닷속 체험',
    location: '마닐라섬',
    price: 100000,
    score: 4,
    review: 129,
    image: '',
    link: '/',
  },
  {
    id: 2,
    title: '스쿠버플라잉',
    description: '신나는 하늘 체험',
    location: '단양',
    price: 120000,
    score: 4.1,
    review: 8,
    image: '',
    link: '/',
  },
  {
    id: 3,
    title: '나이트 사파리 체험으아아아아아아아앙',
    description: '밤에 동물들을 보세요',
    location: '에버랜드',
    price: 40000,
    score: 4.8,
    review: 1622,
    image: '',
    link: '/',
  },
  {
    id: 4,
    title: '스킨스쿠버',
    description: '피부로 느끼는 물놀이',
    location: '제주도',
    price: 100000,
    score: 3.1,
    review: 25,
    image: '',
    link: '/',
  },
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const query = useQuery();
  const search = query.get('query');
  const [filteredData, setFilteredData] = useState();
  setFilteredData(search);
  const { filteredTitles } = useSearchData(cardLists);

  const cards = filteredData || filteredTitles;

  return (
    <div>
      <Layout userType="user">
        <div className="text-50">
          <h1>&quot;{search}&quot; 검색결과</h1>
        </div>
        <div>
          <button type="button">인기순</button>
          <button type="button">후기순</button>
          <button type="button">가격순</button>
        </div>
        <div className="flex mobile:flex-col">
          {cards.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              location={item.location}
              price={item.price}
              score={item.score}
              review={item.review}
              image={item.image}
              link={item.link}
            />
          ))}
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default SearchResultPage;
