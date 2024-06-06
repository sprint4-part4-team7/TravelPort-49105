/* eslint-disable @typescript-eslint/no-shadow */
import { useMemo } from 'react';

const useProductsWithMinPrice = (
  products: any[],
  optionAll: any[],
  reviews: any[],
  search: string,
) => {
  // 최소 가격을 계산하는 함수
  const calculateMinPrice = (productId: number, options: any[]) => {
    const filteredOptions = options.filter(
      (option) => option.productId === productId,
    );
    const prices = filteredOptions.map((option) => option.optionPrice);
    return prices.length ? Math.min(...prices) : 0;
  };

  // 리뷰의 총 개수와 평균 점수를 계산하는 함수
  const calculateReviews = (
    productId: number,
    options: any[],
    reviews: any[],
  ) => {
    const optionIds = options
      .filter((option) => option.productId === productId)
      .map((option) => option.id);
    const relevantReviews = reviews.filter((review) =>
      optionIds.includes(review.productOptionId),
    );
    const totalReviews = relevantReviews.length;
    const averageScore =
      totalReviews > 0
        ? relevantReviews.reduce((acc, curr) => acc + curr.score, 0) /
          totalReviews
        : 0;

    return { totalReviews, averageScore };
  };

  const productsWithMinPriceAndReviews = useMemo(() => {
    return products
      .map((product) => {
        const minPrice = calculateMinPrice(product.id, optionAll);
        const { totalReviews, averageScore } = calculateReviews(
          product.id,
          optionAll,
          reviews,
        );
        return { ...product, minPrice, totalReviews, averageScore };
      })
      .filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const addressMatch = product.productAddress
          .toLowerCase()
          .includes(search.toLowerCase());
        return nameMatch || addressMatch;
      });
  }, [products, optionAll, reviews, search]);

  return productsWithMinPriceAndReviews;
};

export default useProductsWithMinPrice;
