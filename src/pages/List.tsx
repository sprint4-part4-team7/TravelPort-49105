/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
// import useSearchData from '@/hooks/useSearchData';
import { useRef, useState } from 'react';
import useProductAll from '@/hooks/reactQuery/product/useProductAll';
import uniqueProduct from '@/utils/uniqueProduct';
import arrowDown from '@/assets/icons/arrowDown.svg';
import search from '@/assets/icons/search.svg';
import useCalendar from '@/hooks/useCalendar';
import { useParams } from 'react-router-dom';
import useOutsideClick from '@/hooks/useOutsideClick';
import SearchBar from '../components/common/SearchBar';
import Layout from '@/components/common/layout/Layout';
import HotelCard from '@/components/common/card/HotelCard';
import CalendarCustom from '@/components/common/CalendarCustom';
import HeadCount from '@/components/common/filter/HeadCount';
import PriceRange from '@/components/common/filter/PriceRange';
import ProductType from '@/components/common/filter/ProductType';
import Footer from '@/components/common/Footer';

const List = () => {
  const { categoryId } = useParams();

  const [filteredData, setFilteredData] = useState();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [filterTab, setFilterTab] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { optionAll } = useProductAll();
  const { selectedDate, setSelectedDate } = useCalendar();

  const categoryName = Number(categoryId) === 1 ? '숙박' : '체험';
  const filterings = ['날짜', '인원수', '가격대', `${categoryName} 종류`];
  const filterSearch = window.innerWidth > 767 ? '어디로 떠날까요?' : '검색';

  // productId 같은 경우 하나만 나오도록
  const uniqueOptionAll = uniqueProduct(optionAll);

  // 특정 카테고리의 전체 productoption 데이터 중 unique
  const allByCategory =
    uniqueOptionAll &&
    uniqueOptionAll.filter(
      (item: any) => item.product.categoryId === Number(categoryId),
    );

  const cards = filteredData || allByCategory;

  const outsideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outsideRef, () => {
    setIsOpen(false);
  });

  const handleSearchBar = () => {
    if (isSearchBarOpen) {
      setIsSearchBarOpen(false);
    } else {
      setIsSearchBarOpen(true);
      setFilterTab('');
    }
  };

  const handleFilterTab = (tab: string) => {
    if (filterTab === tab) {
      setFilterTab('');
      setIsOpen(false);
    } else {
      setFilterTab(tab);
      setIsOpen(true);
    }

    setIsSearchBarOpen(false);
  };

  return (
    <>
      <Layout main noSearch={false}>
        <div className="relative rounded-42 px-48 py-20 shadow-[0_0_12px_0_rgba(0,0,0,0.25)] mt-40 max-w-928 min-w-460 mx-auto mb-100">
          <div className="flex gap-30 justify-between items-center cursor-pointer">
            {filterings.map((filtering) => (
              <p
                className="text-13 font-medium"
                onClick={() => handleFilterTab(filtering)}
              >
                {filtering} <span className="mobile:hidden">선택</span>
                <img
                  src={arrowDown}
                  alt="드롭다운 아이콘"
                  className="inline mobile:hidden"
                />
              </p>
            ))}

            {filterTab === '날짜' && isOpen && (
              <div
                className="absolute top-80 left-20 right-20 max-w-500"
                ref={outsideRef}
              >
                <CalendarCustom
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  holiday={[]}
                />
              </div>
            )}
            {filterTab === '인원수' && isOpen && (
              <div
                className="absolute w-2/5 top-80 left-0 mobile:w-full"
                ref={outsideRef}
              >
                <HeadCount />
              </div>
            )}
            {filterTab === '가격대' && isOpen && (
              <div
                className="absolute w-3/5 top-80 left-0 tablet:w-full mobile:w-full"
                ref={outsideRef}
              >
                <PriceRange />
              </div>
            )}
            {filterTab === `${categoryName} 종류` && isOpen && (
              <div
                className="absolute w-2/5 top-80 right-0 mobile:w-full z-50"
                ref={outsideRef}
              >
                <ProductType
                  category={Number(categoryId)}
                  categoryName={categoryName}
                />
              </div>
            )}

            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => {
                handleSearchBar();
              }}
            >
              <img src={search} alt="검색" className="mobile:w-10" />{' '}
              <span className="text-blue-6 text-13 font-medium">
                {filterSearch}
              </span>
              {isSearchBarOpen && (
                <div
                  className="absolute right-0 top-70 my-10 ml-10 w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SearchBar
                    cardLists={cards}
                    path="list/"
                    setFilteredData={setFilteredData}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-24 mb-64">
          {cards.map((item: any) => {
            // const { avg, length } = useScoreAvg(item.id);

            return (
              <HotelCard
                key={item.id}
                title={item.product.name}
                location={item.product.productAddress}
                price={item.optionPrice}
                score={1}
                review={5}
                image={item.product.productImages[0]}
                link="/"
              />
            );
          })}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default List;
