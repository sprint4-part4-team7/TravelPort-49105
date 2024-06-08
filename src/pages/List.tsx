/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import useSearchData from '@/hooks/useSearchData';
import { useState } from 'react';
import useProductAll from '@/hooks/reactQuery/product/useProductAll';
import useScoreAvg from '@/hooks/useScoreAvg';
import uniqueProduct from '@/utils/uniqueProduct';
import arrowDown from '@/assets/icons/arrowDown.svg';
import SearchBar from '../components/common/SearchBar';
import Layout from '@/components/common/layout/Layout';
import HotelCard from '@/components/common/card/HotelCard';

const List = () => {
  const [filteredData, setFilteredData] = useState();
  const { optionAll } = useProductAll();

  const filterings = ['날짜', '인원수', '가격대', '숙소 종류'];

  // productId 같은 경우 하나만 나오도록
  const uniqueOptionAll = uniqueProduct(optionAll);

  // 평점 구하기
  // useScoreAvg() 괄호 안에 productOptionId 보내면 됩니다 !
  // const { avg, length } = useScoreAvg(1);

  const { filteredTitles } = useSearchData(uniqueOptionAll);

  const cards = filteredData || filteredTitles;

  return (
    <Layout main noSearch={false}>
      <div className="rounded-42 px-48 py-20 shadow-[0_0_12px_0_rgba(0,0,0,0.25)] mt-40 max-w-928 mx-auto tablet:mx-20 mobile:mx-16">
        <div className="flex gap-30 justify-between items-center">
          {filterings.map((filtering) => (
            <p className="text-13 font-medium">
              {filtering} <span className="mobile:hidden">선택하기</span>
              <img
                src={arrowDown}
                alt="드롭다운 아이콘"
                className="inline mobile:hidden"
              />
            </p>
          ))}
        </div>
      </div>
      <div className="my-10 ml-10 w-400">
        <SearchBar
          cardLists={cards}
          path="list/"
          setFilteredData={setFilteredData}
        />
      </div>
      <div className="flex flex-col gap-24">
        {cards.map((item) => {
          let { avg, length } = useScoreAvg(item.id);
          if (!avg) avg = 0;

          return (
            <HotelCard
              key={item.id}
              title={item.product.name}
              location={item.product.productAddress}
              price={item.optionPrice}
              score={avg}
              review={length}
              image={item.product.productImages[0]}
              link="/"
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default List;
