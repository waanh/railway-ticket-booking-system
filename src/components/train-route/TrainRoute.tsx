import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IItem } from '../../models/interfaces';
import { TrainSeatsInfo } from '../../models/index';
import { useAppDispatch } from '../../store/hooks';
import { choiceRoute } from '../../store/sliceChoice';
import { getSeatsThunk } from '../../store/sliceGetSeats';
import { addRouteId, clearOrder } from '../../store/sliceOrder';
import { createArray } from '../../utils/createTrainSeatsArray';
import { dateFromAndTo, durationTrip } from '../../utils/trainDate';
import { TrainRouteSeats } from './TrainRouteSeats';
import './train-route.css';

type Props = {
  route: IItem,
  btnText?: string
};

export const TrainRoute = ({ route, btnText = 'Выбрать места' }: Props) => {
  const [train, setTrain] = useState<TrainSeatsInfo[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const arrayInfo: TrainSeatsInfo[] = [];

    if (route) {
      if (route.departure.have_first_class) {
        createArray(route, arrayInfo, 'first', 'Люкс');
      };

      if (route.departure.have_second_class) {
        createArray(route, arrayInfo, 'second', 'Купе');
      };

      if (route.departure.have_third_class) {
        createArray(route, arrayInfo, 'third', 'Плацкарт');
      };

      if (route.departure.have_fourth_class) {
        createArray(route, arrayInfo, 'fourth', 'Сидячий');
      };

      setTrain(arrayInfo);
    };
  }, [route]);

  function getCoaches() {
    if (route) {
      dispatch(choiceRoute(route));
      dispatch(getSeatsThunk(route.departure._id));
      dispatch(addRouteId(route.departure._id));
      navigate('/route/coach');
    };
  };

  function backOrder() {
    dispatch(clearOrder());
    navigate('/route');
  };

  return (
    <div className='train__route'>
      <div className='train__name'>
        <span className='train__name-image'></span>
        <h3 className='train__name-text'>&#171;{route.departure.train.name}&#187;</h3>
        <div className='train__name-direction'>
          <p className='train__name-city'>{route.departure.from.city.name}&#8594;</p>
          <p className='train__name-city'>{route.departure.to.city.name}</p>
        </div>
      </div>

      <div className='train__direction'>
        <div className='train__direction-route'>
          <div className='train__direction-from'>
            <div className='direction__time'>{dateFromAndTo(route.departure.from.datetime)}</div>
            <div className='direction__from'>
              <h3 className='direction__city'>{route.departure.from.city.name}</h3>
              <p className='direction__station'>{route.departure.from.railway_station_name} вокзал</p>
            </div>
          </div>
          <div className='train__direction-time'>
            <p className='travel__time'>{durationTrip(route.departure.duration)}</p>
            <span className='direction__arrow'></span>
          </div>
          <div className='train__direction-to'>
            <div className='direction__time'>{dateFromAndTo(route?.departure.to.datetime)}</div>
            <div className='direction__to'>
              <h3 className='direction__city'>{route.departure.to.city.name}</h3>
              <p className='direction__station'>{route?.departure.to.railway_station_name} вокзал</p>
            </div>
          </div>
        </div>
      </div>

      <div className='train__tickets'>
        <div className='train__tickets-options'>
          {train.map((elem) =>
            <TrainRouteSeats
              name={elem.name}
              seats={elem.seats}
              price={elem.price}
              seatPrice={elem.seatPrice}
              key={elem.name} />
          )}
        </div>

        <div className='train__facilities'>
          <span className={`${route.departure.have_wifi ? 'facilities__wifi-have' : 'train__facilities-wifi'}`}></span>
          <span className={`${route.departure.is_express ? 'facilities__express-have' : 'train__facilities-express'}`}></span>
          <span className={`${route.departure.have_air_conditioning ? 'facilities__coffee-have' : 'train__facilities-coffee'}`}></span>
        </div>

        {btnText !== 'Изменить' ?
          <button type='button' className='train__choice-btn' onClick={getCoaches}>{btnText}</button> :
          <button type='button' className='order__route-btn' onClick={backOrder}>{btnText}</button>}
      </div>
    </div>
  );
};
