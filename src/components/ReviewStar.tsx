import { useState } from 'react';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';

const ReviewStar = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index: number) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index;
    }
    setClicked(clickStates);
  };

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
