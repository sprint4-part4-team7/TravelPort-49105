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
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import Loading from '@/components/common/Loading';
import NoData from '@/components/common/NoData';

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  const productIdNum = Number(productId);

  const { product, options, isLoadingProducts, isLoadingOptions } =
    useFetchDetails(productIdNum);
  const { productAll } = useProductAllQuery();

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

  const [activeTab, setActiveTab] = useState('reservation');

  const { productReviews } = useProductReview(productIdNum);

  const handleTabClick = (tab: string) => setActiveTab(tab);

  // 캐러셀에 사용할 이미지: 썸네일 + productImages
  let newUrls;
  if (product?.productImages)
    newUrls = [product?.thumbnail].concat(product?.productImages);

  // 모든 상품의 productId array 구하기
  const idArray: number[] = [];
  productAll &&
    productAll.forEach((product: any) => {
      if (!idArray.includes(product.productId)) idArray.push(product.productId);
    });

  // 로딩
  if (isLoadingProducts || isLoadingOptions) return <Loading />;

  // productId 없으면 404페이지
  if (!productId || !idArray.includes(Number(productId))) return <NoPage />;

  return (
    <>
      <Layout>
        <div className="mx-auto mb-40 max-w-784 mt-100 mobile:mt-40 mobile:px-20 tablet:px-20">
          <DetailsCarousel urls={newUrls} />
          <div className="flex flex-col w-full gap-12 mx-auto mt-32 mb-40 max-w-784">
            <h1 className="font-bold text-20">{product?.name}</h1>
            <h2 className="mt-4 font-bold text-20">{product?.minPrice}원~</h2>
            <p className="mb-8 text-16">{product?.productDesc}</p>

            <div className="flex gap-8 font-semibold text-17">
              <SalesPeriod product={product} />
            </div>

            <div className="flex gap-8 font-semibold text-17">
              <LocationMap product={product} />
            </div>
          </div>
          <div className="w-full mx-auto max-w-784">
            <div className="flex items-center justify-center my-20">
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
                <h1 className="py-16 font-semibold text-18">
                  리뷰
                  <span className="text-blue-6 pl-11">
                    {productReviews?.length ? productReviews.length : 0}개
                  </span>
                </h1>
                {dataByPage?.length ? (
                  dataByPage.map((review: any) => {
                    return <Review key={review.id} review={review} />;
                  })
                ) : (
                  <NoData text="리뷰가 없어요." />
                )}
                <div className="py-20 mx-auto w-fit">
                  {!!reviewByProductId.length && (
                    <Pagination
                      pageNum={pageNum}
                      setPageNum={setPageNum}
                      allCardNum={reviewByProductId.length}
                      divNum={LIMIT}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default ProductDetails;
