import useFetchDetails from '@/hooks/useFetchDetails';

const ProductDetails = () => {
  const { product, option } = useFetchDetails(1, 1);
  return (
    <>
      <div>{product?.name}</div>
      <div>{product?.productDesc}</div>
      <div>{option?.userCount}표 남음</div>
    </>
  );
};

export default ProductDetails;
