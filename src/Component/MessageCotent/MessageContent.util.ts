export const DateTransHm = (dateTime: number) => {
  const date = new Date(dateTime);
  return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;
};
