import React, { useState, useRef } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

interface LoginUserHeaderBarProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userType: 'user' | 'partner';
}

interface User {
  name: string;
  image: string;
}

const LoginUserHeaderBar: React.FC<LoginUserHeaderBarProps> = ({
  setIsLoggedIn,
  userType,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const user: User = {
    name: '김짱구',
    image:
      'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
  };

  const menuItems = [
    { id: 'my-info', label: '내 정보', path: '/' },
    ...(userType === 'user'
      ? [
          {
            id: 'reservation-status',
            label: '예약 내역',
            path: '/reservation-status',
          },
          {
            id: 'reservation-history',
            label: '예약 현황',
            path: '/reservation-history',
          },
        ]
      : []),
    { id: 'logout', label: '로그아웃', action: () => setIsLoggedIn(false) },
  ];

  return (
    <div className="relative flex items-center space-x-10">
      <button
        type="button"
        className="flex items-center"
        onClick={toggleDropdown}
      >
        <img
          src={user.image}
          alt="Profile"
          className="rounded-full cursor-pointer h-50 w-50"
        />
      </button>
      <span>{user.name}</span>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-white border border-gray-300 rounded shadow-lg top-[100%] mt-[1rem]"
          style={{ marginLeft: '-1.5rem' }}
        >
          <ul className="p-10">
            {menuItems.map((item) => (
              <li key={item.id} className="p-2">
                <button
                  type="button"
                  className="w-full p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      window.location.href = item.path;
                    }
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginUserHeaderBar;
