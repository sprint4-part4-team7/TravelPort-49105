import ARROW from '@/assets/icons/arrowDown.svg';
import { useState } from 'react';
import { useUserStore } from '@/utils/Zustand';
import useReservationManageQuery from '@/hooks/reactQuery/reservation/useReservationManageQuery';
import ReservedManageCard from '@/components/reservation/ReservedManageCard';
import ReservPagination from '@/components/common/pagination/reservPagination/ReservPagination';

const ReservationManagement = () => {
  const { userInfo } = useUserStore();
  const [isNew, setIsNew] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('숙박'); // 추후 전체 예약 요청 가능 시, '전체'로 변경
  const [pageNum, setPageNum] = useState(1);
  const limit = 4;

  const { reservedData: lodge } = useReservationManageQuery({
    partnerId: userInfo.id,
    categoryId: 1,
    offset: pageNum - 1,
    limit,
    isNew,
  });

  const { reservedData: activity } = useReservationManageQuery({
    partnerId: userInfo.id,
    categoryId: 2,
    offset: pageNum - 1,
    limit,
    isNew,
  });

  const toggleOrder = () => {
    setIsNew(!isNew);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryCount = (category: string) => {
    switch (category) {
      case '숙박':
        return lodge.totalCount;
      case '체험':
        return activity.totalCount;
      case '교통':
        return 'x';
      case '전체':
      default:
        return lodge.totalCount + activity.totalCount;
    }
  };

  const getButtonClassNames = (category: string) => {
    return `flex justify-center items-center p-10 w-100 p-10 
     text-20 font-semibold 
    ${selectedCategory === category ? 'border-solid border-b-1 border-black-12 text-black-12' : 'text-black-6'}`;
  };

  return (
    <div className="mx-10 my-0 w-full mobile:w-full">
      <div className="flex flex-col gap-30 mt-60">
        <div className="flex flex-col gap-20">
          <div className="font-bold text-28">예약 관리</div>
        </div>

        <div>
          <div className="flex justify-between py-24 mobile:flex-col mobile:gap-24">
            <div className="flex">
              {['숙박', '체험'].map((category) => (
                <button
                  type="button"
                  key={category}
                  className={getButtonClassNames(category)}
                  onClick={() => handleCategoryClick(category)}
                >
                  {`${category} (${getCategoryCount(category)})`}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-4 
              px-12 py-8 text-16 font-semibold
              border-1 border-solid border-black-5 rounded-8"
              onClick={toggleOrder}
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
              {selectedCategory === '숙박' &&
                (lodge.totalCount > 0 ? (
                  <ReservPagination
                    limit={limit}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    allCardNum={lodge.totalCount}
                  >
                    {lodge.reservations.map((item) => (
                      <ReservedManageCard
                        key={item.id}
                        id={item.id}
                        reservationState={item.reservationState}
                        productOption={item.productOption}
                        user={item.user}
                        reserveDate={item.createdAt}
                        timeTable={item.timeTable}
                      />
                    ))}
                  </ReservPagination>
                ) : (
                  <div className="flex items-center justify-center text-24 font-medium">
                    예약 내역이 없습니다.
                  </div>
                ))}
              {selectedCategory === '체험' &&
                (activity.totalCount > 0 ? (
                  <ReservPagination
                    limit={limit}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    allCardNum={activity.totalCount}
                  >
                    {activity.reservations.map((item) => (
                      <ReservedManageCard
                        key={item.id}
                        id={item.id}
                        reservationState={item.reservationState}
                        productOption={item.productOption}
                        user={item.user}
                        reserveDate={item.createdAt}
                        timeTable={item.timeTable}
                      />
                    ))}
                  </ReservPagination>
                ) : (
                  <div className="flex items-center justify-center text-24 font-medium">
                    예약 내역이 없습니다.
                  </div>
                ))}

              {selectedCategory === '교통' && (
                <div className="flex items-center justify-center text-24 font-medium">
                  추후 서비스 예정입니다
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;
