import React, { ChangeEvent } from 'react';
import InputBox from '../InputBox';
import '@/styles/PriceRange.css';

type PriceRangeProps = {
  rangeMinValue: number;
  rangeMaxValue: number;
  setRangeMinValue: React.Dispatch<React.SetStateAction<number>>;
  setRangeMaxValue: React.Dispatch<React.SetStateAction<number>>;
  fixedMinPrice: number;
  fixedMaxPrice: number;
};

const PriceRange = ({
  rangeMinValue,
  rangeMaxValue,
  setRangeMinValue,
  setRangeMaxValue,
  fixedMinPrice,
  fixedMaxPrice,
}: PriceRangeProps) => {
  const priceGap = 1000;

  const HandlePriceRangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), rangeMaxValue - priceGap);
    setRangeMinValue(value);
  };
  const HandlePriceRangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), rangeMinValue + priceGap);
    setRangeMaxValue(value);
  };

  const minPercent =
    ((rangeMinValue - fixedMinPrice) / (fixedMaxPrice - fixedMinPrice)) * 100;
  const maxPercent =
    ((rangeMaxValue - fixedMinPrice) / (fixedMaxPrice - fixedMinPrice)) * 100;

  return (
    <div className="flex flex-col p-24 rounded-24 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] bg-white">
      <h1 className="text-16 mb-32 ">1박당 요금</h1>
      <div className="slideWrapper">
        <input
          type="range"
          className="minRange"
          min={fixedMinPrice}
          max={fixedMaxPrice - priceGap}
          step={1000}
          value={rangeMinValue}
          onChange={HandlePriceRangeMinValue}
        />
        <input
          type="range"
          className="maxRange"
          min={fixedMinPrice + priceGap}
          max={fixedMaxPrice}
          step={1000}
          value={rangeMaxValue}
          onChange={HandlePriceRangeMaxValue}
        />
        <div
          className="absolute bg-blue-6 h-full -top-9 -left-10"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />
      </div>

      <div className="mt-42 flex shrink gap-40 mobile:w-full">
        <InputBox
          id="최소금액"
          label="최소 금액"
          value={rangeMinValue.toLocaleString()}
          onChange={(e) => {
            const value = Math.min(
              Number(e.target.value),
              rangeMaxValue - priceGap,
            );
            setRangeMinValue(value);
          }}
        />
        <InputBox
          id="최대금액"
          label="최대 금액"
          value={rangeMaxValue.toLocaleString()}
          onChange={(e) => {
            const value = Math.max(
              Number(e.target.value),
              rangeMinValue + priceGap,
            );
            setRangeMaxValue(value);
          }}
        />
      </div>
    </div>
  );
};

export default PriceRange;
