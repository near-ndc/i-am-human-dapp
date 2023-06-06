export const TWITTER_TEXT = process.env.REACT_APP_TWITTER_TEXT; // using env so that marketing team is able to change it frequently
export const TWITTER_URL = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}`;

// contents
export const PRIVACY_CONTENT = {
  title: 'We Take Your Privacy Seriously',
  description:
    'We value your privacy and believe your right to control your data. You \
    always have the right to request the deletion of your data from \
    I-AM-HUMAN and our partner Fractal. To find out more, please read our \
    documentation about your privacy and our approach to GDPR compliance.',
};

export const FACE_VERIFICATION_CONTENT = {
  title: 'Get your Face Verification Soul Bound Token',
  description:
    'We have partnered with Fractal for Face Verification. Why? With \
    nearly 1 million users across 200+ projects, Fractal provides a full \
    stack of open source identity solutions that give you ability to \
    easily verify and prove that you are a human. They ensure that each \
    person only creates one unique account.',
};

export const KYC_CONTENT = {
  title: 'Get Your KYC Soul Bound Token',
  description:
    'Have you already KYC with Fractal? You are in luck. If you have \
    received a bounty payout for your contribution from the NEAR \
    Foundation, you will not be required to re-verify your identity when \
    minting your SBTs. Mint your SBTs now.',
};

export const COMMUNITY_CONTENT = {
  title: 'Get Your Community Soul Bound Token',
  description:
    'Are you part of the Community? If you are active in the NEAR \
    Community, we will be introducing Community SBT soon. Mint your \
    Community SBT and join us to build web3 governance.',
};

export const OG_SBT_CONTENT = {
  title: 'Get Your OG Soul Bound Token',
  description:
    'Are you someone who stands out in the NEAR ecosystem? Get the OG \
    Soul Bound Token. We will create a "seed group" of OGs and trusted \
    individuals to bootstrap the next iteration of NEAR Community.',
};

export const COMPETITION_CONTENT = {
  title: 'I-AM-HUMAN Onboarding Competition',
  description:
    'Get your personal tracking links to onboard humans and see \
    scores here. For more information, join this telegram group \
    for competition details.',
};

// NEAR
export const DEFAULT_TGAS = '60000000000000';
export const NO_DEPOSIT = '0';
