import React, { ChangeEvent } from 'react';
import InputBox from '../../common/input/InputBox';
import '@/styles/priceRange.css';

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

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Number(e.target.value.replace(/,/g, '')),
      rangeMaxValue - priceGap,
    );
    const realValue = value >= 0 ? value : 0;
    setRangeMinValue(realValue);
  };

  const HandleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      Number(e.target.value.replace(/,/g, '')),
      rangeMinValue + priceGap,
    );
    setRangeMaxValue(value);
  };

  const minPercent =
    ((rangeMinValue - fixedMinPrice) / (fixedMaxPrice - fixedMinPrice)) * 100;
  const maxPercent =
    ((rangeMaxValue - fixedMinPrice) / (fixedMaxPrice - fixedMinPrice)) * 100;

  return (
    <div className="flex flex-col p-24 rounded-24 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] bg-white">
      <h1 className="mb-32 text-16 ">1박당 요금</h1>
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
          className="absolute h-full bg-blue-6 -top-9 -left-10"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />
      </div>

      <div className="flex gap-40 mt-42 shrink mobile:w-full">
        <InputBox
          id="최소금액"
          label="최소 금액"
          value={rangeMinValue.toLocaleString()}
          onChange={handleMinInputChange}
        />
        <InputBox
          id="최대금액"
          label="최대 금액"
          value={rangeMaxValue.toLocaleString()}
          onChange={HandleMaxInputChange}
        />
      </div>
    </div>
  );
};

export default PriceRange;
