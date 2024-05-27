/* eslint-disable no-undef */
interface SearchBarProps {
  titles: {
    title: string;
    description: string;
  }[];
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function SearchBar({ titles, search, onChange }: SearchBarProps) {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={onChange}
        className="border-solid border-1 border-black p-10 w-3/4"
      />
      {!!search.length && (
        <div>
          {titles.map((filteredTitle) => (
            <div>{filteredTitle.title}</div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBar;
