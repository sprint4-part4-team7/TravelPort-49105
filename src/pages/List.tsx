/* eslint-disable no-undef */
import useSearchData from '@/hooks/useSearchData';
import { useState } from 'react';
import useProductAll from '@/hooks/useProductAll';
import getMinPrice from '@/utils/getMinPrice';
import useScoreAvg from '@/hooks/useScoreAvg';
import SearchBar from '../components/common/SearchBar';
import Card from '@/components/common/card/Card';

const List = () => {
  const [filteredData, setFilteredData] = useState();
  const { optionAll } = useProductAll();

  // productId 같은 경우 하나만 나오도록
  const optionId: number[] = [];
  const uniqueOptionAll = [];
  for (let i = 0; i < optionAll.length; i++) {
    if (!optionId.includes(optionAll[i].productId)) {
      optionId.push(optionAll[i].productId);
      uniqueOptionAll.push(optionAll[i]);
    }
  }

  // 평점 구하기
  const { avg, length } = useScoreAvg();

  const { filteredTitles } = useSearchData(uniqueOptionAll);

  const cards = filteredData || filteredTitles;

  return (
    <>
      <div className="w-400 ml-10 my-10">
        <SearchBar
          cardLists={cards}
          path="list/"
          setFilteredData={setFilteredData}
        />
      </div>
      <div className="flex mobile:flex-col">
        {cards.map((item) => (
          <Card
            key={item.id}
            title={item.product.name}
            location={item.product.productAddress}
            price={getMinPrice(optionAll)}
            score={avg}
            review={length}
            image={item.product.productImages[0]}
            link="/"
          />
        ))}
      </div>
    </>
  );
};

export default List;
