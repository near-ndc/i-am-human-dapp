import React from 'react';
import FVSBTImage from '../../images/FvSBT.png';
import KYCSBTImage from '../../images/KYCSBT.png';
import CommunitySBTImage from '../../images/CommunitySBT.png';
import OGSBT from '../../images/OGSBT.png';
import {
  COMMUNITY_CONTENT,
  FACE_VERIFICATION_CONTENT,
  KYC_CONTENT,
  OG_SBT_CONTENT,
} from '../../utils/constants';

export const Landing = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-32 mb-20">
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">
            {FACE_VERIFICATION_CONTENT.title}
          </h2>
          <p className="my-5">{FACE_VERIFICATION_CONTENT.description}</p>
          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/face-verification-sbt',
                '_blank'
              )
            }
            className="inline-flex rounded-md border border-purple-500 text-purple-500 border-1 px-5 py-2 md:mt-5 text-base font-light text-black shadow-sm"
          >
            Learn More
          </button>
        </div>
        <div className="md:min-w-[400px] order-first md:order-last w-full md:w-1/3 flex justify-center md:justify-end">
          <img src={FVSBTImage} className="object-fill rounded-lg md:w-2/3" />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">{KYC_CONTENT.title}</h2>
          <p className="my-5">{KYC_CONTENT.description}</p>
          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/kyc-sbt',
                '_blank'
              )
            }
            className="inline-flex rounded-md border border-purple-500 text-purple-500 border-1 px-5 py-2 md:mt-5 text-base font-light text-black shadow-sm"
          >
            Learn More
          </button>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img src={KYCSBTImage} className="object-fill rounded-lg md:w-2/3" />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">{COMMUNITY_CONTENT.title}</h2>
          <p className="my-5">{COMMUNITY_CONTENT.description}</p>

          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/community-sbt',
                '_blank'
              )
            }
            className="cursor-auto inline-flex rounded-md border border-gray-500 border-1 px-5 py-2 md:mt-5 text-base font-light text-black shadow-sm"
          >
            Coming Soon
          </button>
        </div>
        <div className="md:min-w-[400px] order-first md:order-last w-full md:w-1/3 flex justify-center md:justify-end">
          <img
            src={CommunitySBTImage}
            className="object-fill rounded-lg md:w-2/3"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">{OG_SBT_CONTENT.title}</h2>
          <p className="my-5">{OG_SBT_CONTENT.description}</p>
          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/og-sbt',
                '_blank'
              )
            }
            className="cursor-auto inline-flex rounded-md border border-gray-500 border-1 px-5 md:mt-5 py-2 text-base font-light text-black shadow-sm"
          >
            Coming Soon
          </button>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img src={OGSBT} className="object-fill rounded-lg md:w-2/3" />
        </div>
      </div>
    </div>
  );
};
