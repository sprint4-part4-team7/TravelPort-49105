import product from '@/apis/product';
import { ProductType } from '@/constants/types';
import { useEffect, useState } from 'react';

const useFetchByCategory = (categoryId: number) => {
  const [productsByCategory, setProductsByCategory] = useState<ProductType[]>();

  useEffect(() => {
    const fetchByCategory = async (cId: number) => {
      const response = await product.getProductByCategory(cId);

      setProductsByCategory(response.data);
    };
    fetchByCategory(categoryId);
  }, [categoryId]);

  return { productsByCategory };
};

export default useFetchByCategory;
