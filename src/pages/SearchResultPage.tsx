/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useProductAll from '@/hooks/useProductAll';
import getMinPrice from '@/utils/getMinPrice';

import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import Card from '@/components/common/card/Card';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// 유틸리티 함수: 특정 제품의 평균 가격을 계산 (소수점 제거)
const calculateAveragePrice = (productName: string, options: any[]) => {
  const filteredOptions = options.filter(
    (option) => option.product.name === productName,
  );
  const totalOptionPrice = filteredOptions.reduce(
    (sum, option) => sum + option.optionPrice,
    0,
  );
  return filteredOptions.length
    ? Math.round(totalOptionPrice / filteredOptions.length)
    : 0;
};

const SearchResultPage = () => {
  const query = useQuery();
  const search = query.get('query')?.toLowerCase() || ''; // 검색어를 소문자로 변환
  const { productAll, optionAll } = useProductAll();
  const products = productAll?.data || [];

  // 평균 가격 계산 및 필터링
  const productsWithAveragePrice = useMemo(() => {
    return products
      .map((product: any) => {
        const averagePrice = calculateAveragePrice(product.name, optionAll);
        return { ...product, averagePrice };
      })
      .filter((product: any) => {
        const nameMatch = product.name.toLowerCase().includes(search);
        const addressMatch = product.productAddress
          .toLowerCase()
          .includes(search);
        return nameMatch || addressMatch;
      });
  }, [products, optionAll, search]);

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
          {productsWithAveragePrice.map(
            (item: {
              id: number;
              name: string;
              productAddress: string;
              productImages: string;
              averagePrice: number;
            }) => {
              const { id, name, productAddress, productImages, averagePrice } =
                item;
              return (
                <Card
                  key={id}
                  title={name}
                  location={productAddress}
                  price={averagePrice}
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
