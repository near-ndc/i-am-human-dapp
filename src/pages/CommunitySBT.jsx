import OGSBT from '../images/OGSBT.png';
import CreativeOGSBT from '../images/CREATIVE.png';
import DegenOGSBT from '../images/DEGEN.png';
import GeniusOGSBT from '../images/GENIUS.png';
import GWGContributorOGSBT from '../images/GWG CONTRIBUTOR.png';
import CoreContributorOGSBT from '../images/GWG_CORE_CONTRIBUTOR.png';
import JuggernautOGSBT from '../images/JUGGERNAUT.png';
import ModOGSBT from '../images/MOD.png';
import NDCChampionOGSBT from '../images/NDC_CHAMPION.png';
import NDCContributorOGSBT from '../images/NDC_CONTRIBUTOR.png';
import ProofOfDevOGSBT from '../images/PROOF_OF_DEV.png';
import ProofOfVibeOGSBT from '../images/PROOF_OF_VIBE.png';
import ProofOfKudos from '../images/PROOF_OF_KUDOS.png';
import ProofOfRegen from '../images/PROOF_OF_REGEN.png';
import HandLogo from '../images/HandLogo.png';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { OutlineButton } from '../components/common/OutlineButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTrackerStatus } from '../redux/reducer/tracker';

const CommunitySBTPage = () => {
  const dispatch = useDispatch();

  const Item = ({
    imageSrc,
    title,
    description,
    isAvailable = false,
    onClick,
  }) => {
    return (
      <div className="flex gap-6 hover-card p-4 md:p-5">
        <img
          className="max-w-[130px] md:max-w-[160px] md:h-auto rounded-lg object-cover"
          src={imageSrc}
        />
        <div className="flex flex-col gap-1 leading-1">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-xs flex-1">{description}</p>
          <div>
            {isAvailable ? (
              <PrimaryButton onClick={onClick}>
                <p className="text-sm">Apply Now</p>
              </PrimaryButton>
            ) : (
              <OutlineButton classes="cursor-auto">
                <p className="text-sm">Coming Soon</p>
              </OutlineButton>
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(updateTrackerStatus(true));
  }, []);

  return (
    <div>
      <div className="isolate bg-white mx-auto max-w-7xl px-5">
        <div
          className="bg-no-repeat bg-right-bottom bg-image"
          style={{
            backgroundImage: `url(${HandLogo})`,
            zIndex: 10,
          }}
        >
          <div className="text-center mt-[80px] md:mt-[100px]">
            <h2 className="text-3xl font-semibold">
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
          <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3 my-16">
            <Item
              imageSrc={OGSBT}
              isAvailable={true}
              title="OG"
              description="The OG SBT represents your commitment and dedication to NEAR, highlighting your continuous presence and involvement in shaping the NEAR ecosystem."
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSfQ80mza1ssDRuEkjTl61ty0ORxm23whmwBDlaxWHjodTiz-w/viewform',
                  '_blank'
                )
              }
            />
            <Item
              isAvailable={true}
              onClick={() =>
                window.open('https://NEAReFi.org/telegram', '_blank')
              }
              imageSrc={ProofOfRegen}
              title="Regen"
              description="This SBT symbolizes regenerative potential and the power to heal the world, one act at a time. It's a declaration, proclaiming the bearer as an active participant in creating a compassionate, sustainable world."
            />
            <Item
              isAvailable={true}
              onClick={() =>
                window.open('https://www.proofofvibes.com/telegram', '_blank')
              }
              imageSrc={ProofOfVibeOGSBT}
              title="Proof of Vibe"
              description="This SBT is a unique badge earned by attending special events and passing vibe checks. It grants exclusive access to high-caliber gatherings, turning them into celebrations of our collective spirit."
            />
            <Item
              imageSrc={ProofOfKudos}
              title="Proof of Kudos"
              description="This SBT is an electrifying badge bestowed upon individuals who have garnered immense praise, backed by overwhelming social proof."
            />

            <Item
              imageSrc={CreativeOGSBT}
              title="Creative"
              description="This SBT is an electrifying testament to your creative genius within the esteemed Creative Constellation."
            />
            <Item
              imageSrc={ProofOfDevOGSBT}
              title="Proof of Dev"
              description="This SBT is a proof of your contribution as a NEAR Digital Collective developer, unlocking a realm of limitless possibilities."
            />
            <Item
              imageSrc={DegenOGSBT}
              title="Degen"
              description="This SBT unveils your mastery as a marketing powerhouse within the legendary Degen Constellation."
            />
            <Item
              imageSrc={ModOGSBT}
              title="Mod"
              description="This SBT is your gateway to moderator greatness within the NEAR Digital Collective. Unleash its power of curation and influence."
            />
            <Item
              imageSrc={GWGContributorOGSBT}
              title="GWG Contributor"
              description="This SBT shows off your important contribution to the NDC Governance Working Group. Prepare to wield its power and shape the destiny of governance like never before."
            />
            <Item
              imageSrc={CoreContributorOGSBT}
              title="GWG Core Contributor"
              description="This SBT shows off your invaluable contribution to the NDC Governance Working Group and unveils your pivotal role in shaping the fabric of governance and decentralization at NEAR."
            />
            <Item
              imageSrc={NDCContributorOGSBT}
              title="NDC Contributor"
              description="This SBT proves that you are a contributor to the NEAR Digital Collective."
            />
            <Item
              imageSrc={JuggernautOGSBT}
              title="Juggernaut"
              description="This SBT is the mark of a revered figurehead within NEAR, commanding admiration and leading the way to unparalleled greatness."
            />
            <Item
              imageSrc={NDCChampionOGSBT}
              title="NDC Champion"
              description="This SBT is proof of being a champion within the NEAR Digital Collective. Embrace its power and ignite a revolution of greatness!"
            />
            <Item
              imageSrc={GeniusOGSBT}
              title="Genius"
              description="This SBT is a testament to your genius and visionary prowess, propelling the NEAR ecosystem to new heights with brilliant ideas. Unleash its power and shape the future like never before!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySBTPage;
