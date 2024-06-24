import instance from '@/utils/Axios';

interface ProductOptionProps {
  optionName: string;
  optionDesc: string;
  optionPrice: number;
  optionImage: string;
  minUserCount: number;
  maxUserCount: number;
  userCount: number;
  timeTable: {
    startTimeOnly: string;
    endTimeOnly: string;
  }[];
}

const getProductOptionAll = async () => {
  return instance({
    url: `/productOption/all`,
    method: 'GET',
  });
};

const getProductOptionByOptionId = async (productOptionId: number) => {
  return instance({
    url: `/productOption/${productOptionId}`,
    method: 'GET',
  });
};

const putProductOption = async (
  productOptionId: number,
  productId: number,
  optionInfo: ProductOptionProps,
) => {
  return instance({
    url: `/productOption/${productOptionId}`,
    method: 'PUT',
    data: {
      productOptionId,
      productId,
      ...optionInfo,
    },
  });
};

const deleteProductOption = async (productOptionId: number) => {
  return instance({
    url: `/productOption/${productOptionId}`,
    method: 'DELETE',
  });
};

const getProductOptions = async (productId: number) => {
  return instance({
    url: `/productOption/product/${productId}`,
    method: 'GET',
  });
};

const postProductOption = async (
  productId: number,
  optionInfo: ProductOptionProps,
) => {
  return instance({
    url: `/productOption`,
    method: 'POST',
    data: {
      productId,
      ...optionInfo,
    },
  });
};

export default {
  getProductOptionAll,
  getProductOptionByOptionId,
  putProductOption,
  deleteProductOption,
  getProductOptions,
  postProductOption,
};
