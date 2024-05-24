import { SetStateAction, useState } from 'react';

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

function SearchBar() {
  const [search, setSearch] = useState('');
  const onChange = (e: { target: { value: SetStateAction<string> } }) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filteredTitle) => {
    return filteredTitle.title
      .replace(' ', '')
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={onChange}
        className="border-solid border-1 border-black p-10 w-3/4"
      />
      <div>
        {filteredTitles.map((filteredTitle) => (
          <div>{filteredTitle.title}</div>
        ))}
      </div>
    </>
  );
}

export default SearchBar;
