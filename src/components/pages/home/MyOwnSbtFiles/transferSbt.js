import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

import { wallet } from '../../../../index';
import { toast } from 'react-toastify';
import { ButtonLoader } from '../../../common/buttonLoader';

export const TransferSBT = ({ isOpen, closeModal, checkSBTTokens }) => {
  const [loading, setLoading] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const transferSbtFunction = async () => {
    try {
      setLoading(true);
      await wallet.callMethod({
        contractId: 'og-sbt-1.i-am-human.testnet',
        method: 'sbt_transfer',
        args: { receiver: transferTo },
      });
      toast.success('SBT tokens transferred successfully');
    } catch {
      toast.error('An error occured while transferring your sbt tokens');
    } finally {
      setLoading(false);
      closeModal();
      checkSBTTokens();
    }
  };

  function countDots(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '.') {
        count++;
      }
    }
    return count;
  }

  const isStringValidated = React.useMemo(() => {
    if (transferTo === '') {
      return false;
    }
    const testnet = '.near';
    const dots = countDots(transferTo);
    if (transferTo.endsWith(testnet) && dots === 1) {
      return true;
    }
    return false;
  }, [transferTo]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Transfer From : {wallet.accountId}
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="top-5 right-5 absolute"
                  >
                    <AiOutlineClose />
                  </button>
                  <div className="mt-2">
                    <div>
                      <label
                        for="first_name"
                        className="block mb-2 text-md font-medium text-gray-900"
                      >
                        Transfer To
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Transfer to"
                        required
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                      />
                    </div>
                  </div>
                  {!isStringValidated && transferTo !== '' && (
                    <p className="my-2 text-red-600 text-xs">
                      Provided addresss should be a valid one with only .near at
                      the end and containing only 1 (.)
                    </p>
                  )}
                  <div className="mt-4">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent ${
                        isStringValidated
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-100 text-gray-500'
                      } px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={transferSbtFunction}
                      disabled={!isStringValidated}
                    >
                      {loading ? <ButtonLoader /> : 'Transfer'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
