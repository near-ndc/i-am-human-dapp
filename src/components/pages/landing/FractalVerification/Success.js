import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { CircleWavyCheck } from '../../../../images/CircleWavyCheck';
import TokensGrid from '../../../common/TokensGrid';

export const SuccesVerification = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full">
      {showConfetti && (
        <ReactConfetti
          width={document.body.offsetWidth}
          height={document.body.offsetHeight}
        />
      )}
      <div>
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-green-400">
          <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-green-500 bg-green-200 shadow-green-400 shadow-[inset_0_0px_4px_#FFFFFF]">
            <CircleWavyCheck styles={'w-12 h-12 stroke-black-300 svg-green'} />
          </div>
        </div>
        <h2 className="text-4xl font-bold	my-4">Success!</h2>
        <p className="text-s mb-8 mr-8">
          Check out your newly minted Soul Bound Tokens! You can now participate
          in Near Digital Collective (NDC) governance. Share the good news!
        </p>
        <TokensGrid />
      </div>
    </div>
  );
};
