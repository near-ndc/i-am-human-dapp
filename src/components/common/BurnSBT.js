import React, { useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Warning } from '../../images/Warning';
import { wallet } from '../..';
import { getConfig } from '../../utils/config';

const BurnSBT = () => {
  const [showTooltip, setShowtooltip] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModal] = useState(false);

  async function revokeSBTs() {
    const data = await wallet.callMethod({
      contractId: getConfig().app_contract,
      method: 'sbt_revoke_by_owner',
      args: {
        account: wallet.accountId,
      },
    });
  }

  const cancelButtonRef = useRef(null);
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl">Dangerous area</h3>
        <p>
          Please note that you can request for your SBTs to be revoked and for
          any identifying data stored by I-AM-HUMAN and Fractal to be deleted.{' '}
          <span
            onClick={() => setShowtooltip(!showTooltip)}
            className="text-red-500 font-semibold text-lg text-decoration-red  group cursor-pointer relative inline-block border-b border-gray-400 text-center"
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
                    Delete from Fractal
                  </a>
                  <a
                    className="underline"
                    onClick={() => setConfirmationModal(true)}
                  >
                    Delete from I-AM-HUMAN
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

      <Transition.Root show={isConfirmationModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title className="flex items-center justify-center large-svg">
                          <Warning />
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You are about to delete your data from I-AM-HUMAN
                            app and to revoke your Soul Bound Tokens.
                            <br />
                            <br />
                            You will lose privileges including the ability to
                            vote in the NEAR Digital Collective ecosystem
                            elections and lose the ability to obtain
                            reputation-based soul bound tokens.
                            <br />
                            <br />
                            Are you sure you want to continue?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="justify-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        revokeSBTs();
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-4 md:mt-0 w-full justify-center rounded-md border border-purple-500 text-purple-500 border-1 px-3 py-2 text-base font-light text-black shadow-sm sm:ml-3 sm:w-auto"
                      onClick={() => setConfirmationModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
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

export default BurnSBT;
