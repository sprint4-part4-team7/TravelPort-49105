import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-43-201-69-246.ap-northeast-2.compute.amazonaws.com/',
});

export default instance;
