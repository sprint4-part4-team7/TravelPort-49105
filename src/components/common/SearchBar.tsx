/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import searchIcon from '@/assets/images/search.svg';
import useSearchData from '@/hooks/useSearchData';

interface SearchBarProps {
  cardLists: {
    id: number;
    title: string;
    description: string;
  }[];
  isMainSearchBar?: boolean;
}
const SearchBar = ({ cardLists, isMainSearchBar = false }: SearchBarProps) => {
  const { onChange, search, filteredTitles, setSearch } =
    useSearchData(cardLists);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={onChange}
          className={`border-solid border-[2.4px] border-[#356EFF] py-[1.2rem] px-2 w-full rounded-[2.4rem]
      text-[1.6rem] pl-44 outline-none ${isMainSearchBar ? 'border-multi' : ''}`}
        />
        <img
          src={searchIcon}
          alt="검색아이콘"
          className="absolute top-[50%] left-12 transform -translate-y-1/2 cursor-pointer"
        />
      </div>
      {!!search.length && (
        <div
          className="absolute mt-8 w-full border-solid border-1 border-[#F5F5F5] rounded-17 py-10 bg-[#fff] text-13
          shadow-[0_0_8px_0_rgba(0,0,0,0.25)]"
        >
          {filteredTitles.length > 10 ? (
            filteredTitles.slice(0, 10).map((filteredTitle) => (
              <div
                className="hover:bg-[#EBF1FF] py-10 pl-20 cursor-pointer"
                onClick={() => {
                  setSearch(filteredTitle.title);
                }}
              >
                {filteredTitle.title}
              </div>
            ))
          ) : filteredTitles.length > 0 ? (
            filteredTitles.map((filteredTitle) => (
              <div
                className="hover:bg-[#EBF1FF] py-10 pl-20 cursor-pointer"
                onClick={() => {
                  setSearch(filteredTitle.title);
                }}
              >
                {filteredTitle.title}
              </div>
            ))
          ) : (
            <div className="py-10 pl-20">연관 검색어가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
