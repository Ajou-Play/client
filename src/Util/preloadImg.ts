export const preloadImg = async (srcArray: string[], callback: Function) => {
  const promises = await srcArray.map(
    (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(src);
        };
      }),
  );
  await Promise.all(promises);
  callback();
};
