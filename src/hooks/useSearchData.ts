/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import { useState } from 'react';

type cardListsType = {
  id: number;
  title: string;
  description: string;
};

const useSearchData = (cardLists: cardListsType[]) => {
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filteredTitle) => {
    return filteredTitle.title
      .replace(' ', '')
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  return {
    onChange,
    search,
    filteredTitles,
    setSearch,
  };
};

export default useSearchData;
