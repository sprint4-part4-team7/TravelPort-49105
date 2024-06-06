/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useProductAll from '@/hooks/useProductAll';

import useScoreAvg from '@/hooks/useScoreAvg';
import useProductsWithMinPrice from '@/hooks/useProductsWithMinPrice';
// import useReviewAllQuery from '@/hooks/reactQuery/review/useReviewAllQuery';
import useReviewAllQuery from '@/hooks/reactQuery/review/useReviewAllQuery';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import Card from '@/components/common/card/Card';

interface ProductCardProps {
  id: number;
  name: string;
  productAddress: string;
  productImages: string;
  minPrice: number;
}

const ProductCard = ({
  id,
  name,
  productAddress,
  productImages,
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
      image={productImages}
      link="/"
    />
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const query = useQuery();
  const search = query.get('query')?.toLowerCase() || '';
  const { productAll, optionAll } = useProductAll();
  const products = useMemo(() => productAll?.data || [], [productAll]);
  const { data: reviewAll } = useReviewAllQuery();

  const [sortType, setSortType] = useState('popular');
  const [sortedProducts, setSortedProducts] = useState<ProductCardProps[]>([]);

  const productsWithMinPrice = useProductsWithMinPrice(
    products,
    optionAll,
    reviewAll,
    search,
  );

  const sortProducts = (product: any) => {
    switch (sortType) {
      case 'popular':
        const popularSorted = [...product].sort(
          (a, b) => b.averageScore - a.averageScore, // 별점 높은 순
        );
        return popularSorted;
      case 'review':
        const reviewSorted = [...product].sort(
          (a, b) => b.totalReviews - a.totalReviews, // 리뷰 많은 순
        );
        return reviewSorted;
      case 'priceHigh':
        const priceHighSorted = [...product].sort(
          (a, b) => a.minPrice - b.minPrice, // 가격 낮은 순
        );
        return priceHighSorted;
      default:
        return product;
    }
  };

  useEffect(() => {
    setSortedProducts(sortProducts(productsWithMinPrice));
  }, [sortType, productsWithMinPrice]);

  return (
    <div>
      <Layout userType="user" main>
        <div className="text-50">
          <h1>&quot;{search}&quot; 검색결과</h1>
        </div>
        <div className="flex p-10 text-white gap-50">
          <button
            className="p-20 bg-blue-700"
            type="button"
            onClick={() => setSortType('popular')}
          >
            인기순
          </button>
          <button
            className="p-20 bg-blue-700"
            type="button"
            onClick={() => setSortType('review')}
          >
            후기순
          </button>
          <button
            className="p-20 bg-blue-700"
            type="button"
            onClick={() => setSortType('priceHigh')}
          >
            가격순
          </button>
        </div>
        <div className="flex gap-10 mb-3">
          {sortedProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              productAddress={item.productAddress}
              productImages={item.productImages}
              minPrice={item.minPrice}
            />
          ))}
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default SearchResultPage;
