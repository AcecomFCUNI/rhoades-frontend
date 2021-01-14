export const getFormattedDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.valueOf())) return '';

  const formattedDateComponents = [];
  const formattedHourComponents = [];

  formattedHourComponents[0] = padStartZero(parsedDate.getHours());
  formattedHourComponents[1] = padStartZero(parsedDate.getMinutes());

  formattedDateComponents[0] = padStartZero(parsedDate.getDate());
  formattedDateComponents[1] = padStartZero(parsedDate.getMonth() + 1);
  formattedDateComponents[2] = parsedDate.getFullYear();

  return `${formattedHourComponents.join(':')} - ${formattedDateComponents.join(
    '/'
  )}`;
};

export const padStartZero = (number) => (number > 9 ? number : `0${number}`);
