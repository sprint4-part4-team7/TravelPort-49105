import APPROVE from '@/assets/icons/check-circle.svg';
import DENIED from '@/assets/icons/x-square-red.svg';
import ARROW from '@/assets/icons/arrowDown.svg';
import { useEffect, useState } from 'react';
import instance from '@/utils/axios';
import Footer from '@/components/common/Footer';
// import Layout from '@/components/common/layout/Layout';
import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/Button';

type ReserveProps = {
  id: number;
  reservationState:
    | '예약 대기'
    | '예약 완료'
    | '예약 취소'
    | '예약 거절'
    | 'string';
  productOption: {
    optionName: string;
    product: {
      name: string;
    };
  };
  user: { name: string; phone: string };
  reserveDate: string;
  timeTable: {
    targetDate: string;
    startTimeOnly: string;
    endTimeOnly: string;
  };
};

const ReserveComponent = ({
  id,
  reservationState = '예약 대기',
  productOption = {
    optionName: '',
    product: {
      name: '',
    },
  },
  user = { name: '', phone: '' },
  reserveDate = '',
  timeTable = { targetDate: '', startTimeOnly: '', endTimeOnly: '' },
}: ReserveProps) => {
  return (
    <div
      id={id.toString()}
      className="flex gap-12 p-16 justify-between items-center
                  border-1 border-solid border-black-6 rounded-8"
    >
      <div className="flex flex-col gap-12 ">
        <div className="text-20 font-semibold">
          상품명 : {productOption.product.name}
        </div>
        <div className="text-14 text-black-10">
          옵션명 : {productOption.optionName}, 일정 : {timeTable.targetDate},{' '}
          {timeTable.startTimeOnly} ~ {timeTable.endTimeOnly}
        </div>
        <div className="text-16 font-medium">
          예약자명 : {user.name} / 전화번호 : {user.phone}
        </div>
        <div className="text-12 font-medium text-black-6">
          예약일시 : {reserveDate}
        </div>
      </div>
      {(reservationState === '예약 대기' || reservationState === 'string') && (
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
      )}
    </div>
  );
};

const ReservationManagement = () => {
  const [isNew, setIsNew] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [lodgeData, setLodgeData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  let allData = [];

  const toggleDropdown = () => {
    setIsNew(!isNew);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getReservedData = async (partnerId: number, categoryId: number) => {
    try {
      const res = await instance.get(
        `/reservation/partner/${partnerId}/category/${categoryId}`,
      );
      const result = res.data;

      return result;
    } catch (e: any) {
      return e.message;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const lodge = await getReservedData(1, 1);
      const activity = await getReservedData(1, 2);
      setLodgeData(lodge);
      setActivityData(activity);
    };
    fetchData();
  }, []);

  allData = [...lodgeData, ...activityData];

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
  console.log(allData);

  return (
    <>
      {/* <Layout> */}
      <div className="flex flex-col gap-60 mt-60">
        <div className="flex flex-col gap-20">
          <div className="font-bold text-24">예약 관리</div>
          <SearchBar cardLists={[]} />
        </div>

        <div>
          <div className="flex justify-between py-24">
            <div className="flex">
              {['전체', '숙박', '체험', '교통'].map((category) => (
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
              {selectedCategory === '전체' &&
                (allData.length !== 0 ? (
                  allData.map((item) => (
                    <ReserveComponent
                      key={item.id}
                      id={item.id}
                      reservationState={item.reservationState}
                      productOption={item.productOption}
                      user={item.user}
                      reserveDate={item.createdAt}
                      timeTable={item.timeTable}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center text-24 font-medium">
                    예약 내역이 없습니다.
                  </div>
                ))}
              {selectedCategory === '숙박' &&
                (lodgeData.length !== 0 ? (
                  lodgeData.map((item) => (
                    <ReserveComponent
                      key={item.id}
                      id={item.id}
                      reservationState={item.reservationState}
                      productOption={item.productOption}
                      user={item.user}
                      reserveDate={item.createdAt}
                      timeTable={item.timeTable}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center text-24 font-medium">
                    예약 내역이 없습니다.
                  </div>
                ))}
              {selectedCategory === '체험' &&
                (activityData.length !== 0 ? (
                  activityData.map((item) => (
                    <ReserveComponent
                      key={item.id}
                      id={item.id}
                      reservationState={item.reservationState}
                      productOption={item.productOption}
                      user={item.user}
                      reserveDate={item.createdAt}
                      timeTable={item.timeTable}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center text-24 font-medium">
                    예약 내역이 없습니다.
                  </div>
                ))}
              {selectedCategory === '교통' && (
                <div className="flex items-center justify-center text-24 font-medium">
                  추후 구현 예정입니다
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </Layout> */}
      <Footer />
    </>
  );
};

export default ReservationManagement;
