import { useSelector } from 'react-redux';
import { ImageSrc, ReducerNames } from '../../utils/constants';
import { Item, TokenDetails, ValidTokenComponent } from './TokenDetails';

const TokensGrid = () => {
  const {
    fvToken,
    kycToken,
    ogToken,
    vibeToken,
    regenToken,
    kudosToken,
    ndcContributor,
    ndcChampion,
    gwgCoreContributor,
    modToken,
    iVotedToken,
    coaToken,
    homToken,
    tcToken,
  } = useSelector((state) => state[ReducerNames.SBT]);

  return (
    <div className="flex flex-col gap-y-10 flex-wrap gap-5">
      {fvToken && (
        <Item imageSrc={ImageSrc.FVSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Face Verification Soul Bound Token
          </h2>
          <TokenDetails data={fvToken} />
        </Item>
      )}
      {kycToken && (
        <Item imageSrc={ImageSrc.KYCSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My KYC Soul Bound Token
          </h2>
          <TokenDetails data={kycToken} />
        </Item>
      )}
      {ogToken && (
        <Item imageSrc={ImageSrc.OGSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My OG Soul Bound Token
          </h2>
          <TokenDetails data={ogToken} />
        </Item>
      )}
      {vibeToken && (
        <Item imageSrc={ImageSrc.ProofOfVibe}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Vibe Soul Bound Token
          </h2>
          <TokenDetails data={vibeToken} />
        </Item>
      )}
      {regenToken && (
        <Item imageSrc={ImageSrc.ProofOfRegen}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Regen Soul Bound Token
          </h2>
          <TokenDetails data={regenToken} />
        </Item>
      )}
      {kudosToken && (
        <Item imageSrc={ImageSrc.ProofOfKudos}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Kudos Soul Bound Token
          </h2>
          <TokenDetails data={kudosToken} />
        </Item>
      )}
      {gwgCoreContributor && (
        <Item imageSrc={ImageSrc.GWGCoreContributorSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My GWG Core Contributor Soul Bound Token
          </h2>
          <TokenDetails data={gwgCoreContributor} />
        </Item>
      )}
      {ndcChampion && (
        <Item imageSrc={ImageSrc.NDCChampion}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My NDC Champion Soul Bound Token
          </h2>
          <TokenDetails data={ndcChampion} />
        </Item>
      )}
      {ndcContributor && (
        <Item imageSrc={ImageSrc.NDCContributor}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My NDC Contributor Soul Bound Token
          </h2>
          <TokenDetails data={ndcContributor} />
        </Item>
      )}
      {modToken && (
        <Item imageSrc={ImageSrc.MOD}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Mod Soul Bound Token
          </h2>
          <TokenDetails data={modToken} />
        </Item>
      )}
      {iVotedToken && (
        <Item imageSrc={ImageSrc.IVotedSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My I Voted Soul Bound Token
          </h2>
          <TokenDetails data={iVotedToken} />
        </Item>
      )}
      {coaToken && (
        <Item imageSrc={ImageSrc.CoA}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Council of Advisor Soul Bound Token
          </h2>
          <TokenDetails data={coaToken} />
        </Item>
      )}
      {homToken && (
        <Item imageSrc={ImageSrc.HoM}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My House of Merit Soul Bound Token
          </h2>
          <TokenDetails data={homToken} />
        </Item>
      )}
      {tcToken && (
        <Item imageSrc={ImageSrc.TC}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Transparency Commission Soul Bound Token
          </h2>
          <TokenDetails data={tcToken} />
        </Item>
      )}
    </div>
  );
};

export default TokensGrid;
