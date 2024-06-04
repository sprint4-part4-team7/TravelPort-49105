/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import React from 'react';
import useCarousel from '@/hooks/useCarousel';
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
    <div className="relative w-full mx-auto max-w-screen-2lg">
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
                <div className="absolute top-0 left-0 flex justify-center w-1/4 h-full text-white transform -translate-y-1 bg-gray-900 bg-opacity-50">
                  <p className="text-36 text-white py-80 px-48">{item.text}</p>
                </div>
                <div className="absolute bottom-30 right-15 flex items-end justify-center w-300 h-22">
                  <Button
                    variant="floating"
                    buttonStyle="px-40 py-18 text-24 font-semibold"
                    text="지금 바로 예약하기! >"
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

      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4 space-x-2">
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
        className="absolute left-0 p-2 text-white transform -translate-y-1/2 top-1/2"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 p-2 text-white transform -translate-y-1/2 top-1/2"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
