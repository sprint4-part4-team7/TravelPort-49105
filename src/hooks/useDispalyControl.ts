import { useState, useEffect } from 'react';

const useDisplayCount = () => {
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth >= 1199) {
        setDisplayCount(4);
      } else if (window.innerWidth >= 768) {
        setDisplayCount(3);
      } else {
        setDisplayCount(4);
      }
    };

    window.addEventListener('resize', updateDisplayCount);
    updateDisplayCount();

    return () => window.removeEventListener('resize', updateDisplayCount);
  }, []);

  return displayCount;
};

export default useDisplayCount;
