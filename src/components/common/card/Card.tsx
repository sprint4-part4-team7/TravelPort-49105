// 단일카드
import emptyImage from '@/assets/images/star-empty.svg';
// import fillImage from '@/assets/images/star-fill.svg';

const Card = () => {
  const title = '제주도 둘레길'; // 서버에서 받아오는 제목
  const location = '제주도 서귀포시 애월읍'; // 서버에서 받아오는 위치(ex 경기도 하남시 신장동)
  const price = 3000000; // 서버에서 받아오는 가격
  const score = 4; // 서버에서 받아오는 별점 소수점 없는 수
  const review = 1000; // 서버에서 받아오는 총 리뷰 수
  const image = 'https://picsum.photos/265/267'; // 서버에서 받아오는 이미지(임시로 랜덤/width/height)

  const imageScore = () => {
    const a = [];
    for (let i = 0; i < score; i += 1) {
      a.push(<img src={emptyImage} alt="이미지가 있음" />); // fill로 수정
    }
    for (let i = 0; i < 5 - score; i += 1) {
      a.push(<img src={emptyImage} alt="이미지가 없음" />);
    }
    return a;
  };

  return (
    <div className="flex flex-col w-265 h-400 overflow-hidden rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,0.25)] tablet:w-229 tablet:h-350 mobile:w-335 mobile:h-198 mobile:flex-row">
      <img
        src={image}
        alt="예시사진"
        className="w-265 h-267 object-cover tablet:w-229 tablet:h-231 mobile:w-158 mobile:h-198"
      />
      <div className="w-265 h-133 bg-white px-16 py-20 hover:bg-blue-1 tablet:w-229 tablet:h-119 mobile:w-177 mobile:h-198">
        <p className="text-black-13 pb-5 text-xl font-semibold leading-7">
          {title}
        </p>
        <p className="text-black-13 pb-8 text-xs leading-4">{location}</p>
        <div className="flex flex-row items-center pb-16 mobile:flex-col mobile:items-start ">
          <div className="flex flex-row pr-8 mobile:pb-8">
            <div className="flex w-75">{imageScore()}</div>
            <p className="text-black-7 text-xs pl-4">( {score} / 5 )</p>
          </div>
          <p className="text-black-7 text-xs leading-3">
            리뷰 {review.toLocaleString()}개
          </p>
        </div>
        <p className="text-blue-6 text-right text-sm font-semibold leading-5">
          최저 {price.toLocaleString()}원~
        </p>
      </div>
    </div>
  );
};

export default Card;
