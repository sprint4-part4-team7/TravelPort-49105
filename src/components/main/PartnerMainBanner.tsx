import React, { useState } from 'react';
import partnerArrow from '@/assets/images/partner_arrow.svg';

interface PartnerMainBannerProps {
  title: string;
  children: React.ReactNode;
  img: string;
  onClick: () => void;
}

const PartnerMainBanner = ({
  title,
  children,
  img,
  onClick,
}: PartnerMainBannerProps) => {
  const [, setIsHover] = useState(false);
  return (
    <div
      className="w-full h-400 relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button type="button" onClick={onClick}>
        <div className="w-1/3 min-w-327 h-full mobile:w-full mobile:h-fit mobile:bottom-0 flex flex-col mobile:flex-row justify-between absolute text-left text-white bg-black-modal pl-32 mobile:pl-20 pr-84 tablet:pr-72 pt-56 tablet:pt-40 pb-32 tablet:pb-24 mobile:py-24">
          <div className="flex flex-col gap-24">
            <div className="text-26 tablet:text-20 font-medium">{title}</div>
            <div className="text-16 tablet:text-14 font-normal">{children}</div>
          </div>
          <img
            src={partnerArrow}
            className="w-56 h-56 tablet:w-48 tablet:h-48 mobile:w-40 mobile:h-40 mobile:absolute mobile:right-20 mobile:bottom-20"
            alt="arrow"
          />
        </div>
        <img className="w-full h-400 object-cover" src={img} alt={img} />
      </button>
    </div>
  );
};

export default PartnerMainBanner;
