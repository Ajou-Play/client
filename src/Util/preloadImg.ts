export const preloadImg = async (srcArray: string[], callback: Function) => {
  const promises = await srcArray.map(
    (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(src);
        };
        img.onerror = (err) => {
          reject(err);
        };
      }),
  );
  await Promise.all(promises);
  callback();
};
