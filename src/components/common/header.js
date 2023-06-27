import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { wallet } from '../../index';
import Logo from '../../images/ndc.png';
import { useAdmin } from '../../utils/useAdmin';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Header = ({ setShowAdmin, setActiveTabIndex }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isAdmin] = useAdmin({ address: wallet.accountId });

  useEffect(() => {
    wallet
      .startUp()
      .then((value) => {
        setIsSignedIn(value);
      })
      .catch(() => {
        setIsSignedIn(false);
      });
  });

  const signOut = () => {
    if (isSignedIn) {
      wallet.signOut();
      localStorage.removeItem('fvTokens');
      localStorage.removeItem('kycTokens');
    } else {
      wallet.signIn();
    }
  };

  return (
    <>
      <div>
        <div>
          <nav
            className="flex h-9 items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <div onClick={() => setActiveTabIndex(null)}>
                <Link to="/" className="-m-1.5 p-1.5 font-bold tracking-tight">
                  <img
                    src={Logo}
                    onClick={() => {
                      setShowAdmin?.(false);
                    }}
                    alt="logo"
                    className="h-[120px] w-[100px] mt-6"
                  />
                </Link>
              </div>
            </div>
            <div className="flex lg:hidden">
              {isSignedIn ? (
                <>
                  <button
                    type="button"
                    className=" inline-flex items-center justify-center rounded-md text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => wallet.signIn()}
                  className="inline-block bg-yellow-300 rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                >
                  Connect Wallet
                </button>
              )}
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12"></div>
            <div className="hidden lg:flex lg:min-w-0 space-x-4 lg:justify-end">
              {isSignedIn && isAdmin && (
                <>
                  <button
                    onClick={() => setShowAdmin(true)}
                    className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2"
                  >
                    <p>Admin Console</p>
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  </button>
                </>
              )}
              {wallet.accountId && (
                <p className="inline-block px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                  {wallet.accountId}
                </p>
              )}
              <div
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSfQ80mza1ssDRuEkjTl61ty0ORxm23whmwBDlaxWHjodTiz-w/viewform',
                    '_blank'
                  )
                }
                className="text-gradient font-semibold self-center"
              >
                Apply to OG SBT
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-block bg-yellow-300 rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
              >
                {isSignedIn ? 'Sign Out' : 'Connect Wallet'}
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
                  <div className="space-y-2 py-6">
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))} */}
                  </div>
                  <div className="flex flex-col gap-7 py-6 text-base font-semibold leading-6 text-gray-900">
                    {isSignedIn && isAdmin && (
                      <button onClick={() => setShowAdmin(true)}>
                        <p>Admin Console</p>
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      </button>
                    )}
                    {wallet.accountId && (
                      <div className="text-container truncate">
                        {wallet.accountId}
                      </div>
                    )}
                    <div
                      onClick={() =>
                        window.open(
                          'https://docs.google.com/forms/d/e/1FAIpQLSfQ80mza1ssDRuEkjTl61ty0ORxm23whmwBDlaxWHjodTiz-w/viewform',
                          '_blank'
                        )
                      }
                    >
                      Apply to OG SBT
                    </div>
                    <div
                      onClick={
                        isSignedIn
                          ? () => wallet.signOut()
                          : () => wallet.signIn()
                      }
                    >
                      {isSignedIn ? 'Sign Out' : 'Connect Wallet'}
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
    </>
  );
};
