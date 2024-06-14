import { useForm } from 'react-hook-form';
import plusImage from '@/assets/icons/plus.svg';
import trashImage from '@/assets/icons/trash-red.svg';
import { useEffect, useState } from 'react';

type ImageForm = {
  img: FileList;
  thumbnail: FileList;
};
const ImgModal = () => {
  const { register, handleSubmit, watch } = useForm<ImageForm>({
    mode: 'onChange',
  });
  const [imageArray, setImageArray] = useState<any>([]);

  const imageData = watch('img');

  useEffect(() => {
    if (imageData !== undefined) {
      if (imageData.length > 5) {
        alert('최대 5개');
      } else if (imageData.length > 0) {
        const temp = [...imageArray];
        Array.from(imageData).map((i: any) => {
          temp.push(i);
          return null;
        });
        if (temp.length <= 5) {
          setImageArray(Array.from(temp));
        } else {
          alert('최대 5게');
        }
      }
    }
  }, [imageData]);

  const showImage = () => {
    if (!imageData || imageData.length === 0) {
      return null;
    }
    return imageArray.map((file: any, index: number) => {
      return (
        <div key={file.name} className="flex items-center">
          <img
            className="w-40 h-40"
            src={URL.createObjectURL(file)}
            alt="상품옵션"
          />
          <p>{file.name}</p>
          <label className="flex" htmlFor="check">
            <input id="check" type="radio" />
            대표
          </label>
          <img
            src={trashImage}
            alt="삭제 아이콘"
            role="presentation"
            onClick={() => {
              const temp = [...imageArray];
              temp.splice(index, 1); // 배열에서 선택한 인덱스를 삭제해서 배열을 재정의
              setImageArray(temp); // 재정의된 배열을 set안에 넣어서 재정의+state변환
            }}
          />
        </div>
      );
    });
  };

  const onSubmit = (data: any) => {
    console.log(data.img);
  };

  return (
    <div className="p-16 w-384 h-532">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border">
          <label htmlFor="imgPlus">
            <img src={plusImage} alt="플러스 아이콘" />
            <p>이미지 업로드 (최대 5장)</p>
            <input
              className="hidden"
              id="imgPlus"
              {...register('img')}
              type="file"
              accept="image/*"
              multiple
            />
          </label>
        </div>
        <button type="button">취소</button>
        <button type="submit">확인</button>
      </form>
      <div>
        <p>이미지</p>
        {showImage()}
      </div>
    </div>
  );
};

export default ImgModal;
