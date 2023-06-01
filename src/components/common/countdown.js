import React, { useState, useEffect } from 'react';

const Timer = ({ delayResend = '600', setActiveTabIndex = () => null }) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      setActiveTabIndex(1);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <span>
        {minutes}:{seconds}
      </span>
    </>
  );
};

export default Timer;
