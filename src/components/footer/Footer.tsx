import { ChangeEvent, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Notice } from '../notice/Notice';
import { validateEmail } from '../../utils/validators';
import { changeNotice } from '../../store/sliceNotice';
import { clearStatusSubscribe, postSubscribeThunk, slicePostSubscribeState } from '../../store/slicePostSubscribe';
import './footer.css';

export const Footer = () => {
  const [input, setInput] = useState<string>('');
  const { status } = useAppSelector(slicePostSubscribeState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status) {
      dispatch(changeNotice({ notice: true, text: 'Подписка успешно оформлена!' }));
      setInput('');
      setTimeout(() => dispatch(clearStatusSubscribe()), 5 * 1000);
    };
  }, [dispatch, status]);

  function inputSubscribe(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  };

  function submit() {
    if (!validateEmail(input)) {
      dispatch(changeNotice({ notice: true, text: 'Email указана некорректно.\n Пример: mailbox@mail.com' }));
    } else {
      dispatch(postSubscribeThunk(input));
    };
  };

  return (
    <footer id='footer' className='footer'>

      <Notice status={status} />

      <div className='footer__container'>
        <div className='footer__contacts'>
          <h2 className='contacts__title'>Свяжитесь с нами</h2>
          <ul className='contacts__list'>
            <li>
              <a className='contacts__item phone' href="tel:88000000000">8 (800) 000 00 00</a>
            </li>
            <li>
              <a className='contacts__item email' href="mailto:inbox@mail.ru">inbox@mail.ru</a>
            </li>
            <li>
              <a className='contacts__item skype' target="_blank" href="tu.train.tickets">tu.train.tickets</a>
            </li>
            <li>
              <a className='contacts__item address' target="_blank" href="google.maps.com">г. Москва<br /> ул. Московская 27-35 555 555</a>
            </li>
          </ul>
        </div>

        <div className='footer__subscribe'>
          <h2 className='subscribe__title'>Подписка</h2>
          <form className='subscribe__form'>
            <h4 className='subscribe__form-title'>Будьте в курсе событий</h4>
            <input
              className='subscribe__form-input'
              type="text"
              placeholder="e-mail"
              value={input}
              onChange={inputSubscribe}
            />
            <button className='subscribe__form-btn' type="button" onClick={submit}>отправить</button>
          </form>
          <div className='subscribe__links'>
            <h2 className='subscribe__links-title'>Подписывайтесь на нас</h2>
            <ul className='subscribe__links-list'>
              <li>
                <a className='subscribe__link link__youtube' target="_blank" href="#0">
                  <span className='subscribe__logo-text'>youtube</span>
                </a>
              </li>
              <li>
                <a className='subscribe__link link__linkedin' target="_blank" href="#0">
                  <span className='subscribe__logo-text'>linkedin</span>
                </a>
              </li>
              <li>
                <a className='subscribe__link link__google' target="_blank" href="#0">
                  <span className='subscribe__logo-text'>googleplus</span>
                </a>
              </li>
              <li>
                <a className='subscribe__link link__facebook' target="_blank" href="#0">
                  <span className='subscribe__logo-text'>facebook</span>
                </a>
              </li>
              <li>
                <a className='subscribe__link link__twitter' target="_blank" href="#0">
                  <span className='subscribe__logo-text'>twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='footer__line'>
        <div className='footer__logo'>
          <h3 className='footer__logo-text'>Лого</h3>
        </div>
        <HashLink to='#top' className='footer__up' />
        <div className='footer__date'>
          <p className='footer__date-text'>2025 web</p>
        </div>
      </div>

    </footer>
  );
};
