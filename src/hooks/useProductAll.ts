import { getProductAll, getProductOptionAll } from '@/apis/productAll';
import { CardListsType } from '@/constants/types';
import { useEffect, useState } from 'react';

const useProductAll = () => {
  const [productAll, setProductAll] = useState([]);
  const [optionAll, setOptionAll] = useState<CardListsType[]>([]);

  useEffect(() => {
    const fetchProductAll = async () => {
      const productResp = await getProductAll();
      setProductAll(productResp);
    };
    const fetchOptionAll = async () => {
      const optionResp = await getProductOptionAll();
      setOptionAll(optionResp);
    };
    fetchProductAll();
    fetchOptionAll();
  }, []);

  return { productAll, optionAll };
};
export default useProductAll;
