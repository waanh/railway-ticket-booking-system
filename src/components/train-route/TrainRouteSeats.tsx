import { useEffect, useRef, useState } from 'react';
import { TrainSeatsInfo } from '../../models/index';
import './train-route.css';

type SeatInfo = {
  name: string,
  price?: number,
};

export const TrainRouteSeats = ({ name, seats, price, seatPrice }: TrainSeatsInfo) => {
  const [hidden, setHidden] = useState<string>('none');
  const [seatInfo, setSeatInfo] = useState<SeatInfo[]>([]);
  const timer = useRef<NodeJS.Timeout>();

  function showSeats() {
    if (hidden === 'none') {
      setHidden('seat__up-down');
      timer.current = setTimeout(() => setHidden('none'), 3 * 1000);
    } else {
      setHidden('none');
    };
  };

  useEffect(() => clearTimeout(timer.current));

  useEffect(() => {
    const arrayPrice = [];
    if (Object.prototype.hasOwnProperty.call(seatPrice, 'top_price')) {
      arrayPrice.push({
        name: 'верхние',
        price: seatPrice?.top_price,
      });
    };

    if (Object.prototype.hasOwnProperty.call(seatPrice, 'bottom_price')) {
      arrayPrice.push({
        name: 'нижние',
        price: seatPrice?.bottom_price,
      });
    };

    if (Object.prototype.hasOwnProperty.call(seatPrice, 'side_price')) {
      arrayPrice.push({
        name: 'боковые',
        price: seatPrice?.side_price,
      });
    };

    setSeatInfo(arrayPrice);
  }, [seatPrice]);

  return (
    <div className='train__ticket'>
      <p className='ticket__class'>{name}</p>
      <span className='amount__seat' onMouseEnter={showSeats}>{seats}
        <div className={hidden}>
          {seatInfo.map((elem, i) =>
            <div className='seat__up' key={i}>
              <p className='ticket__class'>{elem.name}</p>
              <p className='seat__ticket-start-number'>{elem.price}</p>
              <span className='sign__rub'></span>
            </div>
          )}
        </div>
      </span>
      <div className='ticket__start-price'>
        <p className='ticket__start-text'>от</p>
        <p className='ticket__start-number'>{price}</p>
        <span className='sign__rub'></span>
      </div>
    </div>
  );
};
