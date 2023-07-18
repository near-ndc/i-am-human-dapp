import { useSelector } from 'react-redux';
import { ReducerNames } from '../../utils/constants';
import { Item, TokenDetails, ValidTokenComponent } from './TokenDetails';
import FVSBTImage from '../../images/FvSBT.png';
import KYCSBTImage from '../../images/KYCSBT.png';
import OGSBT from '../../images/OGSBT.png';
import ProofOfVibeOGSBT from '../../images/PROOF_OF_VIBE.png';

const TokensGrid = () => {
  const { fvToken, kycToken, ogToken, vibeToken, regenToken } = useSelector(
    (state) => state[ReducerNames.SBT]
  );

  return (
    <div className="flex flex-col gap-y-10 flex-wrap gap-5">
      {fvToken && (
        <Item imageSrc={FVSBTImage}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Face Verification Soul Bound Token
          </h2>
          <TokenDetails data={fvToken} />
        </Item>
      )}
      {kycToken && (
        <Item imageSrc={KYCSBTImage}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My KYC Soul Bound Token
          </h2>
          <TokenDetails data={kycToken} />
        </Item>
      )}
      {ogToken && (
        <Item imageSrc={OGSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My OG Soul Bound Token
          </h2>
          <TokenDetails data={ogToken} />
        </Item>
      )}
      {vibeToken && (
        <Item imageSrc={ProofOfVibeOGSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Vibe Soul Bound Token
          </h2>
          <TokenDetails data={vibeToken} />
        </Item>
      )}
      {regenToken && (
        <Item imageSrc={ProofOfVibeOGSBT}>
          <ValidTokenComponent />
          <h2 className="font-bold text-3xl my-1 mb-5">
            My Regen Soul Bound Token
          </h2>
          <TokenDetails data={regenToken} />
        </Item>
      )}
    </div>
  );
};

export default TokensGrid;
