import { useEffect, useState, useRef } from 'react';
import { getCurrentDate, monthInWeeks } from '../../utils/date';
import { validateCalendarDate } from '../../utils/validators';
import { DaysInWeek } from './DaysInWeek';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Weeks } from '../../models/index';
import { choiceDateFrom, choiceDateTo, sliceChoiceState } from '../../store/sliceChoice';
import './calendar.css';

type Props = {
  classStyle: string,
};

export const Calendar = ({ classStyle }: Props) => {
  const { fromDate } = useAppSelector(sliceChoiceState);
  const date = getCurrentDate(fromDate);
  const [numMonth, setNumMonth] = useState(date.numberMonth);
  const [nameMonth, setNameMonth] = useState(date.month);
  const [days, setDays] = useState<Weeks | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  function refClassListToggle() {
    ref.current?.classList.remove(...ref.current.classList)
    ref.current?.classList.add('none');
  };

  function getDate(choiceDate: string) {
    if (classStyle.includes('from') && validateCalendarDate(choiceDate)) {
      dispatch(choiceDateFrom(choiceDate));
      refClassListToggle();
    };

    if (classStyle.includes('to') && validateCalendarDate(choiceDate)) {
      dispatch(choiceDateTo(choiceDate));
      refClassListToggle();
    };
  };

  useEffect(() => {
    function outsideClick(event: MouseEvent): void {
      if (event.target instanceof HTMLElement && !ref.current?.contains(event.target)) {
        refClassListToggle();
      };
    };

    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, [ref]);

  useEffect(() => {
    const weeks = monthInWeeks(numMonth);
    setDays(weeks);
  }, [numMonth]);

  function onChoiceDate(day: number, month: number): void {
    const choiceDate = date.choiceDate(date.year, month, day);
    const compareChoiceDate = new Date(date.year, month, day).getTime();
    const compareToday = new Date(date.year, date.numberMonth, date.numDate).getTime();

    if (fromDate === '' && compareChoiceDate >= compareToday) {
      getDate(choiceDate);
    } else if (fromDate !== '' && compareToday <= compareChoiceDate) {
      getDate(choiceDate);
    };
  };

  function prevMonth() {
    setNumMonth((prev) => (prev - 1));
    setNameMonth(date.nameMonth(date.year, numMonth - 1));
  };

  function nextMonth() {
    setNumMonth((prev) => (prev + 1));
    setNameMonth(date.nameMonth(date.year, numMonth + 1));
  };

  return (
    <div className={classStyle} ref={ref}>
      <div className='cal__triangle'></div>
      <div className='cal__main'>
        <div className='cal__month'>
          <button className='prev__month' onClick={prevMonth} type='button'></button>
          <p className='cal__month-text'>{nameMonth}</p>
          <button className='next__month' onClick={nextMonth} type='button'></button>
        </div>
        <table className='cal__table'>
          <colgroup className='date__column'>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="date__week-end" />
            <col className="date__week-end" />
          </colgroup>

          {days !== null ? <tbody>
            {Object.entries(days).map((elem) =>
              <DaysInWeek
                array={elem[1]}
                date={date.numDate}
                currentMonth={date.numberMonth}
                otherMonth={numMonth}
                onChoiceDate={onChoiceDate}
                key={elem[0]}
              />
            )}
          </tbody> : null}
        </table>
      </div>
    </div>
  )
}
