/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import React from 'react';
import useCarousel from '@/hooks/useCarousel';
import arrowright from '@/assets/icons/arrowright.svg';
import arrowleft from '@/assets/icons/arrowleft.svg';
import Button from '@/components/common/Button';

interface CarouselItem {
  url: string;
  text?: string;
  path?: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const { currentIndex, setCurrentIndex, nextSlide, prevSlide } = useCarousel(
    items.length,
  );

  return (
    <div className="relative w-full mx-auto mt-40 y-266 max-w-screen-2lg mb-100">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full"
              style={{
                height: '499px',
                width: '100%',
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                imageRendering: 'crisp-edges',
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 flex items-center justify-center m-auto bottom-41 w-300 h-22">
                  <Button
                    variant="default"
                    buttonStyle="px-12 py-12 text-16 font-normal w-240 mb-20"
                    text="지금 바로 예약하기 "
                    onClick={() =>
                      item.path ? (window.location.href = item.path) : null
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 flex justify-center mb-4 space-x-2 bottom-10">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="ml-12 absolute flex items-center justify-center left-0 transform -translate-y-1/2 text- top-1/2 bg-white rounded-[50%] w-30 h-30"
      >
        <img className="p-9" src={arrowleft} alt="왼쪽 화살표" />
      </button>
      <button
        onClick={nextSlide}
        className="mr-12 absolute flex items-center justify-center right-0 transform -translate-y-1/2 bg-white top-1/2 rounded-[50%] w-30 h-30"
      >
        <img className="p-9" src={arrowright} alt="오른쪽 화살표" />
      </button>
    </div>
  );
};

export default Carousel;
