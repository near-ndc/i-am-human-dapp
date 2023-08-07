import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { CircleWavyCheck } from '../../images/CircleWavyCheck';
import TokensGrid from '../common/TokensGrid';

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
      <div className="flex gap-5">
        <div>
          <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-green-400">
            <div className="flex items-center justify-center w-full h-full rounded-full border-2 border-green-500 bg-green-200 shadow-green-400 shadow-[inset_0_0px_4px_#FFFFFF]">
              <CircleWavyCheck
                styles={'w-12 h-12 stroke-black-300 svg-green'}
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold	my-4">Success!</h2>
          <p className="text-s mb-8 mr-8">
            Check out your newly minted Soul Bound Tokens! You can now
            participate in Near Digital Collective (NDC) governance. Share the
            good news!
          </p>
          <TokensGrid />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">
            Before you vote in the general election, learn about the
            Whistleblower Bounty Program.
          </h2>
          <p>
            The{' '}
            <span
              onClick={() => window.open('', '_blank')}
              className="text-purple-300"
            >
              Whistleblower bounty program
            </span>{' '}
            offers up to 2,000 NEAR for whistleblowers who come forward to share
            instances of vote buying, account buying, election fraud, and other
            violations of the{' '}
            <span
              onClick={() => window.open('', '_blank')}
              className="text-purple-300"
            >
              Fair voting policy.
            </span>
            <br />
            Please make sure to read and understand the Fair voting policy,
            which outlines the responsibilities of each voter. Cancel I
            understand my responsibilities as a voter
          </p>
          <div className="flex gap-2">
            <button>Cancel</button>
            <button>I understand my responsibilities as a voter</button>
          </div>
        </div>
      </div>
    </div>
  );
};
