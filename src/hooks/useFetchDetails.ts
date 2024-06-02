import { getProduct, getProductOption } from '@/apis/productDetails';
import { DetailData, OptionData } from '@/constants/types';
import { useEffect, useState } from 'react';

const useFetchDetails = (curProductId: number, curProductOptionId: number) => {
  const [product, setProduct] = useState<DetailData>();
  const [option, setOption] = useState<OptionData>();

  useEffect(() => {
    const fetchDetails = async (productId: number) => {
      const detailData = await getProduct(productId);
      setProduct(detailData);
    };
    const fetchOptionDetails = async (productOptionId: number) => {
      const optionData = await getProductOption(productOptionId);
      setOption(optionData);
    };
    fetchDetails(curProductId);
    fetchOptionDetails(curProductOptionId);
  }, []);

  return {
    product,
    option,
  };
};

export default useFetchDetails;
