import {
  getProduct,
  getProductOption,
  getProductOptions,
} from '@/apis/product';
import { CardListsType, DetailData, OptionData } from '@/constants/types';
import { useEffect, useState } from 'react';

const useFetchDetails = (curProductId: number, curProductOptionId: number) => {
  const [product, setProduct] = useState<DetailData>();
  const [option, setOption] = useState<OptionData>();
  const [options, setOptions] = useState<CardListsType[]>([]);

  useEffect(() => {
    const fetchDetails = async (productId: number) => {
      const detailData = await getProduct(productId);
      setProduct(detailData);
    };
    const fetchOptionDetails = async (productOptionId: number) => {
      const optionData = await getProductOption(productOptionId);
      setOption(optionData);
    };
    const fetchOptions = async (productId: number) => {
      const optionsData = await getProductOptions(productId);
      setOptions(optionsData);
    };
    fetchDetails(curProductId);
    fetchOptionDetails(curProductOptionId);
    fetchOptions(curProductId);
  }, []);

  return {
    product,
    option,
    options,
  };
};

export default useFetchDetails;
