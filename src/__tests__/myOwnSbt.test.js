import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CheckSbtTokenStatus } from '../components/pages/home/myOwnSbt';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import { wallet } from '../index';
import { TransferSBT } from '../components/pages/home/MyOwnSbtFiles/transferSbt';
import { act } from 'react-dom/test-utils';
import { getConfig } from '../utils/config';

const accountID = 'megha19.testnet';
const { app_contract, gooddollar_contract, new_sbt_contract, og_contract } =
  getConfig();

// Mock wallet from index.js file
jest.mock('../index', () => ({
  wallet: {
    viewMethod: jest.fn(),
    callMethod: jest.fn(),
    accountId: accountID,
  },
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

async function fetchSBTTokens() {
  await waitFor(() => expect(wallet.viewMethod).toHaveBeenCalledTimes(2));
  await act(async () => {
    // Expect the first method call with sbt contract
    expect(wallet.viewMethod).toHaveBeenNthCalledWith(1, {
      contractId: app_contract,
      method: 'sbt_supply_by_owner',
      args: { account: accountID, issuer: new_sbt_contract },
    });
    // Expect the second method call with good dollar contract
    expect(wallet.viewMethod).toHaveBeenNthCalledWith(2, {
      contractId: app_contract,
      method: 'sbt_supply_by_owner',
      args: { account: accountID, issuer: gooddollar_contract },
    });
  });
}

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

const fvSupply = 50;
const ogSupply = 50;

describe('Check Sbt Token Status', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('renders component with token supply of 0', async () => {
    wallet.viewMethod.mockResolvedValueOnce(0);
    wallet.viewMethod.mockResolvedValueOnce(0);
    render(<CheckSbtTokenStatus />);
    await fetchSBTTokens();
    expect(screen.getByText(/SBT Tokens you own/i)).toBeInTheDocument();
    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Transfer SBT between my own accounts/i)
    ).toBeDisabled();
  });

  it('renders component with token supply greater than 0', async () => {
    wallet.viewMethod.mockResolvedValueOnce(ogSupply);
    wallet.viewMethod.mockResolvedValueOnce(fvSupply);
    render(<CheckSbtTokenStatus />);
    await fetchSBTTokens();
    expect(
      screen.getByText(new RegExp(`${fvSupply + ogSupply}`, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText('Transfer SBT between my own accounts')
    ).not.toBeDisabled();
  });

  it('transfer SBT to another account', async () => {
    wallet.viewMethod.mockResolvedValueOnce(ogSupply);
    wallet.viewMethod.mockResolvedValueOnce(fvSupply);
    render(<CheckSbtTokenStatus />);
    await fetchSBTTokens();
    fireEvent.click(
      screen.getByRole('button', {
        name: /Transfer SBT between my own accounts/i,
      })
    );
    // write the addr and confirm the modal
    await act(async () => {
      render(
        <TransferSBT
          isOpen={true}
          checkSBTTokens={() => {}}
          closeModal={() => {}}
        />
      );
      fireEvent.change(screen.getByLabelText(/Transfer to/i), {
        target: { value: accountID },
      });
      const transferBtn = screen.getByRole('button', {
        name: 'Transfer',
      });
      fireEvent.click(transferBtn);
    });
    wallet.callMethod.mockResolvedValue(0);

    expect(wallet.callMethod).toHaveBeenCalledWith({
      contractId: og_contract,
      method: 'sbt_transfer',
      args: { receiver: accountID },
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'SBT tokens transferred successfully'
      );
    });
    await waitFor(() => expect(wallet.viewMethod).toHaveBeenCalledTimes(4));
  });
});
