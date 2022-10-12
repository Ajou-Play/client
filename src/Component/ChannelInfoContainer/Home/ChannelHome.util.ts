export const debounce = (func: Function, ms: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func();
    }, ms);
  };
};
