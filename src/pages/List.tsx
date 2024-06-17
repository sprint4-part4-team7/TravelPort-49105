/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import { useRef, useState, useEffect } from 'react';
import arrowDown from '@/assets/icons/arrowDown.svg';
import { useParams } from 'react-router-dom';
import useOutsideClick from '@/hooks/useOutsideClick';
import instance from '@/utils/axios';
import useDatePicker from '@/hooks/useDatePicker';
import useTypeCheckbox from '@/hooks/useTypeCheckbox';
import useFetchByCategory from '@/hooks/useFetchByCategory';
import Layout from '@/components/common/layout/Layout';
import HotelCard from '@/components/common/card/HotelCard';
import HeadCount from '@/components/common/filter/HeadCount';
import PriceRange from '@/components/common/filter/PriceRange';
import Footer from '@/components/common/Footer';
import Card from '@/components/common/card/Card';
import Pagination from '@/components/common/Pagination';
import DatePickerCustom from '@/components/details/DatePickerCustom';
import Button from '@/components/common/Button';
import ProductType from '@/components/common/filter/ProductType';

const List = () => {
  const { categoryId } = useParams(); // categoryId(string 형태)
  const [filterTab, setFilterTab] = useState(''); // 선택된 탭
  const [isOpen, setIsOpen] = useState(false); // 탭 open 여부
  const [pageNum, setPageNum] = useState(1); // 현재 클릭된 페이지 숫자
  const [dataByPage, setDataByPage] = useState<any>(); // 페이지 별 데이터
  console.log(dataByPage);

  let filteredData = new Set(); // 필터링된  데이터

  const { productsByCategory } = useFetchByCategory(Number(categoryId)); // 리스트 페이지에 들어가는 모든 데이터

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

  // console.log(
  //   count,
  //   rangeMinValue,
  //   rangeMaxValue,
  //   startDate,
  //   endDate,
  //   checkedList,
  // );

  // 필터링날짜가 판매시작날짜와 판매종료날짜 사이에 있는지 구하는 함수
  const isFiltered = (filteringDate: Date, start: string, end: string) => {
    const filterDate = new Date(filteringDate);
    const newStartDate = new Date(start);
    const newEndDate = new Date(end);

    return filterDate >= newStartDate && filterDate <= newEndDate;
  };

  console.log(filteredData);

  for (let i = 0; i < productsByCategory.length; i++) {
    const product = productsByCategory[i];
    const isWithinDateRange =
      startDate && endDate
        ? isFiltered(startDate, product.startDate, product.endDate) &&
          isFiltered(endDate, product.startDate, product.endDate)
        : startDate
          ? isFiltered(startDate, product.startDate, product.endDate)
          : true;
    const isWithinPriceRange =
      rangeMinValue === fixedMinPrice && rangeMaxValue === fixedMaxPrice
        ? true
        : product.minPrice >= rangeMinValue &&
          product.minPrice <= rangeMaxValue;
    const isProductTypeMatch =
      checkedList.length === 0
        ? true
        : checkedList.includes(product.product_productType);
    const isUserCountMatch =
      count === 0
        ? true
        : product.productOptions.some(
            (option) => option.maxUserCount * option.userCount >= count,
          );
    if (
      isWithinDateRange &&
      isWithinPriceRange &&
      isProductTypeMatch &&
      isUserCountMatch
    )
      filteredData.add(product);
  }

  let cards: any[] = [...productsByCategory];

  const handleFilterClick = () => {
    cards = Array.from(filteredData)
      ? Array.from(filteredData)
      : productsByCategory;
  };
  console.log(cards);

  const categoryName = Number(categoryId) === 1 ? '숙박' : '체험';
  const filterings = ['날짜', '인원수', '가격대', `${categoryName} 종류`];
  const LIMIT = categoryId === '1' ? 3 : 6;
  const offset = pageNum - 1;

  useEffect(() => {
    const fetchByOffset = async (offsetNum: number, categoryNum: number) => {
      const response = await instance.get(
        `/product/all?categoryId=${categoryNum}&offset=${offsetNum}&limit=${LIMIT}`,
      );
      setDataByPage(response.data);
    };
    fetchByOffset(offset, Number(categoryId));
  }, [offset, categoryId, LIMIT]);

  const outsideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outsideRef, () => {
    setIsOpen(false);
  });

  const handleFilterTab = (tab: string) => {
    if (filterTab === tab) {
      setFilterTab('');
      setIsOpen(false);
    } else {
      setFilterTab(tab);
      setIsOpen(true);
    }
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
              <div>
                <Button buttonStyle="py-10 px-20" onClick={handleFilterClick}>
                  검색하기
                </Button>
              </div>
            </div>
          </div>

          <div className={`${listClass}`}>
            {cards &&
              cards.map((item: any) => {
                return categoryId === '1' ? (
                  <HotelCard
                    key={item.productId}
                    title={item.productName}
                    location={item.productAddress}
                    price={item.minPrice}
                    score={item.reviewAvg}
                    review={item.reviewCount}
                    image={item.thumbnail}
                    link={`/details/${Number(categoryId)}/${item.productId}`}
                  />
                ) : (
                  <Card
                    key={item.productId}
                    title={item.productName}
                    location={item.productAddress}
                    price={item.minPrice}
                    score={item.reviewAvg}
                    review={item.reviewCount}
                    image={item.thumbnail}
                    link={`/details/${Number(categoryId)}/${item.productId}`}
                  />
                );
              })}
          </div>
          <div className="mx-auto w-fit">
            <Pagination
              pageNum={pageNum}
              setPageNum={setPageNum}
              allCardNum={
                productsByCategory?.length ? productsByCategory?.length : 0
              }
              divNum={categoryId === '1' ? 3 : 6}
            />
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default List;
