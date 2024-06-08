import useScoreAvg from '@/hooks/useScoreAvg';
import React, { useMemo, useState } from 'react';
import Card from './common/card/Card';

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
  const [sortType, setSortType] = useState('popular');

  const sortProducts = (products: any[]) => {
    switch (sortType) {
      case 'popular': {
        return [...products].sort(
          (a, b) => b.averageScore - a.averageScore, // 별점 높은 순
        );
      }
      case 'review': {
        return [...products].sort(
          (a, b) => b.totalReviews - a.totalReviews, // 리뷰 많은 순
        );
      }
      case 'priceHigh': {
        return [...products].sort(
          (a, b) => b.minPrice - a.minPrice, // 가격 높은 순
        );
      }
      default:
        return products;
    }
  };

  const sortedProducts = useMemo(
    () => sortProducts(productsWithMinPrice),
    [sortType, productsWithMinPrice],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-16 font-semibold">
        <div className="text-black-12 text-17">
          {productsWithMinPrice.length}개의 상품
        </div>
        <div className="text-14 text-black-5">
          <button
            className={`p-10 ${sortType === 'popular' ? 'text-black-12' : ''}`}
            type="button"
            onClick={() => setSortType('popular')}
          >
            인기순
          </button>
          <button
            className={`p-10 ${sortType === 'review' ? 'text-black-12' : ''}`}
            type="button"
            onClick={() => setSortType('review')}
          >
            후기순
          </button>
          <button
            className={`p-10 ${sortType === 'priceHigh' ? 'text-black-12' : ''}`}
            type="button"
            onClick={() => setSortType('priceHigh')}
          >
            가격순
          </button>
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
