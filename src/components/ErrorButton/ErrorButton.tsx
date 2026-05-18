import { useState } from 'react';

const ErrorButton = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error from button!');
  }

  return (
    <button
      className="btn"
      onClick={() => {
        setShouldThrow(true);
      }}
    >
      Error
    </button>
  );
};

export default ErrorButton;
