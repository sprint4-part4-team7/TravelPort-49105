// hooks/useProductsWithMinPrice.ts
import { useMemo } from 'react';

const useProductsWithMinPrice = (
  products: any[],
  optionAll: any[],
  search: string,
) => {
  const calculateMinPrice = (productName: string, options: any[]) => {
    const filteredOptions = options.filter(
      (option) => option.product.name === productName,
    );
    const prices = filteredOptions.map((option) => option.optionPrice);
    return prices.length ? Math.min(...prices) : 0;
  };

  const productsWithMinPrice = useMemo(() => {
    return products
      .map((product) => {
        const minPrice = calculateMinPrice(product.name, optionAll);
        return { ...product, minPrice };
      })
      .filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(search);
        const addressMatch = product.productAddress
          .toLowerCase()
          .includes(search);
        return nameMatch || addressMatch;
      });
  }, [products, optionAll, search]);

  return productsWithMinPrice;
};

export default useProductsWithMinPrice;
