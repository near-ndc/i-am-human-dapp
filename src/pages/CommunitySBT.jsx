import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTrackerStatus } from '../redux/reducer/tracker';
import ImageTextBlock from '../components/common/ImageTextBlock';
import { ImageSrc, Links } from '../utils/constants';

const CommunitySBTPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTrackerStatus(true));
  }, []);

  return (
    <div>
      <div className="isolate bg-white mx-auto max-w-7xl px-5 text-gray-600">
        <div
          className="bg-no-repeat bg-right-bottom bg-image"
          style={{
            backgroundImage: `url(${ImageSrc.IAHLogoBG})`,
            zIndex: 10,
          }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-black">
              Meet the Community Soul Bound Tokens
            </h2>
            <h4 className="text-sm leading-2 mt-5">
              We're thrilled to announce that Community Soul Bound Tokens are
              here. Bringing with them a groundbreaking feature – the power of
              on-chain reputation. Embrace the power of reputation on the
              blockchain, where your contributions are valued, acknowledged, and
              rewarded. Join us as we forge ahead being on-chain identity and
              reputation. Apply for your Soul Bound Tokens!
              <br />
              <br />
              All Community Soul Bound Tokens requires a Face Verification Soul
              Bound Token to be minted.
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3 my-10 md:my-16">
            <ImageTextBlock
              imageSrc={ImageSrc.OGSBT}
              title="OG"
              description="The OG SBT represents your commitment and dedication to NEAR, highlighting your continuous presence and involvement in shaping the NEAR ecosystem."
              isAvailable={true}
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSfQ80mza1ssDRuEkjTl61ty0ORxm23whmwBDlaxWHjodTiz-w/viewform',
                  '_blank'
                )
              }
            />
            <ImageTextBlock
              isAvailable={true}
              onClick={() =>
                window.open('https://NEAReFi.org/telegram', '_blank')
              }
              imageSrc={ImageSrc.ProofOfRegen}
              title="Regen"
              description="This SBT symbolizes regenerative potential and the power to heal the world, one act at a time. It's a declaration, proclaiming the bearer as an active participant in creating a compassionate, sustainable world."
            />
            <ImageTextBlock
              isAvailable={true}
              onClick={() =>
                window.open('https://www.proofofvibes.com/telegram', '_blank')
              }
              imageSrc={ImageSrc.ProofOfVibe}
              title="Proof of Vibe"
              description="This SBT is a unique badge earned by attending special events and passing vibe checks. It grants exclusive access to high-caliber gatherings, turning them into celebrations of our collective spirit."
            />
            <ImageTextBlock
              isAvailable={true}
              onClick={() => window.open(Links.KUDOS_WIDGET, '_blank')}
              imageSrc={ImageSrc.ProofOfKudos}
              title="Proof of Kudos"
              description="This SBT is an electrifying badge bestowed upon individuals who have garnered immense praise, backed by overwhelming social proof."
            />
            <ImageTextBlock
              imageSrc={ImageSrc.GWGCoreContributorSBT}
              title="GWG Core Contributor"
              description="This SBT shows off your invaluable contribution to the NDC Governance Working Group and unveils your pivotal role in shaping the fabric of governance and decentralization at NEAR."
              isAvailable={true}
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSdGsZnC1EL9mwgCkiL9FI45hqn8niXqS_sd_aSN6hR_YamYtw/viewform',
                  '_blank'
                )
              }
            />
            <ImageTextBlock
              imageSrc={ImageSrc.NDCContributor}
              title="NDC Contributor"
              description="This SBT proves that you are a contributor to the NEAR Digital Collective."
              isAvailable={true}
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSe5x4O8RMTzuQQtRAi9dSgABVSyjcF1jPz8vurxQNfhkLzwBg/viewform',
                  '_blank'
                )
              }
            />
            <ImageTextBlock
              imageSrc={ImageSrc.NDCChampion}
              title="NDC Champion"
              description="This SBT is proof of being a champion within the NEAR Digital Collective. Embrace its power and ignite a revolution of greatness!"
              isAvailable={true}
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLScKWL0fTZxm7obR4kQkm8ozPLaZ__BO8TI8l1Uj_cosgZ6D6A/viewform',
                  '_blank'
                )
              }
            />
            <ImageTextBlock
              imageSrc={ImageSrc.MOD}
              title="Mod"
              description="This SBT is your gateway to moderator greatness within the NEAR Digital Collective. Unleash its power of curation and influence."
              isAvailable={true}
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSfUD_pdp3I-X-z17ks2y2_pN9xEEIIBzQ_jJXRTYYj9zO2BTw/viewform',
                  '_blank'
                )
              }
            />
            <ImageTextBlock
              imageSrc={ImageSrc.CreativeSBT}
              title="Creative"
              description="This SBT is an electrifying testament to your creative genius within the esteemed Creative Constellation."
            />
            <ImageTextBlock
              imageSrc={ImageSrc.ProofOfDev}
              title="Proof of Dev"
              description="This SBT is a proof of your contribution as a NEAR Digital Collective developer, unlocking a realm of limitless possibilities."
            />
            <ImageTextBlock
              imageSrc={ImageSrc.DegenSBT}
              title="Degen"
              description="This SBT unveils your mastery as a marketing powerhouse within the legendary Degen Constellation."
            />
            {/* don't need it for now */}
            {/* <ImageTextBlock
              imageSrc={ImageSrc.GWGContributorSBT}
              title="GWG Contributor"
              description="This SBT shows off your important contribution to the NDC Governance Working Group. Prepare to wield its power and shape the destiny of governance like never before."
            /> */}
            <ImageTextBlock
              imageSrc={ImageSrc.JuggernautSBT}
              title="Juggernaut"
              description="This SBT is the mark of a revered figurehead within NEAR, commanding admiration and leading the way to unparalleled greatness."
            />
            <ImageTextBlock
              imageSrc={ImageSrc.GeniusSBT}
              title="Genius"
              description="This SBT is a testament to your genius and visionary prowess, propelling the NEAR ecosystem to new heights with brilliant ideas. Unleash its power and shape the future like never before!"
            />
            <ImageTextBlock
              imageSrc={ImageSrc.IVotedSBT}
              title="I VOTED SBT"
              description="Celebrate your participation in the inaugural NDC election. It is important to mint this SBT to show off your voting record, to vote on future referendums, and much more."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySBTPage;
