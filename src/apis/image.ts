import instance from '@/utils/axios';
import axios from 'axios';

interface PresignedUrl {
  url: string;
  uniqueFileName: string;
  originalFileName: string;
}

// presigned URL을 사용하여 S3에 파일을 업로드하는 함수
const putImageS3 = async (url: string, file: File) => {
  const response = await axios.put(url, file);
  return response.data;
};

// 이미지 파일들을 받아 presigned URL을 요청하고, 해당 URL을 사용하여 S3에 업로드하는 함수
const postImage = async (data: File[], bucket: string) => {
  const imageDatas = data.map((file) => {
    return {
      objectKey: file.name,
      contentType: file.type,
    };
  });
  const response = await instance.post('utility/presigned-urls', {
    items: imageDatas,
    bucketName: bucket,
  });
  if (!response.data) throw new Error('Failed to get presigned URL');
  const { presignedUrls } = response.data;
  // 파일명을 지정된 이름으로 변경
  await Promise.all(
    presignedUrls.map(async (responseData: PresignedUrl, index: number) => {
      const blob = data[index].slice(0, data[index].size, data[index].type);
      const newFile = new File([blob], responseData.uniqueFileName, {
        type: data[index].type,
      });
      // S3에 파일 업로드
      await putImageS3(responseData.url, newFile);
    }),
  );
  return presignedUrls.map((res: PresignedUrl) => {
    return res.url.split('?')[0];
  });
};

export default postImage;
