/* eslint-disable no-undef */
// import useSearchData from '@/hooks/useSearchData';
import SearchBar from '../components/common/SearchBar';

const cardLists = [
  {
    id: 1,
    title: '스쿠버 다이빙',
    description: '신나는 바닷속 체험',
  },
  {
    id: 2,
    title: '스쿠버플라잉',
    description: '신나는 하늘 체험',
  },
  {
    id: 3,
    title: '나이트 사파리 체험',
    description: '밤에 동물들을 보세요',
  },
  {
    id: 4,
    title: '스킨스쿠버',
    description: '피부로 느끼는 물놀이',
  },
];

const List = () => {
  // const { filteredTitles } = useSearchData(cardLists);

  return (
    <>
      <div className="w-[40rem]">
        <SearchBar cardLists={cardLists} />
      </div>
      {/* {filteredTitles.map((item) => (
        <Card key={item.id} info={item} />
      ))} */}
    </>
  );
};

export default List;
