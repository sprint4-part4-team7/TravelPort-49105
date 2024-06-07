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
  const reviewLength = reviews.length;

  const handleReview = async (pId: number = 0) => {
    try {
      const res = await instance.get(`/review/product/${pId}`);
      const result = res.data;
      const uniqueResult: number[] = [];
      result.forEach((oneResult: { userId: number }) => {
        if (!uniqueResult.includes(oneResult.userId)) {
          uniqueResult.push(oneResult.userId);
        }
      });
      setReviews(result);
      setReviewNum(uniqueResult.length);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleReview(productId);
  }, [productId]);

  let scoreTotal = 0;
  let scoreAvg = 0;
  for (let i = 0; i < reviewLength; i++) {
    if (reviews[i].score === null) {
      scoreArray[0]++;
    } else {
      scoreArray[Math.round(reviews[i].score)]++;
      scoreTotal += reviews[i].score;
    }
    if (i === reviewLength - 1) {
      scoreAvg = Math.round((scoreTotal / reviewLength) * 100) / 100;
    }
  }

  const maxScoreNum = Math.max(...scoreArray);

  const getBarClass = (score: number) => {
    const ratio = scoreArray[score] / maxScoreNum;
    if (ratio === 1) return 'w-full bg-blue-6';
    if (ratio >= 0.75) return 'w-3/4 bg-blue-5';
    if (ratio >= 0.5) return 'w-1/2 bg-blue-4';
    if (ratio >= 0.25) return 'w-1/4 bg-blue-3';
    return scoreArray[score] === 0 ? 'w-1/6 bg-black-4' : '';
  };

  const getTextClass = (score: number) => {
    const ratio = scoreArray[score] / maxScoreNum;
    if (ratio === 1) return 'text-blue-6';
    if (ratio >= 0.75) return 'text-blue-5';
    if (ratio >= 0.5) return 'text-blue-4';
    if (ratio >= 0.25) return 'text-blue-3';
    return scoreArray[score] === 0 ? 'text-black-4' : '';
  };

  return (
    <div
      className="flex min-w-376 mobile:flex-col items-center 
      justify-center gap-40 mx-auto mb-20 w-fit"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <img alt="review star" width="24px" height="24px" src={STAR} />
          <div className="text-24">
            <span className="font-bold">{scoreAvg}</span>
            <span className="text-black-4 font-light"> / 5</span>
          </div>
        </div>
        <div className="text-14 text-black-5 font-semibold">
          {reviewNum}명 참여
        </div>
      </div>
      <div className="flex flex-col text-16">
        {[5, 4, 3, 2, 1].map((score) => (
          <div key={score} className="flex gap-8 items-center justify-center">
            <div>{score}</div>
            <div className="w-280 h-10">
              <div className={`h-10 ${getBarClass(score)}`} />
            </div>
            <div className={`text-17 font-semibold ${getTextClass(score)}`}>
              {scoreArray[score]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAverage;
