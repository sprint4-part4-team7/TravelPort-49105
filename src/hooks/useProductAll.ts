import { getProductAll, getProductOptionAll } from '@/apis/productAll';
import { useEffect, useState } from 'react';

const useProductAll = () => {
  const [productAll, setProductAll] = useState<any>([]);
  const [optionAll, setOptionAll] = useState<any>([]);

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
