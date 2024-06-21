import fillImage from '@/assets/images/star-fill.svg';
import { useNavigate } from 'react-router-dom';

type HotelCardProps = {
  title: string;
  location: string;
  price: number;
  score: number;
  review: number;
  image: string;
  link: string;
};

const HotelCard = ({
  title,
  location,
  price,
  score,
  review,
  image,
  link,
}: HotelCardProps) => {
  const roundScore = Math.round(score).toFixed(1);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="flex w-full px-16 py-20 mx-auto overflow-hidden border-solid min-w-462 h-200 rounded-12 border-1 border-black-4 hover:bg-blue-1 mobile:max-w-500"
    >
      <img src={image} alt="예시사진" className="object-cover w-160 h-160" />
      <div className="flex flex-col px-16 justify-evenly">
        <h2 className="font-semibold truncate text-black-12 text-22 leading-23 mobile:text-17">
          {title}
        </h2>
        <p className="truncate text-black-7 text-15 mobile:text-12 mobile:text-black-7">
          {location}
        </p>
        <div className="flex flex-row items-center mobile:items-start">
          <div className="flex flex-row pr-8 item-center mobile:mb-8">
            <img src={fillImage} alt="이미지가 있음" width={21} />
            <p className="pl-4 font-bold text-black-13 text-14">{roundScore}</p>
          </div>
          <p className="font-medium text-black-6 text-13">
            리뷰 {review.toLocaleString()}개
          </p>
        </div>
        <p className="font-bold text-black-13 text-17 mobile:text-14">
          {price.toLocaleString()}원 / 1박
        </p>
      </div>
    </div>
  );
};

export default HotelCard;
