/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
import { useState } from 'react';

type cardListsType = {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  score: number;
  review: number;
  image: string;
  link: string;
};

const useSearchData = (cardLists: cardListsType[]) => {
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filteredTitle) => {
    return filteredTitle.title.includes(search.trim());
  });

  return {
    onChange,
    search,
    filteredTitles,
    setSearch,
  };
};

export default useSearchData;
