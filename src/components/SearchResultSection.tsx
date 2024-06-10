import useScoreAvg from '@/hooks/useScoreAvg';
import React from 'react';
import useFilterProducts from '@/hooks/useFilterProducts';
import Card from './common/card/Card';
import FilterButton from './common/FilterButton';

interface ProductCardProps {
  id: number;
  name: string;
  productAddress: string;
  thumbnail: string;
  minPrice: number;
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
}: ProductCardProps) => {
  const { avg, length } = useScoreAvg(id);
  return (
    <Card
      key={id}
      title={name}
      location={productAddress}
      price={minPrice}
      score={avg}
      review={length}
      image={thumbnail}
      link="/"
    />
  );
};

interface SearchResultSectionProps {
  productsWithMinPrice: any;
}

const SearchResultSection = ({
  productsWithMinPrice,
}: SearchResultSectionProps) => {
  const { sortedProducts, sortType, setSortType } =
    useFilterProducts(productsWithMinPrice);

  return (
    <div>
      <div className="flex items-center justify-between mb-16 font-semibold">
        <div className="text-black-12 text-17">
          {productsWithMinPrice.length}개의 상품
        </div>
        <div className="text-14 text-black-5">
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
        {sortedProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            productAddress={item.productAddress}
            thumbnail={item.thumbnail}
            minPrice={item.minPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultSection;
