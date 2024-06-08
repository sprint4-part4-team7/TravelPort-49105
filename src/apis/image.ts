import instance from '@/utils/axios';
import { getCookie } from '@/utils/cookie';
import axios from 'axios';

interface ResponseData {
  uniqueFileName: string;
  presignedUrl: string;
}

// presigned URL을 사용하여 S3에 파일을 업로드하는 함수
const putImageS3 = async (url: string, file: File) => {
  const response = await axios.put(url, file, {
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  });
  return response;
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

  await Promise.all(
    response.data.map(async (res: ResponseData, index: number) => {
      const newData = {
        ...data[index],
        name: response.data[index].res.uniqueFileName,
      };
      await putImageS3(res.presignedUrl, newData);
    }),
  );
  return response.data.map((res: ResponseData) => {
    return res.presignedUrl;
  });
};

export default postImage;
