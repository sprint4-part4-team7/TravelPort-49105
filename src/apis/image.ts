import { PostData, PresignedUrl } from '@/constants/types';
import instance from '@/utils/axios';
import axios from 'axios';

// presigned URL을 사용하여 S3에 파일을 업로드하는 함수
const putImageS3 = async (url: string, file: File) => {
  try {
    const response = await axios.put(url, file);
    return response.data;
  } catch (e) {
    throw new Error('Failed to upload image to S3');
  }
};
// presigned URL을 요청하는 함수
const postImageDatas = async (data: PostData) => {
  try {
    const response = await instance.post('utility/presigned-urls', data);
    if (!response.data) throw new Error('Failed to get presigned URL');
    return response.data.presignedUrls;
  } catch (e) {
    throw new Error('Failed to get presigned URL');
  }
};

// 이미지 파일들을 받아 presigned URL을 요청하고, 해당 URL을 사용하여 S3에 업로드하는 함수
const postImages = async (data: File[], bucket: string) => {
  if (!data.length) return [];
  const imageDatas = data.map((file) => {
    return {
      objectKey: file.name,
      contentType: file.type,
    };
  });
  // presigned URL 요청
  const response = await postImageDatas({
    items: imageDatas,
    bucketName: bucket,
  });
  // 파일명을 지정된 이름으로 변경
  await Promise.all(
    response.map(async (urlData: PresignedUrl, index: number) => {
      const blob = data[index].slice(0, data[index].size, data[index].type);
      const newFile = new File([blob], urlData.uniqueFileName, {
        type: data[index].type,
      });
      // S3에 파일 업로드
      await putImageS3(urlData.url, newFile);
    }),
  );
  // 업로드된 파일의 URL들을 배열로 반환
  return response.map((res: PresignedUrl) => {
    return res.url.split('?')[0];
  });
};

export default postImages;
