import { AmountSeats } from '../models/index';
import { ISeatAvailable, ISeats } from '../models/interfaces';

export function amountSeats(amount: ISeatAvailable[], type: string): AmountSeats {
  let top = 0;
  let bottom = 0;
  let side = 0;
  let sum = 0;
  let other = 0;

  if (type === 'first') {
    for (const i of amount) {
      if (i.index % 2 === 0 && i.available) {
        bottom += 1;
      };
      if (i.index % 2 !== 0 && i.available) {
        top += 1;
      };
    };
    sum = top + bottom;
    other = 18 - sum;
  };

  if (type === 'second' || type === 'third') {
    for (const i of amount) {
      if (i.index > 32 && i.available) {
        side += 1;
      };
      if (i.index % 2 === 0 && i.index < 33 && i.available) {
        top += 1;
      };
      if (i.index % 2 !== 0 && i.index < 33 && i.available) {
        bottom += 1;
      };
    };
    sum = top + bottom + side;
    if (type === 'second') {
      other = 32 - sum;
    };

    if (type === 'third') {
      other = 48 - sum;
    };
  };


  if (type === 'fourth') {
    for (const i of amount) {
      if (i.index % 2 === 0 && i.index < 33 && i.available) {
        bottom += 1;
      } else if (i.index % 2 !== 0 && i.index > 32 && i.available) {
        bottom += 1;
      } else if (i.available) {
        top += 1;
      };
    };
    sum = top + bottom;
    other = 62 - sum;
  };

  return {
    top,
    bottom,
    side,
    sum,
    other
  };
};

export function haveSeatsOrNot(numScheme: number, coach: ISeats): string {
  let result = 'seat__not-have';
  coach.seats.map((elem) => {
    if (elem.index === numScheme) {
      if (elem.available) {
        return result = 'seat__have';
      };
    };
    return null;
  });
  return result;
};
