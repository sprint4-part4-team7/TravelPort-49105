// 페이지네이션을 이용하는 페이지 (card쪽으로 구현)

import { useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';

const CardSample = () => {
  const [pageNum, setPageNum] = useState(1);
  console.log(pageNum);
  // useEffect(함수,pageNum); // 함수는 서버에서 데이터 가져오는거
  const limit = 3; // 추후 서버에서 받아오기

  const pageContent = () => {
    const contentList = [];

    for (let i = 0; i < limit; i++) {
      // 이 아래 전체 다 추후 서버쪽에서 주면 response[i] 같이 사용
      contentList.push(
        <Card
          key={`content${i}`}
          title={`제목 ${i}`} // 파트너가 지정한 상품의 이름
          location="제주도 서귀포시 애월읍" // 저번 회의때 이야기했던 경도,위도,빌딩이름말고 주소
          price={3000000} // 상품의 상세옵션별로 가격이 다를텐데 그중 최저값
          score={4} // 별점
          review={1000} // 총리뷰갯수
          image="https://picsum.photos/265/267" // 상품의 대표 이미지 (상품옵션의 이미지 아님)
          link="./" // 상품의 상세 url
        />,
      );
    }
    return contentList;
  };
  return (
    // 스타일은 페이지별로 디자인이 나와야 세부적으로 classname 설정가능
    <div className="w-720 flex flex-col gap-20 border-solid border-1 border-black-12">
      <div className="flex flex-row gap-10">{pageContent()}</div>
      <div className="flex justify-center items-center">
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={96}
          divNum={limit}
        />
      </div>
    </div>
  );
};

export default CardSample;
