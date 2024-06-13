import productApi from '@/apis/product';
import productOptionApi from '@/apis/productOption';
// import { CardListsType, DetailData } from '@/constants/types';
import { useEffect, useState } from 'react';

const useFetchDetails = (curProductId: number) => {
  // const [product, setProduct] = useState<DetailData>();
  // const [options, setOptions] = useState<CardListsType[]>([]);
  const [product, setProduct] = useState<any>();
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    const fetchDetails = async (productId: number) => {
      const detailData = await productApi.getProductById(productId);
      setProduct(detailData);
    };
    const fetchOptions = async (productId: number) => {
      const optionsData =
        await productOptionApi.getProductOptionByOptionId(productId);
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
