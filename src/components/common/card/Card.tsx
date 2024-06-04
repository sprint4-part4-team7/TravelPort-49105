// 단일카드
import emptyImage from '@/assets/images/star-empty.svg';
import fillImage from '@/assets/images/star-fill.svg';
import { Link } from 'react-router-dom';

type CardProps = {
  title: string;
  location: string;
  price: number;
  score: number;
  review: number;
  image: string;
  link: string;
};

const Card = ({
  title,
  location,
  price,
  score,
  review,
  image,
  link,
}: CardProps) => {
  const roundScore = Math.round(score);
  const ImageScore = () => {
    const imageList = [];
    for (let i = 0; i < roundScore; i += 1) {
      imageList.push(
        <img key={`fill${i}`} src={fillImage} alt="이미지가 있음" />,
      );
    }
    for (let i = 0; i < 5 - roundScore; i += 1) {
      imageList.push(
        <img key={`empty${i}`} src={emptyImage} alt="이미지가 없음" />,
      );
    }
    return imageList;
  };

  return (
    <Link to={link}>
      <div className="flex flex-col w-265 h-400 overflow-hidden rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,0.25)] tablet:w-229 tablet:h-350 mobile:w-335 mobile:h-198 mobile:flex-row">
        <img
          src={image}
          alt="예시사진"
          className="w-265 h-267 object-cover tablet:w-229 tablet:h-231 mobile:w-158 mobile:h-198"
        />
        <div className="w-265 h-133 bg-white px-16 py-20 hover:bg-blue-1 tablet:w-229 tablet:h-119 mobile:w-177 mobile:h-198">
          <h2 className="text-black-12 mb-5 text-20 py-4 h-28 font-semibold leading-7">
            {title}
          </h2>
          <p className="text-black-12 mb-8 text-12 leading-4">{location}</p>
          <div className="flex flex-row items-center mb-16 mobile:flex-col mobile:items-start ">
            <div className="flex flex-row item-center pr-8 mobile:mb-8">
              <div className="flex flex-row w-85">{ImageScore()}</div>
              <p className="text-black-6 text-11 pl-4">( {score} / 5 )</p>
            </div>
            <p className="text-black-6 text-11 leading-3">
              리뷰 {review.toLocaleString()}개
            </p>
          </div>
          <p className="text-blue-6 text-right text-sm font-semibold leading-5">
            최저 {price.toLocaleString()}원~
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
