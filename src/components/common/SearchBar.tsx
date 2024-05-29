/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import searchIcon from '@/assets/images/search.svg';
import useSearchData from '@/hooks/useSearchData';
import { RiCloseCircleLine } from 'react-icons/ri';

interface SearchBarProps {
  cardLists: {
    id: number;
    title: string;
    description: string;
  }[];
}
const SearchBar = ({ cardLists }: SearchBarProps) => {
  const { onChange, search, filteredTitles, setSearch } =
    useSearchData(cardLists);
  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={onChange}
          className="border-solid border-1 border-[#F5F5F5] p-10 rounded-12 pl-40 w-full
          text-18 font-semibold bg-[#F5F5F5] placeholder:text-[#CBC9CF] outline-[#AFAEAC]"
          placeholder="어디로 떠나 볼까요~?"
        />
        <img
          src={searchIcon}
          alt="검색아이콘"
          className="absolute top-12 left-12"
        />
        <RiCloseCircleLine
          color="#CBC9CF"
          size={24}
          className="absolute top-12 right-12"
          onClick={() => setSearch('')}
        />
      </div>
      {!!search.length && (
        <div className="border-solid border-1 border-[#F5F5F5] rounded-8 p-20 pl-40 bg-[#F5F5F5] text-13">
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
    </>
  );
};

export default SearchBar;
