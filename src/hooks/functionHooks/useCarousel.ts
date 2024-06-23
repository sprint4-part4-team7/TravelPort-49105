/* eslint-disable no-undef */
import { useState, useEffect, useRef } from 'react';

const useCarousel = (itemsLength: number, autoPlayInterval: number = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === itemsLength - 1 ? 0 : prevIndex + 1,
        ),
      autoPlayInterval,
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, itemsLength, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === itemsLength - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? itemsLength - 1 : prevIndex - 1,
    );
  };

  return { currentIndex, setCurrentIndex, nextSlide, prevSlide };
};

export default useCarousel;
