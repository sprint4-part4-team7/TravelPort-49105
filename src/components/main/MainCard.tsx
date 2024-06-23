/* eslint-disable react/no-array-index-key */
import React from 'react';
import arrowright from '@/assets/icons/plusArrowButton.svg';
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
          <div className="flex items-center justify-center w-84">
            <div className="py-8 pl-12 pr-6">
              <Button
                variant="default"
                outlined
                isCancel
                onClick={onclick}
                buttonStyle=" text-16 font-medium text-[#BFBFBF] border-none"
              >
                더보기
                <div className="ml-4">
                  <img src={arrowright} alt="오른쪽 화살표" />
                </div>
              </Button>
            </div>
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
