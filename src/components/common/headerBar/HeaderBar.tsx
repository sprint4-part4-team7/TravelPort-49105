import React, { useEffect, useState } from 'react';
import logo from '@/assets/icons/travelPortLogo.svg';
import { useNavigate } from 'react-router-dom';
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
  category = false,
  noSearch = true,
}) => {
  const { userInfo } = useUserStore();
  const userType = userInfo.isPartner === 1 ? 'partner' : 'user';
  const navigate = useNavigate();
  const handleAccommodation = () => {
    navigate('/list/1');
  };
  const handleActivity = () => {
    navigate('/list/2');
  };
  const handleTraffic = () => {
    navigate('/preparing');
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
        <div className="flex items-center">
          <div className="w-195 h-65 mobile:w-76 mobile:h-25 tablet:w-147 tablet:h-48">
            <button
              type="button"
              onClick={handleHome}
              className="p-0 border-none bg-none"
            >
              <img src={logo} alt="Main Logo" style={{ cursor: 'pointer' }} />
            </button>
          </div>
        </div>
        {!noSearch && (
          <div
            className={`flex-1 ${main ? 'mx-48 mobile:mx-16 tablet:mx-24' : ''} relative `}
          >
            <div className="w-full">
              <SearchBar isMainSearchBar={main} cardLists={filteredTitles} />
            </div>
            {category && (
              <div className="absolute bottom-[-4rem] right-0 flex gap-8 left-15 z-1 mobile:w-152 mobile:gap-0 mobile:bottom-[-3rem]">
                <MainCategoryButton
                  title="숙소"
                  onclick={handleAccommodation}
                />
                <MainCategoryButton title="체험" onclick={handleActivity} />
                <MainCategoryButton title="교통" onclick={handleTraffic} />
              </div>
            )}
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
    </div>
  );
};

export default HeaderBar;
