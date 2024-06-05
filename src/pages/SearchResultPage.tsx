/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useProductAll from '@/hooks/useProductAll';

import useScoreAvg from '@/hooks/useScoreAvg';
import useProductsWithMinPrice from '@/hooks/useProductsWithMinPrice';
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
  const products = productAll?.data || [];

  // optionAll 배열에서 productId 추출
  const productIds = useMemo(
    () => optionAll.map((option: any) => option.productId),
    [optionAll],
  );

  const productsWithMinPrice = useProductsWithMinPrice(
    products,
    optionAll,
    search,
  );

  return (
    <div>
      <Layout userType="user">
        <div className="text-50">
          <h1>&quot;{search}&quot; 검색결과</h1>
        </div>
        <div>
          <button type="button">인기순</button>
          <button type="button">후기순</button>
          <button type="button">가격순</button>
        </div>
        <div className="flex gap-10">
          {productsWithMinPrice.map((item) => (
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
