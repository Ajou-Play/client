import React, { useState } from 'react';

import { CELL_DATA } from './Calendar.const';
import { getToday, settingDate } from './Calendar.util';

import { getElementData } from '@Util/.';

const { year: todayYear, month: todayMonth, day: todayDay } = getToday();

export const useGetDate = () => {
  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);
  const [day, setDay] = useState(todayDay);

  const handleDayClick = (e: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
    const getCellData = (key: string) => getElementData(e, '.cell', key);
    const [cellYear, cellMonth, cellDay] = CELL_DATA.map(getCellData).map(Number);
    if (cellDay === undefined || cellMonth === undefined || cellYear === undefined) return;
    setYear(cellYear);
    setMonth(cellMonth);
    setDay(cellDay);
  };

  const handleMonthClick = (up: boolean) => {
    const { year: newYear, month: newMonth } = settingDate({ year, month: month + (up ? 1 : -1) });
    setYear(newYear);
    setMonth(newMonth);
    setDay(1);
  };

  const handlePrevMonthClick = () => handleMonthClick(false);
  const handleNextMonthClick = () => handleMonthClick(true);

  return {
    year,
    month,
    day,
    handleDayClick,
    handlePrevMonthClick,
    handleNextMonthClick,
  };
};
