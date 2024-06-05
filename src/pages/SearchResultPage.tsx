/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
import useProductAll from '@/hooks/useProductAll';
import getMinPrice from '@/utils/getMinPrice';

import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import Card from '@/components/common/card/Card';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const query = useQuery();
  const search = query.get('query');
  const { productAll } = useProductAll();
  const products = productAll.data;

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
          {products &&
            products.map(
              (item: {
                id: number;
                name: string;
                productAddress: string;
                productImages: string;
              }) => {
                const { id, name, productAddress, productImages } = item;
                return (
                  <Card
                    key={id}
                    title={name}
                    location={productAddress}
                    price={4000}
                    score={5}
                    review={555}
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
