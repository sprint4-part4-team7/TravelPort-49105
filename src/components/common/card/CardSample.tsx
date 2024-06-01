// 페이지네이션을 이용하는 페이지 (card쪽으로 구현)

// import { useEffect, useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';

const CardSample = () => {
  // const [pageNum, setPageNum] = useState(1);
  // useEffect(pageNum)
  return (
    <Pagination>
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
      <Card
        title="제주도 둘레길"
        location="제주도 서귀포시 애월읍"
        price={3000000}
        score={4}
        review={1000}
        image="https://picsum.photos/265/267"
      />
    </Pagination>
  );
};

export default CardSample;
