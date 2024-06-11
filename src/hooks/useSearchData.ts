/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import { CardListsType } from '@/constants/types';
import { useState } from 'react';

const useSearchData = (cardLists: CardListsType[]) => {
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filtered) => {
    if (
      filtered &&
      filtered.product &&
      typeof filtered.product.name === 'string' &&
      typeof filtered.product.productAddress === 'string'
    ) {
      return (
        filtered.product.name.includes(search.trim()) ||
        filtered.product.productAddress.includes(search.trim())
      );
    }
    return false;
  });

  return {
    onChange,
    search,
    filteredTitles,
    setSearch,
  };
};

export default useSearchData;
