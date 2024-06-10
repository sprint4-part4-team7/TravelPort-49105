import React from 'react';
import postImage from '@/apis/image';
import Button from '@/components/common/Button';

const Test = () => {
  const [images, setImages] = React.useState<File[]>([]);
  const [instantImg, setInstantImg] = React.useState<string>('');
  const [uploaded, setUploaded] = React.useState<string>('');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImages((prev) => [...prev, file]);
    setInstantImg(URL.createObjectURL(file));
  };
  const handleUpload = async () => {
    try {
      const response = await postImage(images, 'member-profile-img');
      console.log(response);
      setUploaded(response[0]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <Button text="업로드" onClick={handleUpload} />
      {instantImg.length > 0 && <img src={instantImg} alt="test" />}
      {uploaded && <img src={uploaded} alt="uploaded" />}
    </div>
  );
};

export default Test;
