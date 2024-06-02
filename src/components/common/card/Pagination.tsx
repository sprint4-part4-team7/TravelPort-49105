import React, { useEffect, useState } from 'react';

type PaginationProps = {
  pageNum: number;
  setPageNum: any;
  allCardNum: number; // 전체 카드 수
  divNum: number; // 카드를 나눌 수(=페이지 표출될 카드 수)
};

const Pagination = ({
  pageNum,
  setPageNum,
  allCardNum,
  divNum,
}: PaginationProps) => {
  const buttonNum = Math.ceil(allCardNum / divNum);

  const [bigButtonNum, setBigButtonNum] = useState(1);

  useEffect(() => {
    if (pageNum % 10 === 1 || pageNum % 10 === 0) {
      setBigButtonNum(Math.ceil(pageNum / 10));
    }
    if (pageNum === buttonNum) {
      setBigButtonNum(Math.ceil(buttonNum / 10));
    }
  }, [pageNum]);

  const SendPageButton = (num: any) => {
    setPageNum(num);
  };

  const PageButton = () => {
    const buttonList = [];
    for (
      let i = 1;
      i <= (bigButtonNum === Math.ceil(buttonNum / 10) ? buttonNum % 10 : 10);
      i++
    ) {
      buttonList.push(
        <button
          type="submit"
          key={`button${(bigButtonNum - 1) * 10 + i}`}
          onClick={() => SendPageButton((bigButtonNum - 1) * 10 + i)}
        >
          {(bigButtonNum - 1) * 10 + i}
        </button>,
      );
    }
    return buttonList;
  };

  return (
    <div className="flex flex-row items-center gap-10">
      {buttonNum >= 10 && (
        <button type="button" onClick={() => setPageNum(1)}>
          ≪
        </button>
      )}
      <button
        type="button"
        onClick={() => (pageNum > 1 ? setPageNum(pageNum - 1) : setPageNum(1))}
      >
        {'<'}
      </button>
      {PageButton()}
      <button
        type="button"
        onClick={() =>
          pageNum < buttonNum ? setPageNum(pageNum + 1) : setPageNum(buttonNum)
        }
      >
        {'>'}
      </button>
      {buttonNum >= 10 && (
        <button type="button" onClick={() => setPageNum(buttonNum)}>
          ≫
        </button>
      )}
    </div>
  );
};

export default Pagination;
