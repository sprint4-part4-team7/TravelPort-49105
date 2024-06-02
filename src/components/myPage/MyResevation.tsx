// import SearchBar from '../common/SearchBar';
import searchIcon from '@/assets/images/search.svg';
import { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const MyResevation = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-12 text-16 w-full">
      <div className="text-24 font-semibold">예약 관리</div>
      <div className="relative cursor-pointer">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border-solid border-1 border-black-3 p-10 rounded-12 pl-40 w-full
      text-18 font-semibold bg-black-3 placeholder:text-[#CBC9CF] outline-[#AFAEAC]"
          placeholder="예약 내역 검색하기"
        />
        <img
          src={searchIcon}
          alt="검색아이콘"
          className="absolute top-1/2 left-12 transform -translate-y-1/2"
        />
        <RiCloseCircleLine
          color="#CBC9CF"
          size={24}
          className="absolute top-1/2 right-12 transform -translate-y-1/2"
          onClick={() => setSearch('')}
        />
      </div>
      <div className="text-24 font-semibold">예약 목록</div>
      <div className="border-solid border-1 border-black-3 rounded-12 p-20">
        예약 목록이 없습니다.
      </div>
    </div>
  );
};
export default MyResevation;
