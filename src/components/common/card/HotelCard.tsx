// import emptyImage from '@/assets/images/star-empty.svg';
import fillImage from '@/assets/images/star-fill.svg';
import { Link } from 'react-router-dom';
import Button from '../Button';

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

  return (
    <Link to={link}>
      <div className="flex max-w-928 h-200 overflow-hidden rounded-12 border-1 border-solid border-black-4 mx-auto px-16 py-20 hover:bg-blue-1 mobile:max-w-500">
        <img src={image} alt="예시사진" className="w-160 h-160 object-cover" />
        <div className="px-16">
          <h2 className="text-black-12 mt-4 mb-5 text-22 font-semibold leading-20 truncate mobile:text-17">
            {title}
          </h2>
          <p className="text-black-7 mb-8 text-15 mobile:text-12 mobile:text-black-7 truncate">
            {location}
          </p>
          <div className="flex flex-row items-center mb-10 mobile:items-start mobile:mb-5">
            <div className="flex flex-row item-center pr-8 mobile:mb-8">
              <img src={fillImage} alt="이미지가 있음" width={21} />
              <p className="text-black-13 text-14 font-bold pl-4">
                {roundScore}
              </p>
            </div>
            <p className="text-black-6 text-13 font-medium">
              리뷰 {review.toLocaleString()}개
            </p>
          </div>
          <p className="text-black-13 text-17 font-bold mb-8 mobile:text-14">
            {price.toLocaleString()}원 / 1박
          </p>
          <Button
            text="상세보기"
            outlined
            buttonStyle="w-74 text-13 py-8 px-12 font-medium mobile:flex"
          />
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
