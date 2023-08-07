import React, { Fragment, useState } from 'react';
import { CircleWavyCheck } from '../../images/CircleWavyCheck';
import TokensGrid from '../common/TokensGrid';
import { OutlineButton, PrimaryButton } from '../common/Buttons';
import { ImageSrc } from '../../utils/constants';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { updateShowConfetti } from '../../redux/reducer/commonReducer';

export const SuccesVerification = () => {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();

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

  function removeModal() {
    setShowModal(false);
    dispatch(updateShowConfetti(true));
  }

  return (
    <div>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={removeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                  <div className="p-16 flex flex-col gap-5 text-center justify-center">
                    <img
                      width="60px"
                      height="60px"
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
                      offers up to 2,000 NEAR for whistleblowers who come
                      forward to share instances of vote buying, account buying,
                      election fraud, and other violations of the{' '}
                      <Link text="Fair voting policy." link="" />
                      <br />
                      <br />
                      Please make sure to read and understand the{' '}
                      <Link text="Fair voting policy" link="" />, which outlines
                      the responsibilities of each voter.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <OutlineButton
                        onClick={removeModal}
                        classes="border-purple-600 text-purple-600"
                      >
                        Cancel
                      </OutlineButton>
                      <PrimaryButton onClick={removeModal}>
                        <p className="text-sm">
                          I understand my responsibilities as a voter
                        </p>
                      </PrimaryButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
