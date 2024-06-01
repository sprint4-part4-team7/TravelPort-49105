/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { CiCirclePlus } from 'react-icons/ci';

type ImageUploadProps = {
  onChange: (selectedImages: string[]) => void;
};

const ImageUpload = ({ onChange }: ImageUploadProps) => {
  const [showImages, setShowImages] = useState<string[]>([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    if (imageLists) {
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  useEffect(() => {
    onChange(showImages);
  }, [showImages]);

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <>
      <div className="flex items-center justify-center border-1 border-#000 border-solid w-120 h-120">
        <label htmlFor="input-file">
          <input
            type="file"
            id="input-file"
            multiple
            className="hidden"
            onChange={handleAddImages}
          />
          <CiCirclePlus
            fill="#646F7C"
            size={24}
            className="w-full flex justify-center cursor-pointer"
          />
          <span>사진추가</span>
        </label>
      </div>

      {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
      <div className="flex ">
        {showImages.map((image, id) => {
          return (
            <div key={id} className="relative">
              <img src={image} alt={`${image}-${id}`} className="h-120" />
              <TiDeleteOutline
                size={24}
                onClick={() => handleDeleteImage(id)}
                className="absolute top-0 right-0 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageUpload;
