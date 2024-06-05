/* eslint-disable no-undef */
import useSearchData from '@/hooks/useSearchData';
import { useState } from 'react';
import useProductAll from '@/hooks/useProductAll';
import getMinPrice from '@/utils/getMinPrice';
import useScoreAvg from '@/hooks/useScoreAvg';
import uniqueProduct from '@/utils/uniqueProduct';
import SearchBar from '../components/common/SearchBar';
import Card from '@/components/common/card/Card';

const List = () => {
  const [filteredData, setFilteredData] = useState();
  const { optionAll } = useProductAll();

  // productId 같은 경우 하나만 나오도록
  const uniqueOptionAll = uniqueProduct(optionAll);

  // 평점 구하기
  // useScoreAvg() 괄호 안에 productOptionId 보내면 됩니다 !
  const { avg, length } = useScoreAvg(1);

  const { filteredTitles } = useSearchData(uniqueOptionAll);

  const cards = filteredData || filteredTitles;

  return (
    <>
      <div className="my-10 ml-10 w-400">
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
