import emptyImage from '@/assets/icons/starEmpty.svg';
import fillImage from '@/assets/icons/starFill.svg';
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
        <img key={`fill${i}`} src={fillImage} alt="이미지가 있음" width={16} />,
      );
    }
    for (let i = 0; i < 5 - roundScore; i += 1) {
      imageList.push(
        <img
          key={`empty${i}`}
          src={emptyImage}
          alt="이미지가 없음"
          width={16}
        />,
      );
    }
    return imageList;
  };

  return (
    <Link to={link}>
      <div className="flex flex-col w-265 h-400 overflow-hidden rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,0.25)] tablet:w-229 tablet:h-350 mobile:w-310 mobile:h-198 mobile:flex-row">
        <img
          src={image}
          alt="예시사진"
          className="w-265 h-267 object-fit tablet:h-217 mobile:w-138 mobile:h-198"
        />
        <div className="px-16 py-20 bg-white w-265 h-133 hover:bg-blue-1 tablet:w-229 mobile:w-177 mobile:h-198">
          <h2 className="py-4 mb-5 font-semibold truncate text-black-12 text-20 h-28 leading-20">
            {title}
          </h2>
          <p className="mb-8 truncate text-black-12 text-12 mobile:my-15">
            {location}
          </p>
          <div className="flex flex-row items-center mb-16 mobile:flex-col mobile:items-start ">
            <div className="flex flex-row pr-8 item-center mobile:mb-8">
              <div className="flex flex-row w-85">{ImageScore()}</div>
              <p className="pl-4 text-black-6 text-11">
                ( {Math.round(score).toFixed(1)} / 5 )
              </p>
            </div>
            <p className="leading-3 text-black-6 text-11 mobile:mt-10">
              리뷰 {review.toLocaleString()}개
            </p>
          </div>
          <p className="font-semibold leading-5 text-right text-blue-6 text-12 mobile:mt-45">
            최저 {price.toLocaleString()}원~
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
