import type { ReactElement } from 'react';
import s from './Loader.module.scss';

const Loader = (): ReactElement => {
  const NUMBER_OF_DOTS = 12;
  return (
    <div role="loader">
      <div className={s.lds}>
        {Array.from({ length: NUMBER_OF_DOTS }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
