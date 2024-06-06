/* eslint-disable react/no-array-index-key */
import SMILE from '@/assets/icons/message-smile-square.svg';
import ARROWRIGHT from '@/assets/icons/arrowright-blue.svg';
import ARROWDOWN from '@/assets/icons/arrowdown-blue.svg';
import STAR_EMPTY from '@/assets/images/star-empty.svg';
import STAR_FILL from '@/assets/images/star-fill.svg';
import { useEffect, useState } from 'react';
import instance from '@/utils/axios';

type ReviewProps = {
  reviewId?: number;
};

const Review = ({ reviewId }: ReviewProps) => {
  const [isComment, setIsComment] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState<number>(0);
  const [productOptionId, setProductOptionId] = useState<number>(0);
  const [partnerAnswer, setPartnerAnswer] = useState<string | null>();
  const [createdAt, setCreatedAt] = useState<string>();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month}.${day}`;
  };

  const handleReview = async (rId: number = 0) => {
    try {
      const res = await instance.get(`/review/${rId}`);
      const result = res.data.review;
      const reviewScore = result.score !== null ? Math.round(result.score) : 0;
      setUserId(result.userId);
      setProductOptionId(result.productOptionId);
      setReviewContent(result.reviewContent);
      setScore(reviewScore);
      setReviewImages(result.reviewImgaes);
      setPartnerAnswer(result.partnerAnswer);
      setCreatedAt(formatDate(result.createdAt));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // user 정보 및 상품옵션
  // 유저 정보를 확인할 수 있는 API 구현 시 추가 예정
  // const [profileImg, setProfileImg] = useState();
  // const [userName, setUserName] = useState();
  const [productOption, setProductOption] = useState<string | null>('');
  const handleUserProduct = async () => {
    try {
      const res = await instance.get(`/productOption/${productOptionId}`);
      const result = res.data;
      const optionName = result.optionName !== null ? result.optionName : '';
      setProductOption(optionName);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleReview(reviewId);
    handleUserProduct();
  }, [reviewId, productOptionId]);

  // 판매자 댓글 클릭 시, 댓글 내용이 보이게 하도록 하는 handler 함수
  const handleCommnent = () => {
    setIsComment(!isComment);
  };

  // error 방지를 위한 임시 console.log(추후 삭제 예정)
  console.log(reviewImages, userId);

  return (
    <div
      className="inline-flex flex-col w-full min-w-335 gap-28 px-20 py-28
    border-b-1 border-solid border-black-4
    text-14"
    >
      <div className="flex items-center gap-10 text-13 font-medium">
        <img
          className="border-1 border-solid rounded-full border-black-6"
          alt="프로필 이미지"
          width="32px"
          height="32px"
        />
        프로필
      </div>
      <div className="flex overflow-x-scroll w-fit gap-4">
        {/* {reviewImages &&
          reviewImages.length > 0 &&
          reviewImages.map((image, index) => (
            <>
              <p>image</p>
              <img
                key={index}
                alt="리뷰 이미지"
                width="90px"
                height="90px"
                src={image}
              />
            </>
          ))} */}
        <img
          className="object-fill border-1 border-solid rounded-lg border-black-6"
          alt="리뷰 이미지1"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid rounded-lg border-black-6"
          alt="리뷰 이미지2"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid rounded-lg border-black-6"
          alt="리뷰 이미지3"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid rounded-lg border-black-6"
          alt="리뷰 이미지4"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid rounded-lg border-black-6"
          alt="리뷰 이미지5"
          width="90px"
          height="90px"
        />
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              return (
                <img
                  key={index}
                  alt="star"
                  width="16px"
                  height="16px"
                  src={index < score ? STAR_FILL : STAR_EMPTY}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-8">
            <div className="w-full text-wrap text-14 font-semibold">
              {reviewContent}
            </div>
            <div className="flex justify-between items-center">
              <div
                className="border-1 border-solid border-black-5 rounded 
                bg-black-3 text-11 px-8 py-4 text-black-12"
              >
                {productOption}
              </div>
              <div className="text-13 font-medium text-black-6">
                {createdAt}
              </div>
            </div>
          </div>
        </div>
      </div>
      {partnerAnswer && (
        <div className="flex flex-col p-12">
          <button
            type="button"
            className="inline-flex items-center gap-8 p-8 rounded w-fit hover:bg-black-3"
            onClick={handleCommnent}
          >
            <div className="flex gap-4">
              <img
                alt="판매자 댓글 icon"
                width="16px"
                height="16px"
                src={SMILE}
              />
              <div className="text-13 text-blue-6 font-medium">판매자 댓글</div>
            </div>
            {isComment ? (
              <img alt="화살표" width="16px" height="16px" src={ARROWDOWN} />
            ) : (
              <img alt="화살표" width="16px" height="16px" src={ARROWRIGHT} />
            )}
          </button>

          {isComment && (
            <div className="p-8 w-full text-wrap text-13 font-medium">
              {partnerAnswer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Review;
