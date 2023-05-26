import React from 'react';
import FVSBTImage from '../../images/FvSBT.png';
import KYCSBTImage from '../../images/KYCSBT.png';
import CommunitySBTImage from '../../images/CommunitySBT.png';
import OGSBT from '../../images/OGSBT.png';

export const Landing = () => {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px]">
          <h2 className="font-bold text-3xl">
            Get your Face Verification Soul Bound Token
          </h2>
          <p className="my-5">
            We have partnered with Fractal for Face Verification. Why? With
            nearly 1 million users across 200+ projects, Fractal provides a full
            stack of open source identity solutions that give you ability to
            easily verify and prove that you are a human. They ensure that each
            person only creates one unique account.
          </p>
          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/face-verification-sbt',
                '_blank'
              )
            }
            className="inline-flex rounded-md border border-purple-500 text-purple-500 border-1 px-4 py-2 text-base font-light text-black shadow-sm"
          >
            Learn More
          </button>
        </div>
        <div className="md:min-w-[400px] order-first md:order-last w-full md:w-1/3 flex justify-center md:justify-end">
          <img src={FVSBTImage} className="object-fill" />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px]">
          <h2 className="font-bold text-3xl">Get Your KYC Soul Bound Token</h2>
          <p className="my-5">
            Have you already KYC with Fractal? You are in luck. If you have
            received a bounty payout for your contribution from the NEAR
            Foundation, you will not be required to re-verify your identity when
            minting your SBTs. Mint your SBTs now.
          </p>
          <button className="cursor-auto inline-flex rounded-md border border-gray-500 border-1 px-4 py-2 text-base font-light text-black shadow-sm">
            Coming Soon
          </button>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img src={KYCSBTImage} className="object-fill" />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px]">
          <h2 className="font-bold text-3xl">
            Get Your Community Soul Bound Token
          </h2>
          <p className="my-5">
            Are you part of the Community? If you are active in the NEAR
            Community, we will be introducing Community SBT soon. Mint your
            Community SBT and join us to build web3 governance.
          </p>

          <button className="cursor-auto inline-flex rounded-md border border-gray-500 text-gray-500 border-1 px-4 py-2 text-base font-light text-black shadow-sm">
            Coming Soon
          </button>
        </div>
        <div className="md:min-w-[400px] order-first md:order-last w-full md:w-1/3 flex justify-center md:justify-end">
          <img src={CommunitySBTImage} className="object-fill" />
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px]">
          <h2 className="font-bold text-3xl">Get Your OG Soul Bound Token</h2>
          <p className="my-5">
            Are you someone who stands out in the NEAR ecosystem? Get the OG
            Soul Bound Token. We will create a "seed group" of OGs and trusted
            individuals to bootstrap the next iteration of NEAR Community.
          </p>
          <button className="cursor-auto inline-flex rounded-md border border-gray-500 border-1 px-4 py-2 text-base font-light text-black shadow-sm">
            Coming Soon
          </button>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img src={OGSBT} className="object-fill" />
        </div>
      </div>
    </div>
  );
};
