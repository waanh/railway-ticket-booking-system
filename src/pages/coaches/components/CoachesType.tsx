import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { dateFromAndTo, durationTrip } from '../../../utils/trainDate';
import { Coach } from './Coach';
import { useEffect } from 'react';
import { clearAllFiltering } from '../../../store/sliceFilter';
import { changeAgeTickets, changeChildTickets, changeChildWithoutTickets, clearAllPrices, clearTotalPrice, slicePriceState } from '../../../store/slicePrice';
import { IItem, ISeats } from '../../../models/interfaces';
import '../coaches.css';

type Props = {
  route: IItem | null,
  coaches: ISeats[],
  classStyle: string
}

export const CoachesType = ({ route, coaches, classStyle }: Props) => {
  const [time, setTime] = useState({ hours: '', mins: '' });

  const [type, setType] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false
  });

  const [valueAges, setValueAges] = useState(0);
  const [valueChild, setValueChild] = useState(0);
  const [valueChildWithout, setValueChildWithout] = useState(0);
  const { firstClass, secondClass, thirdClass, fourthClass } = useAppSelector(slicePriceState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const time = durationTrip(route?.departure.duration);
    const timeArr = time.split(':');
    setTime({ hours: timeArr[0], mins: timeArr[1] });
    const typesObj = {
      first: false,
      second: false,
      third: false,
      fourth: false
    };

    for (const el of coaches) {
      if (el.coach.class_type === 'first') {
        typesObj.first = true;
      };
      if (el.coach.class_type === 'second') {
        typesObj.second = true;
      };
      if (el.coach.class_type === 'third') {
        typesObj.third = true;
      };
      if (el.coach.class_type === 'fourth') {
        typesObj.fourth = true;
      };
    };

    setType(typesObj);
  }, [coaches, route?.departure.duration]);

  useEffect(() => {
    if (valueAges < valueChildWithout) {
      setValueChildWithout(valueAges);
    };
  }, [valueAges, valueChildWithout]);

  const handleInputAges = () => {
    if (valueAges < 5) {
      const newValue = valueAges + 1;
      setValueAges(newValue);
      dispatch(changeAgeTickets({ classType: coaches[0].coach.class_type, seatsAge: newValue }));
    }
  };
  
  const handleInputChild = () => {
    if (valueChild < 5) {
      const newValue = valueChild + 1;
      setValueChild(newValue);
      dispatch(changeChildTickets({ classType: coaches[0].coach.class_type, seatsChild: newValue }));
    }
  };
  
  const handleInputChildWithout = () => {
    if (valueChildWithout < valueAges) {
      const newValue = valueChildWithout + 1;
      setValueChildWithout(newValue);
      dispatch(changeChildWithoutTickets(newValue));
    }
  };

  function inputAges(event: ChangeEvent<HTMLInputElement>) {
    if (/^[0-5]$/.test(event.target.value)) {
      dispatch(changeAgeTickets({ classType: coaches[0].coach.class_type, seatsAge: Number(event.target.value) }));
      setValueAges(Number(event.target.value));
    };
  };

  function inputChild(event: ChangeEvent<HTMLInputElement>) {
    if (/^[0-5]$/.test(event.target.value)) {
      dispatch(changeChildTickets({ classType: coaches[0].coach.class_type, seatsChild: Number(event.target.value) }));
      setValueChild(Number(event.target.value));
    };
  };

  function inputChildWithout(event: ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) >= 0 && Number(event.target.value) <= valueAges) {
      dispatch(changeChildWithoutTickets(Number(event.target.value)));
      setValueChildWithout(Number(event.target.value));
    };
  };

  function backToRoutes() {
    navigate('/route');
    dispatch(clearAllPrices());
    dispatch(clearTotalPrice());
    dispatch(clearAllFiltering());
  };

  return (
    <div className='coach'>
      <div className={`choice__train${classStyle}`}>
        <span className={`choice__train-img${classStyle}`}></span>
        <button className='choice__train-btn' type='button' onClick={backToRoutes}>Выбрать другой поезд</button>
      </div>

      <div className='coach__train'>
        <div className='coach__train-route'>
          <span className='coach__train-img'></span>
          <div className='coach__train-description'>
            <h3 className='train__description-name'>{route?.departure.train.name}</h3>
            <p className='train__description-city'>{route?.departure.from.city.name} &#8594;</p>
            <p className='train__description-city'>{route?.departure.to.city.name}</p>
          </div>
        </div>

        <div className='coach__direction-time'>
          <div className='coach__direction-city'>
            <h3 className='coach__time'>{dateFromAndTo(route?.departure.from.datetime)}</h3>
            <p className='coach__direction-name'>{route?.departure.from.city.name}</p>
            <p className='coach__direction-station'>{`${route?.departure.from.railway_station_name} вокзал`}</p>
          </div>
          <div className='direction__arrow'></div>
          <div className='coach__direction-city'>
            <h3 className='coach__time'>{dateFromAndTo(route?.departure.to.datetime)}</h3>
            <p className='coach__direction-name'>{route?.departure.to.city.name}</p>
            <p className='coach__direction-station'>{`${route?.departure.to.railway_station_name} вокзал`}</p>
          </div>
        </div>

        <div className='coach__duration'>
          <span className='coach__duration-img'></span>
          <div className='coach__duration-text'>
            <p>{time.hours} часов</p>
            <p>{time.mins} минут</p>
          </div>
        </div>
      </div>

      <div className='amount__tickets'>
        <h3 className='amount__tickets-title'>Количество билетов</h3>
        <div className='tickets__age'>
          <div className='tickets__age-inputs' onClick={handleInputAges}>
            <input
              className='tickets__age-input'
              type="text"
              placeholder={`Взрослых - ${valueAges}`}
              value={''}
              onChange={inputAges}
            />
            <p className='tickets__adults-description'>Можно добавить еще {5 - valueAges} пассажиров</p>
          </div>

          <div className='tickets__age-inputs' onClick={handleInputChild}>
            <input
              className='tickets__age-input'
              type="text"
              placeholder={`Детских - ${valueChild}`}
              value={''}
              onChange={inputChild}
            />
            <p className='tickets__adults-description'>Можно добавить еще {5 - valueChild} детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле
              в среднем на 50-65%</p>
          </div>
          <div className='tickets__age-inputs' onClick={handleInputChildWithout}>
            <input
              className='tickets__age-input'
              type="text"
              placeholder={`Детских \u00ABбез места\u00BB - ${valueChildWithout}`}
              value={''}
              onChange={inputChildWithout}
            />
            <p className='tickets__adults-description'>Доступно только для взрослого места. Можно добавить еще {valueAges - valueChildWithout} детей.</p>
          </div>
        </div>
      </div>

      <div className='coaches__types'>
        <h3 className='coach__type-title'>Тип вагона</h3>
        <div className='coach__types'>
          <div className='coach__type'>
            <span className={!type.fourth ? 'type__fourth-img' : 'type__fourth-img-active'}></span>
            <p className={!type.fourth ? 'type__text' : 'type__text-active'}>Сидячий</p>
          </div>
          <div className='coach__type'>
            <span className={!type.third ? 'type__third-img' : 'type__third-img-active'}></span>
            <p className={!type.third ? 'type__text' : 'type__text-active'}>Плацкарт</p>
          </div>
          <div className='coach__type'>
            <span className={!type.second ? 'type__second-img' : 'type__second-img-active'}></span>
            <p className={!type.second ? 'type__text' : 'type__text-active'}>Купе</p>
          </div>
          <div className='coach__type'>
            <span className={!type.first ? 'type__first-img' : 'type__first-img-active'}></span>
            <p className={!type.first ? 'type__text' : 'type__text-active'}>Люкс</p>
          </div>
        </div>

        <div className='coaches__numbering'>
          <div className='coaches__numbers'>
            <p className='coaches__numbers-text'>Вагоны</p>
            {coaches.map((elem, i) => <span className={(i + 1) % 2 !== 0 ? 'coaches__number-current' : 'coaches__number-text'} key={elem.coach._id}>{elem.coach.name}</span>)}
          </div>
          <p className='coaches__numbers-text'>Нумерация вагонов начинается с головы поезда</p>
        </div>

        {coaches.map((elem, i) => <Coach
          classStyle={(coaches.length - 1) === i ? '' : 'coach__description'}
          coach={elem}
          key={elem.coach._id} />)}
      </div>
      <div className={
        coaches[0].coach.class_type === 'first' ? firstClass.totalPrice === 0 ? 'none' : 'total__price' :
          coaches[0].coach.class_type === 'second' ? secondClass.totalPrice === 0 ? 'none' : 'total__price' :
            coaches[0].coach.class_type === 'third' ? thirdClass.totalPrice === 0 ? 'none' : 'total__price' :
              fourthClass.totalPrice === 0 ? 'none' : 'total__price'
      }>{
          coaches[0].coach.class_type === 'first' ? firstClass.totalPrice :
            coaches[0].coach.class_type === 'second' ? secondClass.totalPrice :
              coaches[0].coach.class_type === 'third' ? thirdClass.totalPrice :
                fourthClass.totalPrice
        } <span className='sign__rub'></span></div>
    </div>
  );
};
