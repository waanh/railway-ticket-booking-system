import { InputDate } from '../calendar/InputDate';
import './search-widget.css';

export const SearchDate = () => {
  return (
    <div className='search__date'>
      <h2 className='search__date-text'>Дата</h2>
      <div className='search__date-inputs'>
        <InputDate inputStyle='date__input-from' calendarStyle='calendar__from' />
        <InputDate inputStyle='date__input-to' calendarStyle='calendar__to' />
      </div>
    </div>
  );
};
