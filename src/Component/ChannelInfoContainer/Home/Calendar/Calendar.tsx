import { CALENDAR_HEADER, NUM_TO_ENG_DAY, NUM_TO_ENG_MONTH } from './Calendar.const';
import { useGetDate } from './Calendar.hook';
import type { CalendarProps } from './Calendar.type';
import { countArchiveInDay, getDayIdxByDate, getTotalDayOfMonth } from './Calendar.util';
import { CellOfCalendar } from './CellOfCalendar';

export const Calendar = ({ createdDates }: CalendarProps) => {
  const { year, month, day, handleDayClick, handlePrevMonthClick, handleNextMonthClick } =
    useGetDate();
  const totalDays = getTotalDayOfMonth({ year, month });
  const monthName = NUM_TO_ENG_MONTH[month];
  const dayIdx = getDayIdxByDate({ totalDays, day });
  const dayName = NUM_TO_ENG_DAY[dayIdx];
  const countArchiveSet = countArchiveInDay({ createdDates });

  return (
    <>
      <div className='flex w-[100%] h-[50px] items-center justify-between'>
        <div>
          <span className='font-bold text-2xl'>{monthName}</span>
          <span className='font-bold mr-2 ml-2 text-2xl'>{day}</span>
          <span className='text-2xl'>{dayName}</span>
        </div>
        <div className='flex mr-4'>
          <img
            src='/asset/Calendar/prevMonth.svg'
            alt='이전'
            width={12}
            height={12}
            className='cursor-pointer mr-14'
            onClick={handlePrevMonthClick}
            aria-hidden
            title='이전 달'
          />
          <img
            src='/asset/Calendar/nextMonth.svg'
            alt='이후'
            width={12}
            height={12}
            className='cursor-pointer'
            onClick={handleNextMonthClick}
            aria-hidden
            title='다음 달'
          />
        </div>
      </div>

      <table
        className='w-[100%] h-[calc(100%-50px)]'
        onClick={handleDayClick}
        aria-hidden
      >
        <tr className='w-[100%]'>
          {CALENDAR_HEADER.map((engDayName, i) => (
            <th
              key={i}
              className='text-primary-orange text-base font-bold w-[calc(100%/7)]'
            >
              {engDayName}
            </th>
          ))}
        </tr>
        {totalDays.map((week, i) => (
          <tr
            key={i}
            className='text-center cursor-pointer w-[100%]'
          >
            {week.map((props, idx) => (
              <CellOfCalendar
                {...props}
                countArchiveSet={countArchiveSet}
                key={idx}
              />
            ))}
          </tr>
        ))}
      </table>
    </>
  );
};
