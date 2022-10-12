export const getElementId = (e: any, keyword: string): string | undefined => {
  if (!(e.target instanceof Element)) return undefined;
  const parentTarget = e.target.closest(keyword);
  if (!(parentTarget instanceof HTMLElement)) return undefined;
  return parentTarget.dataset.id;
};
