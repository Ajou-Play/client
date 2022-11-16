import { makeArchiveCountSetKey } from '../Calendar.util';
import { ARCHIVE_RANDOM_COLOR } from './CellOfCalendar.const';
import type { CellOfCalendarProps } from './CellOfCalendar.type';

export const CellOfCalendar = ({
  prev,
  year,
  month,
  day,
  countArchiveSet,
}: CellOfCalendarProps) => {
  const key = makeArchiveCountSetKey({
    year: String(year),
    month: String(month + 1).padStart(2, '0'),
    day: String(day).padStart(2, '0'),
  });
  const setTarget = countArchiveSet[key];
  const count = Number(setTarget?.count ?? 0);
  const idx = Math.floor(Math.random() * 3);
  const color = ARCHIVE_RANDOM_COLOR[idx];

  return (
    <td
      className={`w-[calc(100%/7)] cell relative ${prev ? 'text-grey-line' : ''}`}
      data-year={year}
      data-month={month}
      data-day={day}
      data-prev={prev}
    >
      <span className={`${count !== 0 ? `p-[12px] ${color} text-white rounded-3xl` : ''}`}>
        {day}
      </span>
      {!prev && count !== 0 && (
        <div className='absolute bg-grey-background text-grey-placeholder top-[-10px] right-[5px] w-[12px] h-[12px] rounded-full box-border p-3 flex justify-center items-center'>
          {count}
        </div>
      )}
    </td>
  );
};
