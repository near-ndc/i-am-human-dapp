import { useSelector } from 'react-redux';
import { ImageSrc, ReducerNames } from '../../utils/constants';
import { Item, TokenDetails, ValidTokenComponent } from './TokenDetails';

const TokensGrid = () => {
  const { fvToken, kycToken, ogToken, vibeToken, regenToken, kudosToken } =
    useSelector((state) => state[ReducerNames.SBT]);

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
    </div>
  );
};

export default TokensGrid;
