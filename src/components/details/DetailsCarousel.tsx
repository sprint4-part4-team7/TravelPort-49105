/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import useCarousel from '@/hooks/functionHooks/useCarousel';
import arrowright from '@/assets/icons/arrowRight.svg';
import arrowleft from '@/assets/icons/arrowLeft.svg';

type DetailsCarouselProps = {
  urls?: string[];
};

const DetailsCarousel = ({ urls }: DetailsCarouselProps) => {
  const { currentIndex, setCurrentIndex, nextSlide, prevSlide } = useCarousel(
    urls ? urls.length : 0,
  );

  return (
    <div className="relative w-full mx-auto y-266 max-w-screen-2l">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {urls?.map((url, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full"
              style={{
                height: '499px',
                width: '100%',
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                imageRendering: 'crisp-edges',
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 flex justify-center mb-4 space-x-2 bottom-10">
        {urls?.map((_, index) => (
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

export default DetailsCarousel;
