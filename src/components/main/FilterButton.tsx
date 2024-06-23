import React from 'react';

interface FilterButtonProps {
  label: string;
  sortType: string;
  currentSortType: string;
  onClick: () => void;
}

const FilterButton = ({
  label,
  sortType,
  currentSortType,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      className={`p-10 ${sortType === currentSortType ? 'text-black-12' : ''}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterButton;
