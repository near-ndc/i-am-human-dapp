import moment from 'moment-timezone';

// OneE18 is an amount of 1 microNEAR
export const OneE18 = 1_000_000_000_000_000_000n;
// OneE21 is an amount of 1 miliNEAR
export const OneE21 = OneE18 * 1000n;
// OneE24 is an amount of 1 NEAR
export const OneE24 = OneE21 * 1000n;

export const TWITTER_TEXT = process.env.REACT_APP_TWITTER_TEXT; // using env so that marketing team is able to change it frequently

export const TWITTER_URL = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}`;

export const LSKeys = {
  SHOW_SBT_PAGE: 'showSuccessSBTPage',
  TRANSFER_ADDR: 'Transfer Address',
};

export const URLs = {
  SCOREBOARD: '/community-scoreboard',
  SBTs: '/community-sbts',
  HOME: '/',
  ACTIVATE: '/activate',
};

export const TokenTypes = {
  KYC: 'KYC',
  OG: 'OG',
  FV: 'FV',
  VIBE: 'Vibe',
  REGEN: 'Regen',
  KUDOS: 'Kudos',
  NDC_Champion: 'NDC Champion',
  NDC_Contributor: 'NDC Contributor',
  GWG__Core_Contributor: 'GWG Core Contributor',
  MOD: 'Mod',
};

export const ReducerNames = {
  ORACLE: 'Oracle',
  SBT: 'SBT',
  COMMON: 'Common',
  PROGRESS: 'Progress Tracker',
};

export const ContractMethodNames = {
  BURN: 'sbt_burn_all',
  TRANSFER: 'sbt_soul_transfer',
};

export const BrandColor = '#9333EA';

export const CommunityDataKeys = {
  COMMUNITY_NAME: 'community-name',
  COMMUNITY_VERTICAL: 'community-vertical',
};

export const ImageSrc = {
  ProofOfVibe:
    'https://bafybeibgjf5jqgmqgfcd2maih6n3juo3in5rblyuk3zhm4l3o6wysvippq.ipfs.nftstorage.link/',
  ProofOfRegen:
    'https://bafybeihaxmq6m74k6le2c7xldvhwds2e4erk4poidgsbumc6kivu7n3gwy.ipfs.nftstorage.link/',
  ProofOfKudos:
    'https://bafybeig3tgn5gnrv2c4edfun5ewcxr7vimymlsucpebdbvkzfbn6ksnghy.ipfs.nftstorage.link/',
  ProofOfDev:
    'https://bafybeias5z6ncjbpuusqs2ov7752skn2zaw3o4uw2vnjbdhg7hv4xxhsdy.ipfs.nftstorage.link/',
  OGSBT:
    'https://bafybeifl4fyd2clfuc73sz3c3cxyraapavx5q4a6pzflqhe4jcm26ib5be.ipfs.nftstorage.link/',
  NDCPoll:
    'https://bafkreifogwnduwjfy7hsystz2jhxfykjojgnbdgsfj2bolohpicjau44k4.ipfs.nftstorage.link/',
  NDCLogo:
    'https://bafkreifz73ori5ojogttw6jy4fkb6uiehcz4fwedd362bzmliryi627a6m.ipfs.nftstorage.link/',
  NDCKudos:
    'https://bafkreidbd57skxolss6un7zzdq3bn2t4kcpdqs3jxbqn7gdymxkd3a3zk4.ipfs.nftstorage.link/',
  NDCEvents:
    'https://bafkreicuaijmzmz7l2isi3csslaw3gzemfxtw2fcsbpmpqvhsupddeu6fq.ipfs.nftstorage.link/',
  IAHLogo:
    'https://bafybeid4hlg7litcsn4gjpk5qednyarcsgmadzjovjk5k7565xdtd2aulu.ipfs.nftstorage.link/',
  NDCContributor:
    'https://bafybeihqm7mgalpd5eojab62xgm5uriewubual4ia2hom3gw6w4b2qlp7e.ipfs.nftstorage.link/',
  NDCChampion:
    'https://bafybeifavv7ehsgs6dm3j62w3d6c6cx5a2gwfnyhbygp2cylebmkovl5n4.ipfs.nftstorage.link/',
  MOD: 'https://bafybeiflx3j4k65wtdwx7jcqsopj44x2safzdqd3kbcf6j5yke7v3ipspq.ipfs.nftstorage.link/',
  KYCSBT:
    'https://bafybeia3nlga6mdewvx3qboxbz2ufh5ao55n5pjnsvtkwz3qkfo6qr35fm.ipfs.nftstorage.link/',
  JuggernautSBT:
    'https://bafybeib7t53imgmlw7uuixoe77yi4hvrrvgpt7a2f5skp26yqfvcrd5fgm.ipfs.nftstorage.link/',
  IVotedSBT:
    'https://bafkreiccyddqgx2nmfsjizzwqanjm5h4tkfxtgmnz6cilvil2esz73ozbu.ipfs.nftstorage.link/',
  IAHLogoBG:
    'https://bafybeig5wzbcgfgojt5jo4hzytmt7yycmjivvn5t5zry73hllpqacgfskq.ipfs.nftstorage.link/',
  GWGCoreContributorSBT:
    'https://bafybeif25rcmixlqfpt6elslhcpbrgbcypfrero5q7yov5aqdofphxpwte.ipfs.nftstorage.link/',
  GWGContributorSBT:
    'https://bafybeic54hewquwj4ow3xcxo3lpzroskr3ihyh6dojme22s27ypdhgsdcy.ipfs.nftstorage.link/',
  GeniusSBT:
    'https://bafybeif3obkvf6zfaxbnb6if5ysassuint6w63lunpoe5umg72g773zeca.ipfs.nftstorage.link/',
  FVSBT:
    'https://bafybeifle6sajhabyxzgusimfwng6nclynzcjfkhkxox27pfgwpywmy3hu.ipfs.nftstorage.link/',
  DegenSBT:
    'https://bafybeih6kqhfke6xxroopz7imbelg3uodxdamdva7bbyvqsno3xxvc5qty.ipfs.nftstorage.link/',
  CreativeSBT:
    'https://bafybeiav4kx23oivkxa57nqheyumgodatxlvbwemkfe6aidn7n66jphnf4.ipfs.nftstorage.link/',
  CommunitySBT:
    'https://bafybeidoqupgkrh63ay2ji7lsg3vhn3c5tv6hybd6h2ytuz7tdqp2fhuzy.ipfs.nftstorage.link/',
  EmptyBG:
    'https://bafkreiaijntboz567hb7xhqwwmvqmtin64twkoiz3fhttg35ln372fvram.ipfs.nftstorage.link/',
  EmptyIcon:
    'https://bafkreialtxsodm5coxfkkec4ybakyghk7horpxnyuifg4la4ye6vjhlf64.ipfs.nftstorage.link/',
  CommunityFund:
    'https://bafkreicvwvjtybib7nodjus5ynomjasp3xskz2et5tkrx6k7t3h7dsq2za.ipfs.nftstorage.link/',
  ELECTION_ICON:
    'https://bafkreidrd4ci3p23e7zttaq5ukpzeddyzvfdm37x3xomju3rgeq77f2dba.ipfs.nftstorage.link/',
};

export const Links = {
  KUDOS_WIDGET: 'https://near.org/kudos.ndctools.near/widget/NDC.Kudos.Main',
  WHISTLEBLOWER:
    'https://medium.com/@neardigitalcollective/introducing-ndc-whistleblower-bounty-program-d4fe1b9fc5a0',
  FAIR_VOTING_POLICY:
    'https://bafkreidwdxocdkfsv6srynw7ipnogfuw76fzncmxd5jv7furbsn5cp4bz4.ipfs.nftstorage.link/',
};

export const AccountFlag = {
  Blacklisted: 'Blacklisted',
  Verified: 'Verified',
};

export const IAHShutDownStartTime = moment.unix(1693612799); // September 1 @ 23:59:59
export const IAHShutDownEndTime = moment.unix(1695427199); // September 22 @ 23:59:59
