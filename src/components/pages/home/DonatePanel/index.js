import React from 'react';
import * as nearAPI from 'near-api-js';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ButtonLoader } from '../../../common/buttonLoader';
import { wallet } from '../../../../index';
import { toast } from 'react-toastify';

const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

export const DonatePanel = ({ isOpen, closeModal }) => {
  const [loading, setLoading] = useState();
  const [amountToSend, setAmountToSend] = useState('10');

  const sendTokens = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { connect, WalletConnection } = nearAPI;
      const connectionConfig = {
        networkId: 'testnet',
        keyStore: myKeyStore,
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      };

      // connect to NEAR
      const nearConnection = await connect(connectionConfig);
      const walletConnection = new WalletConnection(nearConnection);
      walletConnection.requestSignIn(
        'example-contract.testnet', // contract requesting access
        'Example App', // optional title
        'http://YOUR-URL.com/success', // optional redirect URL on success
        'http://YOUR-URL.com/failure' // optional redirect URL on failure
      );
      const account = await nearConnection.account(wallet.accountId);
      await account.sendMoney(
        'ubitest.testnet', // receiver account
        '100000000000000' // amount in yoctoNEAR
      );
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 border-b-2 pb-2 mb-2"
                >
                  Donate to I-AM-HUMAN-DAPP !
                </Dialog.Title>
                <form onSubmit={sendTokens}>
                  <div>
                    <label
                      htmlFor="donate"
                      className="block mb-2 text-md font-medium text-gray-900"
                    >
                      Amount to donate
                    </label>
                    <input
                      type="number"
                      id="donate"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Amount"
                      value={amountToSend}
                      onChange={({ target: { value } }) =>
                        setAmountToSend(value)
                      }
                    />
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {!loading ? 'Confirm' : <ButtonLoader />}
                    </button>
                    {!loading && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
