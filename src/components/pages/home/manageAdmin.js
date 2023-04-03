import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { wallet } from '../../../index';
import { ButtonLoader } from '../../common/buttonLoader';
import { checkAdmin, log_event } from '../../../utils/utilityFunctions';
import { AdminConfirmation } from './ManageAdmin/adminConfirmation';
import { addressToVerify } from './../../../utils/addressToVerify';
import { near_contract } from '../../../utils/contract-addresses';

export const ManageAdmin = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [adminStatus, setAdminStatus] = useState({
    loading: false,
    status: null,
  });
  const [isModalOpen, setModalOpen] = React.useState({
    modalOpen: false,
    add: null,
  });
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
    if (walletAddress === '') {
      return true;
    }
    const testnet = addressToVerify;
    const dots = countDots(walletAddress);
    if (walletAddress.endsWith(testnet) && dots === 1) {
      return true;
    }
    return false;
  }, [walletAddress]);
  const addToAdmins = async () => {
    if (walletAddress) {
      setButtonLoading(true);
      log_event({
        event_log: `${walletAddress} added to admins`,
        effected_wallet: walletAddress,
      });
      try {
        const res = await wallet.callMethod({
          contractId: near_contract,
          method: 'add_admins',
          args: { metadata: {}, admins: [walletAddress] },
        });
        toast.success('Added admin successfully');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setWalletAddress('');
        setAdminStatus({
          loading: false,
          status: null,
        });
        setModalOpen({ modalOpen: false, add: null });
        setButtonLoading(false);
      }
    } else {
      setModalOpen({ modalOpen: false, add: null });
      toast.error('Please provide a wallet address');
    }
  };
  const removeFromAdmins = async () => {
    if (walletAddress) {
      setButtonLoading(true);
      try {
        log_event({
          event_log: `${walletAddress} removed from admins`,
          effected_wallet: walletAddress,
        });
        const res = await wallet.callMethod({
          contractId: near_contract,
          method: 'remove_admins',
          args: { metadata: {}, admins: [walletAddress] },
        });
        toast.success('Removed admin successfully');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setWalletAddress('');
        setAdminStatus({
          loading: false,
          status: null,
        });
        setModalOpen({ modalOpen: false, add: null });
        setButtonLoading(false);
      }
    } else {
      setModalOpen({ modalOpen: false, add: null });
      toast.error('Please provide a wallet address');
    }
  };

  React.useEffect(() => {
    setAdminStatus({
      loading: false,
      status: null,
    });
  }, [walletAddress]);

  const checkAdminStatus = async () => {
    if (walletAddress === wallet.accountId) {
      return toast.error('Wallet address cannot be your address !');
    }
    try {
      setAdminStatus({ loading: true, status: '' });
      const status = await checkAdmin(walletAddress);
      setAdminStatus({
        loading: false,
        status: status ? 'isAdmin' : 'notAdmin',
      });
      if (status) {
        toast.info(`${walletAddress} is an admin !`, { autoClose: 1000 });
      } else {
        toast.info(`${walletAddress} is not an admin !`, { autoClose: 1000 });
      }
    } catch {
      toast.error('An error occured while getting the admin status');
    }
  };

  const addButtonDisabled = adminStatus.status !== 'notAdmin';
  const removeButtonDisabled = adminStatus.status !== 'isAdmin';

  return (
    <div className="p-2">
      <p className="text-3xl font-semibold">Manage Admin Membership</p>
      <div className="relative z-0 mb-2 mt-6 w-full group">
        <input
          type="text"
          value={walletAddress}
          disabled={buttonLoading}
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          name="floating_address"
          id="floating_address"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_address"
          className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          Paste admin wallet address here
        </label>
      </div>
      {!isStringValidated && (
        <p className="my-2 text-red-600 text-xs">
          Provided addresss should be a valid one with only {addressToVerify} at
          the end and containing only 1 (.)
        </p>
      )}
      {adminStatus?.status === 'isAdmin' && (
        <div className="mb-2 w-[210px]">
          <div>
            <p className="inli ne-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2">
              {walletAddress} is an admin
            </p>
          </div>
        </div>
      )}
      {adminStatus?.status === 'notAdmin' && (
        <div className="mb-2 w-[210px]">
          <div>
            <p className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2">
              {walletAddress} is not an admin
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-1">
        {adminStatus.status === null ? (
          <button
            type="button"
            onClick={checkAdminStatus}
            disabled={walletAddress === '' || !isStringValidated}
            className={`text-white w-60  ${
              walletAddress === '' || !isStringValidated
                ? 'bg-gray-500'
                : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
            } font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none`}
          >
            {adminStatus.loading ? <ButtonLoader /> : ' Check Admin Status'}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setModalOpen({ modalOpen: true, add: true });
              }}
              disabled={addButtonDisabled || buttonLoading}
              className={`text-white w-60 ${
                addButtonDisabled
                  ? 'bg-gray-500'
                  : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
              } font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none`}
            >
              {buttonLoading && !addButtonDisabled ? (
                <ButtonLoader classes="mr-3" />
              ) : (
                'Add To Admins'
              )}
            </button>
            <button
              type="button"
              disabled={removeButtonDisabled || buttonLoading}
              onClick={() => {
                setModalOpen({ modalOpen: true, add: false });
              }}
              className={`text-white w-60 ${
                removeButtonDisabled
                  ? 'bg-gray-500'
                  : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
              } font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none`}
            >
              {buttonLoading && !removeButtonDisabled ? (
                <ButtonLoader classes="mr-3" />
              ) : (
                'Remove from Admins'
              )}
            </button>
            <AdminConfirmation
              closeModal={() => setModalOpen({ modalOpen: false, add: null })}
              isOpen={isModalOpen.modalOpen}
              walletAddress={walletAddress}
              isAddAdmin={isModalOpen.add}
              execute={isModalOpen.add ? addToAdmins : removeFromAdmins}
              loading={buttonLoading}
            />
          </>
        )}
      </div>
      <div className="p-4 shadow rounded-lg w-full md:w-[60%] w-full">
        <p className="text-sm italic">
          Current SBT admins can use this page to add new admins or remove old
          ones. The first time a new account is added it will get status
          Pending. Two other admins will also have to add the same account
          before it becomes a full admin. And admin account remains in good
          standing until it has been removed by three other admins, at which
          point it will be removed.
        </p>
      </div>
    </div>
  );
};
