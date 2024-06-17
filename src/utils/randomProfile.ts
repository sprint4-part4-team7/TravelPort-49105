import { useState, useEffect } from 'react';

import defaul1Img1 from '@/assets/icons/defaultImg1.svg';
import defaul1Img2 from '@/assets/icons/defaultImg2.svg';
import defaul1Img3 from '@/assets/icons/defaultImg3.svg';
import defaul1Img4 from '@/assets/icons/defaultImg4.svg';
import defaul1Img5 from '@/assets/icons/defaultImg5.svg';

const defaultImages = [
  defaul1Img1,
  defaul1Img2,
  defaul1Img3,
  defaul1Img4,
  defaul1Img5,
];

// 랜덤으로 이미지 선택
const getRandomImage = (images: any) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const useProfileImage = (userInfo: any) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');

    if (storedImage) {
      setImage(storedImage);
    } else {
      const newImage = userInfo.profileImage || getRandomImage(defaultImages);
      setImage(newImage);
      localStorage.setItem('profileImage', newImage);
    }
  }, [userInfo, defaultImages]);

  return image;
};

export default useProfileImage;
