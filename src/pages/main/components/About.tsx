import '../main.css';

export const About = () => {
  return (
    <div id='about' className='main__about'>
      <h2 className='about__title'>о нас</h2>
      <div className='about__content'>
        <div className='about__line'></div>
        <div>
          <p className='about__text'>
            Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем<br />все больше людей заказывают жд билеты через интернет.
          </p>
          <p className='about__text'>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?<br />Мы расскажем о преимуществах заказа через интернет.
          </p>
          <p className='about__text about__text-last'>
            Покупать жд билеты дешево можно за 90 суток до отправления поезда.<br />
            Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
          </p>
        </div>
      </div>
    </div>
  );
};
