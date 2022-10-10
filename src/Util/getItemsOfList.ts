export const getItemsOfList = (list: any[], length: number) => {
  const res = [];
  for (const item of list) {
    if (res.length === length) break;
    res.push(item);
  }
  return res;
};
