import React from 'react';
import dayjs from 'dayjs';
import { TWITTER_URL } from '../../utils/constants';

export const ValidTokenComponent = () => {
  return (
    <div className="flex items-center gap-2 bg-green-100 text-green-500 py-1 px-2 w-max rounded-lg">
      <span className="w-2 h-2 rounded-full bg-green-500"></span>
      <p className="text-sm">Valid Token</p>
    </div>
  );
};

export const Item = ({ imageSrc, children }) => {
  return (
    <div className="bg-gray-100 flex flex-grow flex-1 flex-wrap lg:flex-nowrap gap-10 p-5 mb-6 rounded-lg">
      <div className="flex items-start justify-center">
        <img src={imageSrc} className="object-cover rounded-lg max-h-[350px]" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export const TokenDetails = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <svg
          fill="#000000"
          height="20px"
          viewBox="0 0 512 512"
          transform="rotate(90)"
        >
          <path d="M256,62.061c-125.673,0-256,32.97-256,100.849v186.182c0,67.879,130.327,100.848,256,100.848s256-32.97,256-100.848 V162.909C512,95.03,381.673,62.061,256,62.061z M465.455,349.091c0,22.885-100.848,54.303-209.455,54.303 S46.545,371.976,46.545,349.091v-32.075C95.646,343.729,176.742,356.849,256,356.849s160.354-13.12,209.455-39.832V349.091z M465.455,256c0,22.885-100.848,54.303-209.455,54.303S46.545,278.885,46.545,256v-32.074 C95.646,250.638,176.742,263.758,256,263.758s160.354-13.12,209.455-39.832V256z M256,217.212 c-108.606,0-209.455-31.418-209.455-54.303c0-22.885,100.848-54.303,209.455-54.303s209.455,31.418,209.455,54.303 C465.455,185.794,364.606,217.212,256,217.212z"></path>{' '}
        </svg>
        <p>Token ID: {data?.token}</p>
      </div>
      {data?.metadata?.issued_at && (
        <div className="flex items-center gap-2">
          <svg height="20px" fill="#000000" viewBox="0 0 24 24">
            <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21ZM17.737,8.824a1,1,0,0,1-.061,1.413l-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,0,1,1.415-1.414l2.323,2.323,5.294-4.853A1,1,0,0,1,17.737,8.824Z"></path>
          </svg>
          <p>
            Issued on: {dayjs(data?.metadata?.issued_at).format('DD MMMM YYYY')}
          </p>
        </div>
      )}
      {data?.metadata?.expires_at && (
        <div className="flex items-center gap-2">
          <svg height="20px" viewBox="0 0 24 24" fill="none">
            <path
              id="Vector"
              d="M12 7V12H17M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <p>
            Expires on:{' '}
            {dayjs(data?.metadata?.expires_at).format('DD MMMM YYYY')}
          </p>
        </div>
      )}
      {data?.metadata?.expires_at && (
        <div className="flex items-center gap-2">
          <svg
            height="20px"
            fill="#000000"
            version="1.1"
            viewBox="0 0 32.75 32.75"
          >
            <path d="M29.375,1.25h-1.124c0.028-0.093,0.058-0.186,0.058-0.289C28.311,0.431,27.879,0,27.348,0s-0.961,0.431-0.961,0.961 c0,0.103,0.028,0.196,0.059,0.289h-3.68c0.029-0.093,0.058-0.186,0.058-0.289C22.823,0.43,22.393,0,21.861,0 C21.331,0,20.9,0.431,20.9,0.961c0,0.103,0.029,0.196,0.059,0.289h-3.68c0.029-0.093,0.058-0.186,0.058-0.289 C17.336,0.431,16.906,0,16.375,0c-0.531,0-0.961,0.431-0.961,0.961c0,0.103,0.029,0.196,0.058,0.289h-3.68 c0.029-0.093,0.058-0.186,0.058-0.289C11.85,0.431,11.419,0,10.888,0c-0.531,0-0.961,0.431-0.961,0.961 c0,0.103,0.028,0.196,0.058,0.289h-3.68c0.03-0.093,0.058-0.186,0.058-0.289C6.363,0.43,5.933,0,5.402,0 C4.871,0,4.441,0.431,4.441,0.961c0,0.103,0.029,0.196,0.058,0.289H3.375c-1.517,0-2.75,1.233-2.75,2.75v26 c0,1.518,1.233,2.75,2.75,2.75H26.27l5.855-5.855V4C32.125,2.483,30.893,1.25,29.375,1.25z M30.625,26.273l-0.311,0.311h-2.356 c-1.101,0-2,0.9-2,2v2.355l-0.31,0.311H3.375c-0.689,0-1.25-0.561-1.25-1.25V9h28.5V26.273z"></path>{' '}
            <polygon points="5.563,21.127 5.508,19.896 5.398,18.729 5.42,18.729 6.861,23.812 8.665,23.812 10.106,18.729 10.128,18.729 9.997,20.16 9.963,21.393 9.963,23.812 12.296,23.812 12.296,15.891 9.16,15.891 7.763,20.831 6.366,15.891 3.23,15.891 3.23,23.812 5.563,23.812 "></polygon>
            <path d="M16.98,24.021c2.344,0,4.16-1.519,4.16-4.213c0-2.091-1.332-4.126-4.16-4.126c-2.463,0-4.146,1.618-4.146,4.104 C12.833,22.48,14.495,24.021,16.98,24.021z M16.959,17.618c1.145-0.033,1.584,1.11,1.584,2.188c0,1.31-0.439,2.277-1.562,2.277 c-1.243,0-1.55-1.266-1.55-2.277C15.43,18.807,15.782,17.618,16.959,17.618z"></path>
            <polygon points="24.264,21.305 24.164,19.5 26.991,23.812 29.422,23.812 29.422,15.891 26.936,15.891 26.936,18.41 27.035,20.214 24.208,15.891 21.775,15.891 21.775,23.812 24.264,23.812 "></polygon>{' '}
          </svg>
          <p>
            Days until expiration:{' '}
            {Math.abs(
              dayjs(data?.metadata?.expires_at).diff(Date.now(), 'days')
            )}
          </p>
        </div>
      )}
      <div className="flex items-center">
        <a
          target="_blank"
          rel="noreferrer"
          class="twitter-share-button"
          href={TWITTER_URL}
          data-size="large"
          className="w-full md:w-max rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
        >
          <p className="mx-auto w-[fit-content]">Share on Twitter</p>
        </a>
      </div>
    </div>
  );
};
