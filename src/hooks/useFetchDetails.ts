import { getProduct, getProductOptions } from '@/apis/product';
import { CardListsType, DetailData } from '@/constants/types';
import { useEffect, useState } from 'react';

const useFetchDetails = (curProductId: number) => {
  const [product, setProduct] = useState<DetailData>();
  const [options, setOptions] = useState<CardListsType[]>([]);

  useEffect(() => {
    const fetchDetails = async (productId: number) => {
      const detailData = await getProduct(productId);
      setProduct(detailData);
    };
    const fetchOptions = async (productId: number) => {
      const optionsData = await getProductOptions(productId);
      setOptions(optionsData);
    };
    fetchDetails(curProductId);
    fetchOptions(curProductId);
  }, []);

  return {
    product,
    options,
  };
};

export default useFetchDetails;
