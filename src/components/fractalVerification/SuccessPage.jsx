import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { CircleWavyCheck } from '../../images/CircleWavyCheck';
import TokensGrid from '../common/TokensGrid';
import { OutlineButton, PrimaryButton } from '../common/Buttons';
import { ImageSrc } from '../../utils/constants';

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

  const Link = ({ link, text }) => {
    return (
      <span
        onClick={() => window.open(link, '_blank')}
        className="text-purple-600 cursor-pointer decoration-solid underline"
      >
        {text}
      </span>
    );
  };

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
        <div className="flex flex-col gap-5 text-center">
          <img
            width="100px"
            height="100px"
            className="self-center"
            src={ImageSrc.ELECTION_ICON}
          />
          <h2 className="font-semibold text-xl">
            Before you vote in the general election, learn about the
            Whistleblower Bounty Program.
          </h2>
          <p>
            The{' '}
            <Link
              text=" Whistleblower bounty program"
              link="https://medium.com/@neardigitalcollective/introducing-ndc-whistleblower-bounty-program-d4fe1b9fc5a0"
            />{' '}
            offers up to 2,000 NEAR for whistleblowers who come forward to share
            instances of vote buying, account buying, election fraud, and other
            violations of the <Link text="Fair voting policy." link="" />
            <br />
            <br />
            Please make sure to read and understand the{' '}
            <Link text="Fair voting policy." link="" />, which outlines the
            responsibilities of each voter.
          </p>
          <div className="flex gap-2">
            <OutlineButton classes="border-purple-600 text-purple-600">
              Cancel
            </OutlineButton>
            <PrimaryButton>
              <p className="text-sm">
                I understand my responsibilities as a voter
              </p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
