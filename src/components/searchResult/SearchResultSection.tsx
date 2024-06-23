import React from 'react';
import useFilterProducts from '@/hooks/products/useFilterProducts';
import Card from '@/components/common/card/Card';
import FilterButton from '@/components/main/FilterButton';

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
    <div className="w-full">
      <Card
        title={name}
        location={productAddress}
        price={minPrice}
        score={scoreAvg}
        review={reviewCount}
        image={thumbnail}
        link={`/details/${product_categoryId}/${id}`}
      />
    </div>
  );
};

const SearchResultSection = ({
  productsWithMinPrice,
}: SearchResultSectionProps) => {
  // 필터링 훅 구현
  const { sortedProducts, sortType, setSortType } =
    useFilterProducts(productsWithMinPrice);
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="w-full max-w-screen-xl">
        <div className="flex items-center justify-between mb-16 font-semibold mobile:mx-20">
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
        <div className="grid grid-cols-1 gap-20 mb-3 mobile:w-375 mobile:px-20 mobile:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
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
    </div>
  );
};

export default SearchResultSection;
