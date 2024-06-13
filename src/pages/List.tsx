/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
// import useSearchData from '@/hooks/useSearchData';
import { useRef, useState, useEffect } from 'react';
import uniqueProduct from '@/utils/uniqueProduct';
import arrowDown from '@/assets/icons/arrowDown.svg';
import search from '@/assets/icons/search.svg';
import { useParams } from 'react-router-dom';
import useOutsideClick from '@/hooks/useOutsideClick';
import instance from '@/utils/axios';
import useDatePicker from '@/hooks/useDatePicker';
import useTypeCheckbox from '@/hooks/useTypeCheckbox';
import useProductOptionAll from '@/hooks/reactQuery/productOption/useProductOptionAllQuery';
import SearchBar from '../components/common/SearchBar';
import Layout from '@/components/common/layout/Layout';
import HotelCard from '@/components/common/card/HotelCard';
import HeadCount from '@/components/common/filter/HeadCount';
import PriceRange from '@/components/common/filter/PriceRange';
import ProductType from '@/components/common/filter/ProductType';
import Footer from '@/components/common/Footer';
import Card from '@/components/common/card/Card';
import Pagination from '@/components/common/Pagination';
import DatePickerCustom from '@/components/details/DatePickerCustom';

const List = () => {
  const { categoryId } = useParams(); // categoryId(string 형태)

  const [filterTab, setFilterTab] = useState(''); // 선택된 탭
  const [isOpen, setIsOpen] = useState(false); // 탭 open 여부
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false); // 서치바 open 여부
  const [pageNum, setPageNum] = useState(1); // 현재 클릭된 페이지 숫자
  const [filteredData, setFilteredData] = useState(); // 필터링된 데이터
  const [dataByPage, setDataByPage] = useState<any>();

  // 인원수 필터링
  const [count, setCount] = useState(0);

  // 가격 필터링
  const fixedMinPrice = 0;
  const fixedMaxPrice = 1000000;
  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);

  // 날짜 필터링
  const { startDate, setStartDate, endDate, setEndDate } = useDatePicker();

  // 종류 필터링
  const { checkedList, checkHandler } = useTypeCheckbox();

  console.log(
    count,
    rangeMinValue,
    rangeMaxValue,
    startDate,
    endDate,
    checkedList,
  );

  const { optionAll } = useProductOptionAll();

  const categoryName = Number(categoryId) === 1 ? '숙박' : '체험';
  const filterings = ['날짜', '인원수', '가격대', `${categoryName} 종류`];
  const filterSearch = window.innerWidth > 767 ? '어디로 떠날까요?' : '검색';
  const LIMIT = categoryId === '1' ? 3 : 6;
  const offset = pageNum - 1;

  // productId 같은 경우 하나만 나오도록
  const uniqueOptionAll = uniqueProduct(optionAll);

  // 특정 카테고리의 전체 productOption 데이터 중 unique
  const allByCategory =
    uniqueOptionAll &&
    uniqueOptionAll.filter(
      (item: any) => item.product.categoryId === Number(categoryId),
    );

  useEffect(() => {
    const fetchByOffset = async (offsetNum: number) => {
      const response = await instance.get(
        `/product/all?offset=${offsetNum}&limit=${LIMIT}`,
      );
      setDataByPage(response.data);
    };
    fetchByOffset(offset);
  }, [offset]);

  const cards = filteredData || allByCategory; //! !!수정하기

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

  const listClass =
    categoryId === '1'
      ? 'flex flex-col gap-24 mb-64 w-full mobile:mx-auto mobile:w-fit'
      : 'grid grid-cols-3 gap-24 w-fit mx-auto mb-64 mobile:grid-cols-1';

  return (
    <>
      <Layout main noSearch={false}>
        <div className="mx-auto mt-40 max-w-928 min-w-460 ">
          <div className="relative rounded-42 px-48 py-20 shadow-[0_0_12px_0_rgba(0,0,0,0.25)] mb-100">
            <div className="flex items-center justify-between cursor-pointer gap-30">
              {filterings.map((filtering) => (
                <p
                  className="font-medium text-13"
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
                  <DatePickerCustom
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    categoryId={Number(categoryId)}
                  />
                </div>
              )}
              {filterTab === '인원수' && isOpen && (
                <div
                  className="absolute left-0 w-2/5 top-80 mobile:w-full"
                  ref={outsideRef}
                >
                  <HeadCount count={count} setCount={setCount} />
                </div>
              )}
              {filterTab === '가격대' && isOpen && (
                <div
                  className="absolute left-0 w-3/5 top-80 tablet:w-full mobile:w-full"
                  ref={outsideRef}
                >
                  <PriceRange
                    rangeMinValue={rangeMinValue}
                    setRangeMinValue={setRangeMinValue}
                    rangeMaxValue={rangeMaxValue}
                    setRangeMaxValue={setRangeMaxValue}
                    fixedMaxPrice={fixedMaxPrice}
                    fixedMinPrice={fixedMinPrice}
                  />
                </div>
              )}
              {filterTab === `${categoryName} 종류` && isOpen && (
                <div
                  className="absolute right-0 z-50 w-2/5 top-80 mobile:w-full"
                  ref={outsideRef}
                >
                  <ProductType
                    category={Number(categoryId)}
                    categoryName={categoryName}
                    checkedList={checkedList}
                    checkHandler={checkHandler}
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
                <span className="font-medium text-blue-6 text-13">
                  {filterSearch}
                </span>
                {isSearchBarOpen && (
                  <div
                    className="absolute right-0 w-full my-10 ml-10 top-70"
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

          <div className={`${listClass}`}>
            {dataByPage &&
              dataByPage.map((item: any) => {
                // const { avg, length } = useScoreAvg(item.id);

                return categoryId === '1' ? (
                  <HotelCard
                    key={item.id}
                    title={item.name}
                    location={item.productAddress}
                    price={10000}
                    score={1} //! !!평점 받기
                    review={5} //! !!리뷰수 받기
                    image={item.thumbnail}
                    link={`/details/${item.id}`}
                  />
                ) : (
                  <Card
                    key={item.id}
                    title={item.name}
                    location={item.productAddress}
                    price={10000}
                    score={1}
                    review={5}
                    image={item.thumbnail}
                    link={`/details/${item.id}`}
                  />
                );
              })}
          </div>
        </div>
        <div className="mx-auto w-fit">
          <Pagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            allCardNum={cards.length}
            divNum={categoryId === '1' ? 3 : 6}
          />
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default List;
