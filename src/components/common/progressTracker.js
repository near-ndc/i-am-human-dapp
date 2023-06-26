import React, { useCallback, useEffect, useState } from 'react';
import { wallet } from '../..';
import { getConfig } from '../../utils/config';

const ProgressTracker = () => {
  const [humansRegistered, setHumansRegistered] = useState(0);
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
    () =>
      (humansRegistered / (process.env.REACT_APP_PROGRESS_METER_MAX ?? 1000)) *
      100,
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

  return (
    <div className="text-center text-md">
      <>
        <div className="bg-purple-400 h-[40px] relative">
          <div
            className="bg-yellow-400 absolute left-0 top-0 h-full"
            style={{
              width: `${getRegisteredPercentage()}%`,
              clipPath: `polygon(0 0, 100% 0, calc(100% - ${getClipPercentage()}%) 100%, 0% 100%)`,
            }}
          ></div>
          <h2 className="relative flex h-full justify-center items-center z-10 font-bold">
            Join {humansRegistered} HUMANS ON NEAR
          </h2>
        </div>

        <div className="p-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 flex justify-center gap-5">
          <h4 className="text-yellow-400 font-bold">JOIN THE HUMANS OF NEAR</h4>
          <p className="text-gray-300">
            Unlock Elections, Governance, & Community Treasury with 1000 Humans
            on NEAR
          </p>
        </div>
      </>
    </div>
  );
};

export default ProgressTracker;