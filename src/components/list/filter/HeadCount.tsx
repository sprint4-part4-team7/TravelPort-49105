import plusActive from '@/assets/icons/plusActive.svg';
import plusInactive from '@/assets/icons/plusInactive.svg';
import minusInactive from '@/assets/icons/minusInactive.svg';
import minusActive from '@/assets/icons/minusActive.svg';
import React, { useState } from 'react';

type HeadCountProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const HeadCount = ({ count, setCount }: HeadCountProps) => {
  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);

  const handlePlusCount = () => setCount(count + 1);
  const handleMinusCount = () => count > 0 && setCount(count - 1);

  return (
    <div className="flex justify-between items-center p-24 gap-16 rounded-24 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div className="text-16">인원수</div>
      <div className="flex justify-center items-center gap-8">
        <div
          onClick={() => handleMinusCount()}
          onMouseEnter={() => setIsMinusHovered(true)}
          onMouseLeave={() => setIsMinusHovered(false)}
        >
          <img
            src={isMinusHovered ? minusActive : minusInactive}
            alt="마이너스"
          />
        </div>
        <div className="text-15">{count}</div>
        <div
          onClick={() => handlePlusCount()}
          onMouseEnter={() => setIsPlusHovered(true)}
          onMouseLeave={() => setIsPlusHovered(false)}
        >
          <img src={isPlusHovered ? plusActive : plusInactive} alt="플러스" />
        </div>
      </div>
    </div>
  );
};

export default HeadCount;
