// 단일카드
import emptyImage from '@/assets/images/cat-empty.png';
import fillImage from '@/assets/images/cat-fill.png';

const Card = () => {
  const title = '제주도 둘레길'; // 서버에서 받아오는 제목
  const price = 3000000; // 서버에서 받아오는 가격
  const score = 4; // 서버에서 받아오는 별점 소수점 없는 수
  const review = 1000; // 서버에서 받아오는 총 리뷰 수
  const image = 'https://picsum.photos/324/422'; // 서버에서 받아오는 이미지(임시로 랜덤/width/height)

  const imageScore = () => {
    const a = [];
    for (let i = 0; i < score; i += 1) {
      a.push(<img src={fillImage} alt="이미지가 있음" />);
    }
    for (let i = 0; i < 5 - score; i += 1) {
      a.push(<img src={emptyImage} alt="이미지가 없음" />);
    }
    return a;
  };

  return (
    <div className="relative w-324 h-422 overflow-hidden rounded-xl">
      <img src={image} alt="예시사진" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gray-950 bg-opacity-60 h-140 p-40">
        <p className="text-white text-lg">{title}</p>
        <p className="text-white text-md">{price.toLocaleString()}원</p>
        <div className="flex items-center">
          {imageScore()}
          <p className="text-white text-md">({review.toLocaleString()})</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
