import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ManageAdmin } from '../components/pages/home/manageAdmin';
import '@testing-library/jest-dom';
import { near_contract } from '../utils/contract-addresses';
import { wallet } from '../index';
import { AdminConfirmation } from '../components/pages/home/ManageAdmin/adminConfirmation';
import { toast } from 'react-toastify';
import { act } from 'react-dom/test-utils';

const accountIDWithoutAdminStatus = 'megha19.testnet';
const accountIDWithAdminStatus = 'kazander.testnet';

// Mock wallet from index.js file
jest.mock('../index', () => ({
  wallet: {
    viewMethod: jest.fn(),
    callMethod: jest.fn(),
  },
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

async function addAccountToStatus(accountID, isAdmin = false) {
  wallet.viewMethod.mockResolvedValue(isAdmin);
  const checkAdminStatusBtn = screen.getByRole('button', {
    name: /Check Admin Status/i,
  });
  const walletAddressInput = screen.getByLabelText(
    /Paste admin wallet address/i
  );
  fireEvent.change(walletAddressInput, {
    target: { value: accountID },
  });

  await act(async () => {
    fireEvent.click(checkAdminStatusBtn);
    expect(wallet.viewMethod).toHaveBeenCalledWith({
      contractId: near_contract,
      method: 'is_admin',
      args: { addr: accountID },
    });
  });
}

describe('ManageAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    await act(async () => {
      render(<ManageAdmin />);
    });
  });

  test('renders the component', async () => {
    const textRegex = /Manage Admin Membership/i;
    const element = screen.getByText(textRegex);
    expect(element).toBeInTheDocument();
  });

  test('should show error and disable add button when wallet address is not valid', () => {
    const checkAdminStatusBtn = screen.getByRole('button', {
      name: /Check Admin Status/i,
    });
    const walletAddressInput = screen.getByLabelText(
      /Paste admin wallet address/i
    );
    fireEvent.change(walletAddressInput, {
      target: { value: 'invalid-address' },
    });
    expect(
      screen.getByText(/Provided addresss should be a valid one/i)
    ).toBeInTheDocument();
    expect(checkAdminStatusBtn).toBeDisabled();
  });

  test('should show admin status with correct account ID', async () => {
    await addAccountToStatus(accountIDWithoutAdminStatus);
    await waitFor(() => {
      const element = screen.getByText(/is not an admin/i);
      expect(element).toBeInTheDocument();
    });
  });

  test('adds admin successfully', async () => {
    await addAccountToStatus(accountIDWithoutAdminStatus);
    const addAdminBtn = screen.getByRole('button', {
      name: /Add To Admins/i,
    });
    const addToAdmins = () => {};
    fireEvent.click(addAdminBtn);
    // confirm the modal
    await act(async () => {
      render(
        <AdminConfirmation
          closeModal={() => {}}
          isOpen={true}
          walletAddress={accountIDWithoutAdminStatus}
          isAddAdmin={true}
          execute={addToAdmins}
          loading={false}
        />
      );
      const confirmButton = screen.getByRole('button', { name: 'Confirm' });
      fireEvent.click(confirmButton);
    });
    wallet.callMethod.mockResolvedValue({});
    expect(wallet.callMethod).toHaveBeenCalledWith({
      contractId: near_contract,
      method: 'add_admins',
      args: { metadata: {}, admins: [accountIDWithoutAdminStatus] },
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Added admin successfully');
    });
  });

  test('removes admin successfully', async () => {
    await addAccountToStatus(accountIDWithAdminStatus, true);
    const removeAdmin = () => {};
    const removeBtn = screen.getByRole('button', {
      name: /Remove from Admins/i,
    });
    fireEvent.click(removeBtn);
    // confirm the modal
    await act(async () => {
      render(
        <AdminConfirmation
          closeModal={() => {}}
          isOpen={true}
          walletAddress={accountIDWithAdminStatus}
          isAddAdmin={false}
          execute={removeAdmin}
          loading={false}
        />
      );
      const confirmButton = screen.getByRole('button', { name: 'Confirm' });
      fireEvent.click(confirmButton);
    });
    wallet.callMethod.mockResolvedValue({});
    expect(wallet.callMethod).toHaveBeenCalledWith({
      contractId: near_contract,
      method: 'remove_admins',
      args: { metadata: {}, admins: [accountIDWithAdminStatus] },
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Removed admin successfully');
    });
  });
});
