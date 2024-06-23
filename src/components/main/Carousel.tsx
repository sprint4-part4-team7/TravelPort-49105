/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import React from 'react';
import useCarousel from '@/hooks/functionHooks/useCarousel';
import arrowright from '@/assets/icons/carouselArrow.svg';
import arrowleft from '@/assets/icons/carouselArrow2.svg';

interface CarouselItem {
  url: string;
  text?: string;
  text2?: string;
  path?: string;
  click?: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const { currentIndex, setCurrentIndex, nextSlide, prevSlide } = useCarousel(
    items.length,
  );

  return (
    <div className="relative w-full mx-auto mb-82">
      <div className="relative overflow-hidden ">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-380 tablet:h-266 mobile:h-266"
              style={{
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                imageRendering: 'crisp-edges',
              }}
            >
              <div className="relative w-full">
                <div
                  className={`${index === 0 && 'top-228 tablet:top-154 mobile:top-162'} absolute flex flex-col font-bold text-white top-157 left-86 tablet:left-80 text-24 tablet:text-20 tablet:top-110 mobile:text-20 mobile:top-144 mobile:left-32`}
                >
                  <div>{item.text}</div>
                  <div>{item.text2}</div>
                </div>
                {index !== 0 && (
                  <div className="absolute flex items-center justify-center m-auto rounded-full mobile:h-28 tablet:top-190 tablet:left-70 top-237 left-78 bg-grayCustom text-black-2 h-44 w-210 px-14 mobile:w-155 mobile:px-12 mobile:py-6 mobile:left-28 mobile:top-208">
                    <button
                      type="button"
                      className="flex items-center justify-center py-10 text-18 mobile:text-12"
                      onClick={() =>
                        item.path ? (window.location.href = item.path) : null
                      }
                    >
                      {item.click}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 flex items-center justify-center gap-5 mb-4 space-x-2 bottom-10">
        {items.map((_, index) => (
          <button
            key={index}
            className={`bg-black-5 rounded-full ${
              currentIndex === index ? 'w-8 h-8 bg-black-2' : 'w-5 h-5'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 flex items-center justify-center transform -translate-y-1/2 top-1/2 w-30 h-266 bg-gradient-to-r from-black-10/8 to-black-10/5"
      >
        <img className="p-9" src={arrowleft} alt="왼쪽 화살표" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 flex items-center justify-center transform -translate-y-1/2 top-1/2 w-30 h-266 bg-gradient-to-l from-black-10/8 to-black-10/5"
      >
        <img className="p-9" src={arrowright} alt="오른쪽 화살표" />
      </button>
    </div>
  );
};

export default Carousel;
