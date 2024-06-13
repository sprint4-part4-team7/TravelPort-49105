import { CardListsType } from '@/constants/types';

type DetailInfoProps = {
  options: CardListsType[];
};

const DetailInfo = ({ options }: DetailInfoProps) => {
  return (
    <>
      <h1 className="pt-16 text-20 font-semibold">소개</h1>
      <div className="flex flex-col gap-20 pb-40">
        {options.map((option) => (
          <>
            <p className="text-16 leading-[162%]">{option.optionDesc}</p>
            {option.optionImages.forEach((image) => {
              <img
                src={image}
                alt="옵션이미지"
                className="w-full object-cover"
              />;
            })}
          </>
        ))}
      </div>
    </>
  );
};

export default DetailInfo;
