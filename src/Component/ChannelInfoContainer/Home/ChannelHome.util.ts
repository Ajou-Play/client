export const debounce = (func: Function, ms: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      func();
    }, ms);
  };
};
