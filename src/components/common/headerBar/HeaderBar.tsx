import React, { useEffect, useState } from 'react';
import logo from '@/assets/icons/pcLogo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchData from '@/hooks/useSearchData';
import { uniqueProduct } from '@/utils/uniqueProduct';
import { useUserStore } from '@/utils/zustand';
import useProductOptionAll from '@/hooks/reactQuery/productOption/useProductOptionAllQuery';
import LoginUserHeaderBar from '@/components/common/headerBar/LoginUserHeaderBar';
import UnLoginUserHeaderBar from '@/components/common/headerBar/UnLoginUserHeaderBar';
import SearchBar from '@/components/common/SearchBar';
import MainCategoryButton from '@/components/MainCategoryButton';

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
  const handleTraffic = () => {
    handleNavigation('/preparing');
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
    <div className="fixed top-0 left-0 right-0 z-50 text-2xl font-bold bg-white py-36 ">
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
                  onclick={handleAccommodation}
                />
                <MainCategoryButton title="체험" onclick={handleActivity} />
                <MainCategoryButton title="교통" onclick={handleTraffic} />
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
              onclick={handleHome}
              className={`transition-all duration-500 ${
                activeCategory === '/'
                  ? 'border-b-2 border-black-9 border-solid mt-0'
                  : 'mt-2'
              }`}
            />
            <MainCategoryButton
              title="숙소"
              onclick={handleAccommodation}
              className={`transition-all duration-500 ${
                activeCategory === '/list/1'
                  ? 'border-b-2 border-black-9 border-solid mt-0 '
                  : 'mt-2'
              }`}
            />
            <MainCategoryButton
              title="체험"
              onclick={handleActivity}
              className={`transition-all duration-500 ${
                activeCategory === '/list/2'
                  ? 'border-b-2 border-black-9 border-solid mt-0'
                  : 'mt-2'
              }`}
            />
            <MainCategoryButton
              title="교통"
              onclick={handleTraffic}
              className={`transition-all duration-500 ${
                activeCategory === '/preparing'
                  ? 'border-b-2 border-black-9 border-solid mt-0'
                  : 'mt-2'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
