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
import ProofOfVibeOGSBT from '../../images/PROOF_OF_VIBE.png';
import ProofOfKudos from '../../images/PROOF_OF_KUDOS.png';
import ProofOfRegen from '../../images/PROOF_OF_REGEN.png';

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
          <img
            src={FVSBTImage}
            className="object-fill rounded-lg md:w-2/3 badge"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">Get Your OG Soul Bound Token</h2>
          <p className="my-5">
            Are you an esteemed member of the NEAR community? It's time to
            showcase your contribution to NEAR. By acquiring the OG Soul Bound
            Token, the first reputation-based token, you'll join a select
            community of trusted individuals who are actively shaping the future
            of the NEAR ecosystem. The OG SBT represents your commitment and
            dedication to NEAR, highlighting your continuous presence and
            involvement in shaping the NEAR ecosystem.
          </p>
          <div className="flex flex-wrap gap-5">
            <button
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSfQ80mza1ssDRuEkjTl61ty0ORxm23whmwBDlaxWHjodTiz-w/viewform',
                  '_blank'
                )
              }
              className="rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-5 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
            >
              Apply for OG SBT
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://i-am-human.gitbook.io/i-am-human-docs/og-sbt',
                  '_blank'
                )
              }
              className="inline-flex rounded-md border border-purple-500 text-purple-500 border-1 px-5 py-2 text-base font-light text-black shadow-sm"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img src={OGSBT} className="object-fill rounded-lg md:w-2/3 badge" />
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
          <img
            src={KYCSBTImage}
            className="object-fill rounded-lg md:w-2/3 badge"
          />
        </div>
      </div>
      {/* we won't have it right now */}
      {/* <div className="flex flex-wrap gap-10">
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
      </div> */}
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-4xl">
          Sneak Peek on Upcoming Soul Bound Tokens
        </h2>
        <p>
          We're thrilled to announce that more Soul Bound Tokens are launching
          soon, bringing with them a groundbreaking feature – the power of
          onchain reputation! Embrace the power of reputation on the blockchain,
          where your contributions are valued, acknowledged, and rewarded. Join
          us as we forge ahead, united by a shared vision of trust,
          transparency, and innovation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          <BadgeItem imageSrc={ProofOfKudos} />
          <BadgeItem imageSrc={ProofOfVibeOGSBT} />
          <BadgeItem imageSrc={ProofOfDevOGSBT} />
          <BadgeItem imageSrc={CreativeOGSBT} />
          <BadgeItem imageSrc={DegenOGSBT} />
          <BadgeItem imageSrc={ProofOfRegen} />
          <BadgeItem imageSrc={ModOGSBT} />
          <BadgeItem imageSrc={GWGContributorOGSBT} />
          <BadgeItem imageSrc={CoreContributorOGSBT} />
          <BadgeItem imageSrc={NDCContributorOGSBT} />
          <BadgeItem imageSrc={JuggernautOGSBT} />
          <BadgeItem imageSrc={NDCChampionOGSBT} />
          <BadgeItem imageSrc={GeniusOGSBT} />
        </div>
      </div>
    </div>
  );
};
