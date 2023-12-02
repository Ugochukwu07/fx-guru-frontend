/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const CountdownTimer = ({ seconds }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [time]);

  return (
    <div>
      {time}
    </div>
  );
};

export default CountdownTimer;
