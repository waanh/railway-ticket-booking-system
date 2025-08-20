import { useEffect, useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStepAll, currentStepOne } from '../../store/sliceProgressLine';
import { TrainRoute } from '../../components/train-route/TrainRoute';
import { addRoutes, filtering, sliceFilterState } from '../../store/sliceFilter';
import { filteringPricesRange } from '../../utils/minMaxPrices';
import { sortingDuration, sortingPrices, sortingTime } from '../../utils/sortingTrain';
import { dateForComparison, timeForSort } from '../../utils/trainDate';
import { IItem } from '../../models/interfaces';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetRouteState } from '../../store/sliceGetRoute';
import './list-routes.css';

export const ListRoutes = () => {
  const { loading, items } = useAppSelector(sliceGetRouteState);
  const { fromDate } = useAppSelector(sliceChoiceState);
  const {
    filteredRoutes,
    filterSeats,
    filterPrices,
    filterTimeFrom,
    filterTimeTo
  } = useAppSelector(sliceFilterState);
  const dispatch = useAppDispatch();
  const [list, setList] = useState<IItem[]>([]);
  const [none, setNone] = useState('none');
  const [select, setSelect] = useState('времени');
  const [pages, setPages] = useState<number[]>([]);
  const [showOnPages, setShowOnPages] = useState(5);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(5);
  const [lengthPage, setLengthPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearStepAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filtering({
      start: filterPrices.start,
      end: filterPrices.end,
      date: fromDate,
      filteringPricesRange,
      timeForSort,
      dateForComparison
    }));
  }, [filterSeats, filterPrices, filterTimeFrom, filterTimeTo, fromDate, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setList(filteredRoutes), 500);
    return () => clearTimeout(timer);
  }, [filteredRoutes]);

  useEffect(() => {
    if (items && items.items.length > 0) {
      dispatch(addRoutes(items.items));
      setList(items.items);
    };
  }, [loading, items, dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(currentStepOne());
    };

    if (list) {
      setPages([]);
      const arr = []
      for (let i = 0; i < (list.length / showOnPages); i += 1) {
        arr.push(i);
      };
      setPages(arr);
    };
  }, [dispatch, list, loading, showOnPages]);

  useEffect(() => {
    if (list.length > 0) {
      swapClassStyle(currentPage);
    };
  }, [currentPage, list.length]);

  function getSort() {
    if (none === 'none') {
      setNone('list__routes-sort-select');
    } else {
      setNone('none');
    }
  };

  function getSelect(event: SyntheticEvent<HTMLElement>) {
    if (event.currentTarget.textContent) {
      setSelect(event.currentTarget.textContent);
      setNone('none');
      if (event.currentTarget.textContent === 'времени') {
        setList(sortingTime(list));
      };
      if (event.currentTarget.textContent === 'стоимости') {
        setList(sortingPrices(list));
      };
      if (event.currentTarget.textContent === 'длительности') {
        setList(sortingDuration(list));
      };
    };
  };

  function getShowOnPages(event: SyntheticEvent<HTMLElement>) {
    setShowOnPages(Number(event.currentTarget.textContent));
    setStartSlice(0);
    setLengthPage(Number(event.currentTarget.textContent));
    setEndSlice(Number(event.currentTarget.textContent));
  };

  function choicePage(event: SyntheticEvent<HTMLElement>) {
    setCurrentPage(Number(event.currentTarget.textContent));
    setStartSlice(lengthPage * (Number(event.currentTarget.textContent) - 1));
    setEndSlice(lengthPage * Number(event.currentTarget.textContent));
  };

  function prevPage() {
    if (startSlice >= lengthPage) {
      setStartSlice(startSlice - lengthPage);
    };

    if (endSlice >= lengthPage * 2) {
      setEndSlice(endSlice - lengthPage);
    };

    if ((currentPage - 1) > 0 && pages.length > 1) {
      setCurrentPage((prev) => prev -= 1);
    };

  };

  function nextPage() {
    if (startSlice < (lengthPage * (pages.length - 1))) {
      setStartSlice(startSlice + lengthPage);
    };

    if (endSlice < lengthPage * pages.length) {
      setEndSlice(endSlice + lengthPage);
    };

    if (currentPage < pages.length) {
      setCurrentPage((prev) => prev += 1);
    };

  };

  function swapClassStyle(page: number) {
    const elements = document.querySelectorAll('.list__routes-page');

    if (elements.length > 0) {
      for (const i of elements) {
        if (i.classList.contains('choice__page')) {
          i.classList.remove('choice__page');
        };
      };
      elements[page - 1].classList.add('choice__page');
    }

  };

  if (!list.length) {
    return <div className='none__routes'>Нет маршрутов! Выберете другую дату</div>
  };

  return (
    <div className='list__routes'>
      <header className='header__list-routes'>
        <div className='list__routes-found'>
          <p>найдено </p>
          <span>{list ? list.length : ''}</span>
        </div>
        <div className='list__routes-sort'>
          <p>сортировать по:
            <span className='sort__selected' onClick={getSort}>{select}</span>
          </p>
          <div className={none}>
            <div className='select__time' onClick={getSelect}>времени</div>
            <div className='select__price' onClick={getSelect}>стоимости</div>
            <div className='select__duration' onClick={getSelect}>длительности</div>
          </div>
        </div>
        <div className='list__routes-show'>
          <p>показывать по </p>
          <span onClick={getShowOnPages}>5</span>
          <span onClick={getShowOnPages}>10</span>
          <span onClick={getShowOnPages}>20</span>
        </div>
      </header>

      <main className='main__list-routes'>
        {list.slice(startSlice, endSlice).map((elem) => <TrainRoute route={elem} key={elem.departure._id} />)}
      </main>

      <footer className='footer__list-routes'>
        <div className='list__routes-pages'>
          <div className='list__routes-pages-previous' onClick={prevPage}></div>
          {pages.map((i) =>
            <div className='list__routes-page' onClick={choicePage} key={10 + i}>{i + 1}</div>
          )}
          <div className='list__routes-pages-next' onClick={nextPage}></div>
        </div>
      </footer>
    </div>
  );
};
