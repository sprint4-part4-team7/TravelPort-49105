import React from 'react';
import search from '@/assets/icons/search-lg.svg';

interface MainCategoryButtonprops {
  title: string;
  onclick: () => void;
}

const MainCategoryButton: React.FC<MainCategoryButtonprops> = ({
  title,
  onclick,
}) => {
  return (
    <button
      className="px-16 py-6 border-solid mobile:px-8 mobile:py-6 border-1 border-blue-6 rounded-18 mobile:border-none tablet:px-10"
      type="button"
      onClick={onclick}
    >
      <div className="flex gap-8 tablet:gap-3">
        <p className="font-semibold text-blue-6 text-14 mobile:hidden tablet:text-12">
          {title}
        </p>
        <p className="font-semibold tablet:hidden desktop:hidden text-blue-6 text-11 mobile:flex ">
          #{title}
        </p>
        <img className="mobile:hidden" src={search} alt="돋보기 아이콘" />
      </div>
    </button>
  );
};

export default MainCategoryButton;
