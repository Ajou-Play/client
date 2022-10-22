import React, { useState } from 'react';

import { getToday, settingDate } from './Calendar.util';

import { getElementData } from '@Util/.';

const { year: todayYear, month: todayMonth, day: todayDay } = getToday();

export const useGetDate = () => {
  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);
  const [day, setDay] = useState(todayDay);

  const handleDayClick = (e: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
    const cellYear = getElementData(e, '.cell', 'year');
    const cellMonth = getElementData(e, '.cell', 'month');
    const cellDay = getElementData(e, '.cell', 'day');
    if (cellDay === undefined || cellMonth === undefined || cellYear === undefined) return;
    setYear(Number(cellYear));
    setMonth(Number(cellMonth));
    setDay(Number(cellDay));
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
