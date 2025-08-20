import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { dateFromAndTo, durationTrip, toDate } from '../../utils/trainDate';
import { sliceChoiceState } from '../../store/sliceChoice';
import { slicePriceState } from '../../store/slicePrice';
import './trip-details.css';

export const TripDetails = () => {
  const { route } = useAppSelector(sliceChoiceState);
  const {
    totalSeatsAge,
    totalSeatsChild,
    totalPriceAge,
    totalPriceChild,
    totalPriceAll
  } = useAppSelector(slicePriceState);
  const [hiddenThere, setHiddenThere] = useState('');
  const [hiddenPassengers, setHiddenPassengers] = useState('');

  function showThere() {
    if (hiddenThere !== 'none') {
      setHiddenThere('none');
    } else {
      setHiddenThere('');
    };
  };

  function showPassengers() {
    if (hiddenPassengers !== 'none') {
      setHiddenPassengers('none');
    } else {
      setHiddenPassengers('');
    };
  }

  return (
    <div className='details__main'>

      <div className='details__title'>
        <h2 className='details__title-text'>детали поездки</h2>
      </div>

      <div className='details__there'>
        <div className='details__there-head'>
          <span className='there__head-img'></span>
          <h3 className='there__head-title'>Туда</h3>
          <div className='there__head-date'>{toDate(route?.departure.from.datetime)}</div>
          <span className={hiddenThere === '' ? 'pass__head-open-down' : 'pass__head-open-up'} onClick={showThere}></span>
        </div>

        <div className={hiddenThere}>
          <div className='there__train-number'>
            <h3 className='there__train-title'>№ Поезда</h3>
            <p className='there__train-text'>{route?.departure.train._id.slice(0, 3)}</p>
          </div>

          <div className='there__train-name'>
            <h3 className='there__train-title'>Название</h3>
            <p className='there__train-text'>{route?.departure.train.name}</p>
          </div>

          <div className='there__route'>
            <div className='there__route-from'>
              <div className='there__time'>{dateFromAndTo(route?.departure.from.datetime)}</div>
              <div className='there__date'>{toDate(route?.departure.from.datetime)}</div>
              <div className='there__from'>
                <h3 className='there__city'>{route?.departure.from.city.name}</h3>
                <p className='there__station'>{route?.departure.from.railway_station_name}</p>
                <p className='there__station'>вокзал</p>
              </div>
            </div>
            <div className='there__arrow-time'>
              <p className='there__travel-time'>{durationTrip(route?.departure.duration)}</p>
              <span className='there__direction-arrow'></span>
            </div>
            <div className='there__route-to'>
              <div className='there__time'>{dateFromAndTo(route?.departure.to.datetime)}</div>
              <div className='there__date'>{toDate(route?.departure.to.datetime)}</div>
              <div className='there__to'>
                <h3 className='there__city'>{route?.departure.to.city.name}</h3>
                <p className='there__station'>{route?.departure.to.railway_station_name}</p>
                <p className='there__station'>вокзал</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='details__line'></div>

      <div className='details__back'></div>

      <div className='details__passengers'>
        <div className='details__passengers-head'>
          <span className='passenger__head-img'></span>
          <h3 className='passenger__head-title'>Пассажиры</h3>
          <span className={hiddenPassengers === '' ? 'passenger__head-open-down' : 'passenger__head-open-up'} onClick={showPassengers}></span>
        </div>

        <div className={hiddenPassengers}>
          <div className='passenger__amount-price'>
            <div className='passenger__amount'>
              <p className='amount'>{totalSeatsAge}</p>
              <p className='passenger__age'>Взрослых</p>
            </div>
            <div className='passenger__price'>
              <p className='passenger__price-text'>{totalPriceAge}</p>
              <span className='passenger__price-sign'></span>
            </div>
          </div>
          <div className='passenger__amount-price'>
            <div className='passenger__amount'>
              <p className='amount'>{totalSeatsChild}</p>
              <p className='passenger__age'>Ребенок</p>
            </div>
            <div className='passenger__price'>
              <p className='passenger__price-text'>{totalPriceChild}</p>
              <span className='passenger__price-sign'></span>
            </div>
          </div>
        </div>
      </div>

      <div className='details__line'></div>

      <div className='details__total'>
        <div className='details__total-line'>
          <p className='details__total-text'>итог</p>
          <p className='total__price-text'>{totalPriceAll}</p>
          <span className='details__total-sign'></span>
        </div>
      </div>
    </div>
  );
};
