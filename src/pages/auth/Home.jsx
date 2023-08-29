import React, { useEffect, useState } from 'react';
import { wallet } from '../../index';
import { getConfig } from '../../utils/config';
import { toast } from 'react-toastify';
import { isNumber } from '../../utils/utilityFunctions';
import {
  AccountFlag,
  ImageSrc,
  LSKeys,
  ReducerNames,
  TokenTypes,
} from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateTokens } from '../../redux/reducer/sbtsReducer';
import TokensGrid from '../../components/common/TokensGrid';
import { setActivePageIndex } from '../../redux/reducer/commonReducer';
import { InfoIcon } from '../../images/InfoIcon';
import { PrimaryButton } from '../../components/common/Buttons';

const Home = () => {
  const { isUserHuman } = useSelector((state) => state[ReducerNames.SBT]);
  const { activePageIndex } = useSelector(
    (state) => state[ReducerNames.COMMON]
  );
  const dispatch = useDispatch();
  const {
    app_contract,
    fractal_contract,
    og_contract,
    regen_issuer_contract,
    vibe_issuer_contract,
    kudos_issuer_contract,
    mods_issuer,
  } = getConfig();
  useEffect(() => {
    // fetching only when logged in (without steps) state active
    if (!isNumber(activePageIndex)) {
      fetchOGSBTTokens();
      fetchTokens();
      fetchRegenToken();
      fetchVibeToken();
      fetchKudosToken();
      fetchModsToken();
    }
  }, [activePageIndex]);

  const [showTooltip, setShowtooltip] = useState(false);
  const [voterStatus, setVoterStatus] = useState(null);

  const fetchOGSBTTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: og_contract, // issuer is community sbt contract
        },
      });

      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => OG token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.OG, value: token }));
          }
          // 2 = NDC_Contributor, 3 = GWG__Core_Contributor, 4 = NDC_Champion
          if (token.metadata.class === 2) {
            dispatch(
              updateTokens({ type: TokenTypes.NDC_Contributor, value: token })
            );
          }
          if (token.metadata.class === 3) {
            dispatch(
              updateTokens({
                type: TokenTypes.GWG__Core_Contributor,
                value: token,
              })
            );
          }
          if (token.metadata.class === 4) {
            dispatch(
              updateTokens({ type: TokenTypes.NDC_Champion, value: token })
            );
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching OG Token details');
    }
  };

  const fetchRegenToken = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: regen_issuer_contract,
        },
      });

      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => Regen token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.REGEN, value: token }));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching Regen SBT details');
    }
  };

  const fetchModsToken = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: mods_issuer,
        },
      });

      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 5 => Mods token
          if (token.metadata.class === 5) {
            dispatch(updateTokens({ type: TokenTypes.MOD, value: token }));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching Mods SBT details');
    }
  };

  const fetchVibeToken = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: vibe_issuer_contract,
        },
      });
      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => Regen token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.VIBE, value: token }));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching Vibe SBT details');
    }
  };

  const fetchKudosToken = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: kudos_issuer_contract,
        },
      });
      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => Kudos token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.KUDOS, value: token }));
          }
        }
      }
    } catch (error) {
      toast.error('An error occured while fetching Kudos SBT details');
    }
  };

  const fetchTokens = async () => {
    try {
      const data = await wallet.viewMethod({
        contractId: app_contract,
        method: 'sbt_tokens_by_owner',
        args: {
          account: wallet.accountId,
          issuer: fractal_contract, // issuer is fractal
        },
      });
      if (data?.[0]?.[1]) {
        for (const token of data[0][1]) {
          // if class = 1 => FV token
          if (token.metadata.class === 1) {
            dispatch(updateTokens({ type: TokenTypes.FV, value: token }));
          } else {
            dispatch(updateTokens({ type: TokenTypes.KYC, value: token }));
          }
        }
      } else {
        // user logged in, no tokens found, setting LS to show success SBT page whenever tokens exists
        localStorage.setItem(LSKeys.SHOW_SBT_PAGE, true);
      }
    } catch (error) {
      toast.error(
        'An error occured while fetching face verification SBT details'
      );
    }
  };

  // useEffect(() => {
  //   if (isUserHuman) {
  //     fetchVoterStatus();
  //   }
  // }, [isUserHuman]);

  const fetchVoterStatus = async () => {
    const data = await wallet.viewMethod({
      contractId: app_contract,
      method: 'account_flagged',
      args: {
        account: wallet.accountId,
      },
    });
    setVoterStatus(data);
  };

  const tagClasses = 'rounded-2xl md:rounded-full p-2 px-4';

  const ToolTip = ({ heading, description }) => {
    return (
      <div class="w-60 bg-black text-white text-xs rounded-lg py-3 absolute z-10 bottom-full -left-28 px-4 mb-1">
        <div className="flex flex-col gap-2">
          <h2>{heading}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        <svg
          class="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    );
  };

  const VerifiedTag = () => {
    return (
      <div
        className={tagClasses + ' text-white'}
        style={{ backgroundColor: '#16C784' }}
      >
        Verified Voter
      </div>
    );
  };

  const BlacklistTag = () => {
    return (
      <div className="flex gap-3 items-center">
        <div
          className={
            tagClasses + ' flex gap-2 items-center bg-black text-white'
          }
        >
          <p>Blacklist</p>
          <div
            onMouseOver={() => setShowtooltip(true)}
            onMouseLeave={() => setShowtooltip(false)}
            className="bg-icon-white pointer group relative"
          >
            <InfoIcon />
            {showTooltip && (
              <ToolTip
                heading="Blacklist"
                description="The community has voted to block backlisted accounts from voting
          in the NDC general election. You have been blacklisted due
          previously violating the Fair Voting Policy."
              />
            )}
          </div>
        </div>
        <PrimaryButton
          onClick={() =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSdQYxiUcxpiCDVKnN55Q7T2fnUPt0VjRdzo46qEkV7ub5mWFw/viewform',
              '_blank'
            )
          }
        >
          Complete Appeal
        </PrimaryButton>
      </div>
    );
  };

  const VerificationTag = () => {
    return (
      <div className="flex gap-3 items-center">
        <div
          style={{ backgroundColor: '#FDE047' }}
          className={tagClasses + ' flex gap-2 items-center'}
        >
          <p className="font-semibold"> More Verification Need</p>
          <div
            onMouseOver={() => setShowtooltip(true)}
            onMouseLeave={() => setShowtooltip(false)}
            className="pointer group relative"
          >
            <InfoIcon />
            {showTooltip && (
              <ToolTip
                heading="More Verification Need"
                description=" Voters without reputation need to be verified by the Election
              Integrity Council or place a substantial bond to vote."
              />
            )}
          </div>
        </div>
        <PrimaryButton
          onClick={() =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSfa3S6Qz1MdiJEXINMICv9O9oVD7LOdwiPmHI_4_gCLAhN0CA/viewform',
              '_blank'
            )
          }
        >
          Apply to Verify
        </PrimaryButton>
      </div>
    );
  };

  const VoterStatusTags = () => {
    switch (voterStatus) {
      case AccountFlag.Blacklisted:
        return <BlacklistTag />;
      case AccountFlag.Verified:
        return <VerifiedTag />;
      default:
        return <VerificationTag />;
    }
  };

  return (
    <div className="mb-20">
      {/* voter status */}
      {/* {isUserHuman && (
        <div className="bg-gray-100 p-6 flex justify-between items-center rounded-lg mb-8 flex-wrap">
          <h1 className="font-semibold text-xl">Voter Status</h1>
          <VoterStatusTags />
        </div>
      )} */}
      <h1 className="text-center text-2xl font-semibold mb-10">
        My I-AM-HUMAN Soul Bound Tokens
      </h1>
      <div className="flex flex-col gap-32">
        {!isUserHuman ? (
          <div>
            <div
              style={{ backgroundImage: `url(${ImageSrc.EmptyBG})` }}
              className="bg-center py-5"
            >
              <div className="flex justify-center">
                <img src={ImageSrc.EmptyIcon} />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold"> No SBTs Available </h2>
                <p className="my-3">
                  Looks like you don't have SBTs available, then it's time to
                  mint your first SBTs.
                </p>
                <button
                  onClick={() => dispatch(setActivePageIndex(1))}
                  className="rounded-md border mt-5 mb-2 border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                >
                  Mint your SBTs Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <TokensGrid />
        )}
      </div>
    </div>
  );
};

export default Home;
