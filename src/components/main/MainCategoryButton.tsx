import React from 'react';

interface MainCategoryButtonprops {
  title: string;
  onclick: () => void;
  className?: string;
}

const MainCategoryButton: React.FC<MainCategoryButtonprops> = ({
  title,
  onclick,
  className,
}) => {
  return (
    <button
      className={`px-16 py-6 mobile:px-12 mobile:mt-10 mobile:py-6 tablet:px-10 ${className}`}
      type="button"
      onClick={onclick}
    >
      <div className="flex gap-8 tablet:gap-3">
        <p className="font-normal text-black-8 text-14 tablet:text-12 w-30">
          {title}
        </p>
      </div>
    </button>
  );
};

export default MainCategoryButton;
