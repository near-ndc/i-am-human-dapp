// above line is added to fix the TextEncode error occured due to enzyme Adapter
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { VerifyPhoneAndEmail } from '../components/pages/home/applyCommunityVerify/verifyPhoneAndEmail';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { api_link } from '../utils/supabase';
import { wallet } from '../index';

const accountID = 'megha19.testnet';

// // Mock wallet from index.js file
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

jest.mock('axios');
axios.post.mockImplementation((url) => {
  const response = Promise.resolve({ status: 200, data: { data: false } });
  switch (url) {
    case `${api_link}/select`:
    case `${api_link}/send_otp`:
    case `${api_link}/insert`:
    case `${api_link}/verify_otp`:
    case `${api_link}/send_email_otp`:
    case `${api_link}/verify_email_otp`:
      return response;
    default:
      return Promise.reject(new Error('not found'));
  }
});

describe('Verify Phone And Email', () => {
  const setShowStep = jest.fn();
  const setTelegramData = jest.fn();
  const userData = {
    email: '',
    phone: '',
  };
  const phoneNo = +13424232424;
  const email = 'abc@gmail.com';
  const otp = 123456;

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  function fillOtpField(noOfLetter = 6) {
    for (let i = 1; i <= noOfLetter; i++) {
      const optletterInput = screen.getByLabelText(
        new RegExp(`Character ${i}`, 'i')
      );
      fireEvent.change(optletterInput, { target: { value: i } });
    }
  }

  it('throws error on incorrect phone number', async () => {
    const { getByText, getByPlaceholderText } = render(
      <VerifyPhoneAndEmail
        setShowStep={setShowStep}
        setTelegramData={setTelegramData}
        userData={userData}
      />
    );
    expect(getByText('Verify Phone Number')).toBeInTheDocument();
    const phoneInput = getByPlaceholderText(/Enter Your phone number/i);
    fireEvent.change(phoneInput, { target: { value: '888' } });
    expect(
      getByText(/Please provide a valid phone number/i)
    ).toBeInTheDocument();
  });

  it('sends OTP via phone number and verifies it successfully', async () => {
    const { getByPlaceholderText, getByLabelText, getByRole, getByTestId } =
      render(
        <VerifyPhoneAndEmail
          setShowStep={setShowStep}
          setTelegramData={setTelegramData}
          userData={userData}
        />
      );
    const dropdown = getByLabelText(/Phone number country/i);
    fireEvent.change(dropdown, { target: { value: 'ZZ' } });
    const verifyButton = getByTestId('send-phone-otp');
    const phoneInput = getByPlaceholderText(/Enter Your phone number/i);
    fireEvent.change(phoneInput, { target: { value: phoneNo } });
    await act(async () => {
      fireEvent.click(verifyButton);
    });
    const uniqueNp = await axios.post(`${api_link}/select`, {
      table: 'users',
      match: { telegram_number: `+${phoneNo}` },
    });
    expect(uniqueNp.status).toBe(200);

    const sendOtp = await axios.post(`${api_link}/send_otp`, {
      phone: phoneNo,
    });
    expect(sendOtp.status).toBe(200);

    const insertEvent = await axios.post(`${api_link}/insert`, {
      table: 'events',
      body: {
        event_log: `OTP sent for phone : ${phoneNo}`,
        wallet_identifier: wallet.accountId,
      },
    });
    expect(insertEvent.status).toBe(200);

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith('Otp sent successfully')
    );

    // verify otp
    fillOtpField();
    await act(async () => {
      fireEvent.click(verifyButton);
    });
    const verifyOtp = await axios.post(`${api_link}/verify_otp`, {
      phone: phoneNo,
      otp: otp,
    });
    expect(verifyOtp.status).toBe(200);
    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith('Otp verified')
    );
  });

  it('throws error on incorrect email', async () => {
    const { getByLabelText, getByText } = render(
      <VerifyPhoneAndEmail
        setShowStep={setShowStep}
        setTelegramData={setTelegramData}
        userData={userData}
        showEmailVerification={true}
      />
    );
    const emailInput = getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(
      getByText(/Please provide a valid email address/i)
    ).toBeInTheDocument();
  });

  it('sends OTP via email and verifies it successfully', async () => {
    const {
      getByPlaceholderText,
      getByLabelText,
      getByRole,
      getByText,
      getByTestId,
    } = render(
      <VerifyPhoneAndEmail
        setShowStep={setShowStep}
        setTelegramData={setTelegramData}
        userData={userData}
        showEmailVerification={true}
      />
    );
    const emailInput = getByLabelText(/Email/i);
    const verifyButton = getByRole('button', { name: 'Verify' });
    fireEvent.change(emailInput, { target: { value: email } });
    act(() => {
      fireEvent.click(verifyButton);
    });
    const sendOtp = await axios.post(`${api_link}/send_email_otp`, {
      email: email,
    });
    expect(sendOtp.status).toBe(200);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Otp sent successfully');
    });

    // verify otp
    expect(getByText(/Enter otp sent to your email/i)).toBeInTheDocument();
    fillOtpField();
    act(() => {
      fireEvent.click(verifyButton);
    });
    const verifyOtp = await axios.post(`${api_link}/verify_email_otp`, {
      email: email,
      otp: otp,
    });
    expect(verifyOtp.status).toBe(200);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Otp verified');
    });
  });
});
