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
      className="px-16 py-6 border-solid border-1 border-blue-6 rounded-18"
      type="button"
      onClick={onclick}
    >
      <div className="flex gap-8">
        <p className="font-semibold text-blue-6 text-14 ">{title}</p>
        <img src={search} alt="돋보기 아이콘" />
      </div>
    </button>
  );
};

export default MainCategoryButton;
