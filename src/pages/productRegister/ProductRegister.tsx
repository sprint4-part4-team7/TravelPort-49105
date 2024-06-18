// 상품등록페이지 메인
import React, { useEffect, useState } from 'react';
import Category from '@/pages/productRegister/Category';
import Description from '@/pages/productRegister/Description';
import Location from '@/pages/productRegister/Location';
import Date from '@/pages/productRegister/Date';
import Option from '@/pages/productRegister/Option';

const ProductRegister = () => {
  const [page, setPage] = useState<React.ReactNode>();

  useEffect(() => {
    setPage(<Category setPage={setPage} />);
  }, []);
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-284 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setPage(<Category setPage={setPage} />)}
              >
                <div className="step-number">1</div>
                <span className="ms-3">상품 유형</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setPage(<Description setPage={setPage} />)}
              >
                <div className="step-number">2</div>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  제목, 상세설명, 사진
                </span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setPage(<Location setPage={setPage} />)}
              >
                <div className="step-number">3</div>
                <span className="flex-1 ms-3 whitespace-nowrap">위치</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setPage(<Date setPage={setPage} />)}
              >
                <div className="step-number">4</div>
                <span className="flex-1 ms-3 whitespace-nowrap">날짜</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setPage(<Option />)}
              >
                <div className="step-number">5</div>
                <span className="flex-1 ms-3 whitespace-nowrap">상품 옵션</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <main>
        <div className="p-4 sm:ml-284">{page}</div>
      </main>
    </>
  );
};

export default ProductRegister;
