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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const query = useQuery();
  const search = query.get('query')?.toLowerCase() || '';
  const { productAll, optionAll } = useProductAll();
  const products = productAll?.data || [];
  const { avg, length } = useScoreAvg();

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
          {productsWithMinPrice.map(
            (item: {
              id: number;
              name: string;
              productAddress: string;
              productImages: string;
              minPrice: number;
            }) => {
              const { id, name, productAddress, productImages, minPrice } =
                item;
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
            },
          )}
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default SearchResultPage;
