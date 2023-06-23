import React from 'react';
import FVSBTImage from '../../images/FvSBT.png';
import KYCSBTImage from '../../images/KYCSBT.png';
import CommunitySBTImage from '../../images/CommunitySBT.png';
import OGSBT from '../../images/OGSBT.png';
import CreativeOGSBT from '../../images/CREATIVE.png';
import DegenOGSBT from '../../images/DEGEN.png';
import GeniusOGSBT from '../../images/GENIUS.png';
import GWGContributorOGSBT from '../../images/GWG CONTRIBUTOR.png';
import CoreContributorOGSBT from '../../images/GWG_CORE_CONTRIBUTOR.png';
import JuggernautOGSBT from '../../images/JUGGERNAUT.png';
import ModOGSBT from '../../images/MOD.png';
import NDCChampionOGSBT from '../../images/NDC_CHAMPION.png';
import NDCContributorOGSBT from '../../images/NDC_CONTRIBUTOR.png';
import ProofOfDevOGSBT from '../../images/PROOF_OF_DEV.png';

const BadgeItem = ({ imageSrc }) => {
  return <img src={imageSrc} className="object-fill rounded-lg badge" />;
};

export const Landing = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-32 mb-20">
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">
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
          <h2 className="font-bold text-4xl">Get Your OG Soul Bound Token</h2>
          <p className="my-5">
            Are you someone who stands out in the NEAR ecosystem? Get the OG
            Soul Bound Token. We will create a "seed group" of OGs and trusted
            individuals to bootstrap the next iteration of NEAR Community.
          </p>
          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/og-sbt',

                '_blank'
              )
            }
            className="inline-flex rounded-md border border-purple-500 text-purple-500 border-1 px-5 py-2 md:mt-5 text-base font-light text-black shadow-sm"
          >
            Learn More
          </button>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img src={OGSBT} className="object-fill rounded-lg md:w-2/3" />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">Get Your KYC Soul Bound Token</h2>
          <p className="my-5">
            Have you already KYC with Fractal? You are in luck. If you have
            received a bounty payout for your contribution from the NEAR
            Foundation, you will not be required to re-verify your identity when
            minting your SBTs. Mint your SBTs now.
          </p>

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
        <div className="md:min-w-[400px] order-first md:order-last w-full md:w-1/3 flex justify-center md:justify-end">
          <img src={KYCSBTImage} className="object-fill rounded-lg md:w-2/3" />
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">
            Get Your Community Soul Bound Token
          </h2>
          <p className="my-5">
            Are you part of the Community? If you are active in the NEAR
            Community, we will be introducing Community SBT soon. Mint your
            Community SBT and join us to build web3 governance.
          </p>
          <button
            onClick={() =>
              window.open(
                'https://i-am-human.gitbook.io/i-am-human-docs/community-sbt',
                '_blank'
              )
            }
            className="cursor-auto inline-flex rounded-md border border-gray-500 border-1 px-5 md:mt-5 py-2 text-base font-light text-black shadow-sm"
          >
            Coming Soon
          </button>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src={CommunitySBTImage}
            className="object-fill rounded-lg md:w-2/3"
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5">
        <BadgeItem imageSrc={CreativeOGSBT} />
        <BadgeItem imageSrc={DegenOGSBT} />
        <BadgeItem imageSrc={GeniusOGSBT} />
        <BadgeItem imageSrc={GWGContributorOGSBT} />
        <BadgeItem imageSrc={CoreContributorOGSBT} />
        <BadgeItem imageSrc={JuggernautOGSBT} />
        <BadgeItem imageSrc={ModOGSBT} />
        <BadgeItem imageSrc={NDCChampionOGSBT} />
        <BadgeItem imageSrc={NDCContributorOGSBT} />
        <BadgeItem imageSrc={ProofOfDevOGSBT} />
      </div>
    </div>
  );
};
