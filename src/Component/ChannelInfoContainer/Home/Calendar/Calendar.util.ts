import type { ArchiveCountSet, CalendarDate, CountArchiveInDay, WeekData } from './Calendar.type';

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

export const getTotalDayOfMonth = ({
  year,
  month,
}: {
  year: number;
  month: number;
}): WeekData[] => {
  const getOtherDayFunc = getOtherDay({ year, month });
  const { curDate } = getOtherDayFunc(getCurrentLastDay);
  const { prevDate, prevDay } = getOtherDayFunc(getPrevLastDay);

  const prevStartDate = prevDate - prevDay;
  const nowStartDate = 7 - prevDay;

  const days: WeekData[] = [];
  let temp: WeekData = [];

  // 첫 주
  for (let i = 0; i < 7; i++) {
    const cur = i + prevStartDate;
    const day = cur > prevDate ? i - prevDay : cur;
    temp.push({
      prev: cur <= prevDate,
      day,
      ...settingDate({ year, month: cur > prevDate ? month : month - 1 }),
    });
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

export const makeArchiveCountSetKey = ({ year, month, day }: CalendarDate) => year + month + day;

export const countArchiveInDay = ({ createdDates }: CountArchiveInDay) => {
  const set: ArchiveCountSet = {};
  for (let i = createdDates.length - 1; i >= 0; i--) {
    const target = createdDates[i];
    const key = makeArchiveCountSetKey(target);
    if (set[key]) {
      set[key].count++;
    } else {
      set[key] = {
        ...target,
        count: 1,
      };
    }
  }
  return set;
};

export const getDayIdxByDate = ({ totalDays, day }: { totalDays: WeekData[]; day: number }) => {
  const standDardDay = totalDays[1][0].day;
  return Math.abs((standDardDay - (day % 7) + 7) % 7);
};
