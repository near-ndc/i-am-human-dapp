import React from 'react';
import { ImageSrc } from '../../utils/constants';

const Landing = () => {
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
            src={ImageSrc.FVSBT}
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
                  'https://i-am-human.gitbook.io/i-am-human-docs/og-sbt',
                  '_blank'
                )
              }
              className="inline-flex rounded-md border border-purple-500 text-purple-500 border-1 px-5 py-2 text-base font-light text-black shadow-sm"
            >
              Closed
            </button>
          </div>
        </div>
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src={ImageSrc.OGSBT}
            className="object-fill rounded-lg md:w-2/3 badge"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] md:mt-10">
          <h2 className="font-bold text-4xl">
            Get Your “I Voted” Soul Bound Token
          </h2>
          <p className="my-5">
            Gear up for the inaugural NDC General Election on September 8! Cast
            your votes for the three governance houses and claim the important
            "I VOTED" Soul Bound Token. This is a reputation Soul Bound Token.
            Unlock the ability to participate in government referendums and
            showcase your participation in the NEAR Ecosystem NDC Election. Mark
            September 8 on your calendar and be part of this history of
            governance on NEAR.
          </p>

          <button
            onClick={() =>
              window.open(
                'https://pages.near.org/blog/ndc-v1-governance-elections-faq/',
                '_blank'
              )
            }
            className="inline-flex rounded-lg border border-purple-500 text-purple-500 border-1 px-5 py-2 md:mt-5 text-base font-light text-black shadow-sm"
          >
            Learn More
          </button>
        </div>
        <div className="md:min-w-[400px] order-first md:order-last w-full md:w-1/3 flex justify-center md:justify-end">
          <img
            src={ImageSrc.IVotedSBT}
            className="object-cover rounded-lg md:w-2/3 badge"
          />
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
        <div className="md:min-w-[400px] order-first w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src={ImageSrc.KYCSBT}
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
    </div>
  );
};

export default Landing;
