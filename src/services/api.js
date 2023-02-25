import getConfig from '../config';
const config = getConfig();

export const verifyUser = async (data) => {
  return fetch(config.API_URL + '/verify', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
};