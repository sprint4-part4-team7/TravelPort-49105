import ARROW from '@/assets/icons/arrowDown.svg';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/utils/zustand';
import useReservationManageQuery from '@/hooks/reactQuery/reservation/useReservationManageQuery';
import ReservedManageCard from '@/components/ReservedManageCard';
import ReservPagination from '@/components/common/reservPagination/ReservPagination';

const ReservationManagement = () => {
  const { userInfo } = useUserStore();
  const [isNew, setIsNew] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [lodgeData, setLodgeData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);

  const { reservedData: lodge } = useReservationManageQuery({
    partnerId: userInfo.id,
    categoryId: 1,
  });

  const { reservedData: activity } = useReservationManageQuery({
    partnerId: userInfo.id,
    categoryId: 2,
  });

  const sortData = (data: any[], postNew: boolean) => {
    if (!Array.isArray(data)) return [];
    return data.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return postNew ? timeB - timeA : timeA - timeB;
    });
  };

  const toggleOrder = () => {
    setIsNew(!isNew);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryCount = (category: string) => {
    switch (category) {
      case '숙박':
        return lodgeData.length;
      case '체험':
        return activityData.length;
      case '교통':
        return 'x';
      case '전체':
      default:
        return allData.length;
    }
  };

  const getButtonClassNames = (category: string) => {
    return `flex justify-center items-center p-10 w-100 p-10 
     text-20 font-semibold 
    ${selectedCategory === category ? 'border-solid border-b-1 border-black-12 text-black-12' : 'text-black-6'}`;
  };

  const [pageNum, setPageNum] = useState(1);

  const limit = 4;
  const start = (pageNum - 1) * limit;
  const end = start + limit;

  useEffect(() => {
    const fetchData = () => {
      setLodgeData(sortData(lodge, isNew));
      setActivityData(sortData(activity, isNew));
      setAllData(sortData([...lodge, ...activity], isNew));
    };
    fetchData();
  }, [isNew, lodgeData, activityData]);

  return (
    <div className="mx-10 my-0 w-full mobile:w-full">
      <div className="flex flex-col gap-30 mt-60">
        <div className="flex flex-col gap-20">
          <div className="font-bold text-28">예약 관리</div>
        </div>

        <div>
          <div className="flex justify-between py-24 mobile:flex-col mobile:gap-24">
            <div className="flex">
              {['전체', '숙박', '체험'].map((category) => (
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
              {selectedCategory === '전체' &&
                (allData.length > 0 ? (
                  <ReservPagination
                    limit={limit}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    allCardNum={allData.length}
                  >
                    {allData.slice(start, end).map((item) => (
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
              {selectedCategory === '숙박' &&
                (lodgeData.length > 0 ? (
                  <ReservPagination
                    limit={limit}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    allCardNum={lodgeData.length}
                  >
                    {lodgeData.slice(start, end).map((item) => (
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
                (activityData.length > 0 ? (
                  <ReservPagination
                    limit={limit}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    allCardNum={activityData.length}
                  >
                    {activityData.slice(start, end).map((item) => (
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
