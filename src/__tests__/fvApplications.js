import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { FVSBTApplicationsTable } from '../components/pages/home/fvApplications';
import { api_link } from '../utils/supabase';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';

jest.mock('axios');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

async function waitForAxiosCall() {
  await waitFor(() => {
    act(() =>
      expect(axios.post).toHaveBeenCalledWith(`${api_link}/select`, {
        match: undefined,
        table: 'users',
      })
    );
  });
}

describe('FV SBT Applications Table', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => {
      render(<FVSBTApplicationsTable />);
    });
  });

  test('displays error message when fetching data fails', async () => {
    // mock the axios post request to return an error
    axios.post.mockRejectedValue({ data: { error: 'Error Occured' } });
    await waitForAxiosCall();
    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'An error occured while fetching applications'
      );
    });
  });

  test('renders the table without data', async () => {
    axios.post.mockResolvedValue({ data: { data: [], error: null } });
    await waitForAxiosCall();
    // Wait for the table to render
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('No Applications Found')).toBeInTheDocument();
  });

  test('renders the table with data', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            wallet_identifier: 'wallet1',
            status: 'Application Submitted',
          },
          {
            wallet_identifier: 'wallet2',
            status: 'Approved',
          },
          {
            wallet_identifier: 'wallet3',
            status: 'Rejected',
          },
        ],
        error: null,
      },
    };
    axios.post.mockResolvedValue(mockResponse);
    await waitForAxiosCall();
    expect(
      screen.getByText('A list of all fv sbt applications.')
    ).toBeInTheDocument();
  });
});
