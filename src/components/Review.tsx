// type ReviewProps = {
//   reviewId: number;
//   userId: number;
//   productOptionId: number;
//   score: number;
//   reviewImages: any;
//   reviewContent: string;
//   partnerAnswer: string;
//   createdAt: string;
// };

const Review = () => {
  return (
    <div
      className="inline-flex flex-col w-full min-w-335 gap-28 px-20 py-28
    border-1 border-solid border-black-4
    text-14"
    >
      <div className="flex items-center gap-10 text-13 font-medium">
        <img
          className="border-1 border-solid border-black-6"
          alt="프로필 이미지"
          width="32px"
          height="32px"
        />
        프로필
      </div>
      <div className="flex">
        <img
          className="border-1 border-solid border-black-6"
          alt="리뷰 이미지1"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid border-black-6"
          alt="리뷰 이미지2"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid border-black-6"
          alt="리뷰 이미지3"
          width="90px"
          height="90px"
        />
        <img
          className="border-1 border-solid border-black-6"
          alt="리뷰 이미지4"
          width="90px"
          height="90px"
        />
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div>별점</div>
          <div className="flex flex-col gap-8">
            <div className="w-full text-wrap text-14 font-semibold">
              내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시내용예시
            </div>
            <div className="flex justify-between items-center">
              <div
                className="border-1 border-solid border-black-5 rounded 
                bg-black-3 text-11 px-8 py-4 text-black-12"
              >
                상품 옵션
              </div>
              <div className="text-13 font-medium text-black-6">날짜</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-12">판매자</div>
    </div>
  );
};

export default Review;
