import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePageIndex } from '../../redux/reducer/commonReducer';

const Timer = ({ delayResend = '600' }) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      dispatch(setActivePageIndex(1));
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
