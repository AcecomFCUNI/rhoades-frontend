import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const USER_KEY = '_cusr_';

export const setCookie = (key, value, path = '/') =>
  cookies.set(key, value, { path, maxAge: 10 * 60 });

export const getCookie = (key) => {
  const algo = cookies.get(key, { doNotParse: false });
  return algo;
  // return  cookies.get(key, { doNotParse: false });
};

export const removeCookie = (key, path = '/') => cookies.remove(key, { path });
