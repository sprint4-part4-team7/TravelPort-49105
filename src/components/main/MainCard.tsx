/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from '@/components/common/button/Button';
import Card from '@/components/common/card/Card';
import Skeleton from '../common/Skeleton';

interface ImageItem {
  url: string;
  text?: string;
  path?: string;
  location?: string;
  price?: number;
  score?: number;
  review?: number;
}

interface PopularAccommodationsProps {
  images: ImageItem[];
  title: string;
  onclick: () => void;
  isLoading: boolean;
  displayCount: number;
}

const MainCard: React.FC<PopularAccommodationsProps> = ({
  images,
  title,
  onclick,
  isLoading,
  displayCount,
}) => {
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between mb-18">
          <p className="font-semibold text-22 ">{title} </p>
          <div className="w-61">
            <Button
              variant="default"
              outlined
              isCancel
              onClick={onclick}
              buttonStyle="rounded-4 px-12 py-8 text-13 font-medium text-black-5"
            >
              더보기
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-20 mobile:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 mobile:min-w-335 tablet:min-w-750 min-w-1190">
        {isLoading
          ? Array.from({ length: displayCount }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : images &&
            images.map((item, index) => (
              <Card
                key={index}
                title={item.text as string}
                location={item.location as string}
                price={item.price as number}
                score={item.score as number}
                review={item.review as number}
                image={item.url as string}
                link={item.path as string}
              />
            ))}
      </div>
    </div>
  );
};

export default MainCard;
