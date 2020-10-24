export const getStringFromObject = (object) => JSON.stringify(object);
export const getObjectFromString = (string) => {
  if (string.length === 0) return null;
  return JSON.parse(string);
};
