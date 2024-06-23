import axios from 'axios';
import { getCookie } from '@/utils/Cookie';

const instance = axios.create({
  baseURL: 'http://ec2-3-38-211-3.ap-northeast-2.compute.amazonaws.com/',
  headers: {
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
});

export default instance;
