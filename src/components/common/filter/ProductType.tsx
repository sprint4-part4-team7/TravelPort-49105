/* eslint-disable react/no-array-index-key */

import React from 'react';
import {
  ActivityTypes,
  hotelTypes,
} from '@/components/common/filter/CategoryTypes';

type ProductTypeProps = {
  category: number;
  categoryName: string;
  checkedList: string[];
  checkHandler: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const ProductType = ({
  category,
  categoryName,
  checkedList,
  checkHandler,
}: ProductTypeProps) => {
  const categoryTypes = category === 1 ? hotelTypes : ActivityTypes;

  return (
    <div className="p-24 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] flex flex-col gap-32 justify-center items-start rounded-24 bg-white">
      <h1 className="text-16">{categoryName} 종류 선택</h1>
      <div>
        {categoryTypes.map((type, idx) => {
          return (
            <div key={idx} className="flex gap-8 px-8 py-4 text-15">
              <input
                type="checkbox"
                id={type}
                checked={checkedList.includes(type)}
                onChange={(e) => checkHandler(e, type)}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductType;
