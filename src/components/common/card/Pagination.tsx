import React from 'react';

type PaginationProps = {
  children: React.ReactNode;
  setPageNum: any;
  allCard: number; // 전체 카드 수
  divNum: number; // 카드를 나눌 수(=페이지 표출될 카드 수)
};

const Pagination = ({
  children,
  setPageNum,
  allCard,
  divNum,
}: PaginationProps) => {
  // 1,2,3,4,5번이 있으면 api에 offset=4,8...20 까지 바뀌게 api get 요청 로직
  // 애네를 useEffect로 관리해서 데이터 최신으로 변경될떄마다 화면 변경

  const SendPageButton = (num: any) => {
    setPageNum(num);
  };

  const PageButton = () => {
    const buttonList = [];
    for (let i = 1; i < allCard / divNum + 1; i++) {
      // card 데이터/4 한 값 = i의 최대값
      buttonList.push(
        <button type="submit" onClick={() => SendPageButton(i)}>
          {i}
        </button>,
      );
    }
    return buttonList;
  };

  return (
    <>
      <div>{children}</div>
      {/* <button type="submit" onClick={(num) => a(num)}>
        1,2,3,4,5
      </button> */}
      {PageButton()}
    </>
  );
};

export default Pagination;
