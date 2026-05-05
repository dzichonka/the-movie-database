import type { ReactElement } from 'react';

const Loader = (): ReactElement => {
  const NUMBER_OF_DOTS = 12;
  return (
    <div className="text-center">
      <div>
        {Array.from({ length: NUMBER_OF_DOTS }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
