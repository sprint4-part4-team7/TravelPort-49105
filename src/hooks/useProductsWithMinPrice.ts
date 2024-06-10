/* eslint-disable @typescript-eslint/no-shadow */
import { useMemo } from 'react';

const useProductsWithMinPrice = (
  products: any,
  optionAll: any,
  reviews: any,
  search: string,
) => {
  // 최소 가격을 계산하는 함수
  const calculateMinPrice = (productId: number, options: any[]) => {
    // 옵션 존재 여부 확인
    if (!options) return 0;
    const filteredOptions =
      options && options.filter((option) => option.productId === productId);
    const prices =
      filteredOptions && filteredOptions.map((option) => option.optionPrice);
    return prices.length ? Math.min(...prices) : 0;
  };

  // 리뷰의 총 개수와 평균 점수를 계산하는 함수
  const calculateReviews = (
    productId: number,
    options: any[],
    reviews: any[],
  ) => {
    // 옵션과 리뷰의 존재 여부 확인
    if (!options || !reviews) return { totalReviews: 0, averageScore: 0 };
    const optionIds =
      options &&
      options
        .filter((option) => option.productId === productId)
        .map((option) => option.id);
    const relevantReviews =
      reviews &&
      reviews.filter((review) => optionIds.includes(review.productOptionId));
    const totalReviews = relevantReviews.length;
    const averageScore =
      totalReviews > 0
        ? relevantReviews.reduce((acc, curr) => acc + curr.score, 0) /
          totalReviews
        : 0;

    return { totalReviews, averageScore };
  };

  const productsWithMinPriceAndReviews = useMemo(() => {
    // 제품, 옵션, 리뷰 존재 여부 확인
    if (!products || !optionAll || !reviews) return [];
    return products
      .map((product: any) => {
        const minPrice = calculateMinPrice(product.id, optionAll);
        const { totalReviews, averageScore } = calculateReviews(
          product.id,
          optionAll,
          reviews,
        );
        return { ...product, minPrice, totalReviews, averageScore };
      })
      .filter((product: any) => {
        const nameMatch =
          product.name &&
          product.name.toLowerCase().includes(search.toLowerCase());
        const addressMatch =
          product.productAddress &&
          product.productAddress.toLowerCase().includes(search.toLowerCase());
        return nameMatch || addressMatch;
      });
  }, [products, optionAll, reviews, search]);

  return productsWithMinPriceAndReviews;
};

export default useProductsWithMinPrice;
