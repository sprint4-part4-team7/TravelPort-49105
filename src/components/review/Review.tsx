/* eslint-disable react/no-array-index-key */
import SMILE from '@/assets/icons/messageSmileSquare.svg';
import ARROWRIGHT from '@/assets/icons/arrowRightBlue.svg';
import ARROWDOWN from '@/assets/icons/arrowDownBlue.svg';
import STAR_EMPTY from '@/assets/icons/starEmpty.svg';
import STAR_FILL from '@/assets/icons/starFill.svg';
import { useEffect, useState } from 'react';
import { ReviewData } from '@/constants/Types';
import changeDateForm from '@/utils/ChangeDateForm';
import useProfileImage from '@/utils/RandomProfile';
import { useUserStore } from '@/utils/Zustand';

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

  const { userInfo } = useUserStore();

  const reviewScore = score !== null ? Math.round(score) : 0;
  const created = changeDateForm(createdAt);
  const [isComment, setIsComment] = useState(false);
  const [profileImg, setProfileImg] = useState(userProfileImage || '');

  const filteredImages = reviewImages.filter((image: string) => image !== '');
  const randomImg = useProfileImage(userInfo);
  useEffect(() => {
    if (userProfileImage) {
      setProfileImg(userProfileImage);
    } else setProfileImg(randomImg);
  }, [userProfileImage, randomImg]);

  // 판매자 댓글 클릭 시, 댓글 내용이 보이게 하도록 하는 handler 함수
  const handleComment = () => {
    setIsComment(!isComment);
  };

  return (
    <div className="inline-flex flex-col w-full px-20 border-solid min-w-335 py-28 border-b-1 border-black-4 text-14">
      <div className="flex items-center gap-10 font-medium text-13">
        <img
          className="border-solid rounded-full border-1 border-black-6"
          src={profileImg}
          alt="프로필 이미지"
          width="32px"
          height="32px"
        />
        {userName}
      </div>
      <div className="flex w-full overflow-x-auto pt-14">
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
            <div className="w-full font-semibold text-wrap text-14">
              {reviewContent}
            </div>
            <div className="flex items-center justify-between">
              <div className="px-8 py-4 border-solid rounded border-1 border-black-5 bg-black-3 text-11 text-black-12">
                {optionName}
              </div>
              <div className="font-medium text-13 text-black-6">{created}</div>
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
              <div className="font-medium text-13 text-blue-6">판매자 댓글</div>
            </div>
            {isComment ? (
              <img alt="화살표" width="16px" height="16px" src={ARROWDOWN} />
            ) : (
              <img alt="화살표" width="16px" height="16px" src={ARROWRIGHT} />
            )}
          </button>

          {isComment && (
            <div className="w-full p-8 font-medium text-wrap text-13">
              {partnerAnswer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Review;
