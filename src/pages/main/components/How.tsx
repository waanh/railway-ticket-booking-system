import '../main.css';

export const How = () => {
  return (
    <div id='how' className='main__how'>
      <div className='how__title'>
        <h2 className='how__title-text'>как это работает</h2>
        <button className='how__title-btn' type='button'>Узнать больше</button>
      </div>
      <div className='how__items'>
        <div className='how__item'>
          <div className='how__image-first'></div>
          <p className='how__content-text'>Удобный заказ на сайте</p>
        </div>
        <div className='how__item'>
          <div className='how__image-second'></div>
          <p className='how__content-text'>Нет необходимости ехать в офис</p>
        </div>
        <div className='how__item'>
          <div className='how__image-third'></div>
          <p className='how__content-text'>Огромный выбор направлений</p>
        </div>
      </div>
    </div>
  );
};
