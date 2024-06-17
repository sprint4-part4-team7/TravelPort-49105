import React from 'react';
import useFilterProducts from '@/hooks/useFilterProducts';
import Card from '@/components/common/card/Card';
import FilterButton from '@/components/common/FilterButton';

interface ProductCardProps {
  id: number;
  name: string;
  productAddress: string;
  thumbnail: string;
  minPrice: number;
  reviewAvg: any;
  reviewCount: number;
  product_categoryId: number;
}

interface SearchResultSectionProps {
  productsWithMinPrice: any;
}

const ProductCard = ({
  id,
  name,
  productAddress,
  thumbnail,
  minPrice,
  reviewAvg,
  reviewCount,
  product_categoryId,
}: ProductCardProps) => {
  const scoreAvg = reviewAvg.toFixed(1);
  return (
    <Card
      title={name}
      location={productAddress}
      price={minPrice}
      score={scoreAvg}
      review={reviewCount}
      image={thumbnail}
      link={`/details/${product_categoryId}/${id}`}
    />
  );
};

interface SearchResultSectionProps {
  productsWithMinPrice: any;
}

const SearchResultSection = ({
  productsWithMinPrice,
}: SearchResultSectionProps) => {
  // 필터링 훅 구현
  const { sortedProducts, sortType, setSortType } =
    useFilterProducts(productsWithMinPrice);
  return (
    <div>
      <div className="flex items-center justify-between mb-16 font-semibold">
        <div className="text-black-12 text-17">
          {productsWithMinPrice.length}개의 상품
        </div>
        <div className="text-14 text-black-5">
          {/* 필터링 버튼 컴포넌트 */}
          <FilterButton
            label="인기순"
            sortType="popular"
            currentSortType={sortType}
            onClick={() => setSortType('popular')}
          />
          <FilterButton
            label="후기순"
            sortType="review"
            currentSortType={sortType}
            onClick={() => setSortType('review')}
          />
          <FilterButton
            label="가격순"
            sortType="priceHigh"
            currentSortType={sortType}
            onClick={() => setSortType('priceHigh')}
          />
        </div>
      </div>
      <div className="grid gap-20 mb-3 mobile:grid-cols-1 tablet:grid-cols-4 desktop:grid-cols-5">
        {sortedProducts.map((item: any) => (
          <ProductCard
            key={item.productId}
            id={item.productId}
            name={item.productName}
            productAddress={item.productAddress}
            thumbnail={item.thumbnail}
            minPrice={item.minPrice}
            reviewAvg={item.reviewAvg}
            reviewCount={item.reviewCount}
            product_categoryId={item.product_categoryId}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultSection;
