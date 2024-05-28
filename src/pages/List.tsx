/* eslint-disable no-undef */
import { useState } from 'react';
import SearchBar from '../components/common/SearchBar';

const cardLists = [
  {
    title: '스쿠버 다이빙',
    description: '신나는 바닷속 체험',
  },
  {
    title: '스쿠버플라잉',
    description: '신나는 하늘 체험',
  },
];

const List = () => {
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filteredTitle) => {
    return filteredTitle.title
      .replace(' ', '')
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  return (
    <SearchBar titles={filteredTitles} search={search} onChange={onChange} />
    // <Card />
  );
};

export default List;
