/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import { CardListsType } from '@/constants/Types';
import { useState } from 'react';

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
