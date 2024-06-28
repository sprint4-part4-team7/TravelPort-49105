import React, { useEffect, useState } from 'react';
import logo from '@/assets/icons/pcLogo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchData from '@/hooks/functionHooks/useSearchData';
import { uniqueProduct } from '@/utils/UniqueProduct';
import { useUserStore } from '@/utils/Zustand';
import useProductOptionAll from '@/hooks/reactQuery/productOption/useProductOptionAllQuery';
import LoginUserHeaderBar from '@/components/common/layout/headerBar/LoginUserHeaderBar';
import UnLoginUserHeaderBar from '@/components/common/layout/headerBar/UnLoginUserHeaderBar';
import SearchBar from '@/components/common/SearchBar';
import MainCategoryButton from '@/components/main/MainCategoryButton';

interface HeaderBarProps {
  main?: boolean;
  category?: boolean;
  noSearch?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  main = false,
  category = true,
  noSearch = true,
}) => {
  const { userInfo } = useUserStore();
  const userType = userInfo.isPartner === 1 ? 'partner' : 'user';
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('/');

  const handleNavigation = (path: string) => {
    setActiveCategory(path);
    navigate(path);
  };

  useEffect(() => {
    setActiveCategory(location.pathname);
  }, [location]);

  const handleAccommodation = () => {
    handleNavigation('/list/1');
  };
  const handleActivity = () => {
    handleNavigation('/list/2');
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { optionAll } = useProductOptionAll();

  // productId 같은 경우 하나만 나오도록
  const uniqueOptionAll = uniqueProduct(optionAll);

  const { filteredTitles } = useSearchData(uniqueOptionAll);

  useEffect(() => {
    if (userInfo.id === 0) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [userInfo]);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-16 text-2xl font-bold bg-white mobile:py-0 mobile:pt-10 mobile:pb-3">
      <div className="relative flex items-center justify-between px-48 h-60 mobile:px-20">
        <div className="flex items-center mobile:flex-col mobile:items-start">
          <div className="w-full h-65 mobile:w-76 mobile:h-25 tablet:w-147 tablet:h-48">
            <button
              type="button"
              onClick={handleHome}
              className="p-0 border-none bg-none mobile:"
            >
              <img src={logo} alt="Main Logo" style={{ cursor: 'pointer' }} />
            </button>
          </div>
          <div>
            {category && (
              <div className="flex items-center justify-center mobile:hidden">
                <MainCategoryButton
                  title="숙소"
                  onClick={handleAccommodation}
                />
                <MainCategoryButton title="체험" onClick={handleActivity} />
              </div>
            )}
          </div>
        </div>
        {!noSearch && (
          <div className={`flex-1 mx-48 mobile:mx-16 tablet:mx-24 relative `}>
            <div className="w-full">
              <SearchBar isMainSearchBar={main} cardLists={filteredTitles} />
            </div>
          </div>
        )}

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
      <div>
        {category && (
          <div className="hidden mobile:flex mobile:pl-10">
            <MainCategoryButton
              title="홈"
              onClick={handleHome}
              className={`${
                activeCategory === '/'
                  ? 'border-b-2 border-black-13'
                  : 'border-b-2 border-transparent'
              } transition-all`}
            />
            <MainCategoryButton
              title="숙소"
              onClick={handleAccommodation}
              className={`${
                activeCategory === '/list/1'
                  ? 'border-b-2 border-black-13'
                  : 'border-b-2 border-transparent'
              } transition-all `}
            />
            <MainCategoryButton
              title="체험"
              onClick={handleActivity}
              className={`${
                activeCategory === '/list/2'
                  ? 'border-b-2 border-black-13'
                  : 'border-b-2 border-transparent'
              } transition-all `}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
