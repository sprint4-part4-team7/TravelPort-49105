/* eslint-disable react/no-array-index-key */
const ProductType = () => {
  const hotelTypes = [
    '호텔',
    '게스트하우스',
    '민박',
    '캠핑장/야영장',
    '풀빌라',
    '펜션',
    '기타',
  ];
  // const ActivityTypes = [
  //   '테마파크',
  //   '수상 액티비티',
  //   '레저스포츠',
  //   '전시/공연',
  //   '체험/클래스',
  //   '기타',
  // ];

  return (
    <div className="p-24 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] flex flex-col gap-32 justify-center items-start rounded-24 bg-white">
      <h1 className="text-16">숙박 종류 선택</h1>
      <div>
        {hotelTypes.map((type, idx) => {
          return (
            <div key={idx} className="flex gap-8 px-8 py-4 text-15">
              <input type="checkbox" id={type} />
              <label htmlFor={type}>{type}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductType;
