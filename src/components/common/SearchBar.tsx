/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import searchIcon from '@/assets/images/search.svg';
import { CardListsType } from '@/constants/types';
import useSearchData from '@/hooks/useSearchData';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  cardLists: CardListsType[];
  setFilteredData?: React.Dispatch<React.SetStateAction<any>>;
  isMainSearchBar?: boolean;
  path?: string;
}
const SearchBar = ({
  cardLists,
  setFilteredData,
  isMainSearchBar = false,
  path = '',
}: SearchBarProps) => {
  const { onChange, search, filteredTitles, setSearch } =
    useSearchData(cardLists);

  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/${path}search?query=${search}`);
      const filteredData = cardLists.filter(
        (cardList) =>
          cardList.product.name.includes(search) ||
          cardList.product.productAddress.includes(search),
      );
      setFilteredData && setFilteredData(filteredData);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`border-solid border-[2.4px] border-[#356EFF] py-12 px-2 w-full rounded-24
      text-16 pl-44 outline-none ${isMainSearchBar ? 'border-multi' : ''}`}
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
          shadow-[0_0_8px_0_rgba(0,0,0,0.25)] z-30"
        >
          {filteredTitles.length > 5 ? (
            filteredTitles.slice(0, 5).map((filteredTitle) => (
              <div key={filteredTitle.id}>
                <div
                  className="hover:bg-[#EBF1FF] py-10 pl-20 cursor-pointer"
                  onClick={() => {
                    setSearch(filteredTitle.product.name);
                  }}
                >
                  {filteredTitle.product.name}
                </div>
                <div
                  className="hover:bg-[#EBF1FF] py-10 pl-20 cursor-pointer"
                  onClick={() => {
                    setSearch(filteredTitle.product.productAddress);
                  }}
                >
                  {filteredTitle.product.productAddress}
                </div>
              </div>
            ))
          ) : filteredTitles.length > 0 ? (
            filteredTitles.map((filteredTitle) => (
              <div key={filteredTitle.id}>
                <div
                  className="hover:bg-[#EBF1FF] py-10 pl-20 cursor-pointer"
                  onClick={() => {
                    setSearch(filteredTitle.product.name);
                  }}
                >
                  {filteredTitle.product.name}
                </div>
                <div
                  className="hover:bg-[#EBF1FF] py-10 pl-20 cursor-pointer"
                  onClick={() => {
                    setSearch(filteredTitle.product.productAddress);
                  }}
                >
                  {filteredTitle.product.productAddress}
                </div>
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
