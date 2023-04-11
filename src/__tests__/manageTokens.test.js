import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ManageTokens } from '../components/pages/home/manageTokens';
import { near_contract } from '../utils/contract-addresses';
import '@testing-library/jest-dom';
import { wallet } from '../index';

const accountIDWithSBT = 'user1tictactoe.testnet';
const accountIDWithoutSBT = 'user2tictactoe.testnet';

// Mock wallet from index.js file
jest.mock('../index', () => ({
  wallet: {
    viewMethod: jest.fn(),
  },
}));

describe('ManageTokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component', () => {
    render(<ManageTokens />);
    const textRegex = /Current SBT admins/i;
    const element = screen.getByText(textRegex);
    expect(element).toBeInTheDocument();
  });

  test('input field accepts a valid account ID', () => {
    render(<ManageTokens />);
    const input = screen.getByLabelText(/Paste verified wallet address here/i);
    fireEvent.change(input, { target: { value: accountIDWithSBT } });
    expect(input.value).toBe(accountIDWithSBT);
  });

  test('input field rejects an invalid account ID', () => {
    render(<ManageTokens />);
    const input = screen.getByLabelText(/Paste verified wallet address here/i);
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.blur(input);
    expect(
      screen.getByText(
        /Provided addresss should be a valid one/i
      )
    ).toBeInTheDocument();
  });

  test('view tokens button shows no SBT found message when no tokens are found', async () => {
    // empty data
    wallet.viewMethod.mockResolvedValue([]);
    render(<ManageTokens />);
    const input = screen.getByLabelText(/Paste verified wallet address here/i);
    fireEvent.change(input, { target: { value: accountIDWithoutSBT } });
    fireEvent.click(screen.getByRole('button', { name: /Check Tokens/i }));
    expect(wallet.viewMethod).toHaveBeenCalledWith({
      contractId: near_contract,
      method: 'nft_tokens_for_owner',
      args: { account: accountIDWithoutSBT },
    });
    await waitFor(() =>
      expect(screen.getByText(/No tokens found/i)).toBeInTheDocument()
    );
  });

  test('view tokens button shows SBT valid message when a valid token is found', async () => {
    // mock data
    wallet.viewMethod.mockResolvedValue([
      {
        token_id: 'sbt_token_id',
        metadata: {
          expires_at: Date.now() + 10000,
        },
      },
    ]);
    render(<ManageTokens />);
    const input = screen.getByLabelText(/Paste verified wallet address here/i);
    fireEvent.change(input, { target: { value: accountIDWithSBT } });
    const viewButton = screen.getByRole('button', { name: /Check Tokens/i });
    fireEvent.click(viewButton);
    expect(wallet.viewMethod).toHaveBeenCalledWith({
      contractId: near_contract,
      method: 'nft_tokens_for_owner',
      args: { account: accountIDWithSBT },
    });
    await waitFor(() =>
      expect(screen.getByText(/Valid Token/i)).toBeInTheDocument()
    );
  });
});
