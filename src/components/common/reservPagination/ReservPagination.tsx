import React from 'react';
import Pagination from '../Pagination';

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
  return (
    <div className="w-full flex flex-col gap-32">
      <div className="flex flex-col gap-32">{children}</div>
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
