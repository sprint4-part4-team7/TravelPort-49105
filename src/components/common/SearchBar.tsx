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
  const { onChange, search, filteredTitles } = useSearchData(cardLists);

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
        <div className="absolute w-full border-solid border-1 border-[#F5F5F5] rounded-8 p-20 pl-40 bg-[#F5F5F5] text-13">
          {filteredTitles.length > 10 ? (
            filteredTitles
              .slice(0, 10)
              .map((filteredTitle) => (
                <div className="leading-[3rem]">{filteredTitle.title}</div>
              ))
          ) : filteredTitles.length > 0 ? (
            filteredTitles.map((filteredTitle) => (
              <div className="leading-[3rem]">{filteredTitle.title}</div>
            ))
          ) : (
            <div>연관 검색어가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
