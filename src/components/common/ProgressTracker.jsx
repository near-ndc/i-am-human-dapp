import React, { useCallback, useEffect, useState } from 'react';
import { wallet } from '../..';
import { getConfig } from '../../utils/config';
import { formatNumberWithComma } from '../../utils/utilityFunctions';
import { useSelector } from 'react-redux';
import { Links, ReducerNames } from '../../utils/constants';

const ProgressTracker = () => {
  const ProgressMeterMax = process.env.REACT_APP_PROGRESS_METER_MAX ?? 3000;
  const [humansRegistered, setHumansRegistered] = useState(0);
  const { showTracker } = useSelector((state) => state[ReducerNames.PROGRESS]);

  const fetchHumansRegistered = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: getConfig().app_contract,
        method: 'sbt_supply_by_class',
        args: {
          class: 1,
          issuer: getConfig().fractal_contract,
        },
      });
      setHumansRegistered(data);
    } catch (error) {
      console.log(
        'Error occurred while fetching registered humans number',
        error
      );
    }
  };

  useEffect(() => {
    fetchHumansRegistered();
  }, []);

  const getRegisteredPercentage = useCallback(
    () => (humansRegistered / ProgressMeterMax) * 100,
    [humansRegistered]
  );

  // to make sure the the right corner is not clipped much with increasing width
  function getClipPercentage() {
    const registeredPercentage = getRegisteredPercentage();
    if (registeredPercentage < 15) {
      return 25;
    } else if (registeredPercentage < 30) {
      return 13;
    } else if (registeredPercentage < 95) {
      return 4;
    } else if (registeredPercentage === 100) {
      return 0;
    }
    return 1;
  }

  const ReadableNumber = formatNumberWithComma(ProgressMeterMax);

  if (showTracker) {
    return (
      <div className="text-center text-md">
        <>
          <div className="bg-purple-400 h-[45px] md:h-[40px] relative">
            <div
              className="bg-yellow-400 absolute left-0 top-0 h-full"
              style={{
                width: `${getRegisteredPercentage()}%`,
                clipPath: `polygon(0 0, 100% 0, calc(100% - ${getClipPercentage()}%) 100%, 0% 100%)`,
              }}
            ></div>
            <h2 className="px-1 md:px-0 relative flex gap-3 h-full justify-center items-center z-10 font-bold">
              JOIN {humansRegistered} HUMANS TO REACH {ReadableNumber} HUMANS
            </h2>
          </div>
        </>
      </div>
    );
  } else return null;
};

export default ProgressTracker;
