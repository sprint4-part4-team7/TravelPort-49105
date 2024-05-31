/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';

type ReviewStarProps = {
  onChange: (selectedScore: number) => void;
};
const ReviewStar = ({ onChange }: ReviewStarProps) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const array = [0, 1, 2, 3, 4];

  const handleStarClick = (index: number) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    const score = clicked.filter(
      (clickedBoolean) => clickedBoolean === true,
    ).length;
    onChange(score);
  }, [clicked, onChange]);

  return (
    <div className="flex">
      {array.map((el) =>
        clicked[el] ? (
          <ImStarFull
            size={35}
            color="yellow"
            onClick={() => handleStarClick(el)}
          />
        ) : (
          <ImStarEmpty
            key={el}
            onClick={() => handleStarClick(el)}
            size={35}
            color="yellow"
          />
        ),
      )}
    </div>
  );
};

export default ReviewStar;
