import { BaseSyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeAmountTickets, changeNumberSeats, changePriceSeats, changeServiceLinens, changeServiceWifi, slicePriceState } from '../../../store/slicePrice';
import { changeNotice } from '../../../store/sliceNotice';
import { amountSeats, haveSeatsOrNot } from '../../../utils/amountSeats';
import { schemeFirstClass, schemeFourthClass, schemeThirdClass } from '../../../utils/schemeCoach';
import { ISeatClass, ISeats } from '../../../models/interfaces';
import '../coaches.css';

type Props = {
  classStyle: string,
  coach: ISeats
}

enum VisibleServices {
  Air = 'air',
  Wifi = 'wifi',
  Linens = 'linens',
  Cup = 'cup'
}

export const Coach = ({ classStyle, coach }: Props) => {
  const [visible, setVisible] = useState({
    [VisibleServices.Air]: false,
    [VisibleServices.Wifi]: false,
    [VisibleServices.Linens]: false,
    [VisibleServices.Cup]: false
  });
  const [wifiBought, setWifiBought] = useState(false);
  const [linensBought, setLinensBought] = useState(false);
  const {
    firstClass,
    secondClass,
    thirdClass,
    fourthClass
  } = useAppSelector(slicePriceState);
  const [current, setCurrent] = useState<ISeatClass>({
    seatsAge: 0,
    seatsChild: 0,
    totalPrice: 0,
    amountTickets: 0
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (coach.coach.class_type === 'first') {
      setCurrent(firstClass);
    };
    if (coach.coach.class_type === 'second') {
      setCurrent(secondClass);
    };
    if (coach.coach.class_type === 'third') {
      setCurrent(thirdClass);
    };
    if (coach.coach.class_type === 'fourth') {
      setCurrent(fourthClass);
    };
  }, [firstClass, secondClass, thirdClass, fourthClass, coach.coach.class_type]);

  function mouseMoveToAir(event: BaseSyntheticEvent) {
    if (event.target.classList.contains('service__air-selected') || event.target.classList.contains('service__air')) {
      setVisible({
        air: true,
        wifi: false,
        linens: false,
        cup: false
      });
    };
  };

  function mouseMoveToWifi(event: BaseSyntheticEvent) {
    if (event.target.classList.contains('service__wifi') || event.target.classList.contains('service__wifi-empty')) {
      setVisible({
        air: false,
        wifi: true,
        linens: false,
        cup: false
      });
    };
  };

  function mouseMoveToLinens(event: BaseSyntheticEvent) {
    if (event.target.classList.contains('service__linens-empty') ||
      event.target.classList.contains('service__linens') ||
      event.target.classList.contains('service__included')) {
      setVisible({
        air: false,
        wifi: false,
        linens: true,
        cup: false
      });
    };
  };

  function mouseMoveToCup(event: BaseSyntheticEvent) {
    if (event.target.classList.contains('service__coffee')) {
      setVisible({
        air: false,
        wifi: false,
        linens: false,
        cup: true
      });
    };
  };

  function buyWifi() {
    if (wifiBought) {
      dispatch(changeServiceWifi({
        classType: coach.coach.class_type,
        price: -Number(coach.coach.wifi_price)
      }));
      setWifiBought(false);
    } else {
      if (((current.seatsAge !== 0 || current.seatsChild !== 0) || current.totalPrice !== 0) && coach.coach.have_wifi) {
        dispatch(changeServiceWifi({
          classType: coach.coach.class_type,
          price: Number(coach.coach.wifi_price)
        }));
        setWifiBought(true);
      } else if (coach.coach.have_wifi) {
        dispatch(changeNotice({
          notice: true,
          text: 'Укажите количество билетов и выберите места!'
        }));
      };
    };
  };

  function buyLinens() {
    if (linensBought) {
      dispatch(changeServiceWifi({
        classType: coach.coach.class_type,
        price: -Number(coach.coach.linens_price)
      }));
      setLinensBought(false);
    } else {
      if (((current.seatsAge !== 0 || current.seatsChild !== 0) || current.totalPrice !== 0) && coach.coach.class_type !== 'fourth' && !coach.coach.is_linens_included) {
        dispatch(changeServiceLinens({
          classType: coach.coach.class_type,
          price: Number(coach.coach.linens_price)
        }));
        setLinensBought(true);
      } else if (coach.coach.class_type !== 'fourth' && !coach.coach.is_linens_included) {
        dispatch(changeNotice({
          notice: true,
          text: 'Укажите количество билетов и выберите места!'
        }));
      };
    };
  };

  function choiceSeats(event: BaseSyntheticEvent, price: number, seat: number, have: string) {
    if (event.target.classList.contains('seat__selected')) {
      dispatch(changePriceSeats({
        classType: coach.coach.class_type,
        price: -Number(price)
      }));
      dispatch(changeAmountTickets({
        classType: coach.coach.class_type,
        amount: 1
      }));
      dispatch(changeNumberSeats({
        classType: coach.coach.class_type,
        seat: {
          number: Number(seat),
          idCoach: coach.coach._id
        }
      }));
      event.target.classList.remove('seat__selected');
    } else {
      if (have === 'seat__have' && current.amountTickets !== 0) {
        dispatch(changePriceSeats({
          classType: coach.coach.class_type,
          price: Number(price)
        }));
        dispatch(changeAmountTickets({
          classType: coach.coach.class_type,
          amount: -1
        }));
        dispatch(changeNumberSeats({
          classType: coach.coach.class_type,
          seat: {
            number: Number(seat),
            idCoach: coach.coach._id
          }
        }));
        event.target.classList.add('seat__selected');
      } else if (current.amountTickets === 0) {
        dispatch(changeNotice({
          notice: true,
          text: 'Укажите количество билетов и выберите места!'
        }));
      };
    };
  };

  useEffect(() => {
    for (const i in visible) {
      if (visible[i as VisibleServices] === true) {
        setTimeout(() => setVisible({ ...visible, [i]: false }), 2 * 1000);
      };
    };
  }, [visible]);

  return (
    <div className={classStyle}>
      <div className='coach__description-prices'>
        <div className='coach__number'>
          <h3 className='coach__number-title'>{coach.coach.name}</h3>
          <p className='coach__number-text'>вагон</p>
        </div>
        <div className='coach__seats-amount'>
          <p className='seats__amount-title'>
            Места <span className='seats__amount-num'>{amountSeats(coach.seats, coach.coach.class_type).sum}</span></p>
          {coach.coach.top_price ?
            <p className='seats__amount-text'>
              Верхние <span className='seats__amount-num'>{amountSeats(coach.seats, coach.coach.class_type).top}</span>
            </p> : null}
          {coach.coach.bottom_price ?
            <p className='seats__amount-text'>
              Нижние <span className='seats__amount-num'>{amountSeats(coach.seats, coach.coach.class_type).bottom}</span>
            </p> : null}
          {coach.coach.side_price ?
            <p className='seats__amount-text'>
              Боковые <span className='seats__amount-num'>{amountSeats(coach.seats, coach.coach.class_type).side}</span>
            </p> : null}
        </div>
        <div className='coach__seats-price'>
          <p className='seats__price-title'>Стоимость</p>
          {coach.coach.top_price ?
            <p className='seats__price-text'>{coach.coach.top_price} <span className='sign__rub'></span></p> : null}
          {coach.coach.bottom_price ?
            <p className='seats__price-text'>{coach.coach.bottom_price} <span className='sign__rub'></span></p> : null}
          {coach.coach.side_price ?
            <p className='seats__price-text'>{coach.coach.side_price} <span className='sign__rub'></span></p> : null}
        </div>
        <div className='coach__services'>
          <p className='coach__services-text'>Обслуживание ФПК</p>
          <div className='coach__services-img'>
            <div className='service__move'>
              <span className={coach.coach.have_air_conditioning ? 'service__air-selected' : 'service__air'}
                onMouseEnter={mouseMoveToAir}></span>
              <div className={visible.air ? 'service__description' : 'none'}>
                {coach.coach.have_air_conditioning ? 'кондиционер есть' : 'кондиционера нет'}
              </div>
            </div>
            <div className='service__move'>
              <span className={coach.coach.have_wifi ? wifiBought ? 'service__wifi-selected' : 'service__wifi' : 'service__wifi-empty'}
                onMouseEnter={mouseMoveToWifi} onClick={buyWifi}></span>
              <div className={visible.wifi ? 'service__description' : 'none'}>
                {coach.coach.have_wifi ? `WI-FI есть ${coach.coach.wifi_price} р.` : 'WI-FI нет'}
              </div>
            </div>
            <div className='service__move'>
              <span className={coach.coach.class_type === 'fourth' ? 'service__linens-empty' :
                `service__linens ${coach.coach.is_linens_included ? 'service__included' : linensBought ? 'service__linens-selected' : ''}`}
                onMouseEnter={mouseMoveToLinens} onClick={buyLinens}></span>
              <div className={visible.linens ? 'service__description' : 'none'}>
                {coach.coach.class_type === 'fourth' ? 'белья нет' :
                  `белье ${coach.coach.is_linens_included ? 'включено' : `есть ${coach.coach.linens_price} р.`}`}
              </div>
            </div>
            <div className='service__move'>
              <span className='service__coffee' onMouseEnter={mouseMoveToCup}></span>
              <div className={visible.cup ? 'service__description' : 'none'}>питание</div>
            </div>
          </div>
          <div className='coach__seats-selected'>
            <p>{amountSeats(coach.seats, coach.coach.class_type).other} человек выбирают места в этом поезде</p>
          </div>
        </div>
      </div>

      <div className='coach__seats-info'>
        {/* lux train */}
        {coach.coach.class_type === 'first' ?
          <span className='seats__info-first'>
            {schemeFirstClass.map((elem, i) =>
              <div className='scheme__seats-first' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
                <span className={`seat__class seat__left ${haveSeatsOrNot(elem.left, coach)}`}
                  onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.left, haveSeatsOrNot(elem.left, coach))}>{elem.left}</span>
                <span className={`seat__class seat__right ${haveSeatsOrNot(elem.right, coach)}`}
                  onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.right, haveSeatsOrNot(elem.right, coach))}>{elem.right}</span>
              </div>
            )}
          {/* coupe train */}
          </span> :
          coach.coach.class_type === 'second' ?
            <span className='seats__info-second'>
              {schemeThirdClass.map((elem, i) =>
                <div className='scheme__seats-second' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
                  <span className={`seat__class seat__top-left ${haveSeatsOrNot(elem.top[0], coach)}`}
                    onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[0], haveSeatsOrNot(elem.top[0], coach))}>{elem.top[0]}</span>
                  <span className={`seat__class seat__bottom-left ${haveSeatsOrNot(elem.bottom[0], coach)}`}
                    onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[0], haveSeatsOrNot(elem.bottom[0], coach))}>{elem.bottom[0]}</span>
                  <span className={`seat__class seat__top-right ${haveSeatsOrNot(elem.top[1], coach)}`}
                    onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[1], haveSeatsOrNot(elem.top[1], coach))}>{elem.top[1]}</span>
                  <span className={`seat__class seat__bottom-right ${haveSeatsOrNot(elem.bottom[1], coach)}`}
                    onClick={(ev) => choiceSeats(ev, coach.coach.bottom_price, elem.bottom[1], haveSeatsOrNot(elem.bottom[1], coach))}>{elem.bottom[1]}</span>
                </div>
              )}
            {/* reserved seat(плацкарт) train */}
            </span> :
            coach.coach.class_type === 'third' ?
              <span className='seats__info-third'>
                {schemeThirdClass.map((elem, i) =>
                  <div className='scheme__seats-third' style={{ left: `${41 + 89.63 * (i + 1)}px` }} key={i}>
                    <span className={`seat__class seat__top-left ${haveSeatsOrNot(elem.top[0], coach)}`}
                      onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[0], haveSeatsOrNot(elem.top[0], coach))}>{elem.top[0]}</span>
                    <span className={`seat__class seat__bottom-left ${haveSeatsOrNot(elem.bottom[0], coach)}`}
                      onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[0], haveSeatsOrNot(elem.bottom[0], coach))}>{elem.bottom[0]}</span>
                    <span className={`seat__class seat__side-left ${haveSeatsOrNot(elem.side[0], coach)}`}
                      onClick={(event) => choiceSeats(event, coach.coach.side_price, elem.side[0], haveSeatsOrNot(elem.side[0], coach))}>{elem.side[0]}</span>
                    <span className={`seat__class seat__top-right ${haveSeatsOrNot(elem.top[1], coach)}`}
                      onClick={(event) => choiceSeats(event, coach.coach.top_price, elem.top[1], haveSeatsOrNot(elem.top[1], coach))}>{elem.top[1]}</span>
                    <span className={`seat__class seat__bottom-right ${haveSeatsOrNot(elem.bottom[1], coach)}`}
                      onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem.bottom[1], haveSeatsOrNot(elem.bottom[1], coach))}>{elem.bottom[1]}</span>
                    <span className={`seat__class seat__side-right ${haveSeatsOrNot(elem.side[1], coach)}`}
                      onClick={(event) => choiceSeats(event, coach.coach.side_price, elem.side[1], haveSeatsOrNot(elem.side[1], coach))}>{elem.side[1]}</span>
                  </div>
                )}
              {/* sedentary train */}
              </span> :
              coach.coach.class_type === 'fourth' ?
                <span className='seats__info-fourth'>
                  <div className='scheme__seats-fourth'>
                    {schemeFourthClass.topWindow.map((elem, i) =>
                      <span className={`seat__class seat__win-top ${haveSeatsOrNot(elem, coach)}`}
                        style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
                        onClick={(event) => choiceSeats(event, coach.coach.top_price, elem, haveSeatsOrNot(elem, coach))}>{elem}</span>
                    )}
                    {schemeFourthClass.topAisle.map((elem, i) =>
                      <span className={`seat__class seat__aisle-top ${haveSeatsOrNot(elem, coach)}`}
                        style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
                        onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem, haveSeatsOrNot(elem, coach))}>{elem}</span>
                    )}
                    {schemeFourthClass.botAisle.map((elem, i) =>
                      <span className={`seat__class seat__aisle-bottom ${haveSeatsOrNot(elem, coach)}`}
                        style={{ left: `${55.3 + 44.2 * (i)}px` }} key={i}
                        onClick={(event) => choiceSeats(event, coach.coach.bottom_price, elem, haveSeatsOrNot(elem, coach))}>{elem}</span>
                    )}
                    {schemeFourthClass.botWindow.map((elem, i) =>
                      <span className={`seat__class seat__win-bottom ${haveSeatsOrNot(elem, coach)}`}
                        style={{ left: `${11.3 + 44.2 * (i)}px` }} key={i}
                        onClick={(event) => choiceSeats(event, coach.coach.top_price, elem, haveSeatsOrNot(elem, coach))}>{elem}</span>
                    )}
                  </div>
                </span> : null}
      </div>
    </div>
  );
};
