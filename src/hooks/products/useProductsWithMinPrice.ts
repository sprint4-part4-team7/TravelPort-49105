import { useMemo } from 'react';

const useProductsWithMinPrice = (products: any, search: string) => {
  const matedProductsSearch = useMemo(() => {
    // 서치바랑 이름 또는 주소 같은지 확인
    if (!products) return [];
    return products.filter((product: any) => {
      const nameMatch =
        product.productName &&
        product.productName.toLowerCase().includes(search.toLowerCase());
      const addressMatch =
        product.productAddress &&
        product.productAddress.toLowerCase().includes(search.toLowerCase());
      return nameMatch || addressMatch;
    });
  }, [products, search]);

  return matedProductsSearch;
};

export default useProductsWithMinPrice;
