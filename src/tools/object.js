export const getStringFromObject = (object) => JSON.stringify(object);
export const getObjectFromString = (string) => {
  if (string.length === 0) return null;
  return JSON.parse(string);
};

export const deleteFinalCharactersFromMessage = (message) => {
  const char = '}';

  let currentIdx = message.indexOf(char);
  let lastCharIdx = currentIdx;

  while (currentIdx !== -1) {
    lastCharIdx = currentIdx;
    currentIdx = message.indexOf(char, currentIdx + 1);
  }

  return message.slice(0, lastCharIdx + 1);
};

export const objectIsEmpty = (object) => Object.keys(object).length === 0
export const existsKeyInObject = (key, object) => {
  if(!object) return false

  return Object.keys(object).includes(key)
}