import useSWR from 'swr';

import { baseURL } from '../config/env';

const BASEURL = baseURL()
console.log(BASEURL)
const fetcher = (url) => fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'allow'
    }
  }).then((res) => res.json());

export const registerUser = async (userData) => {
  const response = await fetch(`${BASEURL}/v1/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return response.json();
};

export const useRegisterUser = () => {
    const random = Math.floor((Math.random()*100) + 1);
    const { data, error, mutate } = useSWR(`${BASEURL}/v1/register?key=${random}`, fetcher);
    console.log(data, error);

    return {
        user: data,
        isLoading: !error && !data,
        isError: error || !data?.success,
        register: (userData) => registerUser(userData).then(mutate),
    };
};
