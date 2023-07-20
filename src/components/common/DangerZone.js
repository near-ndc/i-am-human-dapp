import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '../../images/ExclamationIcon';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleErrorMessage,
  removeAllTokens,
  revokeSBTs,
  soulTransfer,
} from '../../redux/reducer/sbtsReducer';
import { BrandColor, LSKeys, ReducerNames } from '../../utils/constants';
import { CircleSpinner } from 'react-spinners-kit';
import { deleteUserDataFromSupabase } from '../../utils/utilityFunctions';
import { wallet } from '../..';

const DangerZone = () => {
  const { isLoading, error, tokenRemoveSuccess } = useSelector(
    (state) => state[ReducerNames.SBT]
  );
  const [showTooltip, setShowtooltip] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModal] = useState(false);
  const [isTransferCalled, setTransfer] = useState(false);
  const [transferAddr, setTransferAddr] = useState(null);
  const [validAddr, setValidAddr] = useState(true);
  const dispatch = useDispatch();

  async function transferSBT() {
    const isAccountValid = await wallet.isAccountValid(transferAddr);
    if (isAccountValid) {
      localStorage.setItem(LSKeys.TRANSFER_ADDR, transferAddr);
      dispatch(soulTransfer(transferAddr));
    } else {
      setValidAddr(false);
    }
  }

  useEffect(() => {
    if (tokenRemoveSuccess && isConfirmationModalOpen) {
      deleteUserDataFromSupabase();
      dispatch(removeAllTokens());
      setConfirmationModal(false);
    }
  }, [tokenRemoveSuccess]);

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl">Danger Zone</h3>
        <div className="flex gap-5 text-gray-700 flex-wrap md:flex-nowrap">
          <div className="bg-gray-50 p-2 rounded-md">
            You could request for your SBTs to be soul transferred to a new
            account. The current account holding SBTs will no longer be able to
            receive SBTs in the future.
            <span
              className="text-red-500 font-semibold text-decoration-red  group cursor-pointer relative inline-block border-b border-gray-400 text-center"
              onClick={() => {
                setTransfer(true);
                setConfirmationModal(true);
              }}
            >
              Soul Transfer
            </span>
          </div>
          <div className="bg-gray-50 p-2 rounded-md">
            <p>
              Please note that you can request for your SBTs to be revoked and
              for any identifying data stored by I-AM-HUMAN and Fractal to be
              deleted.{' '}
              <span
                onClick={() => setShowtooltip(!showTooltip)}
                className="text-red-500 font-semibold text-decoration-red  group cursor-pointer relative inline-block border-b border-gray-400 text-center"
              >
                Revoke my SBTs
                {showTooltip && (
                  <div class="w-48 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10  bottom-full -left-8 px-3">
                    <div className="flex flex-col">
                      <a
                        className="underline mb-1"
                        target="_top"
                        href="mailto:privacy@fractal.id?subject=Please%20delete%20my%20account"
                      >
                        Delete data from Fractal
                      </a>
                      <a
                        className="underline"
                        onClick={() => {
                          setTransfer(false);
                          setConfirmationModal(true);
                        }}
                      >
                        Delete data from I-AM-HUMAN
                      </a>
                    </div>
                    <svg
                      class="absolute text-black h-2 w-full left-0 top-full"
                      x="0px"
                      y="0px"
                      viewBox="0 0 255 255"
                      xmlSpace="preserve"
                    >
                      <polygon
                        class="fill-current"
                        points="0,0 127.5,127.5 255,0"
                      />
                    </svg>
                  </div>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Transition.Root show={isConfirmationModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setConfirmationModal}
        >
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center">
                        <Dialog.Title className="flex items-center justify-center large-svg">
                          <ExclamationIcon />
                        </Dialog.Title>
                        <div className="mt-2">
                          {error && (
                            <div className="text-red-500"> {error} </div>
                          )}
                          {isTransferCalled ? (
                            <p>
                              <span className="text-lg font-semibold">
                                You are about to transfer your Soul Bound Tokens
                                to a new account.
                              </span>
                              <br />
                              <br />
                              <span className="text-gray-500">
                                Please confirm the account name is correct and
                                is an account you have access to. I-AM-HUMAN
                                will not be able to reverse this transaction if
                                you enter the wrong address. Your current
                                account will no longer be able to receive new
                                Soul Bound Tokens.
                              </span>
                              <br />
                              <br />
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="Address"
                                  className="block text-sm font-medium leading-6 text-gray-500 text-left"
                                >
                                  Account to Transfer SBTs:
                                </label>
                                <div className="mt-1">
                                  <div
                                    className={
                                      'w-full p-4 text-md placeholder-gray-700 border rounded outline-none focus:ring-1 ' +
                                      !validAddr
                                        ? 'text-red-500 border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-purple-500 focus:ring-purple-500 focus:border-purple-500'
                                    }
                                  >
                                    <input
                                      type="text"
                                      onChange={(event) => {
                                        setTransferAddr(event.target.value);
                                        setValidAddr(true);
                                      }}
                                      autoComplete="username"
                                      class="block w-full flex-1 border-0 bg-black-100 py-2 pl-2 text-gray-900 placeholder:text-gray-400"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {!validAddr &&
                                      'Please enter a valid account address'}
                                  </p>

                                  <br />
                                  <span className="text-center">
                                    Are you sure you want to continue?
                                  </span>
                                </div>
                              </div>
                            </p>
                          ) : (
                            <p className="text-md">
                              <span className="text-lg font-semibold">
                                You are about to delete your data from
                                I-AM-HUMAN app and to burn your Soul Bound
                                Tokens.
                              </span>
                              <br />
                              <br />
                              <span className="text-gray-500">
                                You will lose privileges including the ability
                                to vote in the NEAR Digital Collective ecosystem
                                elections and lose the ability to obtain
                                reputation-based Soul Bound Tokens.
                              </span>
                              <br />
                              <br />
                              <span className="text-center">
                                Are you sure you want to continue?
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center md:gap-3 px-4 pb-6 items-stretch gap-2">
                    <PrimaryButton onClick={() => setConfirmationModal(false)}>
                      Cancel
                    </PrimaryButton>
                    <OutlineButton
                      classes="border-purple-600 text-purple-600"
                      onClick={() => {
                        isTransferCalled
                          ? transferSBT()
                          : dispatch(revokeSBTs());
                      }}
                      disabled={isLoading}
                    >
                      <p className="flex justify-center items-center gap-2">
                        Confirm
                        {isLoading && (
                          <CircleSpinner size={20} color={BrandColor} />
                        )}
                      </p>
                    </OutlineButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default DangerZone;
