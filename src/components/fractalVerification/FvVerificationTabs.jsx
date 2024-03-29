import React, { useEffect, useState } from 'react';
import { CheckCircle } from '../../images/CheckCircle';
import { Warning } from '../../images/Warning';
import { wallet } from '../..';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { verifyUser } from '../../services/api';
import { CircleSpinner } from 'react-spinners-kit';
import { useDispatch, useSelector } from 'react-redux';
import { updateResponse } from '../../redux/reducer/oracleReducer';
import { insertUserData, log_event } from '../../utils/utilityFunctions';
import ReactConfetti from 'react-confetti';
import { ImageSrc, ReducerNames } from '../../utils/constants';
import {
  setActivePageIndex,
  updateShowConfetti,
} from '../../redux/reducer/commonReducer';

const FvVerificationTabs = ({ tabs, error }) => {
  const { activePageIndex, isSuccessSBTPage, showConfetti } = useSelector(
    (state) => state[ReducerNames.COMMON]
  );
  const dispatch = useDispatch();
  const [editableFields, setEditableFields] = useState({
    code: '',
    claimer: wallet.accountId,
    redirect_uri: '',
  });
  const [loading, setLoading] = useState(true);
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function checkIsUserVerified() {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('homepage');
    if (!token) {
      return;
    }
    const verifyData = { ...editableFields, captcha: token };
    await verifyUser(verifyData)
      .then((resp) => {
        dispatch(updateResponse(resp));
        // pending response, user is not verified show face screen tab, we need to store the token to make further request
        if (resp?.token) {
          log_event({
            event_log: 'User is not approved from Fractal',
          });
          insertUserData({
            fv_status: 'Fractal Pending Authorization',
          });
          dispatch(setActivePageIndex(1));
        }
        // success response,
        if (resp?.m) {
          insertUserData({
            fv_status: 'Fractal Approved',
          });
          log_event({
            event_log: 'User is approved from Fractal',
          });
          dispatch(setActivePageIndex(2));
        }
        if (resp?.error) {
          log_event({
            event_log: resp?.error,
          });
          dispatch(setActivePageIndex(1));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error occured while verifying data', error);
      });
  }

  useEffect(() => {
    const URL = window.location;
    if (URL.href.includes('&state')) {
      const code = new URLSearchParams(URL.search).get('code');
      setEditableFields((d) => ({
        ...d,
        code,
        redirect_uri: URL.origin,
      }));
    }
  }, []);

  useEffect(() => {
    if (activePageIndex === 2 && !isSuccessSBTPage) {
      checkIsUserVerified();
    } else {
      setLoading(false);
    }
  }, [executeRecaptcha]);

  useEffect(() => {
    if (showConfetti) {
      let timer = setTimeout(() => {
        dispatch(updateShowConfetti(false));
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showConfetti]);

  return (
    <>
      {loading ? (
        <div className="h-[50vh] flex justify-center items-center gap-2 text-xl">
          Processing Fractal details...{' '}
          <CircleSpinner size={20} color="#4f46e5" />
        </div>
      ) : (
        <>
          {showConfetti && <ReactConfetti className="w-screen h-screen" />}
          <div className="hidden md:grid grid-cols-3 mb-20">
            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <div
                  className={`bg-gray-100 absolute top-0 left-0 ${
                    isSuccessSBTPage ? 'h-[75rem]' : 'h-full'
                  } w-[38%] -z-20`}
                />
                {tabs.map((tab, index) => (
                  <>
                    <div
                      className="flex items-center cursor-default"
                      key={index}
                    >
                      <div
                        className={`rounded-full border-2 ${
                          index <= activePageIndex
                            ? 'border-purple-400'
                            : 'border-gray-300'
                        } p-3`}
                      >
                        {tab.header}
                      </div>
                      <p
                        className={`text-m font-medium ml-4 mr-2 ${
                          index === activePageIndex && 'text-purple-600'
                        }`}
                      >
                        {tab.name}
                      </p>
                      {activePageIndex === index && !!error ? (
                        <Warning />
                      ) : (
                        activePageIndex === index &&
                        isSuccessSBTPage && <CheckCircle />
                      )}
                      {activePageIndex > index && <CheckCircle />}
                    </div>
                    {tabs.length !== index + 1 && (
                      <hr
                        class={`h-8 w-0.5 ml-9 ${
                          activePageIndex >= index
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                            : 'bg-gray-300'
                        } border-0 rounded-full	my-1`}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="col-span-2 pl-12">
              <p className="relative z-10">{tabs[activePageIndex].content}</p>
              <img
                src={ImageSrc.IAHLogoBG}
                alt="logo"
                className="absolute bottom-6 right-0 hidden lg:block z-0"
              />
            </div>
          </div>

          <div className="block md:hidden mt-[100px]">
            <div
              className="grid"
              style={{ gridTemplateColumns: '1.2fr 1.12fr 0.8fr' }}
            >
              {tabs.map((tab, index) => (
                <>
                  <div
                    className={
                      'flex flex-col cursor-default ' +
                      (index === 2 ? 'justify-self-end' : '') +
                      (index === 1 ? 'ml-2' : '')
                    }
                    key={index}
                  >
                    <div className="flex gap-2">
                      <div
                        className={`rounded-full border-2 ${
                          index <= activePageIndex
                            ? 'border-purple-400'
                            : 'border-gray-300'
                        } ${
                          index <= activePageIndex
                            ? 'stoke-purple-400'
                            : 'stroke-gray-300'
                        } p-1.5`}
                      >
                        {tab.header}
                      </div>
                      {tabs.length !== index + 1 && (
                        <div className="min-w-[40%]">
                          <hr class="h-px my-8 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 w-full" />
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-m font-medium ${
                        index <= activePageIndex
                          ? 'text-purple-600'
                          : 'text-black'
                      }`}
                    >
                      {tab.name}
                    </p>
                  </div>
                </>
              ))}
            </div>
            <div className="my-10 flex">{tabs[activePageIndex].content}</div>
          </div>
        </>
      )}
    </>
  );
};

export default FvVerificationTabs;
