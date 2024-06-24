import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
    ...options,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, options?: any) => {
  return cookies.remove(name, { ...options });
};
