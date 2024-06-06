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
import MainCategoryButton from '@/components/MainCategoryButton';

interface HeaderBarProps {
  userType: 'user' | 'partner'; // 유저 타입: 'user' 혹은 'partner'
  main?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ userType, main = false }) => {
  const navigate = useNavigate();
  // TODO: 경로 맞게 수정하기 (지금은 임시 ..)
  const handleAccommodation = () => {
    navigate('./list');
  };
  const handleActivity = () => {
    navigate('./list');
  };
  // TODO: 교통 LIST 페이지로 가면 "서비스가 준비중입니다" 나오게 하기
  const handleTraffic = () => {
    navigate('./list');
  };
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
    <div className="fixed top-0 left-0 right-0 z-50 text-2xl font-bold bg-white py-36">
      <div className="relative flex items-center justify-between px-48 h-60">
        <div className="flex items-center">
          <div className="w-195 h-65 mobile:w-76 mobile:h-25 tablet:w-147 tablet:h-48">
            <button
              type="button"
              onClick={handleHome}
              className="p-0 border-none bg-none"
            >
              <img src={logo} alt="Main Logo" style={{ cursor: 'pointer' }} />
            </button>{' '}
          </div>
        </div>
        <div className="flex-1 mx-[4.8rem] relative">
          {main && (
            <>
              <SearchBar isMainSearchBar={main} cardLists={filteredTitles} />
              <div className="absolute bottom-[-4rem] right-0 flex gap-8 left-15 z-1">
                <MainCategoryButton
                  title="숙소"
                  onclick={handleAccommodation}
                />
                <MainCategoryButton title="체험" onclick={handleActivity} />
                <MainCategoryButton title="교통" onclick={handleTraffic} />
              </div>
            </>
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
