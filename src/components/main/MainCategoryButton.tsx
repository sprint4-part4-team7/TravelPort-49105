import React from 'react';

interface MainCategoryButtonprops {
  title: string;
  onClick: () => void;
  className?: string;
}

const MainCategoryButton: React.FC<MainCategoryButtonprops> = ({
  title,
  onClick,
  className,
}) => {
  return (
    <button
      className={`px-32 pr-0 py-18 mobile:px-12 mobile:mt-10 mobile:py-6 tablet:px-28 tablet:pr-0 tablet:py-10 ${className}`}
      type="button"
      onClick={onClick}
    >
      <div className="flex gap-8">
        <p className="font-semibold text-black-11 text-16 w-30">{title}</p>
      </div>
    </button>
  );
};

export default MainCategoryButton;
