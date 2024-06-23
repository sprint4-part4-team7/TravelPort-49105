import React, { useState, useEffect } from 'react';
import Pagination from '@/components/common/pagination/Pagination';

type SearchResultPaginationProps = {
  productsWithMinPrice: any[];
  itemsPerPage: number;
  setPaginatedProducts: (products: any) => void;
};

const SearchResultPagination = ({
  productsWithMinPrice,
  itemsPerPage,
  setPaginatedProducts,
}: SearchResultPaginationProps) => {
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const paginatedProducts = productsWithMinPrice?.slice(
      (pageNum - 1) * itemsPerPage,
      pageNum * itemsPerPage,
    );
    setPaginatedProducts(paginatedProducts);
  }, [pageNum, productsWithMinPrice, itemsPerPage, setPaginatedProducts]);

  return (
    <Pagination
      pageNum={pageNum}
      setPageNum={setPageNum}
      allCardNum={productsWithMinPrice?.length || 0}
      divNum={itemsPerPage}
    />
  );
};

export default SearchResultPagination;
