import React from 'react';
import postImages from '@/apis/image';
import BUCKER_NAME from '@/constants/bucket';
import Button from '@/components/common/Button';

const ImageUploadExample = () => {
  // 이미지 파일들을 저장하는 상태
  const [images, setImages] = React.useState<File[]>([]);
  // 실시간으로 이미지를 미리보기하기 위한 상태
  const [instantImg, setInstantImg] = React.useState<string>('');

  // 파일이 변경될 때 실행되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 파일을 배열에 추가
    setImages((prev) => [...prev, file]);
    // 파일을 URL로 변환하여 미리보기
    setInstantImg(URL.createObjectURL(file));
  };

  // 이미지 업로드 함수
  const handleUpload = async () => {
    // 이미지 배열과 버켓 이름을 인자로 넘겨 업로드하고
    // 반환되는 배열에 담긴 이미지 주소를 이용하자!
    // response에 url 배열이 담김
    const response = await postImages(images, BUCKER_NAME.PROFILE);
    console.log(response);
    // 참고로 이미지 순서는 배열로 보낸 순서대로 반환됨
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <Button onClick={handleUpload}>업로드</Button>
      {instantImg.length > 0 && <img src={instantImg} alt="test" />}
    </div>
  );
};

export default ImageUploadExample;
