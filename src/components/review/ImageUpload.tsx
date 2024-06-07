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
  const uploadArray = [0, 1, 2, 3, 4];

  // 이미지 상대경로 저장
  const handleAddImages = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ): any => {
    const imageLists = event.target.files;

    if (imageLists && imageLists.length > 0) {
      const currentImageUrl = URL.createObjectURL(imageLists[0]);

      const updatedImages = showImages.map((image, imageIdx) =>
        imageIdx === idx ? currentImageUrl : image,
      );

      setShowImages(updatedImages);
    }
  };

  useEffect(() => {
    onChange(showImages);
  }, [showImages]);

  // 클릭 시 이미지 삭제
  const handleDeleteImage = (boxIdx: number) => {
    const updatedImages = showImages.map((image, idx) =>
      idx === boxIdx ? '' : image,
    );
    setShowImages(updatedImages);
  };

  return (
    <div className="flex gap-12 flex-wrap">
      {uploadArray.map((_, idx) => {
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
              {!showImages[idx].length && (
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
            {showImages[idx] && (
              <div
                className="absolute top-0 left-0"
                onClick={() => handleDeleteImage(idx)}
              >
                <img
                  src={showImages[idx]}
                  alt={`uploaded-${idx}`}
                  className="h-120"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageUpload;
