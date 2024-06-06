/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from './common/Button';
import Card from './common/card/Card';

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
}

const MainCard: React.FC<PopularAccommodationsProps> = ({
  images,
  title,
  onclick,
}) => {
  return (
    <div className="">
      <div className="flex justify-between mb-18">
        <p className="font-semibold text-22 ">{title} </p>
        <Button
          variant="default"
          text="더보기"
          outlined
          isCancel
          onClick={onclick}
          buttonStyle="px-12 py-8 w-61 text-13 font-medium text-[#BFBFBF]"
        />
      </div>
      <div className="grid gap-20 mobile:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
        {images.map((item, index) => (
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
