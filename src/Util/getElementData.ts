export const getElementData = (e: any, keyword: string, key: string = 'id'): string | undefined => {
  if (!(e.target instanceof Element)) return undefined;
  const parentTarget = e.target.closest(keyword);
  if (!(parentTarget instanceof HTMLElement)) return undefined;
  return parentTarget.dataset[key];
};
