/* eslint-disable react/no-array-index-key */
import SMILE from '@/assets/icons/message-smile-square.svg';
import ARROWRIGHT from '@/assets/icons/arrowright-blue.svg';
import ARROWDOWN from '@/assets/icons/arrowdown-blue.svg';
import STAR_EMPTY from '@/assets/images/star-empty.svg';
import STAR_FILL from '@/assets/images/star-fill.svg';
import { useState } from 'react';
import { ReviewData } from '@/constants/types';
import changeDateForm from '@/utils/changeDateForm';

type ReviewProps = {
  review: ReviewData;
};

const Review = ({ review }: ReviewProps) => {
  const {
    reviewContent,
    score,
    reviewImages,
    partnerAnswer,
    createdAt,
    userName,
    userProfileImage,
    optionName,
  } = review;
  const reviewScore = score !== null ? Math.round(score) : 0;
  const created = changeDateForm(createdAt);
  const [isComment, setIsComment] = useState(false);

  const filteredImages = reviewImages.filter((image: string) => image !== '');

  // 판매자 댓글 클릭 시, 댓글 내용이 보이게 하도록 하는 handler 함수
  const handleComment = () => {
    setIsComment(!isComment);
  };

  return (
    <div
      className="inline-flex flex-col w-full min-w-335 px-20 py-28
    border-b-1 border-solid border-black-4
    text-14"
    >
      <div className="flex items-center gap-10 text-13 font-medium">
        <img
          className="border-1 border-solid rounded-full border-black-6"
          src={userProfileImage}
          alt="프로필 이미지"
          width="32px"
          height="32px"
        />
        {userName}
      </div>
      <div className="flex overflow-x-auto w-full pt-14">
        {!!filteredImages?.length &&
          filteredImages.map((image, index) => (
            <img
              key={index}
              alt="리뷰 이미지"
              className="w-90 h-90"
              src={image}
            />
          ))}
      </div>
      <div>
        <div className="flex flex-col gap-4 pt-14">
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              return (
                <img
                  key={index}
                  alt="star"
                  width="16px"
                  height="16px"
                  src={index < reviewScore ? STAR_FILL : STAR_EMPTY}
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
                {optionName}
              </div>
              <div className="text-13 font-medium text-black-6">{created}</div>
            </div>
          </div>
        </div>
      </div>
      {partnerAnswer && (
        <div className="flex flex-col p-12">
          <button
            type="button"
            className="inline-flex items-center gap-8 p-8 rounded w-fit hover:bg-black-3"
            onClick={handleComment}
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
