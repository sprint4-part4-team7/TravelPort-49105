import APPROVE from '@/assets/icons/check-circle.svg';
import DENIED from '@/assets/icons/x-square-red.svg';
import ARROW from '@/assets/icons/arrowDown.svg';
import { useState } from 'react';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/Button';

const ReservationManagement = () => {
  const [isNew, setIsNew] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const toggleDropdown = () => {
    setIsNew(!isNew);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getButtonClassNames = (category: string) => {
    return `flex justify-center items-center p-10 w-100 p-10 
     text-20 font-semibold 
    ${selectedCategory === category ? 'border-solid border-b-1 border-black-12 text-black-12' : 'text-black-6'}`;
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-60 mt-60">
          <div className="flex flex-col gap-20">
            <div className="font-bold text-24">예약 관리</div>
            <SearchBar cardLists={[]} />
          </div>

          <div>
            <div className="flex justify-between py-24">
              <div className="flex">
                <button
                  type="button"
                  className={getButtonClassNames('전체')}
                  onClick={() => handleCategoryClick('전체')}
                >
                  전체
                </button>
                <button
                  type="button"
                  className={getButtonClassNames('숙박')}
                  onClick={() => handleCategoryClick('숙박')}
                >
                  숙박
                </button>
                <button
                  type="button"
                  className={getButtonClassNames('체험')}
                  onClick={() => handleCategoryClick('체험')}
                >
                  체험
                </button>
                <button
                  type="button"
                  className={getButtonClassNames('교통')}
                  onClick={() => handleCategoryClick('교통')}
                >
                  교통
                </button>
              </div>
              <button
                type="button"
                className="flex items-center justify-center gap-4 
                px-12 py-8 text-16 font-semibold
                border-1 border-solid border-black-5 rounded-8"
                onClick={toggleDropdown}
              >
                {isNew ? (
                  <>
                    최신순
                    <img
                      className=""
                      width="14px"
                      height="14px"
                      alt="new"
                      src={ARROW}
                    />
                  </>
                ) : (
                  <>
                    과거순
                    <img
                      className="-scale-y-100"
                      width="14px"
                      height="14px"
                      alt="old"
                      src={ARROW}
                    />
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-col gap-24 border-1 border-solid border-black-7 rounded-8 p-16">
              <div className="flex flex-col gap-16 ">
                <div
                  className="flex gap-12 p-16 justify-between items-center
                  border-1 border-solid border-black-6 rounded-8"
                >
                  <div className="flex flex-col gap-12 ">
                    <div className="text-20 font-semibold">
                      상품명(판매 게시글 제목)
                    </div>
                    <div className="text-14 text-black-10">
                      상품 상세 옵션(옵션, 수량, 기간)
                    </div>
                    <div className="text-16 font-medium">
                      예약자명 / 전화번호
                    </div>
                    <div className="text-12 font-medium text-black-6">
                      예약일시 :{' '}
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <Button
                      variant="default"
                      outlined
                      buttonStyle="flex gap-4 text-14 px-12 h-fit py-8 font-semibold rounded-8"
                    >
                      승인하기
                      <img alt="승인" src={APPROVE} width={16} height={16} />
                    </Button>
                    <Button
                      variant="default"
                      outlined
                      buttonStyle="flex gap-4 text-14 px-12 py-8 h-fit 
                      text-system-error font-semibold border-system-error rounded-8
                      hover:border-system-error hover:text-system-error-bg
                      active:border-system-error active:text-system-error"
                    >
                      거절하기
                      <img alt="거절" src={DENIED} width={16} height={16} />
                    </Button>
                  </div>
                </div>
                <div
                  className="flex gap-12 p-16 justify-between items-center
                  border-1 border-solid border-black-6 rounded-8"
                >
                  <div className="flex flex-col gap-12 ">
                    <div className="text-20 font-semibold">
                      상품명(판매 게시글 제목)
                    </div>
                    <div className="text-14 text-black-10">
                      상품 상세 옵션(옵션, 수량, 기간)
                    </div>
                    <div className="text-16 font-medium">
                      예약자명 / 전화번호
                    </div>
                    <div className="text-12 font-medium text-black-6">
                      예약일시 :{' '}
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <Button
                      variant="default"
                      outlined
                      buttonStyle="flex gap-4 text-14 px-12 h-fit py-8 font-semibold rounded-8"
                    >
                      승인하기
                      <img alt="승인" src={APPROVE} width={16} height={16} />
                    </Button>
                    <Button
                      variant="default"
                      outlined
                      buttonStyle="flex gap-4 text-14 px-12 py-8 h-fit 
                      text-system-error font-semibold border-system-error rounded-8
                      hover:border-system-error hover:text-system-error-bg
                      active:border-system-error active:text-system-error"
                    >
                      거절하기
                      <img alt="거절" src={DENIED} width={16} height={16} />
                    </Button>
                  </div>
                </div>
                <div
                  className="flex gap-12 p-16 justify-between items-center
                  border-1 border-solid border-black-6 rounded-8"
                >
                  <div className="flex flex-col gap-12 ">
                    <div className="text-20 font-semibold">
                      상품명(판매 게시글 제목)
                    </div>
                    <div className="text-14 text-black-10">
                      상품 상세 옵션(옵션, 수량, 기간)
                    </div>
                    <div className="text-16 font-medium">
                      예약자명 / 전화번호
                    </div>
                    <div className="text-12 font-medium text-black-6">
                      예약일시 :{' '}
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <Button
                      variant="default"
                      outlined
                      buttonStyle="flex gap-4 text-14 px-12 h-fit py-8 font-semibold rounded-8"
                    >
                      승인하기
                      <img alt="승인" src={APPROVE} width={16} height={16} />
                    </Button>
                    <Button
                      variant="default"
                      outlined
                      buttonStyle="flex gap-4 text-14 px-12 py-8 h-fit 
                      text-system-error font-semibold border-system-error rounded-8
                      hover:border-system-error hover:text-system-error-bg
                      active:border-system-error active:text-system-error"
                    >
                      거절하기
                      <img alt="거절" src={DENIED} width={16} height={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default ReservationManagement;
