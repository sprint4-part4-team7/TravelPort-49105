/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import { CardListsType } from '@/constants/types';
import { useState } from 'react';

const useSearchData = (cardLists: CardListsType[]) => {
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filtered) => {
    return (
      filtered.product.name.includes(search.trim()) ||
      filtered.product.productAddress.includes(search.trim())
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
