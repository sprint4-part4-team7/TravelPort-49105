import ARROW from '@/assets/icons/arrowDown.svg';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/utils/Zustand';
import useProductByPartnerQuery from '@/hooks/reactQuery/product/useProductByPartnerQuery';
import { useNavigate } from 'react-router-dom';
import ReservPagination from '@/components/common/pagination/reservPagination/ReservPagination';
import PostingCard from '@/components/reservation/PostingCard';
import Button from '@/components/common/button/Button';

const PostingManagement = () => {
  const { userInfo } = useUserStore();
  const [isNew, setIsNew] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [lodgeData, setLodgeData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const navigate = useNavigate();

  const { postingData: allPost } = useProductByPartnerQuery(userInfo.id);

  const sortData = (data: any[], postNew: boolean) => {
    if (!Array.isArray(data)) return [];
    return data.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return postNew ? timeB - timeA : timeA - timeB;
    });
  };

  const toggleDropdown = () => {
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
    setAllData(sortData(allPost, isNew));
    if (allPost) {
      const lodge = allPost.filter(
        (post: { categoryId: number }) => post.categoryId === 1,
      );
      const activity = allPost.filter(
        (post: { categoryId: number }) => post.categoryId === 2,
      );
      setLodgeData(sortData(lodge, isNew));
      setActivityData(sortData(activity, isNew));
    }
  }, [isNew, allPost]);

  return (
    <div className="relative w-full mx-10 my-0 mobile:w-full">
      <div className="flex flex-col gap-30 mt-60">
        <div className="flex flex-col gap-20">
          <div className="font-bold text-28">상품 판매(게시) 관리</div>
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
              className="flex items-center justify-center gap-4 px-12 py-8 font-semibold border-solid text-16 border-1 border-black-5 rounded-8"
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
          <div className="flex flex-col gap-24 p-16 border-solid border-1 border-black-7 rounded-8">
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
                      <PostingCard
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        salePeriod={{
                          startDate: item.startDate,
                          endDate: item.endDate,
                        }}
                        postingDate={item.createdAt}
                        postingState={item.isPosting}
                      />
                    ))}
                  </ReservPagination>
                ) : (
                  <div className="flex items-center justify-center font-medium text-24">
                    게시한 상품이 없습니다.
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
                      <PostingCard
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        salePeriod={{
                          startDate: item.startDate,
                          endDate: item.endDate,
                        }}
                        postingDate={item.createdAt}
                        postingState={item.isPosting}
                      />
                    ))}
                  </ReservPagination>
                ) : (
                  <div className="flex items-center justify-center font-medium text-24">
                    게시한 상품이 없습니다.
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
                      <PostingCard
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        salePeriod={{
                          startDate: item.startDate,
                          endDate: item.endDate,
                        }}
                        postingDate={item.createdAt}
                        postingState={item.isPosting}
                      />
                    ))}
                  </ReservPagination>
                ) : (
                  <div className="flex items-center justify-center font-medium text-24">
                    게시한 상품이 없습니다.
                  </div>
                ))}

              {selectedCategory === '교통' && (
                <div className="flex items-center justify-center font-medium text-24">
                  추후 서비스 예정입니다
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="floating"
        buttonStyle="fixed bottom-90 right-40 h-56 p-12
      bg-blue-6 text-16 font-semibold cursor-pointer shadow-lg"
        width="w-240"
        onClick={() => navigate('/partner/product-register')}
      >
        새 상품 게시하기
      </Button>
    </div>
  );
};

export default PostingManagement;
