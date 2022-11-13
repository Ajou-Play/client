export const DateTransHm = (date: Date) => {
  date = new Date(date);
  return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;
};
