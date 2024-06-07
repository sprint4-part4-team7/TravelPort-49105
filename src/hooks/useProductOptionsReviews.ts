import { useMemo } from 'react';

const useProductOptionsReviews = (
  productAll: any,
  optionAll: any,
  reviewAll: any,
) => {
  return useMemo(() => {
    const products = productAll.data;
    return (
      products &&
      products
        .map((product: any) => {
          // 해당 제품의 옵션 찾기
          const productOptions = optionAll.filter(
            (option: any) => option.productId === product.id,
          );

          // 해당 옵션들의 리뷰 찾기
          const reviews = reviewAll.filter((review: any) =>
            productOptions.some(
              (option: any) => option.id === review.productOptionId,
            ),
          );

          // 리뷰 개수
          const reviewCount = reviews.length;
          // 평균 점수 계산
          const averageScore =
            Math.round(
              (reviews.reduce((acc: any, curr: any) => acc + curr.score, 0) /
                reviewCount) *
                10,
            ) / 10 || 0;

          // 최저 가격 계산
          const minPrice = productOptions.reduce((min: any, option: any) => {
            return option.optionPrice < min ? option.optionPrice : min;
          }, Infinity);

          // 제품 객체에 리뷰 정보 및 최저 가격 추가
          return { ...product, reviewCount, averageScore, minPrice };
        })
        .sort(
          (a: any, b: any) =>
            b.averageScore - a.averageScore || b.reviewCount - a.reviewCount,
        )
    ); // 평균 점수로 내림차순 정렬 후, 같으면 리뷰 개수로 내림차순 정렬
  }, [productAll, optionAll, reviewAll]);
};

export default useProductOptionsReviews;
