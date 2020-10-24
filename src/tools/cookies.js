const defaultMinutesToExpireCookies = 10;

export const USER_KEY = '_cusr_';

export const createCookie = (
  key,
  value,
  path = '/',
  exminutes = defaultMinutesToExpireCookies
) => {
  let now = new Date();
  now.setTime(now.getTime() + exminutes * 60 * 1000);
  let expires = 'expires=' + now.toUTCString();
  document.cookie = `${key}=${value}; ${expires}; path=${path}`;
};

export const getCookie = (key) => {
  let cookieName = key + '=';
  let decodedCookies = decodeURIComponent(document.cookie);
  let arrayOfCookies = decodedCookies.split(';');
  for (let idx = 0; idx < arrayOfCookies.length; idx++) {
    let currentCookie = arrayOfCookies[idx];
    while (currentCookie.charAt(0) === ' ') {
      currentCookie = currentCookie.substring(1);
    }
    if (currentCookie.indexOf(cookieName) === 0) {
      return currentCookie.substring(cookieName.length, currentCookie.length);
    }
  }
  return '';
};
