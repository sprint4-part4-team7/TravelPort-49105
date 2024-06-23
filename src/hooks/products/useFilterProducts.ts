/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useMemo } from 'react';

const useFilterProducts = (products: any) => {
  const [sortType, setSortType] = useState('popular');

  const sortedProducts = useMemo(() => {
    switch (sortType) {
      case 'popular':
        return [...products].sort(
          (a, b) => b.reviewAvg.toFixed(1) - a.reviewAvg.toFixed(1), // 별점 높은 순
        );
      case 'review':
        return [...products].sort(
          (a, b) => b.reviewCount - a.reviewCount, // 리뷰 많은 순
        );
      case 'priceHigh':
        return [...products].sort(
          (a, b) => b.minPrice - a.minPrice, // 가격 높은 순
        );
      default:
        return products;
    }
  }, [sortType, products]);

  return { sortedProducts, sortType, setSortType };
};

export default useFilterProducts;
