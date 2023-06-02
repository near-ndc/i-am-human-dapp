import React, { useEffect, useState } from 'react';
import Logo from '../../images/bigLogo.png';
import { CheckCircle } from '../../images/CheckCircle';
import { Warning } from '../../images/Warning';
import { wallet } from '../..';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { verifyUser } from '../../services/api';
import { toast } from 'react-toastify';
import { CircleSpinner } from 'react-spinners-kit';

export const Tabs = ({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
  error,
  successSBT,
}) => {
  const [editableFields, setEditableFields] = useState({
    code: '',
    claimer: wallet.accountId,
    redirect_uri: '',
  });
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function checkIsUserVerified() {
    if (!executeRecaptcha) {
      toast.error('Recaptcha has not been loaded');
      return;
    }
    const token = await executeRecaptcha('homepage');
    if (!token) {
      return;
    }
    const verifyData = { ...editableFields };
    const result = await verifyUser(verifyData);
    console.log('Result,', result);
    // user is not verified show face screen tab
    if (result?.error) {
      return setActiveTabIndex(1);
    }
    setActiveTabIndex(2);
  }

  // useEffect(() => {
  //   const URL = window.location;
  //   if (URL.href.includes('&state')) {
  //     const code = new URLSearchParams(URL.search).get('code');
  //     setEditableFields((d) => ({
  //       ...d,
  //       code,
  //       redirect_uri: URL.origin,
  //     }));
  //   }
  // }, []);

  useEffect(() => {
    // if (activeTabIndex === 2) {
    //   checkIsUserVerified().then(() => setLoading(false));
    // } else {
    //   setLoading(false);
    // }
  }, []);

  return (
    <>
      {/* {loading ? (
        <div className="h-[50vh] flex justify-center items-center gap-2">
          Loading.. <CircleSpinner size={20} color="blue" />
        </div>
      ) : (
        <> */}
      <div className="hidden md:grid grid-cols-3">
        <div className="flex flex-col items-center py-52">
          <div className="flex flex-col">
            <div
              className={`bg-gray-100 absolute top-0 left-0 ${
                successSBT ? 'h-[75rem]' : 'h-full'
              } w-[38%] -z-50`}
            />
            <div className="lg:mx-auto lg:max-w-7xl w-full h-3 absolute top-0 left-1/2 transform -translate-x-1/2">
              <div
                className={`bg-purple-600 h-3 ${
                  activeTabIndex === 0
                    ? 'w-1/3'
                    : tabs.length === activeTabIndex + 1
                    ? 'w-3/3'
                    : 'w-2/3'
                } rounded`}
              />
            </div>
            {tabs.map((tab, index) => (
              <>
                <div className="flex items-center cursor-default" key={index}>
                  <div
                    className={`rounded-full border-2 ${
                      index <= activeTabIndex
                        ? 'border-purple-400'
                        : 'border-gray-300'
                    } p-3`}
                  >
                    {tab.header}
                  </div>
                  <p
                    className={`text-m font-medium ml-4 mr-2 ${
                      index === activeTabIndex && 'text-purple-600'
                    }`}
                  >
                    {tab.name}
                  </p>
                  {activeTabIndex === index && !!error ? (
                    <Warning />
                  ) : (
                    activeTabIndex === index && successSBT && <CheckCircle />
                  )}
                  {activeTabIndex > index && <CheckCircle />}
                </div>
                {tabs.length !== index + 1 && (
                  <hr
                    class={`h-8 w-0.5 ml-9 ${
                      activeTabIndex >= index
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                        : 'bg-gray-300'
                    } border-0 rounded-full	my-1`}
                  />
                )}
              </>
            ))}
          </div>
        </div>
        <div className="col-span-2 pt-32 pl-12">
          {tabs[activeTabIndex].content}
          <img
            src={Logo}
            alt="logo"
            className="absolute bottom-6 right-0 hidden lg:block"
          />
        </div>
      </div>

      <div className="block md:hidden mt-[100px]">
        <div
          className="grid"
          style={{ gridTemplateColumns: '1.2fr 1.2fr 0.75fr' }}
        >
          {tabs.map((tab, index) => (
            <>
              <div
                className={
                  'flex flex-col cursor-default ' +
                  (index === 2 ? 'justify-self-end' : '') +
                  (index === 1 ? 'ml-4' : '')
                }
                key={index}
              >
                <div className="flex gap-2">
                  <div
                    className={`rounded-full border-2 ${
                      index <= activeTabIndex
                        ? 'border-purple-400'
                        : 'border-gray-300'
                    } ${
                      index <= activeTabIndex
                        ? 'stoke-purple-400'
                        : 'stroke-gray-300'
                    } p-1.5`}
                  >
                    {tab.header}
                  </div>
                  {tabs.length !== index + 1 && (
                    <div className="min-w-[50%]">
                      <hr class="h-px my-8 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 w-full" />
                    </div>
                  )}
                </div>
                <p
                  className={`text-m font-medium ${
                    index <= activeTabIndex ? 'text-purple-600' : 'text-black'
                  }`}
                >
                  {tab.name}
                </p>
              </div>
            </>
          ))}
        </div>
        <div className="my-10 flex">{tabs[activeTabIndex].content}</div>
      </div>
      {/* </>
      )} */}
    </>
  );
};
