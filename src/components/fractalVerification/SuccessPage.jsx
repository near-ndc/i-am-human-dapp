import React from 'react';
import { CircleWavyCheck } from '../../images/CircleWavyCheck';
import TokensGrid from '../common/TokensGrid';
import { useDispatch } from 'react-redux';
import { updateShowConfetti } from '../../redux/reducer/commonReducer';

export const SuccesVerification = () => {
  const dispatch = useDispatch();
  dispatch(updateShowConfetti(true));

  return (
    <div>
      <div className="w-full">
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
