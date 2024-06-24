import { CardListsType } from '@/constants/Types';
import React, { useState } from 'react';

const useSearchData = (cardLists: CardListsType[]) => {
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filtered) => {
    const productName = filtered.product.name || '';
    const productAddress = filtered.product.productAddress || '';

    return (
      productName.includes(search.trim()) ||
      productAddress.includes(search.trim())
    );
  });

  return {
    onChange,
    search,
    filteredTitles,
    setSearch,
  };
};
export default useSearchData;
