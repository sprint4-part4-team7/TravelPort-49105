/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import logo from '@/assets/icons/travelPortLogo.svg';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '@/utils/cookie';
import useProductAll from '@/hooks/useProductAll';
import useSearchData from '@/hooks/useSearchData';
import uniqueProduct from '@/utils/uniqueProduct';
import LoginUserHeaderBar from './LoginUserHeaderBar';
import UnLoginUserHeaderBar from './UnLoginUserHeaderBar';
import SearchBar from '../SearchBar';

interface HeaderBarProps {
  userType: 'user' | 'partner'; // 유저 타입: 'user' 혹은 'partner'
  main?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ userType, main = false }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const { optionAll } = useProductAll();

  // productId 같은 경우 하나만 나오도록
  const uniqueOptionAll = uniqueProduct(optionAll);

  const { filteredTitles } = useSearchData(uniqueOptionAll);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 py-[3.2rem] text-2xl font-bold bg-white z-50">
      <div className="flex items-center justify-between h-[6rem] px-[4.8rem]">
        <div className="flex items-center">
          <div className="w-[19.5rem] h-[6.5rem] mobile:w-[7.6rem] mobile:h-[2.5rem] tablet:w-[14.7rem] tablet:h-[4.8rem]">
            <button
              type="button"
              onClick={handleHome}
              className="p-0 border-none bg-none"
            >
              <img src={logo} alt="Main Logo" style={{ cursor: 'pointer' }} />
            </button>{' '}
          </div>
        </div>
        <div className="flex-1 mx-[4.8rem]">
          {main ? (
            <SearchBar isMainSearchBar cardLists={filteredTitles} />
          ) : (
            <SearchBar cardLists={filteredTitles} />
          )}
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <LoginUserHeaderBar
              setIsLoggedIn={setIsLoggedIn}
              userType={userType}
            />
          ) : (
            <UnLoginUserHeaderBar />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
