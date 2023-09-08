import React, { useCallback, useEffect, useState } from 'react';
import { wallet } from '../..';
import { getConfig } from '../../utils/config';
import { formatNumberWithComma } from '../../utils/utilityFunctions';
import { useSelector } from 'react-redux';
import {
  ElectionsStartTime,
  IAHShutDownEndTime,
  IAHShutDownStartTime,
  Links,
  ReducerNames,
} from '../../utils/constants';
import moment from 'moment-timezone';

const ProgressTracker = () => {
  const ProgressMeterMax = process.env.REACT_APP_PROGRESS_METER_MAX ?? 3000;
  const [humansRegistered, setHumansRegistered] = useState(0);
  const { showTracker } = useSelector((state) => state[ReducerNames.PROGRESS]);
  const { fvToken } = useSelector((state) => state[ReducerNames.SBT]);
  const [electionStarted, setElectionStarted] = useState(false);

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

  // Get the user's local timezone
  const userTimezone = moment.tz.guess();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function updateCountdown() {
    const nowLocal = moment(); // Get the current local time
    const timestamp = electionStarted
      ? IAHShutDownStartTime
      : IAHShutDownEndTime;
    const futureDateLocal = timestamp.clone().tz(userTimezone);

    // Calculate the time remaining
    const countdownDuration = moment.duration(futureDateLocal.diff(nowLocal));

    setCountdown({
      days: countdownDuration.days(),
      hours: countdownDuration.hours(),
      minutes: countdownDuration.minutes(),
      seconds: countdownDuration.seconds(),
    });
  }

  useEffect(() => {
    const isElectionStarted = moment().isSameOrAfter(
      ElectionsStartTime.clone().tz(userTimezone)
    );
    setElectionStarted(isElectionStarted);
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const NumberContainer = ({ number, text }) => {
    return (
      <span className="flex gap-x-0.5 items-end">
        <p style={{ color: '#FDE047' }} className="text-3xl">
          {number}
        </p>
        <p className="text-xl font-normal">{text}</p>
      </span>
    );
  };

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
              JOIN {humansRegistered} HUMANS TO REACH {ReadableNumber} VOTERS
              <button
                className="text-xs md:text-sm rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-1 md:px-3 py-1 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700 "
                onClick={() => window.open(Links.ELECTIONS, '_blank')}
              >
                Vote Now
              </button>
            </h2>
          </div>
          <div className="p-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600">
            {fvToken ? (
              <div className="flex justify-center gap-5 items-center">
                <p className="text-yellow-400 ">
                  Learn about how to protect integrity of the election and how
                  to submit to the Whistleblower Bounty Program
                </p>
                <button
                  className="bg-yellow-300 rounded-lg py-1.5 px-2 text-sm"
                  onClick={() => window.open(Links.WHISTLEBLOWER, '_blank')}
                >
                  Learn More
                </button>
              </div>
            ) : (
              <div className="flex justify-center gap-5 items-center">
                <h4 className="text-yellow-400 font-bold">
                  JOIN THE HUMANS OF NEAR
                </h4>
                <p className="text-gray-300">
                  Unlock Elections, Governance, & Community Treasury with{' '}
                  {ReadableNumber} Humans on NEAR
                </p>
                <button
                  className="bg-yellow-300 rounded-lg py-1.5 px-2 text-sm"
                  onClick={() =>
                    window.open(
                      'https://pages.near.org/blog/ndc-v1-governance-elections-faq/',
                      '_blank'
                    )
                  }
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
        </>
        {/* to not show any countdown from 1 sept to 7 sept */}
        {!electionStarted &&
        countdown.days <= 0 &&
        countdown.hours <= 0 &&
        countdown.minutes <= 0 &&
        countdown.seconds <= 0 ? null : (
          <div
            style={{ backgroundColor: '#F29BC0' }}
            className="p-2 text-white font-semibold flex gap-x-8 justify-center items-center"
          >
            <p>
              {electionStarted
                ? 'TIME REMAINING IN CURRENT ELECTION'
                : 'VOTER REGISTRATION END'}
              S
            </p>
            <p className="text-lg flex gap-x-3 items-end">
              <NumberContainer number={countdown.days} text="D" />
              <NumberContainer number={countdown.hours} text="H" />
              <NumberContainer number={countdown.minutes} text="M" />
              <NumberContainer number={countdown.seconds} text="S" />
            </p>
          </div>
        )}
      </div>
    );
  } else return null;
};

export default ProgressTracker;
