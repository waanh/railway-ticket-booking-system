import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { sliceProgressLineState } from '../../store/sliceProgressLine';
import './progress-line.css';

type Step = {
  one: string,
  two: string,
  three: string,
  four: string
};

export const ProgressLine = () => {
  const { stepOne, stepTwo, stepThree, stepFour } = useAppSelector(sliceProgressLineState);
  const [step, setStep] = useState<Step>({
    one: '',
    two: '',
    three: '',
    four: ''
  });

  useEffect(() => {
    setStep({
      one: stepOne ? 'current__step' : '',
      two: stepTwo ? 'current__step' : '',
      three: stepThree ? 'current__step' : '',
      four: stepFour ? 'current__step' : ''
    });
  }, [stepOne, stepTwo, stepThree, stepFour]);

  return (
    <div className='progress__line'>
      <div className={'steps__start ' + step.one}></div>

      <div className={'line__step-one ' + step.one}>
        <div className={'step__number ' + step.one}>
          <p>1</p>
        </div>
        <div className={'step__text ' + step.one}>Билеты</div>
        <div className='step__arrow'>
          <div className={'arrow__top ' + step.one}></div>
          <div className={'arrow__bottom ' + step.one}></div>
        </div>
      </div>

      <div className={'line__step-two ' + step.two}>
        <div className={'step__arrow-out ' + step.two}></div>
        <div className={'step__number ' + step.two}>
          <p>2</p>
        </div>
        <div className={'step__text ' + step.two}>Пассажиры</div>
        <div className='step__arrow'>
          <div className={'arrow__top ' + step.two}></div>
          <div className={'arrow__bottom ' + step.two}></div>
        </div>
      </div>

      <div className={'line__step-three ' + step.three}>
        <div className={'step__arrow-out ' + step.three}></div>
        <div className={'step__number ' + step.three}>
          <p>3</p>
        </div>
        <div className={'step__text ' + step.three}>Оплата</div>
        <div className='step__arrow'>
          <div className={'arrow__top ' + step.three}></div>
          <div className={'arrow__bottom ' + step.three}></div>
        </div>
      </div>

      <div className={'line__step-four ' + step.four}>
        <div className={'step__arrow-out ' + step.four}></div>
        <div className={'step__number ' + step.four}>
          <p>4</p>
        </div>
        <div className={'step__text ' + step.four}>Проверка</div>
      </div>

      <div className={'steps__end ' + step.four}></div>
    </div>
  );
};
