import axios from 'axios';

export const api_link =
  process.env.REACT_APP_ENV === 'dev'
    ? 'https://dev-ophc7vkxsq-uc.a.run.app'
    : 'https://api-ophc7vkxsq-uc.a.run.app';
export const supabase = {
  select: async (table, match) => {
    const { data } = await axios.post(`${api_link}/select`, { table, match });
    return data;
  },
  insert: async (table, body) => {
    const { data } = await axios.post(`${api_link}/insert`, { table, body });
    return data;
  },
  update: async (table, body, match) => {
    const { data } = await axios.post(`${api_link}/update`, {
      table,
      body,
      match,
    });
    return data;
  },
  delete: async (table, match) => {
    const { data } = await axios.post(`${api_link}/delete`, { table, match });
    return data;
  },
};
