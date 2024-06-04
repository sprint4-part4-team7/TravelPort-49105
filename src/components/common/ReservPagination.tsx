import React from 'react';
import Pagination from './Pagination';

interface ReservPaginationProps {
  pageNum: number;
  setPageNum: (page: number) => void;
  allCardNum: number;
  limit: number;
  children: React.ReactNode;
}

const ReservPagination: React.FC<ReservPaginationProps> = ({
  pageNum,
  setPageNum,
  allCardNum,
  limit,
  children,
}) => {
  const start = (pageNum - 1) * limit;
  const end = start + limit;

  const slicedChildren = React.Children.toArray(children).slice(start, end);

  return (
    <div className="w-full flex flex-col gap-32">
      <div className="flex flex-col gap-32">{slicedChildren}</div>
      <div className="flex justify-center items-center">
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={allCardNum}
          divNum={limit}
        />
      </div>
    </div>
  );
};

export default ReservPagination;
