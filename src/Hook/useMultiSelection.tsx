import { useState } from 'react';

export const useMultiSelection = <T,>(defaultSelect: T) => {
  const [select, setSelect] = useState<T>(defaultSelect);

  const handleChangeSelect = (selectState: T) => setSelect(selectState);
  const handleInit = () => setSelect(defaultSelect);

  return {
    select,
    handleChangeSelect,
    handleInit,
  };
};
