import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLastRoutesThunk, sliceGetLastRoutesState } from '../../store/sliceGetLastRoutes';
import './last-routes.css';

export const LastRoutes = () => {
  const { items } = useAppSelector(sliceGetLastRoutesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLastRoutesThunk());
  }, [dispatch]);

  return (
    <div className='last__routes'>
      <h2 className='last__title'>последние билеты</h2>
      <ul className='last__list'>
        {items.map((elem) =>
          <li className='last__list-item' key={elem.departure._id}>
            <div className='route__from-to'>
              <div className='route__from'>
                <h4 className='route__city-text'>{elem.departure.from.city.name}</h4>
                <p className='route__station-text'>{elem.departure.from.railway_station_name} вокзал</p>
              </div>
              <div className='route__to'>
                <h4 className='route__city-text'>{elem.departure.to.city.name}</h4>
                <p className='route__station-text'>{elem.departure.to.railway_station_name} вокзал</p>
              </div>
            </div>
            <div className='route__facilities-price'>
              <div className='route__facilities'></div>
              <div className='route__start-price'>
                <p className='price__start-text'>от</p>
                <p className='price__start-number'>{elem.min_price}</p>
                <span className='sign__rub'></span>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
