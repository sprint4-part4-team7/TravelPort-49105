import { useForm } from 'react-hook-form';
import plusImage from '@/assets/icons/plus-blue.svg';
import trashImage from '@/assets/icons/trash-red.svg';
import { useEffect, useState } from 'react';
import { useProductImageStore, useThumbnailStore } from '@/utils/zustand';
import Button from '@/components/common/Button';

type ImageForm = {
  img: FileList;
  thumbnail: FileList;
  check: FileList;
};

type ModalProps = {
  closeModal: () => void;
};

const ImgModal = ({ closeModal }: ModalProps) => {
  const { register, handleSubmit, watch } = useForm<ImageForm>({
    mode: 'onChange',
  });
  const [imageArray, setImageArray] = useState<any>([]);
  const { setThumbnail } = useThumbnailStore();
  const { setProductImages } = useProductImageStore();

  const imageData = watch('img');

  const trueButton = true;

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
          alert('최대 5개');
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
        <div
          key={file.name}
          className="flex  bg-white border border-black-4 items-center p-12 rounded justify-between"
        >
          <div className="flex gap-12 items-center">
            <img
              className="w-40 h-40"
              src={URL.createObjectURL(file)}
              alt="상품옵션"
            />
            <p>{file.name}</p>
          </div>
          <div className="flex gap-12 items-center">
            <label className="flex gap-8" htmlFor="check">
              <input id="check" type="radio" {...register('check')} />
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
        </div>
      );
    });
  };

  const onSubmit = () => {
    setThumbnail(imageArray[0]);
    setProductImages(imageArray);
    closeModal();
  };

  return (
    <div className="w-384 h-532">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          className="flex items-center justify-center gap-12 border border-dashed border-blue-6 rounded text-blue-6 p-12"
          htmlFor="imgPlus"
        >
          <img src={plusImage} alt="플러스 아이콘" />
          <p className="text-15">이미지 업로드 (최대 5장)</p>
          <input
            className="hidden"
            id="imgPlus"
            {...register('img')}
            type="file"
            accept="image/*"
            multiple
          />
        </label>
        <div className="absolute bottom-32 flex gap-12 items-center">
          <div className="w-166">
            <Button
              buttonStyle="h-28"
              outlined={trueButton}
              buttonType="button"
              onClick={closeModal}
            >
              취소
            </Button>
          </div>
          <div className="w-166">
            <Button buttonStyle="h-28" buttonType="submit">
              완료
            </Button>
          </div>
        </div>
      </form>
      <div className="bg-black-3 rounded flex flex-col gap-8 p-12 my-10">
        <p className="text-14">이미지</p>
        {showImage()}
      </div>
    </div>
  );
};

export default ImgModal;
