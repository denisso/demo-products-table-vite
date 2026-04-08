import { fetcher } from './fetcher';

const BASE_URL = 'https://dummyjson.com';

export type LoginResponse = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export const loginRequest = (username: string, password: string) => {
  return fetcher<LoginResponse>(BASE_URL + '/auth/login', {
    method: 'POST',
    body: { username, password },
  });
};
