import { useForm } from 'react-hook-form';
import plusImage from '@/assets/icons/plusBlue.svg';
import trashImage from '@/assets/icons/trashRed.svg';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useProductImageStore, useThumbnailStore } from '@/utils/Zustand';
import Button from '@/components/common/button/Button';

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
  const { productImages, setProductImages } = useProductImageStore();

  const imageData = watch('img');

  const trueButton = true;

  useEffect(() => {
    if (imageData !== undefined) {
      if (imageData.length > 5) {
        toast.error('이미지는 최대 5개입니다');
      } else if (imageData.length > 0) {
        const temp = [...imageArray];
        Array.from(imageData).map((i: any) => {
          temp.push(i);
          return null;
        });
        if (temp.length <= 5) {
          setImageArray(Array.from(temp));
        } else {
          toast.error('이미지는 최대 5개입니다');
        }
      }
    }
  }, [imageData]);

  const showImage = () => {
    return imageArray.map((file: any, index: number) => {
      return (
        <div
          key={file.name}
          className="flex items-center justify-between p-12 bg-white border rounded border-black-4"
        >
          <div className="flex items-center gap-12">
            <img
              className="w-40 h-40"
              src={URL.createObjectURL(file)}
              alt="상품옵션"
            />
            <p>{file.name}</p>
          </div>
          <div className="flex items-center gap-12">
            <label className="flex gap-8" htmlFor="check">
              <input
                id="check"
                type="radio"
                {...register('check')}
                value={index}
              />
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

  useEffect(() => {
    if (productImages.length > 0) {
      setImageArray(productImages);
    }
  }, []);

  const onSubmit = (data: any) => {
    if (imageArray.length > 0) {
      if (data.check) {
        setThumbnail(imageArray[parseInt(data.check, 10)]);
      } else {
        setThumbnail(imageArray[0]);
      }
      setProductImages(imageArray);
    }
    closeModal();
  };

  return (
    <div className="w-384 h-532">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          className="flex items-center justify-center gap-12 p-12 border border-dashed rounded border-blue-6 text-blue-6"
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
        <div className="absolute flex justify-center gap-12 w-383 bottom-32">
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
      <div className="flex flex-col gap-8 p-12 my-10 rounded bg-black-3">
        <p className="font-semibold text-14">이미지</p>
        {showImage()}
      </div>
    </div>
  );
};

export default ImgModal;
