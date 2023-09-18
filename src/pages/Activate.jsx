import React, { useEffect } from 'react';
import ImageTextBlock from '../components/common/ImageTextBlock';
import { useDispatch } from 'react-redux';
import { updateTrackerStatus } from '../redux/reducer/tracker';
import { ImageSrc, Links } from '../utils/constants';

const ActivatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTrackerStatus(true));
  }, []);

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5 text-gray-600">
      <div
        className="bg-no-repeat bg-right-bottom bg-image"
        style={{
          backgroundImage: `url(${ImageSrc.IAHLogoBG})`,
          zIndex: 10,
        }}
      >
        <div className="flex flex-col gap-1 items-center text-center ">
          <h2 className="text-3xl font-semibold text-black">
            Activate as an I-AM-HUMAN Verified Human
          </h2>
          <p className="text-sm leading-5 mt-5">
            As a verified human, not only could you build your on-chain
            reputation through a number of Community Soul Bound Tokens, you have
            access to on-chain voting on governance, participation in DAOs and
            grassroots funding, and much more.
            <br />
            Engage in governance, build a strong on-chain reputation, and drive
            grassroots funding. <br />
            Shape the future of NEAR with meaningful and impactful actions.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3 my-10 md:my-16">
          <ImageTextBlock
            imageSrc={ImageSrc.NDCLogo}
            isAvailable={true}
            onClick={() => window.open(Links.ELECTIONS, '_blank')}
            title="NEAR General Election"
            description="The NDC is launching the inaugural ecosystem wide General Election to enable decentralized governance on-chain. #Vote in the September 8th General Election and mint your “I Voted” reputation Soul Bound Token!"
            buttonText="Vote Now"
          />
          <ImageTextBlock
            imageSrc={ImageSrc.NDCLogo}
            isAvailable={true}
            title="NDC Nomination"
            description="Are you a dedicated OG member of the NEAR community? Nominate yourself for a seat in the NDC General Election. Realize your vision to grow the NEAR ecosystem. Verified humans, comment and upvote on your favorite candidates."
            onClick={() =>
              window.open(
                'https://near.org/nomination.ndctools.near/widget/NDC.Nomination.Page',
                '_blank'
              )
            }
            buttonText="Participate Now"
          />
          <ImageTextBlock
            imageSrc={ImageSrc.NDCPoll}
            isAvailable={true}
            title="NDC Official Polls"
            description="Explore polls officially conducted by the NDC. These polls are verified, authoritative, and can provide valuable insights on the ecosystem! Participating in the Official Polls will eventually contribute to your on-chain reputation. Your opinions matter. #Vote"
            buttonText="Vote in Polls"
            onClick={() =>
              window.open(
                'https://near.org/easypoll-v0.ndc-widgets.near/widget/EasyPoll?page=official_polls',
                '_blank'
              )
            }
          />
          <ImageTextBlock
            imageSrc={ImageSrc.NDCLogo}
            isAvailable={true}
            title="NDC Gigs"
            description="NDC regularly engages the community with NDC Gigs to onboard more contributors and to engage with community members who have a desire to support Open Source Development and to build public goods. Try your hand at a gig today!"
            buttonText="Do a Gig"
            onClick={() =>
              window.open(
                'https://near.org/neardigitalcollective.near/widget/Gigs',
                '_blank'
              )
            }
          />

          <ImageTextBlock
            imageSrc={ImageSrc.NDCKudos}
            onClick={() => window.open(Links.KUDOS_WIDGET, '_blank')}
            isAvailable={true}
            title="NDC Kudos"
            description='The NDC Kudos platform aims to create a reputation point system where humans can give each other recognition known as "Kudos." With enough social proof, you can mint a "Proof of Kudos" Soul Bound Token to display your contribution and your reputation in the NEAR ecosystem.'
            buttonText="Give a Kudo"
          />
          <ImageTextBlock
            imageSrc={ImageSrc.NDCEvents}
            isAvailable={true}
            title="Join NDC @ Events"
            description="Attend NDC sponsored blockchain events, hang out with the NEAR Digital Collective contributors, and collect the unique “Proof of Vibe” Soul Bound Tokens by passing vibe checks. It grants exclusive access to high-caliber gatherings, turning them into celebrations of our collective spirit."
            onClick={() =>
              window.open('https://t.me/+NjNy-5yl_KllNmYx', '_blank')
            }
            buttonText="See you IRL"
          />
          <ImageTextBlock
            imageSrc={ImageSrc.CommunityFund}
            title="NDC CommunityFund"
            description="The CommunityFund is an innovative public funding infrastructure designed to facilitate community-driven capital deployment by the NEAR community for the NEAR community. Propose your idea and receive community funding. "
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivatePage;
