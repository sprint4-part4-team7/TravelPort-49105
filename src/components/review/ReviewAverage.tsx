import instance from '@/utils/axios';
import { useEffect, useState } from 'react';
import STAR from '@/assets/images/star-fill.svg';

type ReviewProps = {
  productId?: number;
};

const ReviewAverage = ({ productId }: ReviewProps) => {
  const [reviewNum, setReviewNum] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const scoreArray = [0, 0, 0, 0, 0, 0];

  const handleReview = async (pId: number = 0) => {
    try {
      const res = await instance.get(`/review/product/${pId}`);
      const result = res.data;
      setReviews(result);
      setReviewNum(result.length);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleReview(productId);
  }, [productId]);

  let scoreTotal = 0;
  let scoreAvg = 0;
  for (let i = 0; i < reviewNum; i++) {
    if (reviews[i].score === null) {
      scoreArray[0]++;
    } else {
      scoreArray[Math.round(reviews[i].score)]++;
      scoreTotal += reviews[i].score;
    }
    if (i === reviewNum - 1) {
      scoreAvg = Math.round((scoreTotal / reviewNum) * 100) / 100;
    }
  }

  const maxScoreNum = Math.max.apply(null, scoreArray);

  return (
    <div
      className="flex min-w-376 mobile:flex-col items-center 
      justify-center gap-40 mx-auto my-0 w-fit
      border-1 border-solid border-black-3"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <img alt="review star" width="24px" height="24px" src={STAR} />
          <div className="text-24">
            <span className="font-bold">{scoreAvg}</span>
            <span className="text-black-4 font-light"> / 5</span>
          </div>
        </div>
        <div className="text-black-5 font-semibold">{reviewNum}명 참여</div>
      </div>
      <div className="flex flex-col text-16">
        {[5, 4, 3, 2, 1].map((score) => (
          <div key={score} className="flex gap-8 items-center justify-center">
            <div>{score}</div>
            <div className="w-280 h-10">
              <div
                className={` ${
                  scoreArray[score] === 0 && 'w-1/6 h-10 bg-black-4'
                } ${
                  scoreArray[score] >= maxScoreNum * 0.75 &&
                  scoreArray[score] < maxScoreNum
                    ? 'w-3/4 h-10 bg-blue-5'
                    : ''
                } ${
                  scoreArray[score] >= maxScoreNum * 0.5 &&
                  scoreArray[score] < maxScoreNum * 0.75
                    ? 'w-1/2 h-10 bg-blue-4'
                    : ''
                } ${
                  scoreArray[score] >= maxScoreNum * 0.25 &&
                  scoreArray[score] < maxScoreNum * 0.5
                    ? 'w-1/4 h-10 bg-blue-3'
                    : ''
                }
                  ${
                    scoreArray[score] === maxScoreNum && 'w-full h-10 bg-blue-6'
                  }`}
              />
            </div>

            <div
              className={`text-17 font-semibold ${
                scoreArray[score] === 0 && 'text-black-4'
              } ${
                scoreArray[score] >= maxScoreNum * 0.75 &&
                scoreArray[score] < maxScoreNum
                  ? 'text-blue-5'
                  : ''
              } ${
                scoreArray[score] >= maxScoreNum * 0.5 &&
                scoreArray[score] < maxScoreNum * 0.75
                  ? 'text-blue-4'
                  : ''
              } ${
                scoreArray[score] >= maxScoreNum * 0.25 &&
                scoreArray[score] < maxScoreNum * 0.5
                  ? 'text-blue-3'
                  : ''
              }
                  ${scoreArray[score] === maxScoreNum && 'text-blue-6'}`}
            >
              {scoreArray[score]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAverage;
