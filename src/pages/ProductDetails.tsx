/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import useFetchDetails from '@/hooks/useFetchDetails';
import { useEffect, useState } from 'react';
import useProductReview from '@/hooks/useProductReview';
import { useParams } from 'react-router-dom';
import useReviewByProductIdQuery from '@/hooks/reactQuery/review/useReviewByProductIdQuery';
import instance from '@/utils/axios';
import useProductAllQuery from '@/hooks/reactQuery/product/useProductAllQuery';
import LocationMap from '@/components/details/LocationMap';
import SalesPeriod from '@/components/details/SalesPeriod';
import Reservation from '@/components/details/Reservation';
import DetailsCarousel from '@/components/details/DetailsCarousel';
import Review from '@/components/Review';
import ReviewAverage from '@/components/review/ReviewAverage';
import DetailInfo from '@/components/details/DetailInfo';
import Pagination from '@/components/common/Pagination';
import NoPage from './NoPage';

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  const productIdNum = Number(productId);

  const { product, options } = useFetchDetails(productIdNum);
  const { productAll } = useProductAllQuery();

  // 모든 상품의 productId array 구하기
  const idArray: number[] = [];
  productAll &&
    productAll.forEach((product: any) => {
      if (!idArray.includes(product.productId)) idArray.push(product.productId);
    });

  // productId 없으면 404페이지
  if (!productId || !idArray.includes(Number(productId))) return <NoPage />;

  const [pageNum, setPageNum] = useState(1); // 현재 클릭된 페이지 숫자
  const [dataByPage, setDataByPage] = useState<any>(); // 페이지 별 리뷰 데이터
  const { reviewByProductId } = useReviewByProductIdQuery(Number(productId));
  const LIMIT = 3;
  const offset = pageNum - 1;

  useEffect(() => {
    const fetchByOffset = async (productId: number, offsetNum: number) => {
      const response = await instance.get(
        `/review/product/${productId}?offset=${offsetNum}&limit=${LIMIT}`,
      );
      setDataByPage(response.data);
    };
    fetchByOffset(productIdNum, offset);
  }, [offset, productIdNum]);

  const [activeTab, setActiveTab] = useState('');

  const { productReviews } = useProductReview(productIdNum);

  const handleTabClick = (tab: string) => setActiveTab(tab);

  // 캐러셀에 사용할 이미지: 썸네일 + productImages
  let newUrls;
  if (product?.productImages)
    newUrls = [product?.thumbnail].concat(product?.productImages);

  return (
    <div className="max-w-784 mx-auto mt-100 mb-40 mobile:mt-40 mobile:px-20 tablet:px-20">
      <DetailsCarousel urls={newUrls} />
      <div className="flex flex-col gap-12 mt-32 mb-40 max-w-784 w-full mx-auto">
        <h1 className="text-20 font-bold">{product?.name}</h1>
        <h2 className="text-20 font-bold mt-4">{product?.minPrice}원~</h2>
        <p className="text-16 mb-8">{product?.productDesc}</p>

        <div className="flex gap-8 text-17 font-semibold">
          <SalesPeriod product={product} />
        </div>

        <div className="flex gap-8 text-17 font-semibold">
          <LocationMap product={product} />
        </div>
      </div>
      <div className="max-w-784 w-full mx-auto">
        <div className="flex justify-center items-center my-20">
          <h1
            onClick={() => handleTabClick('reservation')}
            className={`${activeTab === 'reservation' && 'rounded-8 bg-black-7 text-white'} p-12 text-14 font-semibold flex-1 text-center bg-black-3 cursor-pointer`}
          >
            예약하기
          </h1>
          <h1
            onClick={() => handleTabClick('details')}
            className={`${activeTab === 'details' && 'rounded-8 bg-black-7 text-white'} p-12 text-14 font-semibold flex-1 text-center bg-black-3 cursor-pointer`}
          >
            상세정보
          </h1>
          <h1
            onClick={() => handleTabClick('review')}
            className={`${activeTab === 'review' && 'rounded-8 bg-black-7 text-white'} p-12 text-14 font-semibold flex-1 text-center bg-black-3 cursor-pointer`}
          >
            리뷰
          </h1>
        </div>
        {activeTab === 'reservation' && (
          <Reservation
            product={product}
            options={options}
            categoryId={Number(categoryId)}
          />
        )}
        {activeTab === 'details' && <DetailInfo options={options} />}
        {activeTab === 'review' && (
          <div className="mt-60">
            <ReviewAverage productId={productIdNum} />
            <h1 className="text-18 font-semibold py-16">
              리뷰
              <span className="text-blue-6 pl-11">
                {productReviews?.length ? productReviews.length : 0}개
              </span>
            </h1>
            {!!dataByPage?.length &&
              dataByPage.map((review: any) => {
                return <Review key={review.id} review={review} />;
              })}
            <div className="mx-auto w-fit py-20">
              <Pagination
                pageNum={pageNum}
                setPageNum={setPageNum}
                allCardNum={reviewByProductId.length}
                divNum={LIMIT}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
