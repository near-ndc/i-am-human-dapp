import { getConfig } from '../utils/config';

export const verifyUser = async (data) => {
  return fetch(getConfig().fractal_api + '/verify', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
