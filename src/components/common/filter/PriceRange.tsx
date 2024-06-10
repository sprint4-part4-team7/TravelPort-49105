import { ChangeEvent, useState } from 'react';
import InputBox from '../InputBox';
import '@/styles/PriceRange.css';

const PriceRange = () => {
  const fixedMinPrice = 0;
  const fixedMaxPrice = 1000000;
  const priceGap = 1000;
  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);

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
          className="absolute bg-blue-6 h-full top-[-0.9rem] left-[-1rem]"
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
