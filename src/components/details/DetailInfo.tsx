import { CardListsType } from '@/constants/Types';

type DetailInfoProps = {
  options: CardListsType[];
};

const DetailInfo = ({ options }: DetailInfoProps) => {
  return (
    <>
      <h1 className="py-16 font-semibold text-20">소개</h1>
      <div className="flex flex-col gap-20 pb-40">
        {options &&
          options.map((option) => (
            <div key={option.id}>
              <h1 className="font-medium text-18">{option.optionName}</h1>
              <p className="mt-10 text-16">{option.optionDesc}</p>

              {option.optionImages?.map((image) => {
                return (
                  <img
                    key={Math.random()}
                    src={image}
                    alt="옵션이미지"
                    className="object-cover w-full"
                  />
                );
              })}
            </div>
          ))}
      </div>
    </>
  );
};

export default DetailInfo;
