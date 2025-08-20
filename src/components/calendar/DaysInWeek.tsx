import { Day } from '../../models/index';
import './calendar.css';

type Props = {
  array: Day[],
  date: number,
  currentMonth: number,
  otherMonth: number,
  onChoiceDate: (day: number, month: number) => void
};

export const DaysInWeek = ({ array, date, currentMonth, otherMonth, onChoiceDate }: Props) => {
  return (
    <tr>
      {array.map((elem, i) => {
        if (elem.curDay !== 'this') {
          return <td
            className="date__other-month"
            key={elem.numDay + i}>
            {elem.numDay}
          </td>
        } else if (elem.curDay === 'this' && elem.numDay < date && currentMonth === otherMonth) {
          return <td
            className="date__other-month"
            key={elem.numDay + i}>
            {elem.numDay}
          </td>
        } else if (elem.curDay === 'this' && elem.numDay === date && currentMonth === otherMonth) {
          return <td
            className="date__today"
            onClick={() => onChoiceDate(elem.numDay, otherMonth)}
            key={elem.numDay + i}>
            {elem.numDay}
          </td>
        } else if (elem.curDay === 'this') {
          return <td
            className="date__month"
            onClick={() => onChoiceDate(elem.numDay, otherMonth)}
            key={elem.numDay + i}>
            {elem.numDay}
          </td>
        }
        return null;
      })}
    </tr>
  );
};
