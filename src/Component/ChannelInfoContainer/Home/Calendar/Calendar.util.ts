import { CalendarDate } from './Calendar.type';

export const settingDate = ({ year, month }: { year: number; month: number }) => {
  if (month > 11) {
    return { year: year + 1, month: month % 12 };
  }
  if (month < 0) {
    return { year: year - 1, month: (month + 12) % 12 };
  }
  return { year, month };
};

export const getToday = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
};

const getPrevLastDay = ({ year, month }: { year: number; month: number }) => {
  const startDay = new Date(year, month, 0);
  const prevDate = startDay.getDate();
  const prevDay = startDay.getDay();
  return {
    prevDate,
    prevDay,
  };
};

const getCurrentLastDay = ({ year, month }: { year: number; month: number }) => {
  const endDay = new Date(year, month + 1, 0);
  const curDate = endDay.getDate();
  const curDay = endDay.getDay();
  return {
    curDate,
    curDay,
  };
};

const getOtherDay = (props: { year: number; month: number }) => (func: Function) => func(props);

export const getTotalDayOfMonth = ({ year, month }: { year: number; month: number }) => {
  const getOtherDayFunc = getOtherDay({ year, month });
  const { curDate } = getOtherDayFunc(getCurrentLastDay);
  const { prevDate, prevDay } = getOtherDayFunc(getPrevLastDay);

  const prevStartDate = prevDate - prevDay;
  const nowStartDate = 7 - prevDay;

  const days = [];
  let temp = [];

  // 첫 주
  for (let i = 0; i < 7; i++) {
    const cur = i + prevStartDate;
    const day = cur > prevDate ? i - prevDay : cur;
    temp.push({ prev: cur <= prevDate, day, ...settingDate({ year, month: month - 1 }) });
  }
  days.push(temp);

  // 2째주 부터 ~
  temp = [];
  for (let i = nowStartDate; i <= curDate; i++) {
    temp.push({ prev: false, day: i, year, month });
    if (temp.length === 7) {
      days.push(temp);
      temp = [];
    }
  }

  // 마지막주
  if (temp.length) {
    let i = 1;
    while (temp.length !== 7) {
      temp.push({ prev: true, day: i++, ...settingDate({ year, month: month + 1 }) });
    }
    days.push(temp);
  }

  return days;
};

export const countArchiveInDay = ({
  year,
  month,
  day,
  createdDates,
}: {
  year: number;
  month: number;
  day: number;
  createdDates: CalendarDate[];
}) => {
  console.log(createdDates);
};
