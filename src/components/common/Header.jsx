import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { wallet } from '../../index';
import Logo from '../../images/ndc.png';
import { useAdmin } from '../../utils/useAdmin';
import { URLs } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllTokens } from '../../redux/reducer/sbtsReducer';
import {
  setActivePageIndex,
  updateAdminLogin,
  updateUserLogin,
} from '../../redux/reducer/commonReducer';
import { ReducerNames } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { isNumber } from '../../utils/utilityFunctions';

const CustomHeader = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { isUserLogin, isAdmin, activePageIndex } = useSelector(
    (state) => state[ReducerNames.COMMON]
  );
  const [admin] = useAdmin();

  const signOut = () => {
    if (isUserLogin) {
      wallet.signOut();
      dispatch(removeAllTokens());
    } else {
      wallet
        .signIn()
        .then((value) => {
          dispatch(updateUserLogin(value));
        })
        .catch(() => {
          dispatch(updateUserLogin(false));
        });
    }
  };

  const HomeMenu = ({ isDialog = false }) => {
    const isActive = (currentPage) =>
      window.location.href.indexOf(currentPage) !== -1 ? 'text-gradient' : '';

    const commonFuction = () => {
      window.scrollTo(0, 0);
      setMobileMenuOpen(false);
    };

    return (
      <div
        className={
          'cursor-pointer ' +
          (isDialog
            ? 'flex flex-col gap-7'
            : 'hidden md:flex gap-12 font-semibold self-center')
        }
      >
        <div
          onClick={() => {
            dispatch(setActivePageIndex(null));
            navigate('/');
            commonFuction();
          }}
          className={
            !isActive(URLs.SCOREBOARD) &&
            !isActive(URLs.SBTs) &&
            !isNumber(activePageIndex) &&
            !isActive(URLs.ACTIVATE)
              ? 'text-gradient'
              : ''
          }
        >
          Home
        </div>
        <div
          onClick={() => {
            navigate(URLs.SBTs);
            commonFuction();
          }}
          className={isActive(URLs.SBTs)}
        >
          Community SBTs
        </div>
        <div
          onClick={() => {
            navigate(URLs.ACTIVATE);
            commonFuction();
          }}
          className={isActive(URLs.ACTIVATE)}
        >
          Activate
        </div>
      </div>
    );
  };

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5 pt-10 mb-[50px] md:mb-[70px]">
      <nav
        className="flex h-9 items-center justify-between"
        aria-label="Global"
      >
        <button
          type="button"
          className="inline-flex md:hidden items-center justify-center rounded-md text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div onClick={() => dispatch(setActivePageIndex(null))}>
          <div
            onClick={() => navigate('/')}
            className="-m-1.5 p-1.5 font-bold tracking-tight cursor-pointer"
          >
            <img
              src={Logo}
              onClick={() => {
                dispatch(updateAdminLogin(false));
              }}
              alt="logo"
              className="h-[80px] md:h-[120px] md:w-[100px] mt-6 object-cover -z-20"
            />
          </div>
        </div>
        {isUserLogin && isAdmin && (
          <>
            <button
              onClick={() => dispatch(updateAdminLogin(true))}
              className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2"
            >
              <p>Admin Console</p>
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
            </button>
          </>
        )}
        <div className="self-end flex gap-12">
          <HomeMenu />
          {wallet.accountId && (
            <p className="hidden md:inline-block px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
              {wallet.accountId}
            </p>
          )}
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-block bg-yellow-300 rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
          >
            {isUserLogin ? 'Sign Out' : 'Connect Wallet'}
          </button>
        </div>
      </nav>
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
          <div className="flex h-9 items-center justify-between">
            <div className="flex">
              <a href="#" className="-m-1.5 p-1.5 font-bold tracking-tight">
                <img
                  src={Logo}
                  alt="logo"
                  className="h-[80px] w-[70px] mt-6 "
                />
              </a>
            </div>
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6"></div>
              <div className="flex flex-col gap-7 py-6 text-base font-semibold leading-6 text-gray-900">
                <HomeMenu isDialog={true} />
                {isUserLogin && isAdmin && (
                  <button onClick={() => dispatch(updateAdminLogin(true))}>
                    <p>Admin Console</p>
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  </button>
                )}
                {wallet.accountId && (
                  <div className="text-container truncate">
                    {wallet.accountId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default CustomHeader;
