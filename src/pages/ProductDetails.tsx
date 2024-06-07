/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import useFetchDetails from '@/hooks/useFetchDetails';
import getMinPrice from '@/utils/getMinPrice';
import { useState } from 'react';
import LocationMap from '@/components/details/LocationMap';
import SalesPeriod from '@/components/details/SalesPeriod';
import Reservation from '@/components/details/Reservation';

const ProductDetails = () => {
  const { product, options } = useFetchDetails(2, 1);
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab: string) => setActiveTab(tab);

  return (
    <div className="mt-100 mb-40 mobile:mt-40 mobile:mx-20 tablet:mx-20">
      <img
        src={product?.productImages[0]}
        alt="상품이미지"
        className="mx-auto w-784"
      />
      <div className="flex flex-col gap-12 mt-32 mb-40 max-w-784 w-full mx-auto">
        <h1 className="text-20 font-bold">{product?.name}</h1>
        <h2 className="text-20 font-bold mt-4">
          {getMinPrice(options).toLocaleString()}원~
        </h2>
        <p className="text-16 mb-8">{product?.productDesc}</p>

        <div className="flex gap-8 text-17 font-semibold">
          <SalesPeriod product={product} />
        </div>

        <div className="flex gap-8 text-17 font-semibold">
          <LocationMap product={product} />
        </div>
      </div>
      <div className="max-w-784 w-full mx-auto">
        <div className="flex justify-center items-center my-20">
          <h1
            onClick={() => handleTabClick('reservation')}
            className={`${activeTab === 'reservation' && 'rounded-8 bg-black-7 text-white'} p-12 text-14 font-semibold flex-1 text-center bg-black-3 cursor-pointer`}
          >
            예약하기
          </h1>
          <h1
            onClick={() => handleTabClick('details')}
            className={`${activeTab === 'details' && 'rounded-8 bg-black-7 text-white'} p-12 text-14 font-semibold flex-1 text-center bg-black-3 cursor-pointer`}
          >
            상세정보
          </h1>
          <h1
            onClick={() => handleTabClick('review')}
            className={`${activeTab === 'review' && 'rounded-8 bg-black-7 text-white'} p-12 text-14 font-semibold flex-1 text-center bg-black-3 cursor-pointer`}
          >
            리뷰
          </h1>
        </div>
        {activeTab === 'reservation' && (
          <Reservation product={product} options={options} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
