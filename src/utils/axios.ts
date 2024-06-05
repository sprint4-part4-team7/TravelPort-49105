import axios from 'axios';
import { getCookie } from './cookie';

const instance = axios.create({
  baseURL: 'http://ec2-43-201-69-246.ap-northeast-2.compute.amazonaws.com/',
  headers: {
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
});

export default instance;
