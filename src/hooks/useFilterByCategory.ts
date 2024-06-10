const useFilterByCategory = (data: any) => {
  const categoryAccommodation =
    data && data.filter((item: any) => item.categoryId === 1);
  const categoryActivity =
    data && data.filter((item: any) => item.categoryId === 2);

  // 리뷰 개수가 3개 이상인 항목만 필터링하고 별점이 높은 순으로 정렬하는 함수
  const filterAndSortByReviews = (items: any) => {
    return (
      items &&
      items
        .filter((item: any) => item.reviewCount >= 3) // 리뷰 개수가 3개 이상인 항목만 필터링
        .sort((a: any, b: any) => b.averageScore - a.averageScore)
    ); // 별점이 높은 순으로 정렬
  };

  // 카테고리 별로 필터링된 항목들 중 리뷰 개수가 3개 이상인 항목들을 별점 높은 순으로 정렬
  const sortedCategoryAccommodation = filterAndSortByReviews(
    categoryAccommodation,
  );
  const sortedCategoryActivity = filterAndSortByReviews(categoryActivity);

  // 정렬된 항목들 반환
  return { sortedCategoryAccommodation, sortedCategoryActivity };
};

export default useFilterByCategory;
