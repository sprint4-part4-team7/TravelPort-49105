/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import plusUpload from '@/assets/icons/plusUpload.svg';

type ImageUploadProps = {
  onChange: (selectedImages: string[]) => void;
};

const ImageUpload = ({ onChange }: ImageUploadProps): any => {
  const [showImages, setShowImages] = useState<string[]>(Array(5).fill(''));
  const [images, setImages] = useState<(null | File)[]>(Array(5).fill(null));
  const postImages = images.filter((image) => image !== null);
  console.log(postImages);

  // 이미지 상대경로 저장
  const handleAddImages = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ): any => {
    const imageLists = event.target.files;

    if (imageLists && imageLists.length > 0) {
      const currentImageUrl = URL.createObjectURL(imageLists[0]);

      const updatedShowImages = showImages.map((image, imageIdx) =>
        imageIdx === idx ? currentImageUrl : image,
      );

      const updatedImages = images.map((image, imageIdx) =>
        imageIdx === idx ? imageLists[0] : image,
      );

      setShowImages(updatedShowImages);
      setImages(updatedImages);
    }
  };

  useEffect(() => {
    onChange(showImages);
  }, [showImages]);

  // 클릭 시 이미지 삭제
  const handleDeleteImage = (boxIdx: number) => {
    const updatedShowImages = showImages.map((image, idx) =>
      idx === boxIdx ? '' : image,
    );
    const updatedImages = images.map((image, idx) =>
      idx === boxIdx ? null : image,
    );
    setShowImages(updatedShowImages);
    setImages(updatedImages);
  };

  return (
    <div className="flex gap-12 flex-wrap">
      {showImages.map((image, idx) => {
        return (
          <div
            key={idx}
            className="relative flex items-center justify-center w-120 h-120 bg-black-2 border-dotted border-black-4 border-1 rounded-2"
          >
            <label htmlFor={`input-file-${idx}`}>
              <input
                type="file"
                id={`input-file-${idx}`}
                className="hidden"
                onChange={(e) => handleAddImages(e, idx)}
              />
              {image === '' && (
                <div className="flex flex-col gap-8">
                  <img
                    src={plusUpload}
                    alt="업로드아이콘"
                    width={14}
                    className="w-full flex justify-center cursor-pointer"
                  />
                  <div className="text-13 font-medium text-black-6">업로드</div>
                </div>
              )}
            </label>
            {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
            {image !== '' && (
              <div
                className="absolute top-0 left-0"
                onClick={() => handleDeleteImage(idx)}
              >
                <img src={image} alt={`uploaded-${idx}`} className="h-120" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageUpload;
