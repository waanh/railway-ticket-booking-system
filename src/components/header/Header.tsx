import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ProgressLine } from '../progress-line/ProgressLine';
import { SearchWidget } from '../search-widget/SearchWidget';
import { clearAllCity } from '../../store/sliceChoice';
import { clearAllFiltering } from '../../store/sliceFilter';
import { clearRouteList, sliceGetRouteState } from '../../store/sliceGetRoute';
import { sliceHeaderTransformState, transformHeader, transformHeaderSuccess, transformHeaderToMain } from '../../store/sliceHeaderTransform';
import { clearOrder } from '../../store/sliceOrder';
import { clearAllPrices, clearTotalPrice } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceProgressLine';
import './header.css';

export const Header = () => {
  const {
    classHeader,
    classSearch,
    classTitle,
    classLine,
    success
  } = useAppSelector(sliceHeaderTransformState);
  const { loading } = useAppSelector(sliceGetRouteState);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.pathname === '/') {
      dispatch(transformHeaderToMain());
    } else if (location.pathname === '/success') {
      dispatch(transformHeaderSuccess());
    } else {
      dispatch(transformHeader());
    };
  }, [dispatch, location.pathname]);

  function clearStore() {
    dispatch(clearAllPrices());
    dispatch(clearTotalPrice());
    dispatch(clearAllFiltering());
    dispatch(clearRouteList());
    dispatch(clearAllCity());
    dispatch(clearStepAll());
    dispatch(clearOrder());
  };

  return (
    <>
      <header className={classHeader}>

        <div className='header__logo'>
          <HashLink to='/'>
            <h3 className='header__logo-text' onClick={clearStore}>Лого</h3>
          </HashLink>
        </div>

        <div className='header__nav'>
          <ul className='header__nav-items'>
            <li className='header__nav-item'>
              <HashLink to='/#about'>О нас</HashLink>
            </li>
            <li className='header__nav-item'>
              <HashLink to="/#how">Как это работает</HashLink>
            </li>
            <li className='header__nav-item'>
              <HashLink to="/#reviews">Отзывы</HashLink>
            </li>
            <li className='header__nav-item'>
              <HashLink to="/#footer">Контакты</HashLink>
            </li>
          </ul>
        </div>

        <div className={classTitle}>
          <h2 className='header__title'>
            Вся жизнь - <span>путешествие!</span>
          </h2>
        </div>

        {success ? null : <SearchWidget classStyle={classSearch} />}

        {success ? null :
        <>
          <div className={classLine}></div>
          {classLine === 'none' && !loading ? <ProgressLine /> : null}
        </>}
      </header>

    </>
  );
};
