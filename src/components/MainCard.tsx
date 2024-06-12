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
  console.log(images);
  return (
    <div className="">
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
      <div className="grid gap-20 mobile:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
        {images &&
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
